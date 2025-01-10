import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GAME_STATUS, PIECE_TYPE } from '../utils/constants'

export const useGameStore = defineStore('game', () => {
  const pieces = ref(Array(225).fill(null))
  const currentPlayer = ref(PIECE_TYPE.BLACK)
  const gameStatus = ref(GAME_STATUS.PLAYING)
  const turnCount = ref(0)
  const moveHistory = ref([])

  const isGameOver = computed(() => {
    return gameStatus.value !== GAME_STATUS.PLAYING
  })

  function regretMove() {
    if (turnCount.value > 0 && moveHistory.value.length > 0) {
      const lastMove = moveHistory.value.pop()
      
      if (lastMove) {
        pieces.value[lastMove.index] = null
        currentPlayer.value = lastMove.player
        turnCount.value--
        if (isGameOver.value) {
          gameStatus.value = GAME_STATUS.PLAYING
        }
      }
    }
  }

  function placePiece(index) {
    if (pieces.value[index] || isGameOver.value) return false
    
    moveHistory.value.push({
      index,
      player: currentPlayer.value,
      turnCount: turnCount.value
    })
    
    pieces.value[index] = currentPlayer.value
    turnCount.value++
    
    currentPlayer.value = currentPlayer.value === PIECE_TYPE.BLACK 
      ? PIECE_TYPE.WHITE 
      : PIECE_TYPE.BLACK
    
    return true
  }

  return {
    pieces,
    currentPlayer,
    gameStatus,
    turnCount,
    moveHistory,
    isGameOver,
    placePiece,
    regretMove
  }
})