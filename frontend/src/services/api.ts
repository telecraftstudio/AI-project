import axios from 'axios'
import type { ChatResponse, Mode } from '../types/chat'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'
})

export const sendMessage = async (message: string, mode: Mode, explainReasoning: boolean): Promise<ChatResponse> => {
  const { data } = await api.post<ChatResponse>('/chat', { message, mode, explain_reasoning: explainReasoning })
  return data
}

export const fetchLongMemory = async () => {
  const { data } = await api.get('/memory/long-term')
  return data
}
