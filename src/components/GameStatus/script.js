import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameStatus',
  data() {
    return {
      showStats: false
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
    },
    score() {
      return this.gameStore.score
    },
    moveCount() {
      return this.gameStore.moveCount
    },
    highestTile() {
      return this.gameStore.highestTile
    },
    totalScore() {
      return this.gameStore.totalScore
    },
    
    efficiency() {
      if (this.moveCount === 0) return 0
      return Math.round((this.score / this.moveCount) * 100) / 100
    }
  },
  methods: {
    continueGame() {
      this.gameStore.continueGame()
    },
    resetGame() {
      this.gameStore.resetGame()
    },
    
    restartGame() {
      this.resetGame()
    },
    
    toggleStats() {
      this.showStats = !this.showStats
    }
  }
}
