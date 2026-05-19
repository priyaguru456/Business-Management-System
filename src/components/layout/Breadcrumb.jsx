import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useAuth, ROLES } from '../../context/AuthContext'

const LABEL_MAP = {
  dashboard: 'Dashboard',
  properties: (role) => (role === ROLES.MANAGER ? 'Listings' : 'Properties'),
  leads: 'Leads',
  pipeline: 'Pipeline',
  deals: 'Deals',
  appointments: 'Appointments',
  messages: 'Messages',
  settings: 'Settings',
  details: (role) => (role === ROLES.MANAGER ? 'Listing Details' : 'Property Details'),
  edit: 'Edit',
  add: 'Add Property',
}

export default function Breadcrumb() {
  const location = useLocation()
  const { user, getBasePath } = useAuth()
  const basePath = getBasePath()
  const pathParts = location.pathname.replace(basePath + '/', '').split('/').filter(Boolean)

  if (pathParts.length <= 1) return null

  const crumbs = []
  let currentPath = basePath

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i]
    currentPath += `/${part}`

    if (/^\d+$/.test(part)) {
      const prevPart = pathParts[i - 1]
      if (prevPart === 'properties') {
        crumbs.push({
          label: user.role === ROLES.MANAGER ? 'Listing Details' : 'Property Details',
          path: currentPath,
        })
      } else if (prevPart === 'leads') {
        crumbs.push({ label: 'Lead Details', path: currentPath })
      }
      continue
    }

    const labelOrFn = LABEL_MAP[part]
    const label = typeof labelOrFn === 'function' ? labelOrFn(user.role) : labelOrFn || part
    crumbs.push({ label, path: currentPath })
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
      <Link to={`${basePath}/dashboard`} className="hover:text-red-600 transition">
        <HomeIcon className="w-4 h-4" />
      </Link>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.path} className="flex items-center gap-1.5">
          <ChevronRightIcon className="w-3 h-3 text-gray-400" />
          {idx === crumbs.length - 1 ? (
            <span className="text-gray-800 font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-red-600 transition">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
