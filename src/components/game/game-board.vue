<script setup>
import { useGameStore } from '../../stores/game'
import { useGameLogic } from '../../composables/useGameLogic'
import { watch } from 'vue'
import GameInfo from './game-info.vue'
import PlayerInfo from './player-info.vue'
import { GAME_STATUS, PIECE_TYPE } from '../../utils/constants'
import GameOver from './game-over.vue'

const props = defineProps({
  playerName: {
    type: String,
    required: true
  }
})

const store = useGameStore()
let { checkWin, isBoardFull } = useGameLogic(store.pieces)

watch(() => store.turnCount, (newCount) => {
  if (newCount === 0) {
    const logic = useGameLogic(store.pieces)
    checkWin = logic.checkWin
    isBoardFull = logic.isBoardFull
  }
})

const handleCellClick = (index) => {
  if (store.placePiece(index)) {
    if (checkWin(index)) {
      store.updateGameStatus(GAME_STATUS.WIN)
      const winner = store.currentPlayer === PIECE_TYPE.BLACK ? '白子' : '黑子'
      console.log('游戏结束，' + winner + '获胜')
    } else if (isBoardFull.value) {
      store.updateGameStatus(GAME_STATUS.DRAW)
      console.log('游戏结束，平局')
    }
  }
}
</script>

<template>
  <div class="game-container">
    <game-info />
    
    <div class="game-main-section">
      <h1>五子棋</h1>
      <div id="board">
        <div
          v-for="(piece, index) in store.pieces"
          :key="index"
          class="grid-cell"
          @click="handleCellClick(index)"
        >
          <div
            v-if="piece"
            class="piece"
            :class="piece === 1 ? 'black' : 'white'"
          />
        </div>
      </div>
      <game-over v-if="store.isGameOver" />
      <p>当前玩家：{{ store.currentPlayer === 1 ? '黑子' : '白子' }}</p>
    </div>
 
    <player-info :player-name="playerName" />
  </div>
</template>