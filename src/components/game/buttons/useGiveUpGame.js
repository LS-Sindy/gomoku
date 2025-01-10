import { useGameStore } from '../../../stores/game'

export function useGiveUpGame() {
  const store = useGameStore()

  const handleGiveUp = () => {
    store.gameStatus.value = 'GIVE_UP'
    store.winner = store.currentPlayer.value === 1 ? 2 : 1
  }

  return {
    handleGiveUp
  }
}