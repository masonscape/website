import type { Entity, NPC, Player, Peer } from "~/types/game"

const room = 'GAME'

const enemy: NPC = {
  id: 'redenemy',
  x: 250,
  y: 250,
  size: 100,
  color: '#ff0000'
}

const npcList: NPC[] = [enemy]
const playerList: Player[] = []
const peerList = new Set<Peer>()
let gameLoopInterval: NodeJS.Timeout | null  = null

function randomColor() {
  // Generate a random color in hex format
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

const moveEntity = (entity: Entity, vector: { x: number, y: number }) => {
  entity.x += vector.x
  entity.y += vector.y
}

const gameLoop = () => {
  if (playerList.length === 0) return
  
  const player = playerList[0]
  const xDistance = player.x - enemy.x
  const yDistance = player.y - enemy.y

  moveEntity(enemy, { x: xDistance / 50, y: yDistance / 50 })

  // if (enemy.x < playerList[0].x) {
  //   enemy.x += distance / 100
  // }
  // if (enemy.x > playerList[0].x) {
  //   enemy.x -= distance / 100
  // }
  // if (enemy.y < playerList[0].y) {
  //   enemy.y += distance / 100
  // }
  // if (enemy.y > playerList[0].y) {
  //   enemy.y -= distance / 100
  // }
}

const broadcastGameState = () => {
  // Remove the peer property from each player before sending to client
  const entityList: Entity[] = [...npcList, ...playerList]
  const entityListPayload = JSON.stringify({ type: 'users', users: entityList })

  peerList.forEach(peer => {
    peer.send(entityListPayload)
  })
}

const startGameLoop = () => {
  if (gameLoopInterval !== null) return 
  console.log('starting game loop')

  gameLoopInterval = setInterval(() => {
    gameLoop()
    broadcastGameState()
  }, 1000 / 60)
}
const stopGameLoop = () => {
  if (!gameLoopInterval) return

  console.log('stopping game loop')
  clearInterval(gameLoopInterval)
  gameLoopInterval = null
}

export default defineWebSocketHandler({
  open(peer) {
    peerList.add(peer)
    peer.subscribe(room)

    playerList.push({
      id: peer.id,
      x: Math.random() * 500,
      y: Math.random() * 500,
      size: 50,
      color: randomColor()
    })

    startGameLoop()

    // Send the connecting user their id
    peer.send(JSON.stringify({ type: 'welcome', id: peer.id }))
  },
  message(peer, message) {
    const parsedMessage = JSON.parse(message.text())

    if (parsedMessage.type === 'move') {
      const idx = playerList.findIndex(user => user.id === parsedMessage.id)
      if (idx !== -1) {
        playerList[idx].x = parsedMessage.x
        playerList[idx].y = parsedMessage.y
      }
    }
  },
  close(peer) {
    const idx = playerList.findIndex(user => user.id === peer.id)

    // Remove the player from the playerList
    if (idx !== -1) {
      peerList.delete(peer)
      playerList.splice(idx, 1)
    }

    // If nobody is playing, stop the game loop
    if (playerList.length === 0) {
      stopGameLoop()
    }
  }
})