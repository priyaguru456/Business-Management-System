const colorMap = {
  Available: 'bg-green-50 text-green-700 ring-green-600/20',
  Sold: 'bg-gray-100 text-gray-700 ring-gray-600/20',
  'Under Negotiation': 'bg-amber-50 text-amber-700 ring-amber-600/20',
  New: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Contacted: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  Qualified: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  Proposal: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  Negotiation: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Won: 'bg-green-50 text-green-700 ring-green-600/20',
  Lost: 'bg-red-50 text-red-700 ring-red-600/20',
  High: 'bg-red-50 text-red-700 ring-red-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Low: 'bg-green-50 text-green-700 ring-green-600/20',
  Upcoming: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Today: 'bg-red-50 text-red-700 ring-red-600/20',
  Completed: 'bg-green-50 text-green-700 ring-green-600/20',
  'Proposal Sent': 'bg-orange-50 text-orange-700 ring-orange-600/20',
  Qualification: 'bg-blue-50 text-blue-700 ring-blue-600/20',
}

export default function StatusBadge({ status, size = 'sm' }) {
  const colors = colorMap[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20'
  const sizeClasses = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${colors} ${sizeClasses}`}
    >
      {status}
    </span>
  )
}
