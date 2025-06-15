import type { User } from "~/types/game"

const room = 'GAME'

const enemy = {
  id: 'IAMTHEENEMY',
  x: 250,
  y: 250,
  size: 100,
  color: '#ff0000'
}

const userList: User[] = [enemy]

function randomColor() {
  // Generate a random color in hex format
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
}

setInterval(() => {
  if (userList.length === 1) return

  if (enemy.x < userList[1].x) {
    userList[0].x += 1
  }
  if (enemy.x > userList[1].x) {
    userList[0].x -= 1
  }
  if (enemy.y < userList[1].y) {
    userList[0].y += 1
  }
  if (enemy.y > userList[1].y) {
    userList[0].y -= 1
  }
}, 1000 / 60)

export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe(room)

    userList.push({ id: peer.id, x: Math.random() * 500, y: Math.random() * 500, size: 50, color: randomColor() })

    // Send the connecting user their id
    peer.send(JSON.stringify({ type: 'welcome', id: peer.id }))

    // Send the connecting user the full user list (including themselves)
    peer.send(JSON.stringify({ type: 'init', users: userList }))

    // Broadcast the updated user list to all clients
    setInterval(() => {
      console.log(userList)
      const userListPayload = JSON.stringify({ type: 'users', users: userList })
      peer.publish(room, userListPayload)
    }, 1000 / 60)
  },
  message(peer, message) {
    const parsedMessage = JSON.parse(message.text())

    if (parsedMessage.type === 'move') {
      // Find and update the user's position
      const idx = userList.findIndex(user => user.id === parsedMessage.id)
      if (idx !== -1) {
        userList[idx].x = parsedMessage.x
        userList[idx].y = parsedMessage.y
      }
    }
  },
  close(peer) {
    // Remove the user from userList
    const idx = userList.findIndex(user => user.id === peer.id)
    if (idx !== -1) {
      userList.splice(idx, 1)
    }
  }
})