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
  const newValue = Math.random() < 0.8 ? 2 : 4 // 80% chance for 2, 20% for 4

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
  const size = board.length
  let newBoard = Array(size).fill(null).map(() => Array(size).fill(0))
  let totalScore = 0
  let moved = false

  switch (direction) {
    case 'left':
      for (let row = 0; row < size; row++) {
        const result = slideRow(board[row])
        newBoard[row] = result.row
        totalScore += result.score
        if (JSON.stringify(board[row]) !== JSON.stringify(result.row)) {
          moved = true
        }
      }
      break

    case 'right':
      for (let row = 0; row < size; row++) {
        const reversedRow = [...board[row]].reverse()
        const result = slideRow(reversedRow)
        newBoard[row] = result.row.reverse()
        totalScore += result.score
        if (JSON.stringify(board[row]) !== JSON.stringify(newBoard[row])) {
          moved = true
        }
      }
      break

    case 'up':
      for (let col = 0; col < size; col++) {
        const column = board.map(row => row[col])
        const result = slideRow(column)
        for (let row = 0; row < size; row++) {
          newBoard[row][col] = result.row[row]
        }
        totalScore += result.score
        if (JSON.stringify(column) !== JSON.stringify(result.row)) {
          moved = true
        }
      }
      break

    case 'down':
      for (let col = 0; col < size; col++) {
        const column = board.map(row => row[col]).reverse()
        const result = slideRow(column)
        const reversedResult = result.row.reverse()
        for (let row = 0; row < size; row++) {
          newBoard[row][col] = reversedResult[row]
        }
        totalScore += result.score
        const originalColumn = board.map(row => row[col])
        const newColumn = newBoard.map(row => row[col])
        if (JSON.stringify(originalColumn) !== JSON.stringify(newColumn)) {
          moved = true
        }
      }
      break
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
