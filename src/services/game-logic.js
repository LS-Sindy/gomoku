import { GAME_CONSTANTS, PIECE_TYPE } from '../utils/constants';

export class GameLogic {
    constructor() {
        this.pieces = Array(15).fill().map(() => Array(15).fill(0));
        this.isBlack = true;
    }

    placePiece(row, col) {
        if (this.pieces[row][col] !== 0) return false
        
        this.pieces[row][col] = this.isBlack ? 1 : 2
        
        const hasWon = this.checkWin(row, col)
        this.isBlack = !this.isBlack
        
        return {
            success: true,
            hasWon,
            nextPiece: !this.isBlack ? PIECE_TYPE.BLACK : PIECE_TYPE.WHITE
        }
    }

    checkWin(row, col) {
        const directions = [
            [[0, 1], [0, -1]],   // 水平
            [[1, 0], [-1, 0]],   // 垂直
            [[1, 1], [-1, -1]],  // 对角线
            [[1, -1], [-1, 1]]   // 反对角线
        ];
    
        const currentPiece = this.pieces[row][col];
    
        return directions.some(direction => {
            let count = 1;
            direction.forEach(([dx, dy]) => {
                let x = row + dx;
                let y = col + dy;
                while (
                    x >= 0 && x < 15 &&
                    y >= 0 && y < 15 &&
                    this.pieces[x][y] === currentPiece
                ) {
                    count++;
                    x += dx;
                    y += dy;
                }
            });
            return count >= 5;
        });
    }

    reset() {
        this.isBlack = true;
        this.pieces = Array(15).fill().map(() => Array(15).fill(0));
    }
}