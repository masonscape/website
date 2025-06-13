import type { ChatMessage } from "~/types/websocket"

const room = 'CHAT'

const messageList: ChatMessage[] = []

export default defineWebSocketHandler({
  open(peer) {
    console.log('opened WS, sending init')
    peer.subscribe(room)

    const messageListPayload = JSON.stringify({ type: 'init', messages: messageList })
    peer.send(messageListPayload)
  },
  close(peer) {
    console.log('closed WS', peer.id)
  },
  error(peer, error) {
    console.log('error on WS', peer.id, error)
  },
  message(peer, message) {
    const parsedMessage = JSON.parse(message.text())
    const newMessagePayload = JSON.stringify({ type: 'new-message', message: parsedMessage })

    messageList.unshift(parsedMessage)
    peer.publish(room, newMessagePayload)
  }
})