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
  type: 'message'
  message: ChatMessage
}

export interface EffectMessage {
  type: 'effect',
  effect: string
}

export type IncomingMessage = InitMessage | NewMessage | EffectMessage