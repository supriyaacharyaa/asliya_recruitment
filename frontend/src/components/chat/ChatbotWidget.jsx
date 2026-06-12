import React from 'react'
import { useChat } from '../../context/ChatContext.jsx'
import ChatWindow from './ChatWindow.jsx'

/**
 * ChatbotWidget — globally mounted floating button + chat window.
 * Fixed bottom-right, visible on all pages.
 */
const ChatbotWidget = () => {
  const { isOpen, toggleChat, messages } = useChat()

  // Unread badge: messages from ai/recruiter while chat is closed
  const unread = !isOpen
    ? messages.filter(
        m => m.senderType === 'ai' || m.senderType === 'recruiter'
      ).length
    : 0

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-5 right-5 z-50 flex items-end">
        <button
          onClick={toggleChat}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className={`
            relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
            transition-all duration-300 hover:scale-110 active:scale-95
            ${isOpen ? 'bg-brand-dark' : 'bg-brand-primary'}
          `}
        >
          {isOpen ? (
            // X icon
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Chat icon
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}

          {/* Unread badge */}
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && <ChatWindow />}
    </>
  )
}

export default ChatbotWidget