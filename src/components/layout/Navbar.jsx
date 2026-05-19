import { useAuth, ROLES } from '../../context/AuthContext'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { user, switchRole, ROLE_LABELS } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative max-w-md flex-1">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties, leads, deals..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={user.role}
          onChange={(e) => switchRole(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
        >
          {Object.entries(ROLES).map(([key, value]) => (
            <option key={value} value={value}>
              {ROLE_LABELS[value]}
            </option>
          ))}
        </select>

        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          {user.name.split(' ').map((n) => n[0]).join('')}
        </div>
      </div>
    </header>
  )
}
