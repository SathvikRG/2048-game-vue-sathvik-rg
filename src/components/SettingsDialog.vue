<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 pa-4">
        <v-icon class="mr-2">mdi-cog</v-icon>
        Game Settings
      </v-card-title>
      
      <v-card-text class="pa-4">
        <!-- Board Size Selection -->
        <div class="setting-section mb-6">
          <h3 class="text-h6 mb-3">Board Size</h3>
          <v-radio-group
            v-model="selectedBoardSize"
            inline
            class="mt-0"
          >
            <v-radio
              v-for="size in boardSizes"
              :key="size"
              :value="size"
              :label="`${size}x${size}`"
              color="primary"
            ></v-radio>
          </v-radio-group>
          <p class="text-body-2 text-medium-emphasis mt-2">
            Larger boards are more challenging but offer higher scores.
          </p>
        </div>

        <!-- Theme Selection -->
        <div class="setting-section mb-6">
          <h3 class="text-h6 mb-3">Theme</h3>
          <v-radio-group
            v-model="selectedTheme"
            inline
            class="mt-0"
          >
            <v-radio
              value="light"
              label="Light"
              color="primary"
            ></v-radio>
            <v-radio
              value="dark"
              label="Dark"
              color="primary"
            ></v-radio>
          </v-radio-group>
        </div>

        <!-- Game Options -->
        <div class="setting-section mb-6">
          <h3 class="text-h6 mb-3">Game Options</h3>
          <v-switch
            v-model="autoSave"
            label="Auto-save game progress"
            color="primary"
            hide-details
            class="mb-2"
          ></v-switch>
          <v-switch
            v-model="showAnimations"
            label="Enable tile animations"
            color="primary"
            hide-details
            class="mb-2"
          ></v-switch>
        </div>

        <!-- Reset Options -->
        <div class="setting-section">
          <h3 class="text-h6 mb-3">Reset Options</h3>
          <v-btn
            color="warning"
            variant="outlined"
            @click="resetBestScore"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-trophy-remove</v-icon>
            Reset Best Score
          </v-btn>
          <v-btn
            color="error"
            variant="outlined"
            @click="clearAllData"
            class="mb-2"
          >
            <v-icon left>mdi-delete</v-icon>
            Clear All Data
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="saveSettings"
        >
          Save Settings
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'SettingsDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedBoardSize: 4,
      selectedTheme: 'light',
      autoSave: true,
      showAnimations: true,
      boardSizes: [3, 4, 5, 6]
    }
  },
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore
    }
  },
  computed: {
    boardSize() {
      return this.gameStore.boardSize
    },
    
    dialog: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.loadCurrentSettings()
      }
    }
  },
  methods: {
    resetGame(size) {
      this.gameStore.resetGame(size)
    },
    clearSavedGame() {
      this.gameStore.clearSavedGame()
    },
    
    loadCurrentSettings() {
      this.selectedBoardSize = this.boardSize
      this.selectedTheme = this.$vuetify.theme.global.name
      
      // Load other settings from localStorage
      this.autoSave = localStorage.getItem('2048-auto-save') !== 'false'
      this.showAnimations = localStorage.getItem('2048-animations') !== 'false'
    },
    
    saveSettings() {
      // Save board size
      if (this.selectedBoardSize !== this.boardSize) {
        this.resetGame(this.selectedBoardSize)
      }
      
      // Save theme
      this.$vuetify.theme.global.name = this.selectedTheme
      
      // Save other settings
      localStorage.setItem('2048-auto-save', this.autoSave.toString())
      localStorage.setItem('2048-animations', this.showAnimations.toString())
      
      this.dialog = false
    },
    
    cancel() {
      this.dialog = false
    },
    
    resetBestScore() {
      if (confirm('Are you sure you want to reset your best score?')) {
        localStorage.removeItem('2048-best-score')
        this.$store.commit('resetBestScore')
      }
    },
    
    clearAllData() {
      if (confirm('Are you sure you want to clear all game data? This cannot be undone.')) {
        localStorage.removeItem('2048-best-score')
        localStorage.removeItem('2048-game-state')
        localStorage.removeItem('2048-auto-save')
        localStorage.removeItem('2048-animations')
        this.clearSavedGame()
        this.resetGame()
        this.dialog = false
      }
    }
  }
}
</script>

<style scoped>
.setting-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.setting-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.v-radio-group {
  margin-top: 0;
}

.v-switch {
  margin-bottom: 8px;
}

/* Custom radio button styling */
:deep(.v-radio .v-selection-control__input) {
  margin-right: 12px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.25rem;
  }
  
  .setting-section h3 {
    font-size: 1.1rem;
  }
}
</style>
