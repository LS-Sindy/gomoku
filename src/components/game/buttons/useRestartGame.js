import { useGameStore } from '../../../stores/game'
import { GAME_STATUS, PIECE_TYPE } from '../../../utils/constants'

export function useRestartGame() {
  const store = useGameStore()

  const handleRestart = () => {
    store.pieces.value = Array(225).fill(null)
    store.currentPlayer.value = PIECE_TYPE.BLACK
    store.gameStatus.value = GAME_STATUS.PLAYING
    store.turnCount.value = 0
    store.moveHistory.value = []
  }

  return {
    handleRestart
  }
}