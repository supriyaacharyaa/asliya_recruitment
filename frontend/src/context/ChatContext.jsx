// src/context/ChatContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// All existing functionality preserved exactly.
// NEW: session persistence — visitor stays logged in for 1 hour after refresh.
//   • On identifyVisitor() success → save { visitor, conversationId, expiresAt }
//     to localStorage under key "asliya_chat_session"
//   • On mount → read localStorage, check TTL (1 hour), silently re-hydrate
//     messages via existing GET /conversations/:id endpoint (no new API needed)
//   • On conversation close OR TTL expiry → clear localStorage
//   • On "Hand back to AI" socket event → update conversation status in context
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext, useContext, useState, useEffect, useCallback, useRef,
} from 'react'
import api from '../Axios/Axios.js'
import { getSocket, disconnectSocket } from '../services/socket.js'

const ChatContext = createContext(null)

// ── Session helpers ───────────────────────────────────────────────────────────
const SESSION_KEY    = 'asliya_chat_session'
const SESSION_TTL_MS = 60 * 60 * 1000 // 1 hour

const saveSession = (visitor, conversationId) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      visitor,
      conversationId,
      expiresAt: Date.now() + SESSION_TTL_MS,
    }))
  } catch { /* storage full / blocked */ }
}

const loadSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

const clearSession = () => {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export const ChatProvider = ({ children }) => {
  const [isOpen,          setIsOpen]          = useState(false)
  const [step,            setStep]            = useState('form')
  const [visitor,         setVisitor]         = useState(null)
  const [conversation,    setConversation]    = useState(null)
  const [messages,        setMessages]        = useState([])
  const [isAiTyping,      setIsAiTyping]      = useState(false)
  const [recruiterTyping, setRecruiterTyping] = useState(false)
  const [recruiterName,   setRecruiterName]   = useState('')
  const [isRestoring,     setIsRestoring]     = useState(true)  // hydration guard

  const socketRef       = useRef(null)
  const visitorRef      = useRef(null)
  const conversationRef = useRef(null)
  const aiTypingTimeout = useRef(null)

  useEffect(() => { visitorRef.current      = visitor      }, [visitor])
  useEffect(() => { conversationRef.current = conversation }, [conversation])

  // ── Session restore on mount ─────────────────────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const session = loadSession()
      if (!session) { setIsRestoring(false); return }

      try {
        // Re-use the existing visitor-messages endpoint — no new API needed
        const { data } = await api.get(`/conversations/${session.conversationId}`)
        if (!data.success) throw new Error('stale session')

        setVisitor(session.visitor)
        setConversation({
          _id:               data.conversation._id,
          status:            data.conversation.status,
          assignedRecruiter: data.conversation.assignedRecruiter,
        })
        setMessages(data.messages || [])
        setStep('chat')

        // Rejoin socket room so real-time keeps working
        const socket = getSocket()
        socket.emit('visitor_join', {
          visitorId:      session.visitor._id,
          conversationId: session.conversationId,
          socketId:       socket.id,
        })

        // Refresh TTL so active users don't get kicked mid-session
        saveSession(session.visitor, session.conversationId)
      } catch {
        // Session is stale (conversation deleted, etc.) — start fresh
        clearSession()
      }
      setIsRestoring(false)
    }
    restore()
  }, []) // runs once on mount

  // ── Deduped append ──────────────────────────────────────────────────────
  const appendMessage = useCallback((msg) => {
    setMessages(prev => {
      if (prev.some(m => m._id === msg._id)) return prev
      return [...prev, msg]
    })
  }, [])

  // ── Replace optimistic visitor message with server-confirmed version ─────
  const replaceOptimistic = useCallback((serverMsg) => {
    setMessages(prev => {
      if (prev.some(m => m._id === serverMsg._id)) return prev
      const idx = [...prev].reverse().findIndex(
        m => String(m._id).startsWith('opt-') && m.senderType === 'visitor'
      )
      if (idx === -1) return [...prev, serverMsg]
      const realIdx = prev.length - 1 - idx
      const next = [...prev]
      next[realIdx] = serverMsg
      return next
    })
  }, [])

  // ── Socket setup ─────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket()
    socketRef.current = socket

    const handleReconnect = () => {
      const v = visitorRef.current
      const c = conversationRef.current
      if (v && c) {
        socket.emit('visitor_join', {
          visitorId:      v._id,
          conversationId: c._id,
          socketId:       socket.id,
        })
      }
    }

    const handleNewMessage = (msg) => {
      const normalised = {
        ...msg,
        senderName: msg.senderName || msg.recruiterName || null,
      }
      if (normalised.senderType === 'visitor') {
        replaceOptimistic(normalised)
        return
      }
      if (normalised.senderType === 'ai') {
        clearTimeout(aiTypingTimeout.current)
        setIsAiTyping(false)
      }
      appendMessage(normalised)
    }

    const handleAiTyping = ({ isTyping }) => {
      if (isTyping) {
        setIsAiTyping(true)
        clearTimeout(aiTypingTimeout.current)
        aiTypingTimeout.current = setTimeout(() => setIsAiTyping(false), 15000)
      } else {
        clearTimeout(aiTypingTimeout.current)
        setIsAiTyping(false)
      }
    }

    const handleRecruiterJoined = (data) => {
      const name = data.recruiterName || 'Recruitment Specialist'
      setRecruiterName(name)
      if (data.systemMessage) {
        appendMessage({
          ...data.systemMessage,
          _id: data.systemMessage._id || `sys-${Date.now()}`,
        })
      } else {
        appendMessage({
          _id:        `sys-${Date.now()}`,
          senderType: 'system',
          message:    `${name} has joined the conversation.`,
          createdAt:  new Date().toISOString(),
        })
      }
    }

    const handleConversationClosed = (data) => {
      if (data?.systemMessage) {
        appendMessage({
          ...data.systemMessage,
          _id: data.systemMessage._id || `sys-${Date.now()}`,
        })
      } else {
        appendMessage({
          _id:        `sys-${Date.now()}`,
          senderType: 'system',
          message:    'This conversation has been closed. Thank you!',
          createdAt:  new Date().toISOString(),
        })
      }
      setConversation(prev => prev ? { ...prev, status: 'CLOSED' } : prev)
      clearSession()
    }

    // NEW: recruiter handed conversation back to AI — update status in context
    const handleStatusUpdate = (data) => {
      setConversation(prev => {
        if (!prev || prev._id !== data.conversationId) return prev
        return { ...prev, status: data.status }
      })
      // If handed back to AI, clear recruiter name
      if (data.status === 'AI') {
        setRecruiterName('')
        setRecruiterTyping(false)
      }
    }

    socket.on('connect',                 handleReconnect)
    socket.on('new_message',             handleNewMessage)
    socket.on('ai_typing',               handleAiTyping)
    socket.on('recruiter_joined',        handleRecruiterJoined)
    socket.on('recruiter_typing',        () => setRecruiterTyping(true))
    socket.on('recruiter_stop_typing',   () => setRecruiterTyping(false))
    socket.on('conversation_closed',     handleConversationClosed)
    socket.on('conversation_status_update', handleStatusUpdate) // NEW

    return () => {
      clearTimeout(aiTypingTimeout.current)
      socket.off('connect',                  handleReconnect)
      socket.off('new_message',              handleNewMessage)
      socket.off('ai_typing',               handleAiTyping)
      socket.off('recruiter_joined',        handleRecruiterJoined)
      socket.off('recruiter_typing')
      socket.off('recruiter_stop_typing')
      socket.off('conversation_closed',     handleConversationClosed)
      socket.off('conversation_status_update', handleStatusUpdate)
      // ✂️ NOT calling disconnectSocket() — that destroys the singleton on remount
    }
  }, [appendMessage, replaceOptimistic])

  // ── Visitor identification ────────────────────────────────────────────────
  const identifyVisitor = useCallback(async ({ name, email }) => {
    try {
      const socket = getSocket()
      const { data } = await api.post('/visitors/identify', {
        name,
        email,
        socketId: socket.id,
      })

      setVisitor(data.visitor)
      setConversation(data.conversation)
      setMessages(data.messages || [])
      setStep('chat')

      // Persist session — visitor won't need to re-identify for 1 hour
      saveSession(data.visitor, data.conversation._id)

      socket.emit('visitor_join', {
        visitorId:      data.visitor._id,
        conversationId: data.conversation._id,
        socketId:       socket.id,
      })
    } catch (err) {
      console.error('Identify visitor error:', err)
      throw err
    }
  }, [])

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    if (!visitor || !conversation || !text.trim()) return

    const optimistic = {
      _id:        `opt-${Date.now()}`,
      senderType: 'visitor',
      message:    text.trim(),
      createdAt:  new Date().toISOString(),
    }
    setMessages(prev => [...prev, optimistic])

    socketRef.current?.emit('visitor_message', {
      visitorId:      visitor._id,
      conversationId: conversation._id,
      message:        text.trim(),
    })
  }, [visitor, conversation])

  const toggleChat = useCallback(() => setIsOpen(prev => !prev), [])
  const closeChat  = useCallback(() => setIsOpen(false), [])

  return (
    <ChatContext.Provider value={{
      isOpen, toggleChat, closeChat,
      step, setStep,
      visitor, conversation,
      messages,
      isAiTyping, recruiterTyping, recruiterName,
      identifyVisitor, sendMessage,
      isRestoring,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}