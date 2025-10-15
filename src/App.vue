<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      elevation="4"
    >
      <v-toolbar-title class="text-h4 font-weight-bold">
        <v-icon left size="large">mdi-grid</v-icon>
        2048
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn
        icon
        @click="toggleTheme"
        class="mr-2"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
      
      <v-btn
        icon
        @click="showSettings = true"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6" max-width="60%">
        <GameHeader class="mb-6" />
        <v-row justify="center">
          <v-col cols="10">
            <!-- Game Header -->

            <!-- Game Board -->
            <GameBoard class="mb-6" />
            <!-- Game Controls -->
            <GameControls class="mb-6" />

            <!-- Game Status -->
            <GameStatus />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Settings Dialog -->
    <SettingsDialog v-model="showSettings" />

    <!-- Game Over Dialog -->
    <GameOverDialog />
  </v-app>
</template>

<script>
import { useGameStore } from './stores/gameStore'
import GameHeader from './components/GameHeader/index.vue'
import GameBoard from './components/GameBoard/index.vue'
import GameControls from './components/GameControls/index.vue'
import GameStatus from './components/GameStatus/index.vue'
import SettingsDialog from './components/SettingsDialog/index.vue'
import GameOverDialog from './components/GameOverDialog/index.vue'

export default {
  name: 'App',
  components: {
    GameHeader,
    GameBoard,
    GameControls,
    GameStatus,
    SettingsDialog,
    GameOverDialog
  },
  data() {
    return {
      showSettings: false,
      isDark: false,
      autoSaveInterval: null
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
    loadGame() {
      return this.gameStore.loadGame()
    },
    resetGame() {
      this.gameStore.resetGame()
    },
    saveGame() {
      this.gameStore.saveGame()
    },
    makeMove(direction) {
      this.gameStore.makeMove(direction)
    },
    
    toggleTheme() {
      this.isDark = !this.isDark
      this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light'
    },
    
    handleKeyPress(event) {
      if (this.gameStatus !== 'playing') return
      
      const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        's': 'down',
        'a': 'left',
        'd': 'right'
      }
      
      const direction = keyMap[event.key]
      if (direction) {
        event.preventDefault()
        this.makeMove(direction)
      }
    }
  },
  mounted() {
    // Try to load saved game
    if (!this.loadGame()) {
      this.resetGame()
    }
    
    // Add keyboard listeners
    window.addEventListener('keydown', this.handleKeyPress)
    
    // Auto-save game every 30 seconds
    this.autoSaveInterval = setInterval(() => {
      if (this.gameStatus === 'playing') {
        this.saveGame()
      }
    }, 30000)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 600px;
}
</style>
