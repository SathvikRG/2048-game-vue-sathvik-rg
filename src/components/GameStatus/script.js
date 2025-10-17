import { mapState, mapActions } from 'pinia'
import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameStatus',
  data() {
    return {
      showStats: false
    }
  },
  computed: {
    ...mapState(useGameStore, ['gameStatus', 'score', 'moveCount', 'highestTile', 'totalScore']),
    efficiency() {
      if (this.moveCount === 0) return 0
      return Math.round((this.score / this.moveCount) * 100) / 100
    }
  },
  methods: {
    ...mapActions(useGameStore, ['continueGame', 'resetGame']),
    restartGame() {
      this.resetGame()
    },
    toggleStats() {
      this.showStats = !this.showStats
    }
  }
}
