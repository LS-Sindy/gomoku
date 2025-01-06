class Gomoku {
    constructor() {
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');
        this.pieces = new Array(15).fill(0).map(() => new Array(15).fill(0));
        this.gridSize = 40;
        this.currentPlayer = document.getElementById('current-player');
        this.isBlack = true;

        this.initBoard();
        this.addEventListeners();
    }

    initBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < 15; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.gridSize / 2, (i + 0.5) * this.gridSize);
            this.ctx.lineTo(this.gridSize * 14.5, (i + 0.5) * this.gridSize);
            this.ctx.stroke();
        }

        for (let i = 0; i < 15; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo((i + 0.5) * this.gridSize, this.gridSize / 2);
            this.ctx.lineTo((i + 0.5) * this.gridSize, this.gridSize * 14.5);
            this.ctx.stroke();
        }
    }

    addEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const row = Math.round((y - 0.5 * this.gridSize) / this.gridSize);
            const col = Math.round((x - 0.5 * this.gridSize) / this.gridSize);
            
            if(row >= 0 && row < 15 && col >= 0 && col < 15 && !this.pieces[row][col]){
                this.placePiece(row, col);
            }
        });

        document.getElementById('restart-button').addEventListener(
            'click', () => {
                this.restart();
            });
    }

    placePiece(row, col) {
        const centerX = (col + 0.5) * this.gridSize;
        const centerY = (row + 0.5) * this.gridSize;

        this.ctx.beginPath();
        this.ctx.arc(centerX, 
            centerY, 
            this.gridSize / 2 - 2, 
            0, 
            Math.PI * 2
        );
        this.ctx.fillStyle = this.isBlack ? '#000' : '#fff';
        this.ctx.fill();
        this.pieces[row][col] = this.isBlack ? 1 : 2;
        this.ctx.strokeStyle = this.isBlack ? '#000' : '#666';
        this.ctx.stroke();

        this.isBlack = !this.isBlack;
    }

    restart() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pieces = Array(15).fill().map(() => Array(15).fill(0));
        this.isBlack = true;
        this.currentPlayer.textContent = '黑子';
        this.initBoard();
    }
}

new Gomoku();