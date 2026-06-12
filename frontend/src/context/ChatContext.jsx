import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import api from '../api/axios.js'
import { getSocket, disconnectSocket } from '../services/socket.js'

const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
  // UI state
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('form') // 'form' | 'chat'

  // Visitor identity
  const [visitor, setVisitor] = useState(null)       // { _id, name, email, socketId }
  const [conversation, setConversation] = useState(null) // { _id, status }

  // Messages
  const [messages, setMessages] = useState([])
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [recruiterTyping, setRecruiterTyping] = useState(false)
  const [recruiterName, setRecruiterName] = useState('')

  const socketRef = useRef(null)

  // ── Socket setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket()
    socketRef.current = socket

    socket.on('ai_typing', () => setIsAiTyping(true))
    socket.on('ai_response', (data) => {
      setIsAiTyping(false)
      setMessages(prev => [...prev, {
        _id: Date.now(),
        senderType: 'ai',
        message: data.message,
        createdAt: new Date().toISOString(),
      }])
    })

    socket.on('recruiter_joined', (data) => {
      setRecruiterName(data.recruiterName || 'Recruitment Specialist')
      setMessages(prev => [...prev, {
        _id: `sys-${Date.now()}`,
        senderType: 'system',
        message: `${data.recruiterName || 'Recruitment Specialist'} joined the conversation.`,
        createdAt: new Date().toISOString(),
      }])
    })

    socket.on('recruiter_message', (data) => {
      setMessages(prev => [...prev, {
        _id: data._id || Date.now(),
        senderType: 'recruiter',
        senderName: data.senderName,
        message: data.message,
        createdAt: data.createdAt || new Date().toISOString(),
      }])
    })

    socket.on('recruiter_typing', () => setRecruiterTyping(true))
    socket.on('recruiter_stop_typing', () => setRecruiterTyping(false))

    socket.on('conversation_closed', () => {
      setMessages(prev => [...prev, {
        _id: `sys-${Date.now()}`,
        senderType: 'system',
        message: 'This conversation has been closed. Thank you!',
        createdAt: new Date().toISOString(),
      }])
      setConversation(prev => prev ? { ...prev, status: 'CLOSED' } : prev)
    })

    return () => {
      socket.off('ai_typing')
      socket.off('ai_response')
      socket.off('recruiter_joined')
      socket.off('recruiter_message')
      socket.off('recruiter_typing')
      socket.off('recruiter_stop_typing')
      socket.off('conversation_closed')
    }
  }, [])

  // ── Visitor identification ───────────────────────────────────────────────────
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

      // Join conversation room
      socket.emit('visitor_join', {
        visitorId: data.visitor._id,
        conversationId: data.conversation._id,
        socketId: socket.id,
      })
    } catch (err) {
      console.error('Identify visitor error:', err)
      throw err
    }
  }, [])

  // ── Send message ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    if (!visitor || !conversation || !text.trim()) return

    const optimistic = {
      _id: `opt-${Date.now()}`,
      senderType: 'visitor',
      message: text.trim(),
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, optimistic])

    try {
      const socket = socketRef.current
      socket.emit('visitor_message', {
        visitorId: visitor._id,
        conversationId: conversation._id,
        message: text.trim(),
      })
    } catch (err) {
      console.error('Send message error:', err)
    }
  }, [visitor, conversation])

  // ── Toggle chat open/close ───────────────────────────────────────────────────
  const toggleChat = useCallback(() => setIsOpen(prev => !prev), [])
  const closeChat = useCallback(() => setIsOpen(false), [])

  const value = {
    isOpen, toggleChat, closeChat,
    step, setStep,
    visitor, conversation,
    messages,
    isAiTyping, recruiterTyping, recruiterName,
    identifyVisitor, sendMessage,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}