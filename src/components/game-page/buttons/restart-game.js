import { GAME_CONSTANTS, GAME_STATUS } from '../../../utils/constants';

export function restartGame(gameInfo, gamePage) {
    console.log('重新开始游戏');
    gameInfo.turnCount = 0;
    gameInfo.gameTime = '00:00';
    gameInfo.startTime = new Date();
    gamePage.pieces = Array(GAME_CONSTANTS.TOTAL_CELLS).fill(null).map(() => ({ value: 0, id: null }));
    gamePage.status = GAME_STATUS.PLAYING;
    const board = document.getElementById('board');
    if (board) {
        Array.from(board.children).forEach(cell => {
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        });
    }
    gamePage.gameInfo.render();
    const endGameElement = document.querySelector('.end-game');
    if (endGameElement) {
        endGameElement.remove();
    }
    gamePage.gameLogic.reset();
}