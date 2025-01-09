import { Board } from '../board';
import { GameLogic } from '../../services/game-logic';
import { Storage } from '../../services/Storage';
import { GAME_STATUS, MESSAGES, GAME_CONSTANTS } from '../../utils/constants';
import { GameInfo } from './game-info';
import { PlayerInfo } from './player-info';
import { UpdateStatus } from './update-status';
import { restartGame } from './buttons/restart-game';
import { saveGame } from './buttons/save-game';
import { PIECE_TYPE } from '../../utils/constants';
import { EndGame } from './end-game';

export class GamePage {
    constructor(playerName) {
        this.pieces = Array(GAME_CONSTANTS.TOTAL_CELLS).fill(null).map(() => ({ value: 0, id: null }));
        this.playerName = playerName;
        this.gameLogic = new GameLogic();
        this.status = GAME_STATUS.PLAYING;
        this.updateStatus = new UpdateStatus(this.gameLogic);

        this.gameInfo = new GameInfo(0); 
        this.board = new Board(this.gameLogic, this.handleMove.bind(this));
        this.playerInfo = new PlayerInfo(playerName, this);
    }

    render() {
        const container = document.createElement('div');
        container.className = 'game-container';

        // 游戏信息
        container.appendChild(this.gameInfo.render());

        // 中间游戏主体部分
        const gameMainSection = document.createElement('div');
        gameMainSection.className = 'game-main-section';
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
            <h1>五子棋</h1>
        `;
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.innerHTML = `
            <p>当前玩家：<span id="current-player">黑子</span></p>
        `;
        gameMainSection.appendChild(header);
        gameMainSection.appendChild(this.board.render());
        gameMainSection.appendChild(footer);
        container.appendChild(gameMainSection);

        // 玩家信息
        container.appendChild(this.playerInfo.render());

        return container;
    }

    handleMove(result, index, nextPiece, pieceId) {
        this.updateStatus.updateTurnCount();
        this.updateStatus.updatePieces(this.pieces, index, nextPiece, pieceId);

        if (result.hasWon) {
            this.status = GAME_STATUS.WIN;
            saveGame(
                document.querySelector('#player-name').textContent,
                true,
                document.querySelector('#turn-count').textContent,
                this.gameInfo.startTime,
                document.querySelector('#game-time').textContent,
                nextPiece
            );
            this.endGame(nextPiece, this.gameInfo, this);
        } else if (this.gameInfo.turnCount >= 225) {
            this.status = GAME_STATUS.DRAW;
            saveGame(
                document.querySelector('#player-name').textContent,
                false,
                document.querySelector('#turn-count').textContent,
                this.gameInfo.startTime,
                document.querySelector('#game-time').textContent,
                nextPiece
            );
            this.endGame(nextPiece, this.gameInfo, this);
        }
    }

    endGame(nextPiece, gameInfo, gamePage) {
        const endGameComponent = new EndGame(this.status, nextPiece, gameInfo, gamePage);
        document.querySelector('.game-container').appendChild(endGameComponent.render());
    }

    getGamePage() {
        return {
            pieces: this.pieces,
            status: this.status,
            board: this.board,
        }
    }
}