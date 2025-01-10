<script setup>
import { ref } from 'vue'
import LoginForm from './components/login/login-form.vue'
import GameBoard from './components/game/game-board.vue'

const isLoggedIn = ref(false)
const playerName = ref('')

const handleGameStart = (nickname) => {
  playerName.value = nickname
  isLoggedIn.value = true
}
</script>

<template>
  <div class="container">
    <!-- 使用 v-if 进行组件切换，避免了原代码中的 DOM 操作 -->
    <login-form 
      v-if="!isLoggedIn" 
      @game-start="handleGameStart"
    />
    <game-board 
      v-else 
      :player-name="playerName"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>