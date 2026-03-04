export type Mode = 'strategy' | 'creative' | 'deep_analysis'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  emotion?: string
  mode?: string
  reasoning?: string
  decision?: string
  created_at?: string
}

export interface ChatResponse {
  response: Message
  short_term_memory: string[]
  related_memories: Message[]
  logs: string[]
}
