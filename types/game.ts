type HandlerHooks = Parameters<typeof defineWebSocketHandler>[0]
type OpenHook = NonNullable<HandlerHooks['open']>
export type Peer = Parameters<OpenHook>[0]

export interface Entity {
  id: string,
  x: number,
  y: number,
  size: number,
  color: string,
}

// if NPCs or Players ever need unique data, replace this with an interface that extends Entity
export type NPC = Entity

export type Player = Entity