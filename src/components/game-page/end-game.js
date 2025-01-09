import { GAME_STATUS, PIECE_TYPE } from '../../utils/constants';
import { restartGame } from './buttons/restart-game';

export class EndGame {
    constructor(status, nextPiece, gameInfo, gamePage) {
        this.status = status;
        this.nextPiece = nextPiece;
        this.gameInfo = gameInfo;
        this.gamePage = gamePage;
    }

    render() {
        const endGame = document.createElement('div');
        endGame.className = 'end-game';
        
        const message = this.status === GAME_STATUS.WIN 
            ? `获胜者：${this.nextPiece === PIECE_TYPE.BLACK ? '黑子' : '白子'}`
            : '游戏平局';

        endGame.innerHTML = `
            <div id="end-game" style="display: block;">
                <p>游戏结束</p>
                <p>${message}</p>
                <button id="restart-game">重新开始</button>
                <button id="continue-game">继续游戏</button>
            </div>
        `;

        this.addEventListeners(endGame);
        return endGame;
    }

    addEventListeners(element) {
        element.querySelector('#restart-game').addEventListener('click', () => {
            restartGame(this.gameInfo, this.gamePage);
        });
        
        element.querySelector('#continue-game').addEventListener('click', () => {
            element.remove();
            this.gamePage.status = GAME_STATUS.PLAYING
        });
    }
}