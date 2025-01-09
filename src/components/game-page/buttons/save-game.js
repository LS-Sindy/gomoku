import { PIECE_TYPE } from '../../../utils/constants';

export function saveGame(playerName, isWin, turnCount, startTime, gameTime, nextPiece) {
    console.log('保存游戏记录');
    const record = {
        nickname: playerName,
        result: isWin ? (nextPiece === PIECE_TYPE.BLACK ? '黑子胜' : '白子胜') : '平局',
        turnCount: turnCount,
        startTime: startTime,
        gameTime: gameTime
    };
    const records = JSON.parse(localStorage.getItem('gameRecords') || '[]');
    records.push(record);
    localStorage.setItem('gameRecords', JSON.stringify(records));
}
