import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameOverDialog',
  data() {
    return {
      showDialog: false
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
    bestScore() {
      return this.gameStore.bestScore
    },
    moveCount() {
      return this.gameStore.moveCount
    },
    highestTile() {
      return this.gameStore.highestTile
    },
    
    isNewBest() {
      return this.score > this.bestScore
    },
    
    efficiency() {
      if (this.moveCount === 0) return 0
      return Math.round((this.score / this.moveCount) * 100) / 100
    }
  },
  watch: {
    gameStatus(newStatus) {
      if (newStatus === 'won' || newStatus === 'gameOver') {
        this.showDialog = true
      } else {
        this.showDialog = false
      }
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
      this.showDialog = false
    },
    
    continueGame() {
      this.continueGame()
      this.showDialog = false
    },
    
    closeDialog() {
      this.showDialog = false
    }
  }
}
