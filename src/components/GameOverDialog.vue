<template>
  <v-dialog
    v-model="showDialog"
    max-width="400"
    persistent
    :retain-focus="false"
  >
    <v-card>
      <v-card-title class="text-center pa-6 pb-4">
        <div class="dialog-header">
          <v-icon 
            :color="gameStatus === 'won' ? 'success' : 'error'"
            size="48"
            class="mb-2"
          >
            {{ gameStatus === 'won' ? 'mdi-trophy' : 'mdi-gamepad-variant' }}
          </v-icon>
          <h2 class="text-h4 font-weight-bold">
            {{ gameStatus === 'won' ? 'You Won!' : 'Game Over!' }}
          </h2>
        </div>
      </v-card-title>
      
      <v-card-text class="text-center pa-4">
        <div v-if="gameStatus === 'won'" class="mb-4">
          <p class="text-h6 text-success mb-2">
            Congratulations! You reached <strong>2048</strong>!
          </p>
          <p class="text-body-2 text-medium-emphasis">
            You can continue playing to achieve even higher scores.
          </p>
        </div>
        
        <div v-else class="mb-4">
          <p class="text-h6 text-error mb-2">
            No more moves available!
          </p>
          <p class="text-body-2 text-medium-emphasis">
            Better luck next time!
          </p>
        </div>
        
        <!-- Score Summary -->
        <v-card variant="tonal" class="mb-4" :color="gameStatus === 'won' ? 'success' : 'error'">
          <v-card-text class="pa-3">
            <v-row>
              <v-col cols="6">
                <div class="score-item">
                  <div class="score-label">Final Score</div>
                  <div class="score-value">{{ score.toLocaleString() }}</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="score-item">
                  <div class="score-label">Best Score</div>
                  <div class="score-value">{{ bestScore.toLocaleString() }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row v-if="isNewBest">
              <v-col cols="12">
                <v-chip color="success" size="small" class="mt-2">
                  <v-icon left size="small">mdi-star</v-icon>
                  New Best Score!
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        
        <!-- Game Statistics -->
        <div class="game-stats mb-4">
          <v-row>
            <v-col cols="4">
              <div class="stat-item">
                <div class="stat-value">{{ moveCount }}</div>
                <div class="stat-label">Moves</div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="stat-item">
                <div class="stat-value">{{ highestTile }}</div>
                <div class="stat-label">Highest</div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="stat-item">
                <div class="stat-value">{{ efficiency }}%</div>
                <div class="stat-label">Efficiency</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      
      <v-card-actions class="pa-4 pt-0">
        <v-row>
          <v-col cols="12" v-if="gameStatus === 'won'">
            <v-btn
              color="success"
              size="large"
              block
              @click="continueGame"
              class="mb-2"
            >
              <v-icon left>mdi-play</v-icon>
              Continue Playing
            </v-btn>
          </v-col>
          <v-col cols="12" :sm="gameStatus === 'won' ? 6 : 12">
            <v-btn
              color="primary"
              size="large"
              :block="gameStatus !== 'won'"
              @click="restartGame"
            >
              <v-icon left>mdi-refresh</v-icon>
              New Game
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" v-if="gameStatus === 'won'">
            <v-btn
              color="grey"
              size="large"
              block
              @click="closeDialog"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

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
</script>

<style scoped>
.dialog-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-item {
  text-align: center;
}

.score-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.game-stats {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1976D2;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

/* Animation for dialog */
.v-dialog .v-card {
  animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .score-value {
    font-size: 1.25rem;
  }
  
  .stat-value {
    font-size: 1.1rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
}
</style>
