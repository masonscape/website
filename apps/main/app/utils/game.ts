export function randomColor() {
  // Generate a random color in hex format
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

export const createEntity = (input: Partial<Omit<Entity, 'id' | 'type'>> & Pick<Entity, 'id' | 'type'>): Entity => {
  return {
    id: input.id,
    type: input.type,
    position: input.position ?? { x: 0, y: 0 },
    velocity: input.velocity ?? { x: 0, y: 0 },
    acceleration: input.acceleration ?? { x: 0, y: 0 },
    size: input.size ?? 100,
    color: input.color ?? randomColor()
  }
}

export const findNpcIdFromPlayerId = (playerId: string) => {
  return playerId + '_npc'
}

export const findPlayerIdFromNpcId = (npcId: string) => {
  return npcId.replace('_npc', '')
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

export const moveEntity = (entity: Entity, vector: Vector2) => {
  entity.position = {
    x: clamp(entity.position.x + vector.x, 0, 3840),
    y: clamp(entity.position.y + vector.y, 0, 2160)
  }
}

export const entityVelocity = (entity: Entity, vector: Vector2) => {
  entity.velocity = {
    x: entity.velocity.x + vector.x,
    y: entity.velocity.y + vector.y
  }
}

export const accelerateEntity = (entity: Entity, vector: Vector2, maxMagnitude = 1000) => {
  const newX = entity.acceleration.x + vector.x
  const newY = entity.acceleration.y + vector.y

  const magnitude = Math.sqrt(newX ** 2 + newY ** 2)

  if (magnitude > maxMagnitude) {
    const scale = maxMagnitude / magnitude
    entity.acceleration = {
      x: newX * scale,
      y: newY * scale,
    }
  } else {
    entity.acceleration = {
      x: newX,
      y: newY,
    }
  }
}

export const accelerateEntityTowardsCoordinates = (entity: Entity, coordinates: Vector2) => {
  const xDistance = coordinates.x - entity.position.x
  const yDistance = coordinates.y - entity.position.y

  const dist = Math.sqrt(xDistance ** 2 + yDistance ** 2)

  if (dist > 0) {
    // Normalize direction vector
    const dirX = xDistance / dist
    const dirY = yDistance / dist

    // Exponential speed based on distance
    const speed = dist ** 1.2  // adjust exponent and scale factor as needed

    accelerateEntity(entity, {
      x: dirX * speed,
      y: dirY * speed
    }, speed)
  }
}

export const tickEntity = (entity: Entity, dt: number) => {
  entityVelocity(entity, {
    x: entity.acceleration.x * dt,
    y: entity.acceleration.y * dt
  })

  // Friction
  const friction = 1 // minus 10% velocity per second
  const decay = friction ** dt
  entity.velocity.x *= decay
  entity.velocity.y *= decay

  moveEntity(entity, {
    x: entity.velocity.x * dt,
    y: entity.velocity.y * dt,
  })
}