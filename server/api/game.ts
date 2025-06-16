const room = 'GAME'

const npcList: NPC[] = []
const playerList: Player[] = []
const peerList = new Set<Peer>()
let gameLoopInterval: NodeJS.Timeout | null  = null

const gameLoop = () => {
  if (playerList.length === 0) return
  
  npcList.forEach(npc => {
    enemyChasePlayer(npc, playerList.filter(player => player.id === npc.id.replace('enemy', ''))[0])
  })
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

    const newPlayer = createEntity({
      id: peer.id,
    }) as Player

    const newPlayerEnemy = createEntity({
      id: 'enemy' + peer.id,
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

    if (parsedMessage.type === 'move') {
      const idx = playerList.findIndex(user => user.id === parsedMessage.id)
      if (idx !== -1) {
        playerList[idx].position.x = parsedMessage.x
        playerList[idx].position.y = parsedMessage.y
      }
    }
  },
  close(peer) {
    const idx = playerList.findIndex(user => user.id === peer.id)
    const enemyId = npcList.findIndex(npc => npc.id === 'enemy' + peer.id)

    // Remove the player from the playerList
    if (idx !== -1) {
      peerList.delete(peer)
      playerList.splice(idx, 1)
    }

    if (enemyId !== -1) {
      npcList.splice(enemyId, 1)
    }

    // If nobody is playing, stop the game loop
    if (playerList.length === 0) {
      stopGameLoop()
    }
  }
})