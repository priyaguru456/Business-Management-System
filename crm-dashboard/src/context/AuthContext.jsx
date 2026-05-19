import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ORGANIZATION: 'organization',
  MANAGER: 'manager',
  SALES_EXECUTIVE: 'sales-executive',
  TELECALLER: 'telecaller',
}

const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ORGANIZATION]: 'Organization',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.SALES_EXECUTIVE]: 'Sales Executive',
  [ROLES.TELECALLER]: 'Telecaller',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@realestate.com',
    role: ROLES.SUPER_ADMIN,
    avatar: null,
  })

  const switchRole = (role) => {
    setUser((prev) => ({ ...prev, role }))
  }

  const getBasePath = () => `/${user.role}`

  return (
    <AuthContext.Provider value={{ user, setUser, switchRole, getBasePath, ROLES, ROLE_LABELS }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

export { ROLES, ROLE_LABELS }
