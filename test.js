class GomokuTest {
    constructor() {
        this.game = new Gomoku();
        this.testResults = [];
        this.totalGames = 100;
        this.currentGame = 0;
        this.availableMoves = [];
    }

    async playOneGame() {
        console.log(`开始第 ${this.currentGame}/${this.totalGames} 局游戏`);
        
        document.getElementById('restart-button').click();
        await new Promise(resolve => setTimeout(resolve, 100));

        this.initializeAvailableMoves();
        
        this.currentGameResult = {
            gameNumber: this.currentGame,
            moves: [],
            winner: null,
            totalMoves: 0,
            duration: 0
        };

        const startTime = Date.now();

        try {
            while (true) {
                const moveIndex = Math.floor(Math.random() * this.availableMoves.length);
                const [row, col] = this.availableMoves[moveIndex];
                
                this.currentGameResult.moves.push({row, col});
                this.availableMoves.splice(moveIndex, 1);

                const cell = this.findCell(row, col);
                if (!cell) {
                    throw new Error(`无法找到格子 (${row}, ${col})`);
                }

                cell.click();
                await new Promise(resolve => setTimeout(resolve, 50));

                // 检查是否获胜
                const endGameDiv = document.getElementById('end-game');
                if (endGameDiv && endGameDiv.style.display === 'block') {
                    // 直接从winner元素获取获胜者信息
                    this.currentGameResult.winner = document.getElementById('winner').textContent;
                    break;
                }

                // 检查是否平局
                if (this.availableMoves.length === 0) {
                    this.currentGameResult.winner = '平局';
                    break;
                }
            }
        } catch (error) {
            this.currentGameResult.error = error.message;
        }

        this.currentGameResult.totalMoves = this.currentGameResult.moves.length;
        this.currentGameResult.duration = (Date.now() - startTime) / 1000;
        this.testResults.push(this.currentGameResult);

        // 添加每局游戏的结果显示
        console.log(`第 ${this.currentGame} 局游戏结束，获胜方: ${this.currentGameResult.winner}`);
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    initializeAvailableMoves() {
        this.availableMoves = [];
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                this.availableMoves.push([row, col]);
            }
        }
    }

    findCell(row, col) {
        return document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    }

    checkGameEnd() {
        // 通过检查是否有获胜棋子来判断游戏是否结束
        return document.querySelector('.piece.winner') !== null;
    }

    generateReport() {
        console.log('\n=== 测试报告 ===');
        console.log(`总游戏数: ${this.totalGames}`);
        
        // 统计数据
        const completedGames = this.testResults.filter(r => !r.error);
        const errorGames = this.testResults.filter(r => r.error);
        const blackWins = completedGames.filter(r => r.winner === '黑子').length;
        const whiteWins = completedGames.filter(r => r.winner === '白子').length;
        const draws = completedGames.filter(r => r.winner === '平局').length;

        console.log('\n游戏统计:');
        console.log(`完成游戏: ${completedGames.length}`);
        console.log(`出错游戏: ${errorGames.length}`);
        console.log(`黑子胜: ${blackWins}`);
        console.log(`白子胜: ${whiteWins}`);
        console.log(`平局: ${draws}`);

        if (errorGames.length > 0) {
            console.log('\n出错的游戏:');
            errorGames.forEach(game => {
                console.log(`游戏 #${game.gameNumber}: ${game.error}`);
            });
        }
    }

    async runTests() {
        console.log('开始五子棋自动化测试...');
        
        for (let i = 1; i <= this.totalGames; i++) {
            this.currentGame = i;
            await this.playOneGame();
        }
        
        console.log('\n=== 所有测试完成 ===');
        this.generateReport();
    }
}

async function runGomokuTest() {
    const tester = new GomokuTest();
    try {
        await tester.runTests();
        return "所有测试完成！";
    } catch (error) {
        console.error("测试过程中出现错误:", error);
        return "测试失败！";
    }
}

window.startTest = async () => {
    const result = await runGomokuTest();
    return result;
};
