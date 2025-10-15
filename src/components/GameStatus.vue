<template>
  <div class="game-status">
    <!-- Game Won Message -->
    <v-alert
      v-if="gameStatus === 'won'"
      type="success"
      variant="tonal"
      class="mb-4"
      prominent
    >
      <template v-slot:title>
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-trophy</v-icon>
          Congratulations!
        </div>
      </template>
      <div class="text-body-1">
        You reached <strong>2048</strong>! 
        <br>
        <span class="text-body-2">You can continue playing to reach higher scores.</span>
      </div>
      <template v-slot:actions>
        <v-btn
          color="success"
          @click="continueGame"
          class="mr-2"
        >
          Continue Playing
        </v-btn>
        <v-btn
          color="primary"
          variant="outlined"
          @click="restartGame"
        >
          New Game
        </v-btn>
      </template>
    </v-alert>

    <!-- Game Over Message -->
    <v-alert
      v-if="gameStatus === 'gameOver'"
      type="error"
      variant="tonal"
      class="mb-4"
      prominent
    >
      <template v-slot:title>
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-gamepad-variant</v-icon>
          Game Over!
        </div>
      </template>
      <div class="text-body-1">
        No more moves available.
        <br>
        <span class="text-body-2">Final Score: <strong>{{ score.toLocaleString() }}</strong></span>
      </div>
      <template v-slot:actions>
        <v-btn
          color="primary"
          @click="restartGame"
        >
          Try Again
        </v-btn>
      </template>
    </v-alert>

        <!-- Game Statistics -->
        <v-card v-if="showStats" class="mb-4" elevation="1">
          <v-card-title class="text-h6 pa-4 pb-2">
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Game Statistics
          </v-card-title>
          <v-card-text class="pa-4 pt-0">
            <v-row class="text-center">
              <v-col cols="6" sm="3" class="pa-2">
                <v-card variant="outlined" class="pa-3 stat-card">
                  <div class="stat-value">{{ moveCount }}</div>
                  <div class="stat-label">Moves</div>
                </v-card>
              </v-col>
              <v-col cols="6" sm="3" class="pa-2">
                <v-card variant="outlined" class="pa-3 stat-card">
                  <div class="stat-value">{{ highestTile }}</div>
                  <div class="stat-label">Highest Tile</div>
                </v-card>
              </v-col>
              <v-col cols="6" sm="3" class="pa-2">
                <v-card variant="outlined" class="pa-3 stat-card">
                  <div class="stat-value">{{ totalScore.toLocaleString() }}</div>
                  <div class="stat-label">Total Score</div>
                </v-card>
              </v-col>
              <v-col cols="6" sm="3" class="pa-2">
                <v-card variant="outlined" class="pa-3 stat-card">
                  <div class="stat-value">{{ efficiency }}%</div>
                  <div class="stat-label">Efficiency</div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

    <!-- Toggle Stats Button -->
    <v-btn
      color="grey"
      variant="text"
      size="small"
      @click="toggleStats"
      class="mb-4"
    >
      <v-icon left>{{ showStats ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      {{ showStats ? 'Hide' : 'Show' }} Statistics
    </v-btn>
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

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
</script>

<style scoped>
.game-status {
  text-align: center;
}

.stat-card {
  border-radius: 8px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1976D2;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Animation for alerts */
.v-alert {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .stat-value {
    font-size: 1.25rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
}
</style>
