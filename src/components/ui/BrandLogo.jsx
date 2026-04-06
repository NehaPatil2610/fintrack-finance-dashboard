import { Wallet } from 'lucide-react'

const BrandLogo = ({ compact = false }) => (
  <div className={`flex items-center ${compact ? 'justify-center' : 'gap-3'}`}>
    <div className="rounded-xl bg-indigo-600 p-2 shadow-lg shadow-indigo-200 dark:shadow-none">
      <Wallet className="h-6 w-6 text-white" />
    </div>
    {compact ? (
      <span className="sr-only">FinTrack</span>
    ) : (
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none tracking-tight text-slate-900 dark:text-white">
          FinTrack
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-slate-500">
          Financial Intelligence
        </span>
      </div>
    )}
  </div>
)

export default BrandLogo
