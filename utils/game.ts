export function randomColor() {
  // Generate a random color in hex format
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

export const createEntity = (input: Partial<Omit<Entity, 'id'>> & Pick<Entity, 'id'>): Entity => {
  return {
    id: input.id,
    position: input.position ?? { x: 0, y: 0 },
    velocity: input.velocity ?? { x: 0, y: 0 },
    acceleration: input.acceleration ?? { x: 0, y: 0 },
    size: input.size ?? 50,
    color: input.color ?? randomColor()
  }
}

export const moveEntity = (entity: Entity, vector: { x: number, y: number }) => {
  entity.position.x += vector.x
  entity.position.y += vector.y
}

export const enemyChasePlayer = (enemy: NPC, player: Player) => {
  if (!enemy || !player) return
  
  const xDistance = player.position.x - enemy.position.x
  const yDistance = player.position.y - enemy.position.y

  const dist = Math.sqrt(xDistance ** 2 + yDistance ** 2)

  if (dist > 0) {
    // Normalize direction vector
    const dirX = xDistance / dist
    const dirY = yDistance / dist

    // Exponential speed based on distance
    const speed = dist ** 1.2 * 0.01  // adjust exponent and scale factor as needed

    moveEntity(enemy, {
      x: dirX * speed,
      y: dirY * speed,
    })
  }
}