export function regretGame(gameLogic) {
    // 实现悔棋功能
    console.log('悔棋');
    if(gameLogic.allMoves.length > 0) {
        const lastMove = this.allMoves.pop();
        this.pieces[lastMove.row][lastMove.col] = 0;
        this.isBlack = lastMove.isBlack === 1 ? true : false;
        this.currentPlayer.textContent = this.isBlack ? '白子' : '黑子';
        this.turnCount--;
        document.getElementById('turn-count').textContent = this.turnCount;
        const piece = document.getElementById(`piece-${lastMove.row}-${lastMove.col}`);
        if (piece) {
            piece.parentNode.removeChild(piece);
        }
    }
}