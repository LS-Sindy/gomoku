import { useGameStore } from '../../../stores/game'

export function useSaveGame() {
  const store = useGameStore()

  const handleSaveGame = () => {
    const gameState = {
      pieces: store.pieces.value,
      currentPlayer: store.currentPlayer.value,
      turnCount: store.turnCount.value,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('savedGame', JSON.stringify(gameState))
  }

  return {
    handleSaveGame
  }
}