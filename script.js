class Gomoku{
    constructor() {
        this.board = document.getElementById('board');
        this.pieces = new Array(15).fill().map(() => new Array(15).fill(0));
        this.currentPlayer = document.getElementById('current-player');
        this.isBlack = true;

        this.initBoard();
        this.addEventListeners();
    }

    initBoard() {
        this.board.innerHTML = '';
        for(let i = 0; i < 225; i++){
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = Math.floor(i / 15);
            cell.dataset.col = i % 15;
            this.board.appendChild(cell);
        }
    }

    addEventListeners() {
        this.board.addEventListener('click', (e) => {
            const cell = e.target.closest('.grid-cell');
            if(!cell) return;

            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            if(!this.pieces[row][col]){
                this.placePiece(row, col, cell);
            }
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.restart();
        })
    }

    placePiece(row, col, cell){
        const piece = document.createElement('div');
        piece.className = `piece ${this.isBlack ? 'black' : 'white'}`;
        cell.appendChild(piece);

        this.pieces[row][col] = this.isBlack ? 1 : 2;
        this.currentPlayer.textContent = this.isBlack ? '白子' : '黑子';

        this.isBlack = !this.isBlack;
    }

    restart() {
        this.pieces = Array(15).fill().map(() => Array(15).fill(0));
        this.isBlack = true;
        this.currentPlayer.textContent = '黑子';
        this.initBoard();
    }
}

new Gomoku();