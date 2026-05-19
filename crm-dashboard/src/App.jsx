import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import PropertyEdit from './pages/PropertyEdit'
import Leads from './pages/Leads'
import LeadDetails from './pages/LeadDetails'
import Pipeline from './pages/Pipeline'
import Deals from './pages/Deals'
import Appointments from './pages/Appointments'
import AppointmentDetails from './pages/AppointmentDetails'
import Messages from './pages/Messages'
import Settings from './pages/Settings'

const roleRoutes = (
  <>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="properties" element={<Properties />} />
    <Route path="properties/add" element={<PropertyEdit />} />
    <Route path="properties/:id" element={<PropertyDetails />} />
    <Route path="properties/:id/edit" element={<PropertyEdit />} />
    <Route path="leads" element={<Leads />} />
    <Route path="leads/:id" element={<LeadDetails />} />
    <Route path="pipeline" element={<Pipeline />} />
    <Route path="deals" element={<Deals />} />
    <Route path="appointments" element={<Appointments />} />
    <Route path="appointments/:id" element={<AppointmentDetails />} />
    <Route path="messages" element={<Messages />} />
    <Route path="settings" element={<Settings />} />
  </>
)

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />

        <Route path="/super-admin" element={<DashboardLayout />}>
          {roleRoutes}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/organization" element={<DashboardLayout />}>
          {roleRoutes}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/manager" element={<DashboardLayout />}>
          {roleRoutes}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/sales-executive" element={<DashboardLayout />}>
          {roleRoutes}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/telecaller" element={<DashboardLayout />}>
          {roleRoutes}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
