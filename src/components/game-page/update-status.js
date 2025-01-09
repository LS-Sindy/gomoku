import { GAME_STATUS, MESSAGES } from '../../utils/constants';

export class UpdateStatus {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;
        this.startTime = new Date();
        this.gameTime = '00:00';
        this.turnCount = 0;
        this.timerInterval = null;
    }

    startTimer() {
        this.stopTimer();
        
        this.timerInterval = setInterval(() => {
            const nowTime = new Date();
            const timeElapsed = Math.floor((nowTime - this.startTime) / 1000);
            const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (timeElapsed % 60).toString().padStart(2, '0');
            this.gameTime = `${minutes}:${seconds}`;
            
            const gameTimeSpan = document.getElementById('game-time');
            if (gameTimeSpan) {
                gameTimeSpan.textContent = this.gameTime;
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.stopTimer();
        this.startTime = new Date();
        this.gameTime = '00:00';
    }

    updateTurnCount() {
        this.turnCount++;
        const turnCountSpan = document.getElementById('turn-count');
        if (turnCountSpan) {
            turnCountSpan.textContent = this.turnCount;
        }
    }

    updatePieces(moves, index, nextPiece, pieceId) {
        moves[index].value = nextPiece;
        moves[index].id = pieceId
        const piece = document.querySelector(`.piece[data-id="${pieceId}"]`)
        if (piece) {
            piece.classList.add('selected')
        }
    }
}