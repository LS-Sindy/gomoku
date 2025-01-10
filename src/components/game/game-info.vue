<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../../stores/game'

const store = useGameStore()

onMounted(() => {
  store.startTimer()
})

onUnmounted(() => {
  store.stopTimer()
})
</script>

<template>
  <div class="game-info">
    <h2>游戏信息</h2>
    <p>回合数：{{ store.turnCount }}</p>
    <p>游戏时间：{{ store.formattedTime }}</p>
  </div>
</template>