import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { appointments } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

export default function AppointmentDetails() {
  const { id } = useParams()
  const { getBasePath } = useAuth()
  const basePath = getBasePath()
  const apt = appointments.find((a) => a.id === Number(id))

  if (!apt) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Appointment not found.</p>
        <Link to={`${basePath}/appointments`} className="text-red-600 text-sm mt-2 inline-block">
          Back to Appointments
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <Link
        to={`${basePath}/appointments`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Appointments
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{apt.title}</h1>
            <StatusBadge status={apt.status} />
          </div>
          <span className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full font-medium">
            {apt.type}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: CalendarDaysIcon, label: 'Date', value: apt.date },
            { icon: ClockIcon, label: 'Time', value: `${apt.time} (${apt.duration})` },
            { icon: UserIcon, label: 'Lead', value: apt.lead },
            { icon: UserIcon, label: 'Agent', value: apt.agent },
            { icon: MapPinIcon, label: 'Location', value: apt.location },
            { icon: DocumentTextIcon, label: 'Property', value: apt.property },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2.5 bg-gray-50 rounded-lg p-3">
              <item.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Notes</h3>
          <p className="text-sm text-gray-600">{apt.notes}</p>
        </div>
      </div>
    </div>
  )
}
