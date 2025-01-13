<script setup>
import { computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { GAME_STATUS, PIECE_TYPE } from '../../utils/constants'

const store = useGameStore()
const emit = defineEmits(['gameRestarted'])

const handleRestart = () => {
  store.resetGame()
  emit('gameRestarted')
}

const isGameOver = computed(() => {
  return store.isGameOver
})

// 计算获胜者信息
const gameOverMessage = computed(() => {
  if (store.gameStatus === GAME_STATUS.WIN) {
    return `获胜者：${store.currentPlayer === PIECE_TYPE.BLACK ? '白子' : '黑子'}`
  } else if (store.gameStatus === GAME_STATUS.DRAW) {
    return '平局'
  } else if (store.gameStatus === GAME_STATUS.GIVE_UP) {
    return `${store.currentPlayer === PIECE_TYPE.BLACK ? '白子' : '黑子'}获胜（对手认输）`
  }
  return ''
})
</script>

<template>
  <div v-if="store.isGameOver" id="game-over">
    <h2>游戏结束</h2>
    <p>{{ gameOverMessage }}</p>
    <div class="buttons">
      <button @click="handleRestart">重新开始</button>
      <button @click="store.updateGameStatus(GAME_STATUS.PLAYING)">继续游戏</button>
    </div>
  </div>
</template>