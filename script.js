class Gomoku{
    constructor() {
        this.board = document.getElementById('board');
        this.pieces = new Array(15).fill().map(() => new Array(15).fill(0));
        this.currentPlayer = document.getElementById('current-player');
        this.isBlack = true;
        this.turnCount = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.allMoves = [];
        this.playerStats = {
            nickname: '',
            wins: 0,
            loses: 0
        };

        this.initLoginPage();
        this.initBoard();
        this.addEventListeners();
    }

    initLoginPage() {
        const loginPage = document.getElementById('start-game');
        loginPage.addEventListener('click', () => {
            const nickname = document.getElementById('nickname').value.trim();
            if(nickname) {
                this.playerStats.nickname = nickname;
                this.allMoves = [];
                this.startGame();
                document.getElementById('warning').style.display = 'none';
            } else {
                document.getElementById('warning').style.display = 'block';
                document.getElementById('nickname').value = '';
            }
        });
    }

    startGame() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('game-page').style.display = 'flex';
        document.getElementById('player-name').textContent = this.playerStats.nickname;
        this.startTime = new Date();
        this.startTimer();
        this.updateStats();
        this.initBoard();
        this.addEventListeners();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const nowTime = new Date();
            const timeElapsed = Math.floor((nowTime - this.startTime) / 1000);
            const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (timeElapsed % 60).toString().padStart(2, '0');
            document.getElementById('game-time').textContent = `${minutes}:${seconds}`;
        }, 1000);
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

        document.getElementById('regret-button').addEventListener('click', () => {
            this.regret();
        });

        document.getElementById('give-up-button').addEventListener('click', () => {
            this.giveUp();
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.restart();
        });

        document.getElementById('continue-button').addEventListener('click', () => {
            this.continueGame();
        });

        document.getElementById('save-button').addEventListener('click', () => {
            this.saveGameRecord(false);
        });
    }

    placePiece(row, col, cell){
        const piece = document.createElement('div');
        piece.className = `piece ${this.isBlack ? 'black' : 'white'}`;
        cell.appendChild(piece);

        const pieceId = `piece-${row}-${col}`;
        piece.id = pieceId;

        this.turnCount++;
        document.getElementById('turn-count').textContent = this.turnCount;

        this.pieces[row][col] = this.isBlack ? 1 : 2;
        this.currentPlayer.textContent = this.isBlack ? '白子' : '黑子';

        this.allMoves.push({
            row: row,
            col: col,
            isBlack: this.isBlack ? 1 : 2
        });

        if (this.checkWin(row, col)) {
            const winner = this.isBlack ? '黑子' : '白子';
            document.getElementById('winner').textContent = winner;
            document.getElementById('end-game').style.display = 'block';
            this.updateGameResult(this.isBlack);
            this.saveGameRecord(this.checkWin(row, col));
            return;
        }

        this.isBlack = !this.isBlack;
    }

    updateGameResult(isWin) {
        if(isWin) {
            this.playerStats.wins++;
        } else {
            this.playerStats.loses++;
        }
        this.updateStats();
    }

    updateStats() {
        document.getElementById('wins').textContent = this.playerStats.wins;
        document.getElementById('losses').textContent = this.playerStats.loses;
        document.getElementById('player-name').textContent = this.playerStats.nickname;
        const total = this.playerStats.wins + this.playerStats.loses;
        document.getElementById('win-rate').textContent = total > 0 ? `${Math.round(this.playerStats.wins / total * 100)}%` : '0%';
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

    regret() {
        // 实现悔棋功能
        console.log('悔棋');
        if(this.allMoves.length > 0) {
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

    giveUp() {
        // 实现认输功能
        console.log('认输');
    }

    restart() {
        // 重新开始游戏
        console.log('重新开始游戏');
        this.pieces = Array(15).fill().map(() => Array(15).fill(0));
        document.getElementById('end-game').style.display = 'none';
        this.isBlack = true;
        this.currentPlayer.textContent = '黑子';
        this.initBoard();
        this.turnCount = 0;
        document.getElementById('turn-count').textContent = '0';
        clearInterval(this.timerInterval);
        this.startTime = new Date();
        this.startTimer();
        document.getElementById('game-time').textContent = '00:00';
    }

    continueGame() {
        // 实现继续游戏
        console.log('继续游戏');
        document.getElementById('end-game').style.display = 'none';
    }

    saveGameRecord(isWin) {
        // 保存游戏记录
        console.log('保存游戏记录');
        const record = {
            nickname: this.playerStats.nickname,
            result: isWin ? (this.isBlack ? '黑子胜' : '白子胜') : '平局',
            turnCount: this.turnCount,
            duration: document.getElementById('game-time').textContent,
            date: new Date().toLocaleDateString() + '/' + this.startTime.toLocaleTimeString()
        };
        const records = JSON.parse(localStorage.getItem('gameRecords') || '[]');
        records.push(record);
        localStorage.setItem('gameRecords', JSON.stringify(records));
    }
}

new Gomoku();