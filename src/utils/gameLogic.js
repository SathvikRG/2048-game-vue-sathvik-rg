/**
 * 2048 Game Logic - Functional Programming Implementation
 * 
 * This module contains pure functions for game mechanics following
 * functional programming principles:
 * - No side effects
 * - Immutable data structures
 * - Pure functions
 * - Predictable behavior
 */

/**
 * Creates a new empty game board
 * @param {number} size - Board size (default: 4)
 * @returns {Array<Array<number>>} Empty board
 */
export const createEmptyBoard = (size = 4) => {
  return Array(size).fill(null).map(() => Array(size).fill(0))
}

/**
 * Gets all empty positions on the board
 * @param {Array<Array<number>>} board - Game board
 * @returns {Array<{row: number, col: number}>} Array of empty positions
 */
export const getEmptyPositions = (board) => {
  const emptyPositions = []
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        emptyPositions.push({ row, col })
      }
    }
  }
  return emptyPositions
}

/**
 * Adds a new tile to a random empty position
 * @param {Array<Array<number>>} board - Game board
 * @returns {Array<Array<number>>} New board with added tile
 */
export const addRandomTile = (board) => {
  const emptyPositions = getEmptyPositions(board)
  if (emptyPositions.length === 0) return board

  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
  const newValue = Math.random() < 0.9 ? 2 : 4 // 90% chance for 2, 10% for 4
  
  return board.map((row, rowIndex) => 
    row.map((cell, colIndex) => 
      rowIndex === randomPosition.row && colIndex === randomPosition.col ? newValue : cell
    )
  )
}

/**
 * Initializes a new game board with two random tiles
 * @param {number} size - Board size (default: 4)
 * @returns {Array<Array<number>>} Initialized board
 */
export const initializeBoard = (size = 4) => {
  let board = createEmptyBoard(size)
  board = addRandomTile(board)
  board = addRandomTile(board)
  return board
}

/**
 * Rotates the board 90 degrees clockwise
 * @param {Array<Array<number>>} board - Game board
 * @returns {Array<Array<number>>} Rotated board
 */
export const rotateBoard = (board) => {
  const size = board.length
  return Array(size).fill(null).map((_, row) =>
    Array(size).fill(null).map((_, col) => board[size - 1 - col][row])
  )
}

/**
 * Slides a row to the left and merges tiles
 * @param {Array<number>} row - Row to slide
 * @returns {Object} {row: Array<number>, score: number} - New row and score gained
 */
export const slideRow = (row) => {
  // Remove zeros
  const filtered = row.filter(cell => cell !== 0)
  
  // Merge adjacent equal tiles
  const merged = []
  let score = 0
  
  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2
      merged.push(mergedValue)
      score += mergedValue
      i++ // Skip next tile as it's merged
    } else {
      merged.push(filtered[i])
    }
  }
  
  // Pad with zeros
  while (merged.length < row.length) {
    merged.push(0)
  }
  
  return { row: merged, score }
}

/**
 * Slides the board in a specific direction
 * @param {Array<Array<number>>} board - Game board
 * @param {string} direction - 'up', 'down', 'left', 'right'
 * @returns {Object} {board: Array<Array<number>>, score: number, moved: boolean}
 */
export const slideBoard = (board, direction) => {
  let rotatedBoard = board
  let rotations = 0
  
  // Rotate board to make all directions work as "left"
  switch (direction) {
    case 'up':
      rotatedBoard = rotateBoard(board)
      rotations = 3
      break
    case 'down':
      rotatedBoard = rotateBoard(rotateBoard(rotateBoard(board)))
      rotations = 1
      break
    case 'right':
      rotatedBoard = rotateBoard(rotateBoard(board))
      rotations = 2
      break
    case 'left':
    default:
      rotatedBoard = board
      rotations = 0
      break
  }
  
  // Slide all rows
  let newBoard = []
  let totalScore = 0
  let moved = false
  
  for (let i = 0; i < rotatedBoard.length; i++) {
    const result = slideRow(rotatedBoard[i])
    newBoard.push(result.row)
    totalScore += result.score
    
    // Check if this row moved
    if (JSON.stringify(rotatedBoard[i]) !== JSON.stringify(result.row)) {
      moved = true
    }
  }
  
  // Rotate back to original orientation
  for (let i = 0; i < rotations; i++) {
    newBoard = rotateBoard(newBoard)
  }
  
  return { board: newBoard, score: totalScore, moved }
}

/**
 * Checks if the game is won (reached 2048)
 * @param {Array<Array<number>>} board - Game board
 * @returns {boolean} True if won
 */
export const isGameWon = (board) => {
  return board.some(row => row.some(cell => cell === 2048))
}

/**
 * Checks if the game is over (no moves possible)
 * @param {Array<Array<number>>} board - Game board
 * @returns {boolean} True if game over
 */
export const isGameOver = (board) => {
  // Check if there are empty cells
  if (getEmptyPositions(board).length > 0) {
    return false
  }
  
  // Check if any adjacent cells can merge
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const current = board[row][col]
      
      // Check right neighbor
      if (col < board[row].length - 1 && board[row][col + 1] === current) {
        return false
      }
      
      // Check bottom neighbor
      if (row < board.length - 1 && board[row + 1][col] === current) {
        return false
      }
    }
  }
  
  return true
}

/**
 * Gets the highest tile value on the board
 * @param {Array<Array<number>>} board - Game board
 * @returns {number} Highest tile value
 */
export const getHighestTile = (board) => {
  return Math.max(...board.flat())
}

/**
 * Calculates the total score based on all tiles
 * @param {Array<Array<number>>} board - Game board
 * @returns {number} Total score
 */
export const calculateTotalScore = (board) => {
  return board.flat().reduce((sum, cell) => sum + cell, 0)
}
