import { computed } from 'vue'

export function useGameLogic(pieces) {
  // 检查坐标是否在棋盘范围内
  const isValidPosition = (row, col) => {
    return row >= 0 && row < 15 && col >= 0 && col < 15
  }

  // 获取指定位置的棋子，修改访问方式
  const getPiece = (index) => {
    if (!pieces || index < 0 || index >= 225) return null
    return pieces[index]
  }

  const checkWin = (index) => {
    // 修改验证逻辑
    if (!pieces || index < 0 || index >= 225) return false

    const currentPiece = getPiece(index)
    // 如果当前位置没有棋子，直接返回 false
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

      // 检查每个方向
      for (const [dx, dy] of direction) {
        let newRow = row
        let newCol = col

        // 沿着当前方向检查
        while (true) {
          newRow += dx
          newCol += dy

          // 如果不是有效位置，停止检查
          if (!isValidPosition(newRow, newCol)) break

          // 计算新的索引
          const newIndex = newRow * 15 + newCol
          
          // 如果新位置的棋子与当前棋子不同，停止检查
          if (getPiece(newIndex) !== currentPiece) break
          
          count++
        }
      }
      
      return count >= 5
    })
  }

  const isBoardFull = computed(() => {
    // 修改访问方式
    return pieces && !pieces.includes(null)
  })

  return {
    checkWin,
    isBoardFull
  }
}