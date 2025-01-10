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
  store.restartGame()
  console.log('重置游戏')
}

const handleGiveUp = () => {
  store.updateGameStatus(GAME_STATUS.GIVE_UP)
  console.log('认输')
}

const handleRegret = () => {
  store.regretMove()
  console.log('悔棋')
}

const handleSaveGame = () => {
  store.saveGame()
  console.log('保存对局')
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