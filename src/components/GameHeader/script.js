import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameHeader',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore
    }
  },
  computed: {
    score() {
      return this.gameStore.score
    },
    bestScore() {
      return this.gameStore.bestScore
    }
  }
}
