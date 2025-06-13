<template>
  <div v-if="status === 'OPEN'" class="chat-container">
    <SiteHeader />
    <div v-if="!myUsername" class="username-selector-container">
      <h2 class="enter-a-username">Enter a username</h2>
      <input v-model="usernameInput" class="chat-input" type="text" @keydown.enter.prevent="setUsername">
      <p class="privacy-notice">This username will be saved in your browser in accordance with our <NuxtLink to="/privacy">Privacy Policy</NuxtLink></p>
    </div>
    <div ref="messageListRef" class="message-list">
      <div v-for="message in messages" :key="message.timestamp" class="message" :style="{ '--mycolor': message.color, 'font-style': message.user === 'System' ? 'italic' : 'normal' }">
        <div class="info">
          <h2 class="username">{{ message.user }}</h2>
          <h3 class="timestamp">{{ formatTimestamp(message.timestamp) }}</h3>
        </div>
        <p class="message-content">{{ message.content }}</p>
      </div>
    </div>
    <div class="textbox-container">
      <textarea
        ref="textareaRef"
        v-model="messageInput"
        class="message-input"
        placeholder="Type your message"
        rows="1"
        @input="autoResize"
        @keydown.enter.prevent="submitMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import type { ChatMessage, IncomingMessage } from '~/types/websocket'

definePageMeta({
  layout: false,
  ssr: false
})

useHead({
  title: 'chat',
  meta: [
    { property: 'og:title', content: 'masonscape chat' },
    { property: 'og:url', content: `https://masonscape.com/${useRoute().path}` },
    { name: 'theme-color', content: '#0090ff' }
  ]
})

const messages = ref<ChatMessage[]>([])
const myUsername = ref<string | null>(null)
const myColor = ref<string | null>(null)
const messageInput = ref('')
const usernameInput = ref('')

const messageListRef = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const { status, data, send } = useWebSocket(`/api/websocket`, { autoReconnect: { retries: 10, delay: 1000 } })

watch(data, (raw) => {
  const parsedMessage = JSON.parse(raw) as IncomingMessage

  if (parsedMessage.type === 'init') {
    messages.value = parsedMessage.messages
  } else if (parsedMessage.type === 'new-message') {
    appendMessage(parsedMessage.message)
  }
})

watch(status, newValue => {
  console.log('status:', newValue)
})

watch(textareaRef, async (newVal) => {
  newVal?.focus()
})

const appendMessage = (message: ChatMessage) => {
  messages.value = [message, ...messages.value]
}

const createNewMessage = (content: string, ephemeral: boolean = false) => {
  const message = {
    user: myUsername.value,
    content,
    timestamp: Date.now(),
    color: myColor.value
  } as ChatMessage

  appendMessage(message)
  if (ephemeral) return

  send(JSON.stringify(message))
}

const createNewSystemMessage = (content: string) => {
  const message = {
    user: 'System',
    content,
    timestamp: Date.now(),
  } as ChatMessage

  appendMessage(message)
}

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  })
}

const setColor = (color: string) => {
  myColor.value = '#' + color
  localStorage.setItem('chat-color', '#' + color)
}

const setUsername = (username: string) => {
  myUsername.value = username
  localStorage.setItem('chat-username', username)
}

const submitMessage = () => {
  const content = messageInput.value.trim()
  if (!content) return

  if (content.startsWith('/')) {
    if (content.startsWith('/setcolor')) {
      const oldColor = myColor.value
      const color = content.split(' ')[1].replace('#', '')
      if (!color || !/^(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) return

      setColor(color)

      createNewSystemMessage(`Changed your color from ${oldColor} to #${color}`)
    } if (content.startsWith('/setname')) {
      const oldName = myUsername.value
      const name = content.split(' ').splice(1).join(' ')

      if (name === 'System') {
        setUsername('nice try bro you cant make your name system')
      } else {
        setUsername(name)
      }

      createNewSystemMessage(`Changed your name from '${oldName}' to '${name}'`)
    }
  } else {
    createNewMessage(content)
  }

  messageInput.value = ''

  nextTick(() => {
    autoResize()
  })
}

const autoResize = () => {
  if (!textareaRef.value) return

  const minHeight = 42

  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = Math.max(minHeight, textareaRef.value.scrollHeight) + 'px'
}

onMounted(() => {
  const savedUsername = localStorage.getItem('chat-username')
  const savedColor = localStorage.getItem('chat-color')

  if (savedUsername) {
    myUsername.value = savedUsername
  }

  if (savedColor) {
    myColor.value = savedColor
  }

  autoResize()
})

watch(messages, () => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: var(--color-primary);
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1em 0.5em;
  display: flex;
  flex-direction: column-reverse;
  gap: 1em;
}

.message {
  --mycolor: var(--themecolor-inverted);

  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--color-primary-95) 90%, var(--mycolor) 10%);
  border-radius: 0.5em;
  padding: 0.8em 1.2em;
  max-width: 30em;
  width: 60%;
  margin: 0 auto;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);

  animation: fadeIn 0.2s;

  outline: 1px solid var(--mycolor);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(80%)
  }
  to {
    opacity: 1;
    transform: scale(100%)
  }
}

.info {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1em;
  margin-bottom: 1em;
}

.username {
  font-size: 1em;
  font-weight: bold;
  color: var(--mycolor);
  margin: 0;
}

.timestamp {
  font-size: 0.8em;
  color: var(--color-secondary-50);
  margin: 0;
  margin-left: auto;
}

.message-content {
  margin: 0 0 0.4em 0;
  word-break: break-word;
  font-weight: 0;
}

.textbox-container {
  display: flex;
  justify-content: center;
  padding: 1em 10% 1em 10%;
  background: var(--color-primary-95);
  border-top: 1px solid var(--color-primary-70);
}

.message-input {
  flex: 1;
  padding: 0.7em 1em;
  border-radius: 0.5em;
  border: 1px solid var(--color-primary-80);
  background: var(--color-primary);
  color: var(--color-secondary);
  font-size: 1em;
  outline: none;
  word-break: break-all;
  word-wrap: normal;
  height: 42px; /* fits one line + padding, tweak as needed */
  max-height: 10em;   /* grows up to 10em */
  max-width: 30em;
  resize: none;       /* prevent manual resize */
  box-sizing: border-box;
  overflow-y: hidden; /* scrollbar appears only if needed via JS */
}

.message-input:focus {
  border-color: var(--color-accent);
}

.message-input::placeholder {
  color: var(--color-secondary-60)
}

.username-selector-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: color-mix(in srgb, var(--color-primary) 80%, transparent);
  z-index: 1000;
}

.enter-a-username {
  font-size: 1.8em;
}

.privacy-notice {
  margin-top: 5em;
  color: var(--color-secondary-60)
}

.chat-input {
  padding: 0.7em 1em;
  border-radius: 0.5em;
  border: 1px solid var(--color-secondary);
  background-color: var(--color-secondary);
  color: var(--color-primary);
  font-size: 1em;
  outline: none;
  word-break: break-all;
  word-wrap: normal;
  resize: none;       /* prevent manual resize */
  box-sizing: border-box;
  overflow-y: hidden; /* scrollbar appears only if needed via JS */
}

.chat-input:focus {
  border: 1px solid var(--color-accent);
}
</style>
