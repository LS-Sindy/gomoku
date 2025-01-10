<script setup>
import { ref } from 'vue'

const emit = defineEmits(['gameStart'])
const nickname = ref('')

const handleSubmit = () => {
  if (nickname.value.trim()) {
    emit('gameStart', nickname.value.trim())
  }
}
</script>

<template>
  <div class="login-container">
    <h1>五子棋</h1>
    <form class="login-form" @submit.prevent="handleSubmit">
      <input
        v-model="nickname"
        type="text"
        placeholder="请输入您的昵称"
        required
      />
      <button type="submit" id="start-game">开始游戏</button>
    </form>
  </div>
</template>