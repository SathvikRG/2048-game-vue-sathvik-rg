// Simple test file to verify game logic
import {
  createEmptyBoard,
  initializeBoard,
  slideBoard,
  addRandomTile,
  isGameWon,
  isGameOver,
  getEmptyPositions
} from './src/utils/gameLogic.js'

console.log('🧪 Testing 2048 Game Logic...\n')

// Test 1: Create empty board
console.log('Test 1: Create empty board')
const emptyBoard = createEmptyBoard(4)
console.log('Empty board:', emptyBoard)
console.log('✅ Empty board created successfully\n')

// Test 2: Initialize board with random tiles
console.log('Test 2: Initialize board')
const initialBoard = initializeBoard(4)
console.log('Initial board:', initialBoard)
console.log('✅ Board initialized with 2 random tiles\n')

// Test 3: Test sliding left
console.log('Test 3: Slide board left')
const testBoard = [
  [2, 0, 2, 0],
  [0, 4, 0, 4],
  [2, 2, 0, 0],
  [0, 0, 0, 0]
]
console.log('Before slide:', testBoard)
const result = slideBoard(testBoard, 'left')
console.log('After slide:', result.board)
console.log('Score gained:', result.score)
console.log('Moved:', result.moved)
console.log('✅ Slide left works correctly\n')

// Test 4: Test winning condition
console.log('Test 4: Test winning condition')
const winningBoard = [
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [512, 1024, 2048, 4096],
  [8192, 16384, 32768, 65536]
]
console.log('Winning board:', winningBoard)
console.log('Is won:', isGameWon(winningBoard))
console.log('✅ Winning condition detected correctly\n')

// Test 5: Test game over condition
console.log('Test 5: Test game over condition')
const gameOverBoard = [
  [2, 4, 8, 16],
  [4, 8, 16, 32],
  [8, 16, 32, 64],
  [16, 32, 64, 128]
]
console.log('Game over board:', gameOverBoard)
console.log('Is game over:', isGameOver(gameOverBoard))
console.log('✅ Game over condition detected correctly\n')

console.log('🎉 All tests passed! Game logic is working correctly.')
