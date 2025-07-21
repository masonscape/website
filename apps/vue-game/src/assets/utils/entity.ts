import type { Entity } from "@packages/types/game"

export const createEntity = (input: Partial<Omit<Entity, 'id' | 'type'>> & Pick<Entity, 'id' | 'type'>): Entity => {
  return {
    id: input.id,
    type: input.type,
    position: input.position ?? { x: 0, y: 0 },
    velocity: input.velocity ?? { x: 0, y: 0 },
    acceleration: input.acceleration ?? { x: 0, y: 0 },
    size: input.size ?? 100,
    color: input.color ?? '#0090ff'
  }
}