import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { leads, LEAD_STAGES } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import StageStepper from '../components/common/StageStepper'
import ThreeDotsMenu from '../components/common/ThreeDotsMenu'
import {
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'

export default function Leads() {
  const { getBasePath } = useAuth()
  const navigate = useNavigate()
  const basePath = getBasePath()
  const [stageFilter, setStageFilter] = useState('All')

  const filtered = stageFilter === 'All' ? leads : leads.filter((l) => l.stage === stageFilter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} leads found</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm">
          <PlusIcon className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <FunnelIcon className="w-4 h-4 text-gray-400" />
        {['All', ...LEAD_STAGES].map((stage) => (
          <button
            key={stage}
            onClick={() => setStageFilter(stage)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              stageFilter === stage
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Lead</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Property</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Stage</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Priority</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Source</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Assigned</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate(`${basePath}/leads/${lead.id}`)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {lead.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                        <p className="text-xs text-gray-500 truncate">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700 truncate max-w-[150px]">{lead.property}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-40" onClick={(e) => e.stopPropagation()}>
                      <StageStepper currentStage={lead.stage} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.priority} size="xs" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">{lead.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">{lead.assignedTo}</span>
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <ThreeDotsMenu
                      actions={[
                        { label: 'View Details', icon: EyeIcon, onClick: () => navigate(`${basePath}/leads/${lead.id}`) },
                        { label: 'Edit', icon: PencilIcon, onClick: () => {} },
                        { label: 'Call', icon: PhoneIcon, onClick: () => {} },
                        { label: 'Email', icon: EnvelopeIcon, onClick: () => {} },
                        { label: 'Schedule', icon: CalendarDaysIcon, onClick: () => {} },
                        { label: 'Delete', icon: TrashIcon, onClick: () => {}, danger: true },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
