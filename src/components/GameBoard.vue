<template>
  <v-card elevation="3">
    <v-card-text class="pa-6">
      <!-- Board Container -->
      <div class="game-board-container">
        <div 
          class="game-board"
          :style="{ 
            gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            gridTemplateRows: `repeat(${boardSize}, 1fr)`,
            gap: `${gap}px`
          }"
        >
          <!-- Background Grid -->
          <div
            v-for="i in boardSize * boardSize"
            :key="`bg-${i}`"
            class="game-cell background-cell"
          ></div>
          
          <!-- Game Tiles -->
          <GameTile
            v-for="tile in tiles"
            :key="`tile-${tile.id}`"
            :tile="tile"
            :board-size="boardSize"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { useGameStore } from '../stores/gameStore'
import GameTile from './GameTile.vue'

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
</script>

<style scoped>
.game-board-container {
  display: flex;
  justify-content: center;
  padding: 24px;
}

.game-board {
  display: grid;
  position: relative;
  background-color: #bbada0;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 400px;
  height: 400px;
}

.background-cell {
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

.v-card {
  border-radius: 12px;
}
</style>
