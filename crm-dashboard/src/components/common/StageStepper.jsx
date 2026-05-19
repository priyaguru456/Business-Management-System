import { LEAD_STAGES } from '../../data/mockData'

const stageColors = {
  New: 'bg-blue-500',
  Contacted: 'bg-indigo-500',
  Qualified: 'bg-purple-500',
  Proposal: 'bg-orange-500',
  Negotiation: 'bg-amber-500',
  Won: 'bg-green-500',
  Lost: 'bg-red-500',
}

export default function StageStepper({ currentStage, onStageChange, stages = LEAD_STAGES }) {
  const currentIndex = stages.indexOf(currentStage)

  return (
    <div className="flex items-center gap-0.5 w-full">
      {stages.map((stage, idx) => {
        const isActive = idx === currentIndex
        const isPast = idx < currentIndex
        const isLost = currentStage === 'Lost' && idx === stages.length - 1

        return (
          <button
            key={stage}
            onClick={() => onStageChange?.(stage)}
            className={`relative flex-1 py-1.5 text-[10px] font-medium text-center transition-all rounded-sm cursor-pointer
              ${isActive ? `${stageColors[stage]} text-white shadow-sm` : ''}
              ${isPast ? 'bg-gray-200 text-gray-600' : ''}
              ${!isActive && !isPast ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' : ''}
              ${isLost ? 'bg-red-500 text-white' : ''}
            `}
            title={stage}
          >
            {stage}
          </button>
        )
      })}
    </div>
  )
}
