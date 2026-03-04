interface Props {
  shortMemory: string[]
  longMemory: { content: string; created_at?: string }[]
}

export const MemoryPanel = ({ shortMemory, longMemory }: Props) => (
  <div className="space-y-3 rounded-2xl border border-cyan-500/20 bg-cyber-800/80 p-4">
    <h2 className="text-lg font-semibold text-cyan-300">Memory Visualization</h2>
    <div>
      <h3 className="text-sm text-slate-400 mb-1">Short-Term (Redis)</h3>
      <ul className="space-y-1 text-xs max-h-24 overflow-y-auto">
        {shortMemory.map((item, idx) => <li key={idx} className="text-slate-200">• {item}</li>)}
      </ul>
    </div>
    <div>
      <h3 className="text-sm text-slate-400 mb-1">Long-Term (PostgreSQL)</h3>
      <ul className="space-y-2 text-xs max-h-36 overflow-y-auto">
        {longMemory.map((item, idx) => (
          <li key={idx} className="rounded bg-cyber-700/60 p-2">
            <div>{item.content}</div>
            <div className="text-slate-500 mt-1">{item.created_at ? new Date(item.created_at).toLocaleString() : ''}</div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
