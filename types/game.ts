type HandlerHooks = Parameters<typeof defineWebSocketHandler>[0]
type OpenHook = NonNullable<HandlerHooks['open']>
export type Peer = Parameters<OpenHook>[0]

export type Vector2 = { x: number, y: number }

export interface Entity {
  id: string
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  size: number
  color: string
}

// if NPCs or Players ever need unique data, replace this with an interface that extends Entity
export type NPC = Entity

export type Player = Entity