import React from 'react'

/**
 * TypingIndicator — animated "..." dots shown while AI or recruiter is typing.
 */
const TypingIndicator = ({ label = 'Asliya AI is typing' }) => (
  <div className="flex items-end gap-2 mb-3 animate-fade-in">
    {/* Avatar */}
    <div className="w-7 h-7 rounded-full bg-brand-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
      AI
    </div>

    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1 h-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary typing-dot" />
      </div>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  </div>
)

export default TypingIndicator