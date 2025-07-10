<template>
  <div v-show="!loading" class="shiny-wrapper" @click="closePopup">
    <h1 class="title">Dynamax Adventure Shiny Tracker</h1>
    <hr>
    <div class="attempt-header-row">
      <img class="header-img" src="http://graphics.tppcrpg.net/xy/shiny/487M-1.gif" alt="Shiny Giratina Left">
      <div class="attempt-header-center">
        <h2 class="attempts">Day {{ Math.round(howLongSinceStartingHunt / 86400000) + 1 }} · Attempt {{ currentAttemptNumber }}</h2>
        <div class="button-wrapper">
          <button
            class="button"
            :style="{ '--result-color': 'var(--success-color)' }"
            @click="addAttempt(true, phaseInput)"
          >Success</button>
          <button
            class="button"
            :style="{ '--result-color': 'var(--failure-color)' }"
            @click="addAttempt(false, phaseInput)"
          >Failure</button>
        </div>
        <input
          v-model="phaseInput"
          class="phase-input"
          type="text"
          placeholder="Phase"
          autocomplete="off"
          @click.stop
        >
      </div>
      <img class="header-img" src="http://graphics.tppcrpg.net/xy/shiny/487M.gif" alt="Shiny Giratina Right">
    </div>

    <div v-if="attemptsList.length > 0">
      <hr>
      <h4>Success rate: {{ (successRate * 100).toFixed(2) }}%</h4>
      <h4>Chance to have found your shiny by now: {{ (chanceAtLeastOneShiny * 100).toFixed(2) }}%</h4>
      <h4>Average attempts per day: {{ averagePerDay.toFixed(2) }}</h4>
      <hr>

      <div class="attempt-history">
        <div :key="attemptGridKey" class="attempt-grid">
          <div
            v-for="attempt in attemptsList"
            :key="attempt.number"
            class="history-attempt"
            :style="{ '--result-color': attempt.success ? 'var(--success-color)' : 'var(--failure-color)' }"
            @click.stop="selectAttempt(attempt)"
          >
            <div class="attempt-number">{{ attempt.number }}</div>
            <div class="attempt-content">
              <div class="attempt-timestamp">{{ dayjs(attempt.date).fromNow() }}</div>
              <div v-if="attempt.phase" class="attempt-phase">{{ attempt.phase }}</div>
            </div>

            <div v-if="selectedAttempt?.number === attempt.number" class="attempt-popup" @click.stop>
              <button @click="toggleSuccess(attempt)">Toggle Success</button>
              <button @click="changeDate(attempt)">Change Date</button>
              <button @click="editPhase(attempt)">Edit Phase</button>
              <button @click="deleteAttempt(attempt)">Delete Attempt</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="import-export-wrapper">
      <button class="import-export-btn" @click="handleExportClick">Export</button>
      <button class="import-export-btn" @click="handleImportClick">Import</button>
    </div>

    <div v-if="exportedData" class="export-output">
      <textarea
        readonly
        :value="exportedData"
        @focus="selectText"
      />
    </div>

    <div v-if="showImport" class="import-input">
      <textarea v-model="importInput" placeholder="Paste exported JSON here" />
      <button class="import-export-btn" @click="importData">Import Data</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ref, computed, watch, onMounted } from 'vue'

dayjs.extend(relativeTime)

useSeoMeta({
  title: 'Dynamax Adventure Shiny Tracker'
})

interface Attempt {
  number: number
  date: number
  success: boolean
  phase: string | null
}

const STORAGE_KEY = 'attemptsList'
const loading = ref(true)
const attemptGridKey = ref(0)
let attemptGridIntervalId: number | undefined
const attemptsList = ref<Attempt[]>([])
const selectedAttempt = ref<Attempt | null>(null)
const phaseInput = ref('')
const exportedData = ref('')
const showImport = ref(false)
const importInput = ref('')

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) attemptsList.value = JSON.parse(saved)
  loading.value = false

  attemptGridIntervalId = window.setInterval(() => {
    attemptGridKey.value += 1
  }, 60000)
})

onUnmounted(() => {
  if (attemptGridIntervalId) clearInterval(attemptGridIntervalId)
})

const currentAttemptNumber = computed(() => attemptsList.value.length + 1)

const successRate = computed(() => {
  const total = attemptsList.value.length
  if (total === 0) return 0
  return attemptsList.value.filter(a => a.success).length / total
})

const chanceAtLeastOneShiny = computed(() => {
  const successCount = attemptsList.value.filter(a => a.success).length
  return 1 - Math.pow(0.99, successCount)
})

const howLongSinceStartingHunt = computed(() => {
  if (attemptsList.value.length === 0) return 0

  const beginTime = attemptsList.value[attemptsList.value.length - 1].date
  const endTime = Date.now()
  const elapsedMilliseconds = endTime - beginTime

  return elapsedMilliseconds
})

const averagePerDay = computed(() => {
  const elapsedDays = Math.ceil(howLongSinceStartingHunt.value / 86400000) // milliseconds in a day
  if (elapsedDays <= 0) return attemptsList.value.length
  return attemptsList.value.length / elapsedDays
})

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attemptsList.value))
}

watch(attemptsList, saveToStorage, { deep: true })

function addAttempt(success: boolean, phase: string | null) {
  attemptsList.value.unshift({
    number: currentAttemptNumber.value,
    date: Date.now(),
    success,
    phase: phase?.trim() || null,
  })
  phaseInput.value = ''
}

function selectAttempt(attempt: Attempt) {
  selectedAttempt.value = selectedAttempt.value?.number === attempt.number ? null : attempt
}

function closePopup() {
  selectedAttempt.value = null
}

function toggleSuccess(attempt: Attempt) {
  const idx = attemptsList.value.findIndex(a => a.number === attempt.number)
  if (idx === -1) return
  attemptsList.value[idx] = { ...attemptsList.value[idx], success: !attempt.success }
  selectedAttempt.value = null
}

function changeDate(attempt: Attempt) {
  const input = prompt('Enter new date as UNIX timestamp (milliseconds):', attempt.date.toString())
  if (!input) return
  const timestamp = Number(input)
  if (Number.isNaN(timestamp)) {
    alert('Invalid timestamp.')
    return
  }
  attempt.date = timestamp
  selectedAttempt.value = null
}

function editPhase(attempt: Attempt) {
  const input = prompt('Enter phase name (leave blank to delete):', attempt.phase || '')
  if (input === null) return
  attempt.phase = input.trim() || null
  selectedAttempt.value = null
}

function deleteAttempt(attempt: Attempt) {
  const idx = attemptsList.value.findIndex(a => a.number === attempt.number)
  if (idx === -1) return
  attemptsList.value.splice(idx, 1)
  selectedAttempt.value = null
}

function exportData() {
  exportedData.value = localStorage.getItem(STORAGE_KEY) || '[]'
  showImport.value = false
}

function selectText(e: FocusEvent) {
  const target = e.target as HTMLTextAreaElement | null
  if (target) target.select()
}

function importData() {
  try {
    const parsed = JSON.parse(importInput.value)
    if (!Array.isArray(parsed)) throw new Error('Invalid data format.')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    attemptsList.value = parsed
    exportedData.value = ''
    importInput.value = ''
    showImport.value = false
    alert('Import successful!')
  } catch {
    alert('Invalid JSON.')
  }
}

function handleExportClick() {
  if (exportedData.value) {
    exportedData.value = ''
  } else {
    exportData()
  }
}

function handleImportClick() {
  showImport.value = !showImport.value
  if (showImport.value) exportedData.value = ''
}
</script>

<style scoped>
.shiny-wrapper {
  width: 90vw;
  --success-color: #1dda33;
  --failure-color: #e74c3c;
  --history-bg: var(--color-primary, #222);
  --history-radius: 0.3em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title {
  font-size: 2em;
  margin: 0;
}

hr {
  border: 1px solid var(--color-primary-70);
  width: 54em;
  margin: 2em 0;
}

.attempt-header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
  width: 100%;
}

.header-img {
  width: 8em;
  height: 8em;
  object-fit: contain;
  flex-shrink: 0;
}

.attempt-header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
}

.attempts {
  font-size: 1.5em;
  margin: 0;
}

.button-wrapper {
  display: flex;
  gap: 1em;
  margin-top: 1em;
}

.button {
  all: unset;
  box-sizing: border-box;
  font-size: 1.6em;
  font-weight: 500;
  width: 6em;
  height: 2.4em;
  cursor: pointer;
  border-radius: var(--history-radius);
  color: #fff;
  outline: 1.5px solid var(--result-color);
  background-color: color-mix(in srgb, var(--history-bg) 80%, var(--result-color) 20%);
  user-select: none;
  text-align: center;
  transition: background 0.15s, border-color 0.15s;
}
.button:hover {
  transform: scale(1.05);
  outline: 3px solid var(--result-color);
}
.button:active {
  transform: scale(0.98);
}

.phase-input {
  margin: 0.7em 0;
  padding: 0.5em 1em;
  font-size: 1.1em;
  border-radius: 0.3em;
  border: 1.5px solid var(--color-secondary-85, #bbb);
  background: var(--color-primary-95, #222);
  color: var(--color-secondary-85, #fff);
  outline: none;
  width: 15em;
  max-width: 90vw;
  box-sizing: border-box;
  text-align: center;
  transition: border-color 0.15s;
}
.phase-input:focus {
  border-color: var(--color-accent);
}
.phase-input:focus::placeholder {
  color: transparent;
}

h4 {
  margin: 0em;
}

.attempt-history {
  width: 100%;
  max-width: 800px;
}

.attempt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5em;
}

.history-attempt {
  display: flex;
  height: 3.6em;
  border-radius: var(--history-radius);
  outline: 1px solid var(--result-color);
  background-color: color-mix(in srgb, var(--history-bg) 80%, var(--result-color) 20%);
  gap: 0.5em;
  position: relative;
  cursor: pointer;
}

.attempt-number {
  font-weight: bold;
  color: white;
  width: 2.4em;
  height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
}

.attempt-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.attempt-timestamp {
  font-size: 0.95em;
  color: #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attempt-phase {
  color: color-mix(in srgb, var(--result-color) 40%, var(--color-secondary) 60%);
  font-size: 0.95em;
  font-style: italic;
  opacity: 0.85;
  margin-top: 0.15em;
}

.attempt-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: var(--color-primary-85);
  border-radius: 0.3em;
  padding: 0.5em;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  width: 10em;
  user-select: none;
}

.attempt-popup button {
  all: unset;
  cursor: pointer;
  padding: 0.3em 0.6em;
  border-radius: 0.3em;
  text-align: center;
  background-color: var(--color-primary-95);
  border: 1px solid var(--color-secondary-85);
  color: var(--color-secondary-85);
}
.attempt-popup button:hover {
  background-color: var(--color-primary-75);
  border-color: var(--color-secondary-70);
}

.import-export-wrapper {
  margin: 2em auto 1em;
  display: flex;
  gap: 1em;
  max-width: 800px;
  justify-content: center;
}

.import-export-btn {
  all: unset;
  box-sizing: border-box;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  text-align: center;
  border-radius: var(--history-radius);
  color: white;
  padding: 0.5em 1.5em;
  outline: 1.5px solid white;
  background-color: rgba(255 255 255 / 0.1);
  transition: background 0.15s, border-color 0.15s;
  min-width: 80px;
  width: auto;
}
.import-export-btn:hover {
  transform: scale(1.03);
  background-color: rgba(255 255 255 / 0.2);
  outline: 1px solid white;
}

.export-output,
.import-input {
  width: 100%;
  max-width: 600px;
  margin: 1em auto 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.export-output textarea,
.import-input textarea {
  width: 100%;
  min-height: 5em;
  font-size: 1em;
  padding: 0.5em;
  border-radius: 0.3em;
  border: 1.5px solid var(--color-secondary-85, #bbb);
  background: var(--color-primary-95, #222);
  color: var(--color-secondary-85, #fff);
  resize: vertical;
  box-sizing: border-box;
}

.export-output textarea:focus,
.import-input textarea:focus {
  border-color: var(--color-accent);
  outline: none;
}
</style>