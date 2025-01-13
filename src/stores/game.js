import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GAME_STATUS } from '../utils/constants'

export const useGameStore = defineStore('game', () => {
  const pieces = ref(Array(225).fill(null))
  const currentPlayer = ref(1)  // 1: 黑, 2: 白
  const gameStatus = ref(GAME_STATUS.PLAYING)
  const turnCount = ref(0)
  const gameTime = ref(0)
  const moveHistory = ref([])
  let timer = null

  // 计算属性：判断游戏是否结束
  const isGameOver = computed(() => {
    return gameStatus.value !== GAME_STATUS.PLAYING
  })

  function updateGameStatus(status) {
    gameStatus.value = status
    if (status !== GAME_STATUS.PLAYING) {
      stopTimer()
    }
  }

  function placePiece(index) {
    if (pieces.value[index] || isGameOver.value) {
      return false
    }
    
    moveHistory.value.push({
      index,
      player: currentPlayer.value,
      turnCount: turnCount.value
    })
    
    pieces.value[index] = currentPlayer.value
    turnCount.value++
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
    
    return true
  }

  function startTimer() {
    timer = setInterval(() => {
      gameTime.value++
    }, 1000)
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const formattedTime = computed(() => {
    const minutes = Math.floor(gameTime.value / 60)
    const seconds = gameTime.value % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  function resetGame() {
    stopTimer()
    pieces.value = Array(225).fill(null)
    currentPlayer.value = 1
    gameStatus.value = GAME_STATUS.PLAYING
    turnCount.value = 0
    gameTime.value = 0
    moveHistory.value = []
    localStorage.removeItem('savedGame')
    startTimer()
  }

  function regretMove() {
    if(moveHistory.value.length > 0 && turnCount.value > 0) {
      const lastMove = moveHistory.value.pop();
      pieces.value[lastMove.index] = null;
      currentPlayer.value = lastMove.player;
      turnCount.value--;
      isGameOver.value = false
      if (gameStatus.value !== 'PLAYING') {
        gameStatus.value = 'PLAYING'
      }
    }
  }

  function saveGame() {
    const gameState = {
      pieces: pieces.value,
      currentPlayer: currentPlayer.value,
      turnCount: turnCount.value,
      gameStatus: gameStatus.value,
      gameTime: gameTime.value,
      moveHistory: moveHistory.value,
    };
    localStorage.setItem('savedGame', JSON.stringify(gameState));
  }

  function loadSavedGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
      const gameState = JSON.parse(savedGame)
      pieces.value = gameState.pieces
      currentPlayer.value = gameState.currentPlayer
      turnCount.value = gameState.turnCount
      gameStatus.value = gameState.gameStatus
      gameTime.value = gameState.gameTime
      moveHistory.value = gameState.moveHistory
      
      // 如果游戏状态是进行中，重新启动计时器
      if (gameStatus.value === GAME_STATUS.PLAYING) {
        stopTimer()
        startTimer()
      }
      return true
    }
    return false
  }

  return {
    pieces,
    currentPlayer,
    gameStatus,
    turnCount,
    gameTime,
    formattedTime,
    isGameOver,
    placePiece,
    startTimer,
    stopTimer,
    resetGame,
    regretMove,
    updateGameStatus,
    loadSavedGame,
    saveGame,
  }
})