interface Props {
  logs: string[]
}

export const LogsPanel = ({ logs }: Props) => (
  <div className="rounded-2xl border border-purple-500/20 bg-cyber-800/80 p-4">
    <h2 className="text-lg font-semibold text-purple-300 mb-2">System Logs</h2>
    <ul className="space-y-2 max-h-60 overflow-y-auto text-xs text-slate-300">
      {logs.map((log, i) => <li key={i}>[{new Date().toLocaleTimeString()}] {log}</li>)}
    </ul>
  </div>
)
