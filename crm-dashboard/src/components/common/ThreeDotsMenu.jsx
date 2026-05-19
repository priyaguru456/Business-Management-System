import { useState, useRef, useEffect } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

export default function ThreeDotsMenu({ actions = [] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-gray-700"
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={(e) => {
                e.stopPropagation()
                action.onClick()
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition flex items-center gap-2 ${
                action.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
              }`}
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
