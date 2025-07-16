import type { defineWebSocketHandler } from 'h3'

type HandlerHooks = Parameters<typeof defineWebSocketHandler>[0]
type OpenHook = NonNullable<HandlerHooks['open']>
export type Peer = Parameters<OpenHook>[0]

export type Vector2 = { x: number, y: number }

export interface Entity {
  id: string
  type: 'npc' | 'player'
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  size: number
  color: string
}

export interface NPC extends Entity {
  type: 'npc'
} 

export interface Player extends Entity {
  type: 'player'
}