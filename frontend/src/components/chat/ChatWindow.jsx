import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useChat } from '../../context/ChatContext.jsx'
import VisitorForm from './VisitorForm.jsx'
import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

/**
 * ChatWindow — the main chat UI.
 * Mobile: fixed full-screen overlay.
 * Desktop: floating bottom-right panel.
 */
const ChatWindow = () => {
  const {
    step, closeChat,
    visitor, conversation,
    messages, isAiTyping, recruiterTyping, recruiterName,
    sendMessage,
  } = useChat()

  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAiTyping, recruiterTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (step === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [step])

  const handleSend = useCallback(async (e) => {
    e?.preventDefault()
    if (!input.trim() || sending) return

    setSending(true)
    try {
      await sendMessage(input)
      setInput('')
    } finally {
      setSending(false)
    }
  }, [input, sending, sendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isClosed = conversation?.status === 'CLOSED'
  const typingLabel = recruiterTyping
    ? `${recruiterName || 'Recruiter'} is typing`
    : 'Asliya AI is typing'

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <div
        className="fixed inset-0 bg-black/40 z-[9998] sm:hidden"
        onClick={closeChat}
      />

      {/* ── Chat panel ── */}
      <div className={`
        fixed z-[9998] flex flex-col bg-white shadow-2xl overflow-hidden animate-slide-up
        /* Mobile: full screen */
        inset-x-2 bottom-2 top-2 rounded-2xl
        /* sm+: floating widget */
        sm:inset-auto sm:bottom-24 sm:right-5
        sm:w-[380px] sm:h-[580px] sm:rounded-2xl
        /* md+: slightly larger */
        md:w-[400px] md:h-[600px]
      `}>

        {/* ═══ HEADER ═══════════════════════════════════════ */}
        <div className="bg-brand-primary px-4 py-3 flex items-center gap-3 flex-shrink-0">
          {/* Logo / Avatar */}
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Name + status */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">Asliya Recruitment</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-xs">
                {conversation?.status === 'HUMAN' ? recruiterName || 'Recruiter online' : 'AI Assistant online'}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={closeChat}
            aria-label="Close chat"
            className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ═══ BODY ═══════════════════════════════════════════ */}
        {step === 'form' ? (
          <VisitorForm />
        ) : (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 bg-gray-50 space-y-1">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">👋</div>
                  <p className="text-gray-600 text-sm font-medium">
                    Hi {visitor?.name}! How can we help you today?
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Ask us anything about jobs, visas, or recruitment.
                  </p>
                </div>
              )}

              {/* Message list */}
              {messages.map((msg) => (
                <MessageBubble key={msg._id} message={msg} />
              ))}

              {/* Typing indicators */}
              {(isAiTyping || recruiterTyping) && (
                <TypingIndicator label={typingLabel} />
              )}

              <div ref={bottomRef} />
            </div>

            {/* ═══ FOOTER ══════════════════════════════════════ */}
            <div className="border-t border-gray-100 px-3 py-3 bg-white flex-shrink-0">
              {isClosed ? (
                <p className="text-center text-xs text-gray-400 py-2">
                  This conversation is closed.
                </p>
              ) : (
                <form onSubmit={handleSend} className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent
                      placeholder-gray-400 max-h-24 transition"
                    style={{ height: 'auto' }}
                    onInput={e => {
                      e.target.style.height = 'auto'
                      e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || sending}
                    className="w-10 h-10 bg-brand-primary hover:bg-brand-dark disabled:opacity-40
                      text-white rounded-xl flex items-center justify-center flex-shrink-0
                      transition-colors duration-200 active:scale-95"
                    aria-label="Send message"
                  >
                    {sending ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>
              )}

              {/* Branding */}
              <p className="text-center text-gray-300 text-xs mt-2">
                Powered by Asliya Recruitment AI
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ChatWindow