// import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
// import api from '../Axios/Axios.js'
// import { getSocket, disconnectSocket } from '../services/socket.js'

// const ChatContext = createContext(null)

// export const ChatProvider = ({ children }) => {
//   const [isOpen, setIsOpen]                   = useState(false)
//   const [step, setStep]                       = useState('form')
//   const [visitor, setVisitor]                 = useState(null)
//   const [conversation, setConversation]       = useState(null)
//   const [messages, setMessages]               = useState([])
//   const [isAiTyping, setIsAiTyping]           = useState(false)
//   const [recruiterTyping, setRecruiterTyping] = useState(false)
//   const [recruiterName, setRecruiterName]     = useState('')

//   const socketRef         = useRef(null)
//   const visitorRef        = useRef(null)
//   const conversationRef   = useRef(null)
//   const aiTypingTimeout   = useRef(null)   // ← safety timeout ref

//   useEffect(() => { visitorRef.current = visitor }, [visitor])
//   useEffect(() => { conversationRef.current = conversation }, [conversation])

//   // ── Deduped append ──────────────────────────────────────────────────────────
//   const appendMessage = useCallback((msg) => {
//     setMessages(prev => {
//       if (prev.some(m => m._id === msg._id)) return prev
//       return [...prev, msg]
//     })
//   }, [])

//   // ── Replace optimistic with server-confirmed visitor message ────────────────
//   const replaceOptimistic = useCallback((serverMsg) => {
//     setMessages(prev => {
//       if (prev.some(m => m._id === serverMsg._id)) return prev
//       const idx = [...prev].reverse().findIndex(
//         m => String(m._id).startsWith('opt-') && m.senderType === 'visitor'
//       )
//       if (idx === -1) return [...prev, serverMsg]
//       const realIdx = prev.length - 1 - idx
//       const next = [...prev]
//       next[realIdx] = serverMsg
//       return next
//     })
//   }, [])

//   // ── Socket setup ────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const socket = getSocket()
//     socketRef.current = socket

//     const handleReconnect = () => {
//       const v = visitorRef.current
//       const c = conversationRef.current
//       if (v && c) {
//         socket.emit('visitor_join', {
//           visitorId: v._id,
//           conversationId: c._id,
//           socketId: socket.id,
//         })
//       }
//     }

//     // Clears ai typing regardless of which event the backend uses
//     const handleNewMessage = (msg) => {
//       if (msg.senderType === 'visitor') {
//         replaceOptimistic(msg)
//         return
//       }
//       if (msg.senderType === 'ai') {
//         clearTimeout(aiTypingTimeout.current)
//         setIsAiTyping(false)
//       }
//       appendMessage(msg)
//     }

//     const handleAiTyping = () => {
//       setIsAiTyping(true)
//       // Safety net: auto-clear after 15s if no response arrives
//       clearTimeout(aiTypingTimeout.current)
//       aiTypingTimeout.current = setTimeout(() => setIsAiTyping(false), 15000)
//     }

//     const handleAiResponse = (data) => {
//       clearTimeout(aiTypingTimeout.current)
//       setIsAiTyping(false)
//       appendMessage({
//         _id: data._id || `ai-${Date.now()}`,
//         senderType: 'ai',
//         message: data.message,
//         createdAt: data.createdAt || new Date().toISOString(),
//       })
//     }

//     const handleRecruiterJoined = (data) => {
//       const name = data.recruiterName || 'Recruitment Specialist'
//       setRecruiterName(name)
//       appendMessage({
//         _id: `sys-${Date.now()}`,
//         senderType: 'system',
//         message: `${name} joined the conversation.`,
//         createdAt: new Date().toISOString(),
//       })
//     }

//     const handleRecruiterMessage = (data) => {
//       setRecruiterTyping(false)
//       appendMessage({
//         _id: data._id || `rec-${Date.now()}`,
//         senderType: 'recruiter',
//         senderName: data.senderName,
//         message: data.message,
//         createdAt: data.createdAt || new Date().toISOString(),
//       })
//     }

//     const handleConversationClosed = () => {
//       appendMessage({
//         _id: `sys-${Date.now()}`,
//         senderType: 'system',
//         message: 'This conversation has been closed. Thank you!',
//         createdAt: new Date().toISOString(),
//       })
//       setConversation(prev => prev ? { ...prev, status: 'CLOSED' } : prev)
//     }

//     socket.on('connect',               handleReconnect)
//     socket.on('new_message',           handleNewMessage)
//     socket.on('ai_typing',             handleAiTyping)
//     socket.on('ai_response',           handleAiResponse)
//     socket.on('recruiter_joined',      handleRecruiterJoined)
//     socket.on('recruiter_message',     handleRecruiterMessage)
//     socket.on('recruiter_typing',      () => setRecruiterTyping(true))
//     socket.on('recruiter_stop_typing', () => setRecruiterTyping(false))
//     socket.on('conversation_closed',   handleConversationClosed)

//     return () => {
//       clearTimeout(aiTypingTimeout.current)
//       socket.off('connect',               handleReconnect)
//       socket.off('new_message',           handleNewMessage)
//       socket.off('ai_typing',             handleAiTyping)
//       socket.off('ai_response',           handleAiResponse)
//       socket.off('recruiter_joined',      handleRecruiterJoined)
//       socket.off('recruiter_message',     handleRecruiterMessage)
//       socket.off('recruiter_typing')
//       socket.off('recruiter_stop_typing')
//       socket.off('conversation_closed',   handleConversationClosed)
//       disconnectSocket()
//     }
//   }, [appendMessage, replaceOptimistic])

//   // ── Visitor identification ──────────────────────────────────────────────────
//   const identifyVisitor = useCallback(async ({ name, email }) => {
//     try {
//       const socket = getSocket()
//       const { data } = await api.post('/visitors/identify', {
//         name,
//         email,
//         socketId: socket.id,
//       })

//       setVisitor(data.visitor)
//       setConversation(data.conversation)
//       setMessages(data.messages || [])
//       setStep('chat')

//       socket.emit('visitor_join', {
//         visitorId: data.visitor._id,
//         conversationId: data.conversation._id,
//         socketId: socket.id,
//       })
//     } catch (err) {
//       console.error('Identify visitor error:', err)
//       throw err
//     }
//   }, [])

//   // ── Send message ────────────────────────────────────────────────────────────
//   const sendMessage = useCallback(async (text) => {
//     if (!visitor || !conversation || !text.trim()) return

//     const optimistic = {
//       _id: `opt-${Date.now()}`,
//       senderType: 'visitor',
//       message: text.trim(),
//       createdAt: new Date().toISOString(),
//     }
//     setMessages(prev => [...prev, optimistic])

//     socketRef.current?.emit('visitor_message', {
//       visitorId: visitor._id,
//       conversationId: conversation._id,
//       message: text.trim(),
//     })
//   }, [visitor, conversation])

//   const toggleChat = useCallback(() => setIsOpen(prev => !prev), [])
//   const closeChat  = useCallback(() => setIsOpen(false), [])

//   const value = {
//     isOpen, toggleChat, closeChat,
//     step, setStep,
//     visitor, conversation,
//     messages,
//     isAiTyping, recruiterTyping, recruiterName,
//     identifyVisitor, sendMessage,
//   }

//   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
// }

// export const useChat = () => {
//   const ctx = useContext(ChatContext)
//   if (!ctx) throw new Error('useChat must be used within ChatProvider')
//   return ctx
// }

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import api from '../Axios/Axios.js'
import { getSocket, disconnectSocket } from '../services/socket.js'

const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen]                   = useState(false)
  const [step, setStep]                       = useState('form')
  const [visitor, setVisitor]                 = useState(null)
  const [conversation, setConversation]       = useState(null)
  const [messages, setMessages]               = useState([])
  const [isAiTyping, setIsAiTyping]           = useState(false)
  const [recruiterTyping, setRecruiterTyping] = useState(false)
  const [recruiterName, setRecruiterName]     = useState('')

  const socketRef       = useRef(null)
  const visitorRef      = useRef(null)
  const conversationRef = useRef(null)
  const aiTypingTimeout = useRef(null)

  useEffect(() => { visitorRef.current      = visitor      }, [visitor])
  useEffect(() => { conversationRef.current = conversation }, [conversation])

  // ── Deduped append ──────────────────────────────────────────────────────────
  const appendMessage = useCallback((msg) => {
    setMessages(prev => {
      if (prev.some(m => m._id === msg._id)) return prev
      return [...prev, msg]
    })
  }, [])

  // ── Replace optimistic visitor message with server-confirmed version ─────────
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

  // ── Socket setup ────────────────────────────────────────────────────────────
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

    // FIX: normalise every incoming new_message so senderName is always set.
    // The server emits both `senderName` and `recruiterName` at top level —
    // we prefer `senderName`, fall back to `recruiterName`, then to nothing.
    const handleNewMessage = (msg) => {
      const normalised = {
        ...msg,
        // unify the two possible name keys into one
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
      // system message comes from server via new_message/recruiter_joined —
      // only add a local one if the server didn't already send one
      if (data.systemMessage) {
        appendMessage({
          ...data.systemMessage,
          _id: data.systemMessage._id || `sys-${Date.now()}`,
        })
      } else {
        appendMessage({
          _id: `sys-${Date.now()}`,
          senderType: 'system',
          message: `${name} has joined the conversation.`,
          createdAt: new Date().toISOString(),
        })
      }
    }

    const handleConversationClosed = (data) => {
      // Use server's system message if provided, else generate local one
      if (data?.systemMessage) {
        appendMessage({
          ...data.systemMessage,
          _id: data.systemMessage._id || `sys-${Date.now()}`,
        })
      } else {
        appendMessage({
          _id: `sys-${Date.now()}`,
          senderType: 'system',
          message: 'This conversation has been closed. Thank you!',
          createdAt: new Date().toISOString(),
        })
      }
      setConversation(prev => prev ? { ...prev, status: 'CLOSED' } : prev)
    }

    socket.on('connect',               handleReconnect)
    socket.on('new_message',           handleNewMessage)
    socket.on('ai_typing',             handleAiTyping)
    socket.on('recruiter_joined',      handleRecruiterJoined)
    socket.on('recruiter_typing',      () => setRecruiterTyping(true))
    socket.on('recruiter_stop_typing', () => setRecruiterTyping(false))
    socket.on('conversation_closed',   handleConversationClosed)

    // ChatContext.jsx — fix the useEffect cleanup
return () => {
  clearTimeout(aiTypingTimeout.current)
  socket.off('connect',               handleReconnect)
  socket.off('new_message',           handleNewMessage)
  socket.off('ai_typing',             handleAiTyping)
  socket.off('recruiter_joined',      handleRecruiterJoined)
  socket.off('recruiter_typing')
  socket.off('recruiter_stop_typing')
  socket.off('conversation_closed',   handleConversationClosed)
  // ✂️ removed disconnectSocket() — was destroying the socket on every remount
}
  }, [appendMessage, replaceOptimistic])

  // ── Visitor identification ──────────────────────────────────────────────────
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

  // ── Send message ────────────────────────────────────────────────────────────
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