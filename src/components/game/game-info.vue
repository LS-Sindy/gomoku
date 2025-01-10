<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../../stores/game'

const store = useGameStore()
const gameTime = ref(0)
let timer

onMounted(() => {
  timer = setInterval(() => {
    gameTime.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="game-info">
    <h2>游戏信息</h2>
    <p>回合数：{{ store.turnCount }}</p>
    <p>游戏时间：{{ formatTime(gameTime) }}</p>
  </div>
</template>