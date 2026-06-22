// import React from 'react'

// const statusBadge = {
//   AI: 'bg-blue-100 text-blue-700',
//   HUMAN: 'bg-green-100 text-green-700',
//   CLOSED: 'bg-gray-100 text-gray-500',
// }

// const filterTabs = ['ALL', 'AI', 'HUMAN', 'CLOSED']

// const ConversationList = ({
//   conversations, selected, onSelect,
//   filter, setFilter, search, setSearch
// }) => (
//   <div className="flex flex-col h-full">
//     {/* Search */}
//     <div className="px-4 pt-4 pb-2 border-b border-gray-100">
//       <div className="relative">
//         <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//         </svg>
//         <input
//           type="text"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Search visitors..."
//           className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl
//             focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
//         />
//       </div>
//     </div>

//     {/* Filter tabs */}
//     <div className="flex gap-1 px-3 py-2 border-b border-gray-100 bg-blue-900">
//       {filterTabs.map(tab => (
//         <button
//           key={tab}
//           onClick={() => setFilter(tab)}
//           className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors
//             ${filter === tab
//               ? 'bg-brand-primary text-white'
//               : 'text-gray-500 hover:bg-gray-100'
//             }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>

//     {/* List */}
//     <div className="flex-1 overflow-y-auto">
//       {conversations.length === 0 ? (
//         <div className="text-center py-12 text-gray-400 text-sm">No conversations found</div>
//       ) : (
//         conversations.map(conv => (
//           <ConvItem
//             key={conv._id}
//             conv={conv}
//             selected={selected?._id === conv._id}
//             onSelect={onSelect}
//           />
//         ))
//       )}
//     </div>
//   </div>
// )

// const ConvItem = ({ conv, selected, onSelect }) => {
//   const visitor = conv.visitorId
//   const time = conv.updatedAt
//     ? new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     : ''

//   return (
//     <button
//       onClick={() => onSelect(conv)}
//       className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors
//         ${selected ? 'bg-brand-light border-l-4 border-l-brand-secondary' : ''}
//       `}
//     >
//       <div className="flex items-start gap-3">
//         {/* Avatar */}
//         <div className="w-9 h-9 bg-brand-primary rounded-full flex items-center justify-center
//           text-white text-sm font-bold flex-shrink-0 mt-0.5">
//           {(visitor?.name?.[0] || '?').toUpperCase()}
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center justify-between gap-2">
//             <p className="text-sm font-semibold text-gray-800 truncate">
//               {visitor?.name || 'Unknown'}
//             </p>
//             <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
//           </div>
//           <p className="text-xs text-gray-400 truncate">{visitor?.email}</p>
//           {conv.lastMessage && (
//             <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
//           )}
//           <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium
//             ${statusBadge[conv.status] || 'bg-gray-100 text-gray-500'}`}>
//             {conv.status}
//           </span>
//         </div>
//       </div>
//     </button>
//   )
// }

// export default ConversationList

import React from 'react'

const statusBadge = {
  AI:     'bg-blue-100 text-blue-700',
  HUMAN:  'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-500',
}

const filterTabs = ['ALL', 'AI', 'HUMAN', 'CLOSED']

const ConversationList = ({
  conversations, selected, onSelect,
  filter, setFilter, search, setSearch
}) => (
  <div className="flex flex-col h-full bg-white">

    {/* Search */}
    <div className="px-4 pt-4 pb-2 border-b border-gray-100">
      <div className="relative">
        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search visitors..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl
            text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ '--tw-ring-color': '#154895' }}
        />
      </div>
    </div>

    {/* Filter tabs */}
    <div className="flex gap-1 px-3 py-2 border-b border-gray-100 bg-white">
      {filterTabs.map(tab => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className="flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors"
          style={filter === tab
            ? { backgroundColor: '#154895', color: '#ffffff' }
            : { color: '#6b7280', backgroundColor: 'transparent' }}
          onMouseEnter={e => { if (filter !== tab) e.currentTarget.style.backgroundColor = '#f3f4f6' }}
          onMouseLeave={e => { if (filter !== tab) e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">No conversations found</div>
      ) : (
        conversations.map(conv => (
          <ConvItem
            key={conv._id}
            conv={conv}
            selected={selected?._id === conv._id}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  </div>
)

const ConvItem = ({ conv, selected, onSelect }) => {
  const visitor = conv.visitorId
  const time = conv.updatedAt
    ? new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <button
      onClick={() => onSelect(conv)}
      className="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
      style={selected
        ? { backgroundColor: '#eff6ff', borderLeft: '4px solid #154895' }
        : {}}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center
            text-white text-sm font-bold flex-shrink-0 mt-0.5"
          style={{ backgroundColor: '#154895' }}
        >
          {(visitor?.name?.[0] || '?').toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {visitor?.name || 'Unknown'}
            </p>
            <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
          </div>
          <p className="text-xs text-gray-400 truncate">{visitor?.email}</p>
          {conv.lastMessage && (
            <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
          )}
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium
            ${statusBadge[conv.status] || 'bg-gray-100 text-gray-500'}`}>
            {conv.status}
          </span>
        </div>
      </div>
    </button>
  )
}

export default ConversationList