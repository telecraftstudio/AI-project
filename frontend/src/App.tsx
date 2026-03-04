import { useState } from 'react'
import { Brain, Lightbulb, Microscope, SendHorizontal } from 'lucide-react'
import type { Message, Mode } from './types/chat'
import { sendMessage } from './services/api'
import { EmotionIndicator } from './components/EmotionIndicator'
import { LogsPanel } from './components/LogsPanel'
import { MemoryPanel } from './components/MemoryPanel'
import { RobotAvatar } from './components/RobotAvatar'
import { TypingIndicator } from './components/TypingIndicator'

const modeButtons: { key: Mode; label: string; icon: JSX.Element }[] = [
  { key: 'strategy', label: 'Strategy', icon: <Brain size={16} /> },
  { key: 'creative', label: 'Creative', icon: <Lightbulb size={16} /> },
  { key: 'deep_analysis', label: 'Deep Analysis', icon: <Microscope size={16} /> }
]

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('strategy')
  const [emotion, setEmotion] = useState('Thinking')
  const [isTyping, setIsTyping] = useState(false)
  const [explainReasoning, setExplainReasoning] = useState(false)
  const [shortMemory, setShortMemory] = useState<string[]>([])
  const [longMemory, setLongMemory] = useState<Message[]>([])
  const [logs, setLogs] = useState<string[]>([])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const data = await sendMessage(userMessage.content, mode, explainReasoning)
      setMessages(prev => [...prev, data.response])
      setEmotion(data.response.emotion ?? 'Thinking')
      setShortMemory(data.short_term_memory)
      setLongMemory(data.related_memories)
      setLogs(data.logs)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-6 text-slate-100">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-4">
        <section className="lg:col-span-3 rounded-2xl border border-cyan-500/20 bg-cyber-800/70 p-4 flex flex-col h-[85vh]">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <RobotAvatar emotion={emotion} />
              <div>
                <h1 className="text-2xl font-bold text-cyan-300">AI Genius Robot</h1>
                <p className="text-sm text-slate-400">Billion-dollar autonomous intelligence cockpit</p>
              </div>
            </div>
            <EmotionIndicator emotion={emotion} />
          </header>

          <div className="flex gap-2 mb-3">
            {modeButtons.map(item => (
              <button key={item.key} onClick={() => setMode(item.key)} className={`px-3 py-2 rounded-lg text-sm border flex items-center gap-2 ${mode === item.key ? 'bg-cyan-500/20 border-cyan-300' : 'border-slate-600'}`}>
                {item.icon} {item.label}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-sm">
              <input type="checkbox" checked={explainReasoning} onChange={e => setExplainReasoning(e.target.checked)} />
              Explain reasoning
            </label>
          </div>

          <main className="flex-1 overflow-y-auto space-y-3 rounded-xl bg-cyber-900/60 p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-xl p-3 ${msg.role === 'user' ? 'ml-auto bg-cyan-700/40' : 'bg-slate-800'}`}>
                <div className="text-xs text-slate-400 mb-1">{msg.role.toUpperCase()}</div>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </main>

          <footer className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about strategy, innovation, or deep analysis..."
              className="flex-1 rounded-xl border border-slate-600 bg-cyber-900 p-3 outline-none focus:border-cyan-400"
            />
            <button onClick={handleSend} className="rounded-xl bg-cyan-500 px-4 text-cyber-900 font-semibold hover:bg-cyan-300">
              <SendHorizontal />
            </button>
          </footer>
        </section>

        <section className="space-y-4">
          <MemoryPanel shortMemory={shortMemory} longMemory={longMemory} />
          <LogsPanel logs={logs} />
        </section>
      </div>
    </div>
  )
}
