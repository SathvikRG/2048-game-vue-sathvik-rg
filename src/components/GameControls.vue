<template>
  <v-card elevation="3">
    <v-card-text class="pa-6">
      <v-row justify="center" align="center">
        <!-- Restart Button -->
        <v-col cols="12" sm="6" md="4">
          <v-btn
            color="primary"
            size="x-large"
            block
            @click="restartGame"
            class="mb-4"
            rounded="lg"
          >
            <v-icon left>mdi-refresh</v-icon>
            New Game
          </v-btn>
        </v-col>
        
        <!-- Undo Button (Future feature) -->
        <v-col cols="12" sm="6" md="4">
          <v-btn
            color="secondary"
            size="x-large"
            block
            disabled
            class="mb-4"
            rounded="lg"
          >
            <v-icon left>mdi-undo</v-icon>
            Undo
          </v-btn>
        </v-col>
        
        <!-- Instructions -->
        <v-col cols="12" class="text-center">
          <div class="control-instructions">
            <v-icon class="mr-2" size="small">mdi-keyboard</v-icon>
            <span class="text-body-1">
              Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to move tiles
            </span>
          </div>
        </v-col>
      </v-row>
      
      <!-- Touch Controls for Mobile -->
      <v-row v-if="isMobile" class="mt-6" justify="center">
        <v-col cols="12">
          <div class="touch-controls">
            <v-btn
              v-for="direction in directions"
              :key="direction.name"
              :color="direction.color"
              size="large"
              @click="makeMove(direction.name)"
              :disabled="gameStatus !== 'playing'"
              class="control-btn"
              rounded="lg"
            >
              <v-icon>{{ direction.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

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
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

.control-instructions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: rgba(25, 118, 210, 0.1);
  border-radius: 8px;
  color: #1976D2;
}

.touch-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  max-width: 240px;
  margin: 0 auto;
}

.control-btn {
  min-width: 70px;
  height: 70px;
  transition: all 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.05);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .control-instructions {
    font-size: 0.875rem;
  }
  
  .touch-controls {
    max-width: 180px;
  }
  
  .control-btn {
    min-width: 50px;
    height: 50px;
  }
}
</style>
