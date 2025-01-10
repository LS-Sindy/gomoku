<script setup>
import { useGameStore } from '../../stores/game'
import { GAME_STATUS } from '../../utils/constants'
const props = defineProps({
  playerName: {
    type: String,
    required: true
  }
})

const store = useGameStore()

const handleRestart = () => {
  store.resetGame()
  store.isGameOver = false
  console.log('重置游戏')
}

const handleGiveUp = () => {
  store.updateGameStatus(GAME_STATUS.GIVE_UP)
}

const handleRegret = () => {
  store.regretMove()
}

const handleSaveGame = () => {
  const gameState = {
    pieces: store.pieces,
    currentPlayer: store.currentPlayer,
    turnCount: store.turnCount,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem('savedGame', JSON.stringify(gameState))
}
</script>

<template>
  <div class="player-info">
    <h2>玩家信息</h2>
    <p>昵称：{{ playerName }}</p>
    
    <div class="buttons">
      <button @click="handleRegret">悔棋</button>
      <button @click="handleGiveUp">认输</button>
      <button @click="handleRestart">重新开始</button>
      <button @click="handleSaveGame">保存对局</button>
    </div>
  </div>
</template>