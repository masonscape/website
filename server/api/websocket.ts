const room = 'CHAT'

export default defineWebSocketHandler({
  open(peer) {
    console.log('opened WS', peer.id)
    peer.subscribe(room)
  },
  close(peer) {
    console.log('closed WS', peer.id)
  },
  error(peer, error) {
    console.log('error on WS', peer.id, error)
  },
  message(peer, message) {
    console.log('message on WS', peer.id, message.text())
    peer.publish(room, message.text())
  }
})