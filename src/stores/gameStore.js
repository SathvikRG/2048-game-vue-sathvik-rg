import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  initializeBoard,
  slideBoard,
  addRandomTile,
  isGameWon,
  isGameOver,
  getHighestTile,
  calculateTotalScore
} from '../utils/gameLogic.js'

export const useGameStore = defineStore('game', () => {
  // State
  const board = ref(initializeBoard())
  const score = ref(0)
  const bestScore = ref(0)
  const gameStatus = ref('playing') // 'playing', 'won', 'gameOver'
  const boardSize = ref(4)
  const moveCount = ref(0)

  // Getters (Computed)
  const highestTile = computed(() => getHighestTile(board.value))
  const totalScore = computed(() => calculateTotalScore(board.value))
  const isEmpty = computed(() => board.value.every(row => row.every(cell => cell === 0)))
  const isFull = computed(() => board.value.every(row => row.every(cell => cell !== 0)))

  // Actions
  const resetGame = (newSize = 4) => {
    boardSize.value = newSize
    board.value = initializeBoard(newSize)
    score.value = 0
    gameStatus.value = 'playing'
    moveCount.value = 0
  }

  const makeMove = (direction) => {
    if (gameStatus.value !== 'playing') return false

    const result = slideBoard(board.value, direction)
    
    if (result.moved) {
      board.value = result.board
      score.value += result.score
      moveCount.value++
      
      // Update best score
      if (score.value > bestScore.value) {
        bestScore.value = score.value
        localStorage.setItem('2048-best-score', bestScore.value.toString())
      }
      
      // Add new tile
      board.value = addRandomTile(board.value)
      
      // Check game status
      if (isGameWon(board.value) && gameStatus.value === 'playing') {
        gameStatus.value = 'won'
      } else if (isGameOver(board.value)) {
        gameStatus.value = 'gameOver'
      }
      
      return true
    }
    
    return false
  }

  const continueGame = () => {
    if (gameStatus.value === 'won') {
      gameStatus.value = 'playing'
    }
  }

  const loadBestScore = () => {
    const saved = localStorage.getItem('2048-best-score')
    if (saved) {
      bestScore.value = parseInt(saved, 10)
    }
  }

  const saveGame = () => {
    const gameState = {
      board: board.value,
      score: score.value,
      moveCount: moveCount.value,
      boardSize: boardSize.value,
      timestamp: Date.now()
    }
    localStorage.setItem('2048-game-state', JSON.stringify(gameState))
  }

  const loadGame = () => {
    const saved = localStorage.getItem('2048-game-state')
    if (saved) {
      try {
        const gameState = JSON.parse(saved)
        // Only load if saved within last 24 hours
        if (Date.now() - gameState.timestamp < 24 * 60 * 60 * 1000) {
          board.value = gameState.board
          score.value = gameState.score
          moveCount.value = gameState.moveCount
          boardSize.value = gameState.boardSize
          gameStatus.value = 'playing'
          return true
        }
      } catch (error) {
        console.error('Failed to load game state:', error)
      }
    }
    return false
  }

  const clearSavedGame = () => {
    localStorage.removeItem('2048-game-state')
  }

  // Initialize
  loadBestScore()

  return {
    // State
    board,
    score,
    bestScore,
    gameStatus,
    boardSize,
    moveCount,
    
    // Getters
    highestTile,
    totalScore,
    isEmpty,
    isFull,
    
    // Actions
    resetGame,
    makeMove,
    continueGame,
    loadBestScore,
    saveGame,
    loadGame,
    clearSavedGame
  }
})
