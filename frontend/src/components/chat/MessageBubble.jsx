// import React from 'react'

// /**
//  * MessageBubble — renders a single message.
//  * senderType: 'visitor' | 'ai' | 'recruiter' | 'system'
//  */
// const MessageBubble = ({ message }) => {
//   const { senderType, senderName, message: text, createdAt } = message

//   const time = createdAt
//     ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     : ''

//   // System notification (recruiter joined / chat closed)
//   if (senderType === 'system') {
//     return (
//       <div className="flex justify-center my-2 animate-fade-in">
//         <span className="bg-gray-100 text-gray-500 text-xs px-4 py-1.5 rounded-full border border-gray-200">
//           {text}
//         </span>
//       </div>
//     )
//   }

//   const isVisitor = senderType === 'visitor'

//   return (
//     <div className={`flex items-end gap-2 mb-3 animate-fade-in ${isVisitor ? 'flex-row-reverse' : 'flex-row'}`}>

//       {/* Avatar */}
//       {!isVisitor && (
//         <div className={`
//           w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold
//           ${senderType === 'ai' ? 'bg-brand-secondary' : 'bg-green-500'}
//         `}>
//           {senderType === 'ai' ? 'AI' : (senderName?.[0] || 'R').toUpperCase()}
//         </div>
//       )}

//       {/* Bubble */}
//       <div className={`max-w-[75%] group`}>
//         {/* Sender label */}
//         {!isVisitor && (
//           <p className="text-xs text-gray-400 mb-1 ml-1">
//             {senderType === 'ai' ? 'Asliya AI' : (senderName || 'Recruiter')}
//           </p>
//         )}

//         <div className={`
//           px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
//           ${isVisitor
//             ? 'bg-brand-primary text-white rounded-br-md'
//             : senderType === 'ai'
//               ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
//               : 'bg-green-50 text-gray-800 border border-green-100 rounded-bl-md'
//           }
//         `}>
//           <p className="whitespace-pre-wrap break-words">{text}</p>
//         </div>

//         {/* Timestamp */}
//         <p className={`text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity
//           ${isVisitor ? 'text-right mr-1' : 'ml-1'}`}>
//           {time}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default MessageBubble


import React from 'react'

/**
 * MessageBubble — renders a single chat message.
 * senderType: 'visitor' | 'ai' | 'recruiter' | 'system'
 * No brand-* Tailwind tokens — all colours are hardcoded hex.
 */
const MessageBubble = ({ message }) => {
  const { senderType, senderName, message: text, createdAt } = message

  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  // ── System pill ─────────────────────────────────────────────────────────────
  if (senderType === 'system') {
    return (
      <div className="flex justify-center my-2 animate-fade-in">
        <span className="bg-gray-100 text-gray-500 text-xs px-4 py-1.5 rounded-full border border-gray-200">
          {text}
        </span>
      </div>
    )
  }

  const isVisitor   = senderType === 'visitor'
  const isAI        = senderType === 'ai'
  const isRecruiter = senderType === 'recruiter'

  // Visitor messages align right (sent), others align left (received)
  return (
    <div className={`flex items-end gap-2 mb-3 animate-fade-in ${isVisitor ? 'flex-row-reverse' : 'flex-row'}`}>

      {/* Avatar — only for AI / recruiter */}
      {!isVisitor && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: isAI ? '#154895' : '#16a34a' }}
        >
          {isAI ? 'AI' : (senderName?.[0] || 'R').toUpperCase()}
        </div>
      )}

      <div className="max-w-[75%] group">
        {/* Sender label */}
        {!isVisitor && (
          <p className="text-xs text-gray-400 mb-1 ml-1">
            {isAI ? 'Asliya AI' : (senderName || 'Recruiter')}
          </p>
        )}

        {/* Bubble */}
        <div
          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm"
          style={
            isVisitor
              ? { backgroundColor: '#154895', color: '#ffffff', borderRadius: '1rem 1rem 0.25rem 1rem' }
              : isAI
                ? { backgroundColor: '#ffffff', color: '#1f2937', border: '1px solid #e5e7eb', borderRadius: '1rem 1rem 1rem 0.25rem' }
                : { backgroundColor: '#f0fdf4', color: '#1f2937', border: '1px solid #bbf7d0', borderRadius: '1rem 1rem 1rem 0.25rem' }
          }
        >
          <p className="whitespace-pre-wrap break-words">{text}</p>
        </div>

        {/* Timestamp — visible on hover */}
        <p className={`text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity
          ${isVisitor ? 'text-right mr-1' : 'ml-1'}`}>
          {time}
        </p>
      </div>
    </div>
  )
}

export default MessageBubble