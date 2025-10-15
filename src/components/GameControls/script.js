import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameControls',
  data() {
    return {
      isMobile: false,
      directions: [
        { name: 'up', icon: 'mdi-chevron-up', color: 'primary' },
        { name: 'left', icon: 'mdi-chevron-left', color: 'primary' },
        { name: 'down', icon: 'mdi-chevron-down', color: 'primary' },
        { name: 'right', icon: 'mdi-chevron-right', color: 'primary' }
      ]
    }
  },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore
    }
  },
  computed: {
    gameStatus() {
      return this.gameStore.gameStatus
    }
  },
  methods: {
    resetGame() {
      this.gameStore.resetGame()
    },
    makeMove(direction) {
      this.gameStore.makeMove(direction)
    },
    
    restartGame() {
      this.resetGame()
    },
    
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  }
}
