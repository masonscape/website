export interface ChatMessage {
  user: string
  content: string
  timestamp: number,
  color: string
}

export interface InitMessage {
  type: 'init'
  messages: ChatMessage[]
}

export interface NewMessage {
  type: 'new-message'
  message: ChatMessage
}

export type IncomingMessage = InitMessage | NewMessage