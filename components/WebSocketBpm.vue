<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRuntimeConfig, useHead } from '#imports'

useHead({
  title: 'WS BPM – Live WebSocket demo',
  meta: [
    { name: 'description', content: 'Živý WebSocket graf s BPM hodnotou odvodenou z reálnych dát.' }
  ]
})

type WsStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

const cfg = useRuntimeConfig()
const DEFAULT_WS = 'wss://stream.binance.com:9443/ws/btcusdt@trade'
const configuredUrl = (typeof cfg.public?.wsUrl === 'string' ? cfg.public.wsUrl.trim() : '')
const wsUrl = ref<string>(configuredUrl || DEFAULT_WS)

const status = ref<WsStatus>('disconnected')

// ===== BPM riadenie =====
const BPM_MIN = 40
const BPM_MAX = 140
const bpm = ref<number>(72)          // zobrazené BPM (hladké)
const targetBpm = ref<number>(72)    // cieľ, ide z mapovania real-time dát

// Hladké filtrovanie + limit rýchlosti zmeny
const SMOOTH_PER_SEC = 3.0           // vyššie = rýchlejšia odozva
const MAX_JUMP_PER_SEC = 12          // max zmena (BPM) za sekundu

// ===== Plátno & vykreslenie =====
const width = 800
const height = 180
const AXIS_WIDTH = 56
const PLOT_W = width - AXIS_WIDTH
const PADDING_Y = 10
const TICKS = [60, 80, 100, 120]

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx!: CanvasRenderingContext2D // definite assignment – inicializujeme v onMounted

// Ukladáme históriu BPM (1 pixel = 1 vzorka)
const series: number[] = []
const MAX_POINTS = PLOT_W

// Posuv grafu (pixelov za sekundu)
const pixelsPerSecond = ref(40)

// Animácia
let rafId = 0
let lastTs = 0
let acc = 0
function sampleSpacingSec() { return 1 / Math.max(20, pixelsPerSecond.value) }

// ===== WebSocket =====
let ws: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
const MAX_RECONNECT_DELAY = 30_000
let reconnectAttempts = 0

function nextDelay() {
  const d = Math.min(MAX_RECONNECT_DELAY, 1000 * (2 ** reconnectAttempts))
  reconnectAttempts = Math.min(reconnectAttempts + 1, 10)
  return d
}
function scheduleReconnect() {
  const delay = nextDelay()
  status.value = 'connecting'
  reconnectTimer = setTimeout(connectWS, delay)
}

function safeParseJSON(s: string): Record<string, unknown> | null {
  try { return JSON.parse(s) as Record<string, unknown> } catch { return null }
}
function getNum(obj: unknown, key: string): number | null {
  if (typeof obj === 'object' && obj !== null) {
    const v = (obj as Record<string, unknown>)[key]
    if (typeof v === 'number') return v
    if (typeof v === 'string') { const n = Number(v); if (!Number.isNaN(n)) return n }
  }
  return null
}

// preferuj „t“ (ako na začiatku), potom p, q, E, T
function takePreferred(obj: Record<string, unknown>): number | null {
  const order = ['t', 'p', 'q', 'E', 'T']
  for (const k of order) {
    const n = getNum(obj, k)
    if (n !== null) return n
  }
  return null
}

// mapovanie čísla → BPM s „pôvodným feelingom“
function mapNumberToBpm(n: number): number {
  if (!Number.isFinite(n)) return 72
  const span = 61 // 55..115
  const base = 55
  const x = Math.abs(Math.floor(n)) % span
  return base + x
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function connectWS() {
  if (!wsUrl.value) return
  status.value = 'connecting'
  try {
    ws = new WebSocket(wsUrl.value)

    ws.onopen = () => {
      status.value = 'connected'
      reconnectAttempts = 0
    }

    ws.onmessage = (evt: MessageEvent) => {
      const dataStr = typeof evt.data === 'string' ? evt.data : ''
      const obj = safeParseJSON(dataStr)
      if (!obj) return
      const raw = takePreferred(obj)
      if (raw == null) return

      const mapped = clamp(mapNumberToBpm(raw), BPM_MIN + 5, BPM_MAX - 5)
      targetBpm.value = mapped
    }

    ws.onerror = () => {
      status.value = 'error'
    }
    ws.onclose = () => {
      status.value = 'disconnected'
      cleanupWS()
      scheduleReconnect()
    }
  } catch {
    status.value = 'error'
  }
}

function cleanupWS() {
  if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null }
  if (ws) { try { ws.close() } catch { /* ignore */ } ws = null }
}

// ===== Kreslenie =====
function mapBpmToY(val: number) {
  const clamped = clamp(val, BPM_MIN, BPM_MAX)
  const innerH = height - 2 * PADDING_Y
  return PADDING_Y + (1 - (clamped - BPM_MIN) / (BPM_MAX - BPM_MIN)) * innerH
}
function drawGrid() {
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  for (let x = 0; x < PLOT_W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, height); ctx.stroke()
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(PLOT_W, y + 0.5); ctx.stroke()
  }
}
function drawAxis() {
  const x0 = PLOT_W + 0.5
  ctx.strokeStyle = '#9ca3af'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x0, PADDING_Y)
  ctx.lineTo(x0, height - PADDING_Y)
  ctx.stroke()

  ctx.fillStyle = '#374151'
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  TICKS.forEach((tick) => {
    const y = mapBpmToY(tick)
    ctx.strokeStyle = '#d1d5db'
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 8, y); ctx.stroke()
    ctx.fillText(String(tick), x0 + 12, y)
  })

  // marker aktuálneho BPM
  const yBpm = mapBpmToY(bpm.value)
  ctx.fillStyle = '#16a34a'
  ctx.beginPath()
  ctx.arc(x0 + 10, yBpm, 4, 0, Math.PI * 2)
  ctx.fill()
}
function drawSeries() {
  if (series.length < 2) return
  ctx.strokeStyle = '#16a34a'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < series.length; i++) {
    const x = i
    const y = mapBpmToY(series[i])
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  }
  ctx.stroke()
}
function drawFrame() {
  ctx.clearRect(0, 0, width, height)
  drawGrid()
  drawSeries()
  drawAxis()
}

// ===== Anim loop =====
function animate(ts: number) {
  const now = ts || performance.now()
  if (!lastTs) lastTs = now
  const dt = Math.min(0.05, (now - lastTs) / 1000)
  lastTs = now

  // EMA + rate limit
  const k = Math.min(1, SMOOTH_PER_SEC * dt)
  const desiredStep = (targetBpm.value - bpm.value) * k
  const maxStep = MAX_JUMP_PER_SEC * dt
  const step = clamp(desiredStep, -maxStep, maxStep)
  bpm.value = clamp(bpm.value + step, BPM_MIN, BPM_MAX)

  // posun histórie podľa rýchlosti posuvu
  acc += dt
  const stepSec = sampleSpacingSec()
  while (acc >= stepSec) {
    if (series.length >= MAX_POINTS) series.shift()
    series.push(bpm.value)
    acc -= stepSec
  }

  drawFrame()
  rafId = requestAnimationFrame(animate)
}

// ===== lifecycle =====
onMounted(() => {
  const c = canvasRef.value
  if (!c) return
  const g = c.getContext('2d')
  if (!g) return
  ctx = g

  // inicializuj rovnú čiaru
  for (let i = 0; i < MAX_POINTS; i++) series.push(bpm.value)

  rafId = requestAnimationFrame(animate)
  if (wsUrl.value) connectWS()
})
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  cleanupWS()
})

function shorten(s: string, head = 36, tail = 18) {
  if (s.length <= head + tail + 1) return s
  return `${s.slice(0, head)}…${s.slice(-tail)}`
}
</script>

<template>

        <v-card color="" class="pa-6" elevation="8" role="region" aria-label="Live WebSocket BPM">
          <v-card-title class="d-flex align-center justify-space-between flex-wrap">
            <span class="text-h5">WebSocket BPM (minimal)</span>
            <div class="text-medium-emphasis" aria-live="polite">
              <v-chip
                :color="status === 'connected' ? 'green' : status === 'connecting' ? 'orange' : status === 'error' ? 'red' : 'grey'"
                size="small"
                class="mr-2"
              >
                {{ status }}
              </v-chip>
              <span v-if="status !== 'disconnected'">
                <small>WS: <code>{{ shorten(wsUrl) }}</code></small>
              </span>
            </div>
          </v-card-title>

          <v-card-text>
            <div class="d-flex align-center mb-4">
              <strong>BPM:</strong>
              <v-chip size="small" color="primary" class="ml-2">{{ Math.round(bpm) }}</v-chip>
            </div>

            <div class="chart-wrap" role="img" aria-label="Historický priebeh BPM z WebSocketu">
              <canvas ref="canvasRef" class="chart" :width="width" :height="height" />
            </div>
          </v-card-text>
        </v-card>
</template>

<style scoped>
.chart-wrap {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.chart {
  display: block;
  width: 100%;
  height: auto;
}
</style>
