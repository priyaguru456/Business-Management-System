import { useState } from 'react'
import { messages } from '../data/mockData'
import {
  StarIcon,
  PaperAirplaneIcon,
  InboxIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

export default function Messages() {
  const [selected, setSelected] = useState(messages[0])
  const [reply, setReply] = useState('')
  const [messageList, setMessageList] = useState(messages)

  const toggleStar = (id) => {
    setMessageList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    )
  }

  const handleSendReply = () => {
    if (!reply.trim()) return
    setReply('')
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500 mt-0.5">{messageList.filter((m) => !m.read).length} unread</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex h-[calc(100vh-220px)]">
        <div className="w-80 border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messageList.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`px-3 py-3 border-b border-gray-50 cursor-pointer transition ${
                  selected?.id === msg.id
                    ? 'bg-red-50 border-l-2 border-l-red-600'
                    : 'hover:bg-gray-50'
                } ${!msg.read ? 'bg-blue-50/40' : ''}`}
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {msg.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {msg.from}
                      </p>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStar(msg.id)
                          }}
                          className="p-0.5"
                        >
                          {msg.starred ? (
                            <StarSolid className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <StarIcon className="w-3.5 h-3.5 text-gray-300 hover:text-amber-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className={`text-[11px] truncate mt-0.5 ${!msg.read ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                      {msg.subject}
                    </p>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[10px] text-gray-400 truncate">{msg.preview.substring(0, 40)}...</p>
                      <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selected ? (
            <>
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-900">{selected.subject}</h2>
                  <button
                    onClick={() => toggleStar(selected.id)}
                    className="p-1 hover:bg-gray-100 rounded transition"
                  >
                    {selected.starred ? (
                      <StarSolid className="w-5 h-5 text-amber-400" />
                    ) : (
                      <StarIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[9px] font-bold">
                    {selected.avatar}
                  </div>
                  <span className="text-xs text-gray-600">{selected.from}</span>
                  <span className="text-xs text-gray-400">{selected.time}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {selected.body}
                  </p>
                </div>

                {selected.replies.map((r, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg p-4 ${
                      r.from === 'You' ? 'bg-red-50 ml-8' : 'bg-gray-50 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">{r.from}</span>
                      <span className="text-[10px] text-gray-400">{r.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{r.body}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    rows="2"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 resize-none"
                  />
                  <button
                    onClick={handleSendReply}
                    className="self-end bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-1.5 text-sm font-medium"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <InboxIcon className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
