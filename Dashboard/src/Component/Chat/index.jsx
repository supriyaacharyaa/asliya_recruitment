// src/Component/Chat/index.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Pages/AuthContext.jsx'
import { getAdminSocket } from '../../services/socket.js'
import api from '../../api/axios.js'
import ConversationList from './ConversationList.jsx'
import ChatPanel from './ChatPanel.jsx'
import StatsBar from './StatsBar.jsx'

const NAV_BG = '#154895'

const Chat = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [conversations, setConversations] = useState([])
  const [selectedConv, setSelectedConv]   = useState(null)
  const [messages, setMessages]           = useState([])
  const [filter, setFilter]               = useState('ALL')
  const [search, setSearch]               = useState('')
  const [sidebarOpen, setSidebarOpen]     = useState(true)
  const [stats, setStats]                 = useState({ total: 0, ai: 0, human: 0, closed: 0 })

  // Keep a ref to selectedConv so socket callbacks always see the latest value
  // without needing to be in the dependency array (which causes socket re-init)
  const selectedConvRef = useRef(null)
  useEffect(() => { selectedConvRef.current = selectedConv }, [selectedConv])

  useEffect(() => {
    if (!user) navigate('/login', { replace: true })
  }, [user, navigate])

  // ── Socket setup — only depends on user._id, never on selectedConv ──────────
  // This means the socket is set up ONCE per login session, not on every
  // conversation click. Callbacks read selectedConv via the ref instead.
  useEffect(() => {
    if (!user) return
    const socket = getAdminSocket(user.token)
    socket.emit('recruiter_connect', { recruiterId: user._id })

    socket.on('new_conversation', (conv) => {
      setConversations(prev => [conv, ...prev])
      setStats(s => ({ ...s, total: s.total + 1, ai: s.ai + 1 }))
    })

    socket.on('visitor_message_to_admin', (data) => {
      setConversations(prev => prev.map(c =>
        c._id === data.conversationId
          ? { ...c, lastMessage: data.message, updatedAt: new Date().toISOString() }
          : c
      ))
      // Use ref — no stale closure issue
      if (selectedConvRef.current?._id === data.conversationId) {
        setMessages(prev => {
          // deduplicate
          if (prev.some(m => m._id === data._id)) return prev
          return [...prev, {
            _id: data._id || Date.now(),
            senderType: 'visitor',
            message: data.message,
            createdAt: data.createdAt || new Date().toISOString(),
          }]
        })
      }
    })

    socket.on('ai_response_to_admin', (data) => {
      if (selectedConvRef.current?._id === data.conversationId) {
        setMessages(prev => {
          if (prev.some(m => m._id === data._id)) return prev
          return [...prev, {
            _id: data._id || Date.now(),
            senderType: 'ai',
            message: data.message,
            createdAt: data.createdAt || new Date().toISOString(),
          }]
        })
      }
    })

    socket.on('conversation_status_update', (data) => {
      setConversations(prev => prev.map(c =>
        c._id === data.conversationId ? { ...c, status: data.status } : c
      ))
      if (selectedConvRef.current?._id === data.conversationId) {
        setSelectedConv(prev => prev ? { ...prev, status: data.status } : prev)
      }
    })

    // Listen for recruiter messages coming back from the server
    // (confirms the message was saved and broadcasts to all room members)
    socket.on('new_message', (data) => {
      if (selectedConvRef.current?._id === data.conversationId) {
        setMessages(prev => {
          // Replace optimistic message or deduplicate
          if (prev.some(m => m._id === data._id)) return prev
          // Replace the most recent optimistic recruiter message
          const optIdx = [...prev].reverse().findIndex(
            m => String(m._id).startsWith('opt-') && m.senderType === data.senderType
          )
          if (optIdx !== -1) {
            const realIdx = prev.length - 1 - optIdx
            const next = [...prev]
            next[realIdx] = { ...data, senderName: data.senderName || data.recruiterName }
            return next
          }
          return [...prev, { ...data, senderName: data.senderName || data.recruiterName }]
        })
      }
    })

    return () => {
      socket.off('new_conversation')
      socket.off('visitor_message_to_admin')
      socket.off('ai_response_to_admin')
      socket.off('conversation_status_update')
      socket.off('new_message')
    }
  }, [user?._id]) // ← ONLY user._id, never selectedConv

  // ── Load conversations ────────────────────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    try {
      const { data } = await api.get('/conversations')
      setConversations(data.conversations || [])
      const total  = data.conversations?.length || 0
      const ai     = data.conversations?.filter(c => c.status === 'AI').length || 0
      const human  = data.conversations?.filter(c => c.status === 'HUMAN').length || 0
      const closed = data.conversations?.filter(c => c.status === 'CLOSED').length || 0
      setStats({ total, ai, human, closed })
    } catch (err) {
      console.error('Load conversations error:', err)
    }
  }, [])

  useEffect(() => { loadConversations() }, [loadConversations])

  // ── Select conversation ───────────────────────────────────────────────────────
  const selectConversation = useCallback(async (conv) => {
    setSelectedConv(conv)
    setSidebarOpen(false)
    try {
      const { data } = await api.get(`/messages/${conv._id}`)
      setMessages(data.messages || [])
    } catch (err) {
      console.error('Load messages error:', err)
    }
  }, [])

  // ── Takeover ──────────────────────────────────────────────────────────────────
  const takeover = useCallback(async (conversationId) => {
    if (!user) return
    try {
      await api.put(`/conversations/${conversationId}/assign`, { recruiterId: user._id })

      const socket = getAdminSocket(user.token)
      socket.emit('recruiter_join_conversation', {
        conversationId,
        recruiterId: user._id,
      })

      // Optimistically update status so the input bar appears immediately
      setSelectedConv(prev => prev ? { ...prev, status: 'HUMAN', assignedRecruiter: user._id } : prev)
    } catch (err) {
      console.error('Takeover error:', err)
    }
  }, [user])

  // ── Send recruiter message ────────────────────────────────────────────────────
  const sendRecruiterMessage = useCallback((text) => {
    // Read current conv from ref — avoids stale closure entirely
    const conv = selectedConvRef.current
    if (!conv || !text.trim() || !user) return

    const socket = getAdminSocket(user.token)

    // Optimistic message shown immediately in dashboard
    const optimisticId = `opt-${Date.now()}`
    setMessages(prev => [...prev, {
      _id: optimisticId,
      senderType: 'recruiter',
      senderName: user.name,
      message: text.trim(),
      createdAt: new Date().toISOString(),
    }])

    socket.emit('recruiter_message', {
      conversationId: conv._id,
      recruiterId:    user._id,
      recruiterName:  user.name,
      message:        text.trim(),
    })
  }, [user]) // ← no selectedConv dependency — reads from ref instead

  // ── Close conversation ────────────────────────────────────────────────────────
  const closeConversation = useCallback(async (conversationId) => {
    try {
      await api.put(`/conversations/${conversationId}/close`)
      setConversations(prev =>
        prev.map(c => c._id === conversationId ? { ...c, status: 'CLOSED' } : c)
      )
      setSelectedConv(prev => prev?._id === conversationId ? { ...prev, status: 'CLOSED' } : prev)
    } catch (err) {
      console.error('Close error:', err)
    }
  }, [])

  // ── Filtered list ─────────────────────────────────────────────────────────────
  const filtered = conversations.filter(c => {
    const matchFilter = filter === 'ALL' || c.status === filter
    const matchSearch = !search ||
      c.visitorId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.visitorId?.email?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ backgroundColor: '#f3f4f6' }}>

      {/* ═══ TOP NAV ══════════════════════════════════════════════════════════ */}
      <header
        className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0 shadow-lg"
        style={{ backgroundColor: NAV_BG }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => navigate('/')}
            title="Back to Dashboard"
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg
              transition-colors flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <button
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            onClick={() => setSidebarOpen(o => !o)}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${sidebarOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-200 ${sidebarOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${sidebarOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>

          <div className="min-w-0">
            <h1 className="font-bold text-base sm:text-lg leading-tight truncate text-white">Asliya Recruitment</h1>
            <p className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.6)' }}>Live Chat Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
            <p className="text-xs capitalize" style={{ color: 'rgba(255,255,255,0.6)' }}>{user.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {(user.name || '?')[0].toUpperCase()}
          </div>
          <button
            onClick={logout}
            className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
          >
            Logout
          </button>
        </div>
      </header>

      <StatsBar stats={stats} />

      <div className="flex flex-1 overflow-hidden relative">
        <div
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
          className={`absolute inset-0 z-20 sm:hidden bg-black/50 transition-opacity duration-300
            ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />

        <aside className={`
          w-[88%] max-w-sm sm:w-80 lg:w-96 bg-white border-r border-gray-200
          flex flex-col flex-shrink-0
          absolute sm:relative inset-y-0 left-0 sm:inset-auto z-30 sm:z-auto
          transform transition-transform duration-300 ease-in-out will-change-transform
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          sm:translate-x-0 sm:shadow-none
        `}>
          <ConversationList
            conversations={filtered}
            selected={selectedConv}
            onSelect={selectConversation}
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
          {selectedConv ? (
            <ChatPanel
              conversation={selectedConv}
              messages={messages}
              recruiter={user}
              onSend={sendRecruiterMessage}
              onTakeover={takeover}
              onClose={closeConversation}
              onBack={() => setSidebarOpen(true)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 bg-white">
              <div>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#eff6ff' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#154895' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-gray-700 font-semibold">Select a conversation</h3>
                <p className="text-gray-400 text-sm mt-1">Choose a chat from the left to get started</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Chat