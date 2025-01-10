<script setup>
import { useRestartGame } from './buttons/useRestartGame'
import { useRegretGame } from './buttons/useRegretGame'
import { useSaveGame } from './buttons/useSaveGame'
import { useGiveUpGame } from './buttons/useGiveUpGame'

const props = defineProps({
  playerName: {
    type: String,
    required: true
  }
})

const { handleRestart } = useRestartGame()
const { handleRegret } = useRegretGame()
const { handleSaveGame } = useSaveGame()
const { handleGiveUp } = useGiveUpGame()
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