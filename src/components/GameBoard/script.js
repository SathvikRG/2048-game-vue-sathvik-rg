import { mapState } from 'pinia'
import { useGameStore } from '../../stores/gameStore'
import GameTile from '../GameTile/index.vue'

export default {
  name: 'GameBoard',
  components: {
    GameTile
  },
  data() {
    return {
      gap: 10
    }
  },
  computed: {
    ...mapState(useGameStore, ['board', 'boardSize']),
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
