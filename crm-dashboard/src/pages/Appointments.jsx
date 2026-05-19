import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { appointments } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import {
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  VideoCameraIcon,
  PhoneIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

const typeIcons = {
  'Site Visit': BuildingOffice2Icon,
  'Virtual Tour': VideoCameraIcon,
  Meeting: UserIcon,
  Call: PhoneIcon,
}

export default function Appointments() {
  const { getBasePath } = useAuth()
  const navigate = useNavigate()
  const basePath = getBasePath()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-0.5">{appointments.length} appointments</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm">
          <PlusIcon className="w-4 h-4" />
          Schedule Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {appointments.map((apt) => {
            const TypeIcon = typeIcons[apt.type] || CalendarDaysIcon
            return (
              <div
                key={apt.id}
                onClick={() => navigate(`${basePath}/appointments/${apt.id}`)}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <TypeIcon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition">
                      {apt.title}
                    </p>
                    <StatusBadge status={apt.status} size="xs" />
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      {apt.lead}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDaysIcon className="w-3 h-3" />
                      {apt.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {apt.time} ({apt.duration})
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 shrink-0">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[150px]">{apt.location}</span>
                </div>

                <div className="text-xs text-gray-500 shrink-0">{apt.agent}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
