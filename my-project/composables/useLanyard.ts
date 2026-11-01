// frontend/composables/useLanyard.ts
import { ref, onMounted, onUnmounted } from 'vue'

export interface LanyardSpotify {
  track_id: string
  song: string
  artist: string
  album_art_url: string
  album: string
  timestamps: {
    start: number
    end: number
  }
}

export interface LanyardActivity {
  id: string
  name: string
  type: number
  state?: string
  details?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
}

export const useLanyard = (userId: string) => {
  const status = ref<'online' | 'idle' | 'dnd' | 'offline'>('offline')
  const customStatus = ref<string>('')
  const codingActivity = ref<LanyardActivity | null>(null)
  const spotifyData = ref<LanyardSpotify | null>(null)

  let socket: WebSocket | null = null
  let heartbeatInterval: any = null

  const parseActivities = (activities: LanyardActivity[]) => {
    const custom = activities.find(a => a.type === 4)
    customStatus.value = custom?.state || ''

    const code = activities.find(a => 
      ['Visual Studio Code', 'Code', 'VSCodium', 'Neovim', 'IntelliJ IDEA', 'RustRover', 'Sublime Text']
        .some(ide => a.name.toLowerCase().includes(ide.toLowerCase()))
    )
    codingActivity.value = code || null
  }

  const connect = () => {
    if (!userId || typeof window === 'undefined') return

    socket = new WebSocket('wss://api.lanyard.rest/socket')

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const { op, t, d } = data

      if (op === 1) {
        socket?.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: userId }
        }))

        heartbeatInterval = setInterval(() => {
          socket?.send(JSON.stringify({ op: 3 }))
        }, d.heartbeat_interval)
      }

      if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
        status.value = d.discord_status || 'offline'
        parseActivities(d.activities || [])
        // Если играет Spotify
        spotifyData.value = d.listening_to_spotify ? d.spotify : null
      }
    }

    socket.onclose = () => {
      clearInterval(heartbeatInterval)
      setTimeout(connect, 5000)
    }
  }

  onMounted(() => connect())

  onUnmounted(() => {
    clearInterval(heartbeatInterval)
    socket?.close()
  })

  return {
    status,
    customStatus,
    codingActivity,
    spotifyData
  }
}