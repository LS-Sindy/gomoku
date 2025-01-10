import { useGameStore } from '../../../stores/game'

export function useRegretGame() {
  const store = useGameStore()

  const handleRegret = () => {
    if (store.turnCount.value > 0 && store.moveHistory.value.length > 0) {
      const lastMove = store.moveHistory.value.pop()
      
      if (lastMove) {
        store.pieces.value[lastMove.index] = null
        store.currentPlayer.value = lastMove.player
        store.turnCount.value--
        if (store.isGameOver.value) {
          store.gameStatus.value = 'PLAYING'
        }
      }
    }
  }

  return {
    handleRegret
  }
}