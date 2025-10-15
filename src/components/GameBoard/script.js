import { useGameStore } from '../../stores/gameStore'
import GameTile from '../GameTile/index.vue'

export default {
  name: 'GameBoard',
  components: {
    GameTile
  },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore
    }
  },
  computed: {
    board() {
      return this.gameStore.board
    },
    boardSize() {
      return this.gameStore.boardSize
    },
    
    gap() {
      return 10
    },
    
    // Convert board to tiles with positions
    tiles() {
      const tiles = []
      let id = 0
      
      for (let row = 0; row < this.boardSize; row++) {
        for (let col = 0; col < this.boardSize; col++) {
          const value = this.board[row][col]
          if (value !== 0) {
            tiles.push({
              id: id++,
              value,
              row,
              col,
              x: col,
              y: row
            })
          }
        }
      }
      
      return tiles
    }
  }
}
