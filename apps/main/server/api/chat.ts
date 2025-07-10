import type { ChatMessage, IncomingMessage } from "~/types/websocket"

const room = 'CHAT'

const messageList: ChatMessage[] = []

export default defineWebSocketHandler({
  open(peer) {
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
    const parsedMessage = JSON.parse(message.text()) as IncomingMessage

    if (parsedMessage.type === 'message') {
      messageList.unshift(parsedMessage.message)
      peer.publish(room, JSON.stringify(parsedMessage))
    } else if (parsedMessage.type === 'effect') {
      peer.publish(room, JSON.stringify(parsedMessage))
    }
  }
})