const room = 'GAME'

const FRAMERATE = 60

const npcList: NPC[] = []
const playerList: Player[] = []
const peerList = new Set<Peer>()
let gameLoopInterval: NodeJS.Timeout | null  = null

let lastTime = performance.now()

const gameLoop = () => {
  // if no players are in the game, return
  if (playerList.length === 0) return

  // set deltaTime
  const now = performance.now()
  const dt = (now - lastTime) / 1000 // deltatime in seconds
  lastTime = now;

  // Only run NPC logic for NPCs
  npcList.forEach(npc => {
    // find its corresponding player
    const npcsPlayer = playerList.find(player => player.id === findPlayerIdFromNpcId(npc.id))
    if (npcsPlayer) {
      accelerateEntityTowardsCoordinates(npc, npcsPlayer.position)
    }
    tickEntity(npc, dt)
  })

  // Only tick players (no server-side acceleration)
  playerList.forEach(player => {
    tickEntity(player, dt)
  })
}

const broadcastGameState = () => {
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
  }, 1000 / FRAMERATE)
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

    const newPlayer = createEntity({
      id: peer.id,
      type: 'player',
      position: {
        x: 1920,
        y: 1080
      },
      size: 50
    }) as Player

    const newPlayerEnemy = createEntity({
      id: peer.id + '_npc',
      type: 'npc',
      position: {
        x: 1920,
        y: 1080
      },
      size: 100,
      color: '#ff0000'
    }) as NPC

    playerList.push(newPlayer)
    npcList.push(newPlayerEnemy)

    startGameLoop()

    // Send the connecting user their id
    peer.send(JSON.stringify({ type: 'welcome', id: peer.id }))
  },
  message(peer, message) {
    const parsedMessage = JSON.parse(message.text())

    if (parsedMessage.type === 'state') {
      const player = playerList.find(p => p.id === parsedMessage.id)
      if (player) {
        player.position = parsedMessage.position
        player.velocity = parsedMessage.velocity
        player.acceleration = parsedMessage.acceleration
      }
    }
  },
  close(peer) {
    // find index of closing player within playerList
    const idx = playerList.findIndex(user => user.id === peer.id)
    
    // find index of closing player's enemy within npcList
    const enemyIdx = npcList.findIndex(npc => npc.id === findNpcIdFromPlayerId(peer.id))

    // Remove the player from the playerList
    if (idx !== -1) {
      peerList.delete(peer)
      playerList.splice(idx, 1)
    }

    if (enemyIdx !== -1) {
      npcList.splice(enemyIdx, 1)
    }

    // If nobody is playing, stop the game loop
    if (playerList.length === 0) {
      stopGameLoop()
    }
  }
})