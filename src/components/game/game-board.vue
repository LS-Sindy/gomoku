<script setup>
import { useGameStore } from '../../stores/game'
import { useGameLogic } from '../../composables/useGameLogic'
import GameInfo from './game-info.vue'
import PlayerInfo from './player-info.vue'
import { useRestartGame } from './buttons/useRestartGame'
import { GAME_STATUS, PIECE_TYPE } from '../../utils/constants'

const props = defineProps({
  playerName: {
    type: String,
    required: true
  }
})

const store = useGameStore()
const { checkWin, isBoardFull } = useGameLogic(store.pieces)
const { handleRestart } = useRestartGame()

const handleCellClick = (index) => {
  if (store.placePiece(index)) {
    const result = checkWin(index)
    if (result) {
      store.gameStatus = GAME_STATUS.WIN
      const winner = store.currentPlayer === PIECE_TYPE.BLACK ? '白子' : '黑子'
      console.log('游戏结束，' + winner + '获胜')
    } else if (isBoardFull.value) {
      store.gameStatus = GAME_STATUS.DRAW
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
      <p>当前玩家：{{ store.currentPlayer === 1 ? '黑子' : '白子' }}</p>
    </div>

    <player-info :player-name="playerName" />
  </div>
</template>