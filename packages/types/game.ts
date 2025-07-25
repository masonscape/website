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