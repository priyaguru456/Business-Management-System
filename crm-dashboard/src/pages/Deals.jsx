import { useAuth } from '../context/AuthContext'
import { deals, DEAL_STAGES } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import ThreeDotsMenu from '../components/common/ThreeDotsMenu'
import { useState } from 'react'
import {
  PlusIcon,
  CurrencyRupeeIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

export default function Deals() {
  const { getBasePath } = useAuth()
  const basePath = getBasePath()
  const [stageFilter, setStageFilter] = useState('All')
  const filtered = stageFilter === 'All' ? deals : deals.filter((d) => d.stage === stageFilter)

  const totalValue = filtered.reduce((sum, d) => sum + d.value, 0)
  const wonDeals = filtered.filter((d) => d.stage === 'Won')
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} deals found</p>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm">
          <PlusIcon className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <CurrencyRupeeIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Pipeline Value</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Won Value</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(wonValue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FunnelIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Win Rate</p>
              <p className="text-lg font-bold text-gray-900">
                {deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <FunnelIcon className="w-4 h-4 text-gray-400" />
        {['All', ...DEAL_STAGES].map((stage) => (
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
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Deal</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Lead</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Property</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Value</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Stage</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Prob.</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Expected Close</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{deal.title}</p>
                    <p className="text-xs text-gray-500">{deal.assignedTo}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700">{deal.lead}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700 truncate block max-w-[150px]">{deal.property}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-red-600">{formatCurrency(deal.value)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={deal.stage} size="xs" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{deal.probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">{deal.expectedClose}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ThreeDotsMenu
                      actions={[
                        { label: 'View', icon: EyeIcon, onClick: () => {} },
                        { label: 'Edit', icon: PencilIcon, onClick: () => {} },
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
