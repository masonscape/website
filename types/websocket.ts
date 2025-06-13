export interface ChatMessage {
  user: string
  content: string
  timestamp: number
}

export type IncomingMessage = {
  type: 'new-message'
  user: string
  content: string
}

export type OutgoingMessage =
  | { type: 'init'; messages: ChatMessage[] }
  | { type: 'new-message'; message: ChatMessage }
