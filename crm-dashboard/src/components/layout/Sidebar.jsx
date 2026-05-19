import { NavLink } from 'react-router-dom'
import { useAuth, ROLES } from '../../context/AuthContext'
import {
  HomeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const getNavItems = (role, basePath) => {
  const propertyLabel = role === ROLES.MANAGER ? 'Listings' : 'Properties'

  return [
    { label: 'Dashboard', icon: HomeIcon, path: `${basePath}/dashboard` },
    { label: propertyLabel, icon: BuildingOffice2Icon, path: `${basePath}/properties` },
    { label: 'Leads', icon: UserGroupIcon, path: `${basePath}/leads` },
    { label: 'Pipeline', icon: FunnelIcon, path: `${basePath}/pipeline` },
    { label: 'Deals', icon: CurrencyDollarIcon, path: `${basePath}/deals` },
    { label: 'Appointments', icon: CalendarDaysIcon, path: `${basePath}/appointments` },
    { label: 'Messages', icon: ChatBubbleLeftRightIcon, path: `${basePath}/messages` },
    { label: 'Settings', icon: Cog6ToothIcon, path: `${basePath}/settings` },
  ]
}

export default function Sidebar() {
  const { user, getBasePath, ROLE_LABELS } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const basePath = getBasePath()
  const navItems = getNavItems(user.role, basePath)

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-60'
      } bg-gradient-to-b from-red-700 to-red-900 text-white flex flex-col h-screen sticky top-0 transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-red-600/40">
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-lg font-bold truncate">RealEstate CRM</h1>
            <p className="text-[11px] text-red-200 truncate">{ROLE_LABELS[user.role]}</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-red-600/50 transition-colors shrink-0"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-medium shadow-sm'
                  : 'text-red-100 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-3 border-t border-red-600/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-red-200 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
