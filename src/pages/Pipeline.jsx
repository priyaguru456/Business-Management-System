import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { leads, LEAD_STAGES } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline'

const stageColors = {
  New: 'border-t-blue-500 bg-blue-50/30',
  Contacted: 'border-t-indigo-500 bg-indigo-50/30',
  Qualified: 'border-t-purple-500 bg-purple-50/30',
  Proposal: 'border-t-orange-500 bg-orange-50/30',
  Negotiation: 'border-t-amber-500 bg-amber-50/30',
  Won: 'border-t-green-500 bg-green-50/30',
  Lost: 'border-t-red-500 bg-red-50/30',
}

const headerColors = {
  New: 'text-blue-700',
  Contacted: 'text-indigo-700',
  Qualified: 'text-purple-700',
  Proposal: 'text-orange-700',
  Negotiation: 'text-amber-700',
  Won: 'text-green-700',
  Lost: 'text-red-700',
}

export default function Pipeline() {
  const { getBasePath } = useAuth()
  const navigate = useNavigate()
  const basePath = getBasePath()
  const [pipelineLeads, setPipelineLeads] = useState(leads)
  const [draggedLead, setDraggedLead] = useState(null)

  const handleDragStart = (lead) => {
    setDraggedLead(lead)
  }

  const handleDrop = (stage) => {
    if (draggedLead) {
      setPipelineLeads((prev) =>
        prev.map((l) => (l.id === draggedLead.id ? { ...l, stage } : l))
      )
      setDraggedLead(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
        <p className="text-sm text-gray-500 mt-0.5">Drag and drop leads between stages</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {LEAD_STAGES.map((stage) => {
          const stageLeads = pipelineLeads.filter((l) => l.stage === stage)
          return (
            <div
              key={stage}
              className={`min-w-[240px] w-[240px] rounded-xl border border-gray-200 border-t-4 ${stageColors[stage]} flex flex-col max-h-[calc(100vh-200px)]`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              <div className="px-3 py-2.5 border-b border-gray-200/60">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${headerColors[stage]}`}>{stage}</h3>
                  <span className="bg-white text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full border border-gray-200">
                    {stageLeads.length}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    onClick={() => navigate(`${basePath}/leads/${lead.id}`)}
                    className="bg-white rounded-lg border border-gray-200 p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {lead.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-red-600 transition">
                          {lead.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">{lead.phone}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 truncate mb-1.5">{lead.property}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[10px] text-red-600 font-semibold">
                        <CurrencyRupeeIcon className="w-3 h-3" />
                        {lead.budget}
                      </div>
                      <StatusBadge status={lead.priority} size="xs" />
                    </div>

                    {lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-[9px] px-1.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-6 text-xs text-gray-400">
                    Drop leads here
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
