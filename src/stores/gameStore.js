import { defineStore } from 'pinia'
import {
  initializeBoard,
  slideBoard,
  addRandomTile,
  isGameWon,
  isGameOver,
  getHighestTile,
  calculateTotalScore
} from '../utils/gameLogic.js'

export const useGameStore = defineStore('game', {
  // State - reactive data
  state: () => ({
    board: initializeBoard(),
    score: 0,
    bestScore: 0,
    gameStatus: 'playing', // 'playing', 'won', 'gameOver'
    boardSize: 4,
    moveCount: 0
  }),

  // Getters - computed values
  getters: {
    highestTile: (state) => getHighestTile(state.board),
    totalScore: (state) => calculateTotalScore(state.board),
    isEmpty: (state) => state.board.every(row => row.every(cell => cell === 0)),
    isFull: (state) => state.board.every(row => row.every(cell => cell !== 0))
  },

  // Actions - methods that modify state
  actions: {
    resetGame(newSize = 4) {
      this.boardSize = newSize
      this.board = initializeBoard(newSize)
      this.score = 0
      this.gameStatus = 'playing'
      this.moveCount = 0
    },

    makeMove(direction) {
      if (this.gameStatus !== 'playing') return false

      const result = slideBoard(this.board, direction)

      if (result.moved) {
        this.board = result.board
        this.score += result.score
        this.moveCount++

        // Update best score
        if (this.score > this.bestScore) {
          this.bestScore = this.score
          localStorage.setItem('2048-best-score', this.bestScore.toString())
        }

        // Add new tile
        this.board = addRandomTile(this.board)

        // Check game status
        if (isGameWon(this.board) && this.gameStatus === 'playing') {
          this.gameStatus = 'won'
        } else if (isGameOver(this.board)) {
          this.gameStatus = 'gameOver'
        }

        return true
      }

      return false
    },

    continueGame() {
      if (this.gameStatus === 'won') {
        this.gameStatus = 'playing'
      }
    },

    loadBestScore() {
      const saved = localStorage.getItem('2048-best-score')
      if (saved) {
        this.bestScore = parseInt(saved, 10)
      }
    },

    saveGame() {
      const gameState = {
        board: this.board,
        score: this.score,
        moveCount: this.moveCount,
        boardSize: this.boardSize,
        timestamp: Date.now()
      }
      localStorage.setItem('2048-game-state', JSON.stringify(gameState))
    },

    loadGame() {
      const saved = localStorage.getItem('2048-game-state')
      if (saved) {
        try {
          const gameState = JSON.parse(saved)
          // Only load if saved within last 24 hours
          if (Date.now() - gameState.timestamp < 24 * 60 * 60 * 1000) {
            this.board = gameState.board
            this.score = gameState.score
            this.moveCount = gameState.moveCount
            this.boardSize = gameState.boardSize
            this.gameStatus = 'playing'
            return true
          }
        } catch (error) {
          console.error('Failed to load game state:', error)
        }
      }
      return false
    },

    clearSavedGame() {
      localStorage.removeItem('2048-game-state')
    }
  }
})
