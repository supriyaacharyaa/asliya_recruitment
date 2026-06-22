import React, { useState, useRef, useEffect } from 'react'

const ChatPanel = ({
  conversation, messages, recruiter,
  onSend, onTakeover, onClose, onBack
}) => {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const isHuman  = conversation.status === 'HUMAN'
  const isClosed = conversation.status === 'CLOSED'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e?.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Panel header ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4 py-3
        flex items-center gap-3 flex-shrink-0 shadow-sm">

        {/* ← Back (mobile) */}
        <button
          onClick={onBack}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg
            text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors mr-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex items-center justify-center
          text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: '#154895' }}>
          {(conversation.visitorId?.name?.[0] || '?').toUpperCase()}
        </div>

        {/* Visitor name / email */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">
            {conversation.visitorId?.name || 'Visitor'}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {conversation.visitorId?.email}
          </p>
        </div>

        {/* Status badge + action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
            conversation.status === 'AI'     ? 'bg-blue-100 text-blue-700' :
            conversation.status === 'HUMAN'  ? 'bg-green-100 text-green-700' :
                                               'bg-gray-100 text-gray-600'
          }`}>
            {conversation.status}
          </span>

          {!isClosed && !isHuman && (
            <button
              onClick={() => onTakeover(conversation._id)}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold
                text-white transition-colors"
              style={{ backgroundColor: '#d97706' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b45309'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d97706'}
            >
              Take Over
            </button>
          )}

          {!isClosed && (
            <button
              onClick={() => onClose(conversation._id)}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold
                bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* ── Info strip ──────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2
        flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 flex-shrink-0">
        <span>📧 {conversation.visitorId?.email || '—'}</span>
        <span>🕐 Started {conversation.createdAt
          ? new Date(conversation.createdAt).toLocaleDateString()
          : '—'}
        </span>
        {conversation.assignedRecruiter && (
          <span>👤 Assigned to recruiter</span>
        )}
      </div>

      {/* ── Messages ────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No messages yet</p>
        )}

        {messages.map((msg) => {
          /* System message — centred pill */
          if (msg.senderType === 'system') {
            return (
              <div key={msg._id} className="flex justify-center my-2">
                <span className="bg-white text-gray-500 text-xs px-4 py-1.5
                  rounded-full border border-gray-200 shadow-sm">
                  {msg.message}
                </span>
              </div>
            )
          }

          const isVisitor = msg.senderType === 'visitor'
          const isAI      = msg.senderType === 'ai'

          /* Bubble colours — no brand-* tokens */
          const bubbleStyle = isVisitor
            ? { background: '#ffffff', color: '#1f2937', border: '1px solid #e5e7eb' }
            : isAI
              ? { background: '#eff6ff', color: '#1e3a5f', border: '1px solid #bfdbfe' }
              : { background: '#f0fdf4', color: '#1f2937', border: '1px solid #bbf7d0' }

          const senderLabel = isVisitor
            ? (conversation.visitorId?.name || 'Visitor')
            : isAI
              ? '🤖 Asliya AI'
              : `👤 ${msg.senderName || 'Recruiter'}`

          return (
            <div key={msg._id}
              className={`flex items-end gap-2 ${isVisitor ? 'flex-row' : 'flex-row-reverse'}`}>

              {/* Mini avatar dot */}
              <div className="w-6 h-6 rounded-full flex items-center justify-center
                text-white text-[10px] font-bold flex-shrink-0 mb-1"
                style={{
                  backgroundColor: isVisitor ? '#6b7280' : isAI ? '#154895' : '#16a34a'
                }}>
                {isVisitor
                  ? (conversation.visitorId?.name?.[0] || 'V').toUpperCase()
                  : isAI ? 'AI' : (recruiter?.name?.[0] || 'R').toUpperCase()}
              </div>

              <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                ${isVisitor ? 'rounded-bl-sm' : 'rounded-br-sm'}`}
                style={bubbleStyle}>
                <p className="text-[11px] font-semibold mb-0.5"
                  style={{ color: isVisitor ? '#6b7280' : isAI ? '#1d4ed8' : '#15803d' }}>
                  {senderLabel}
                </p>
                <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : ''}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 px-4 py-3 bg-white flex-shrink-0">
        {isClosed ? (
          <p className="text-center text-gray-400 text-sm py-2">
            This conversation is closed
          </p>

        ) : !isHuman ? (
          <div className="flex flex-col items-center gap-2 py-1">
            <p className="text-gray-500 text-xs">AI is handling this conversation</p>
            <button
              onClick={() => onTakeover(conversation._id)}
              className="text-sm px-5 py-2 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: '#d97706' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b45309'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d97706'}
            >
              Take Over as Recruiter
            </button>
          </div>

        ) : (
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your reply…"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm
                text-gray-900 placeholder-gray-400 bg-white
                focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#154895' }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                disabled:opacity-40 transition-colors"
              style={{ backgroundColor: '#154895' }}
              onMouseEnter={e => { if (input.trim()) e.currentTarget.style.backgroundColor = '#0f3570' }}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#154895'}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ChatPanel