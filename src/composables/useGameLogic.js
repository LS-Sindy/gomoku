import { computed } from 'vue'

export function useGameLogic(pieces) {
  const isValidPosition = (row, col) => {
    return row >= 0 && row < 15 && col >= 0 && col < 15
  }

  const getPiece = (index) => {
    if (!pieces || index < 0 || index >= 225) return null
    return pieces[index]
  }

  const checkWin = (index) => {
    if (!pieces || index < 0 || index >= 225) return false

    const currentPiece = getPiece(index)
    if (currentPiece === null) return false

    const row = Math.floor(index / 15)
    const col = index % 15

    const directions = [
      [[0, 1], [0, -1]],   // 水平
      [[1, 0], [-1, 0]],   // 垂直
      [[1, 1], [-1, -1]],  // 对角线
      [[1, -1], [-1, 1]]   // 反对角线
    ]

    return directions.some(direction => {
      let count = 1

      for (const [dx, dy] of direction) {
        let newRow = row
        let newCol = col

        while (true) {
          newRow += dx
          newCol += dy

          if (!isValidPosition(newRow, newCol)) break

          const newIndex = newRow * 15 + newCol

          if (getPiece(newIndex) !== currentPiece) break
          
          count++
        }
      }
      
      return count >= 5
    })
  }

  const isBoardFull = computed(() => {
    return pieces && !pieces.includes(null)
  })

  return {
    checkWin,
    isBoardFull
  }
}