import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { leads } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import StageStepper from '../components/common/StageStepper'
import {
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'

export default function LeadDetails() {
  const { id } = useParams()
  const { getBasePath } = useAuth()
  const basePath = getBasePath()
  const lead = leads.find((l) => l.id === Number(id))

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Lead not found.</p>
        <Link to={`${basePath}/leads`} className="text-red-600 text-sm mt-2 inline-block">
          Back to Leads
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Link
        to={`${basePath}/leads`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Leads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-lg font-bold">
                  {lead.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{lead.name}</h1>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={lead.priority} />
                <StatusBadge status={lead.stage} />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1.5 font-medium">Lead Stage</p>
              <StageStepper currentStage={lead.stage} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition">
                <PhoneIcon className="w-3.5 h-3.5" />
                Call
              </button>
              <button className="inline-flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                <EnvelopeIcon className="w-3.5 h-3.5" />
                Email
              </button>
              <button className="inline-flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                <CalendarDaysIcon className="w-3.5 h-3.5" />
                Schedule
              </button>
              <button className="inline-flex items-center gap-1.5 bg-white text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                Message
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Activity & Notes</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1">
                  <p className="text-sm text-gray-700">Called and discussed property requirements. Interested in {lead.property}.</p>
                  <p className="text-xs text-gray-400 mt-1">{lead.lastContact}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex-1">
                  <p className="text-sm text-gray-700">Sent property brochure and pricing details via email.</p>
                  <p className="text-xs text-gray-400 mt-1">{lead.createdAt}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <textarea
                placeholder="Add a note..."
                rows="2"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 resize-none"
              />
              <button className="mt-2 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition">
                Add Note
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Lead Information</h2>
            {[
              { icon: PhoneIcon, label: 'Phone', value: lead.phone },
              { icon: EnvelopeIcon, label: 'Email', value: lead.email },
              { icon: CurrencyRupeeIcon, label: 'Budget', value: lead.budget },
              { icon: BuildingOffice2Icon, label: 'Property', value: lead.property },
              { icon: UserIcon, label: 'Assigned To', value: lead.assignedTo },
              { icon: TagIcon, label: 'Source', value: lead.source },
              { icon: ClockIcon, label: 'Created', value: lead.createdAt },
              { icon: ClockIcon, label: 'Last Contact', value: lead.lastContact },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <item.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-gray-800 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {lead.tags.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Tags</h2>
              <div className="flex flex-wrap gap-1.5">
                {lead.tags.map((tag) => (
                  <span key={tag} className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Notes</h2>
            <p className="text-sm text-gray-600">{lead.notes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
