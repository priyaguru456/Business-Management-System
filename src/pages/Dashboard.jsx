import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardStats, leads, appointments } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

const statCards = [
  { label: 'Total Properties', value: dashboardStats.totalProperties, icon: BuildingOffice2Icon, color: 'bg-red-50 text-red-600', link: 'properties' },
  { label: 'Active Leads', value: dashboardStats.activeLeads, icon: UserGroupIcon, color: 'bg-blue-50 text-blue-600', link: 'leads' },
  { label: 'Total Deals', value: dashboardStats.totalDeals, icon: CurrencyDollarIcon, color: 'bg-green-50 text-green-600', link: 'deals' },
  { label: 'Revenue', value: formatCurrency(dashboardStats.revenue), icon: ArrowTrendingUpIcon, color: 'bg-purple-50 text-purple-600', link: 'deals' },
  { label: 'Conversion Rate', value: `${dashboardStats.conversionRate}%`, icon: ChartBarIcon, color: 'bg-amber-50 text-amber-600', link: 'pipeline' },
  { label: "Today's Appointments", value: dashboardStats.appointmentsToday, icon: CalendarDaysIcon, color: 'bg-indigo-50 text-indigo-600', link: 'appointments' },
]

export default function Dashboard() {
  const { getBasePath } = useAuth()
  const basePath = getBasePath()
  const recentLeads = leads.slice(0, 5)
  const upcomingAppointments = appointments.filter((a) => a.status !== 'Completed').slice(0, 4)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here is your CRM overview.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={`${basePath}/${card.link}`}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition group"
          >
            <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Leads</h2>
            <Link to={`${basePath}/leads`} className="text-xs text-red-600 hover:text-red-700 font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                to={`${basePath}/leads/${lead.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {lead.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.property}</p>
                  </div>
                </div>
                <StatusBadge status={lead.stage} size="xs" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link to={`${basePath}/appointments`} className="text-xs text-red-600 hover:text-red-700 font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingAppointments.map((apt) => (
              <Link
                key={apt.id}
                to={`${basePath}/appointments/${apt.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{apt.title}</p>
                  <p className="text-xs text-gray-500">
                    {apt.date} at {apt.time}
                  </p>
                </div>
                <StatusBadge status={apt.status} size="xs" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
