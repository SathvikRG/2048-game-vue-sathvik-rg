import { mapState, mapActions } from 'pinia'
import { useGameStore } from '../../stores/gameStore'

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
  computed: {
    ...mapState(useGameStore, ['boardSize']),
    
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
    ...mapActions(useGameStore, ['resetGame', 'clearSavedGame']),
    
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
        const gameStore = useGameStore()
        gameStore.bestScore = 0
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
