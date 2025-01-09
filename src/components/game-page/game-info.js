import { UpdateStatus } from './update-status';

export class GameInfo {
    constructor(turnCount) {
        this.turnCount = turnCount;
        this.gameTime = '00:00';
        this.startTime = new Date().toLocaleDateString() + '/' + new Date().toLocaleTimeString();
        this.updateStatus = new UpdateStatus();
    }

    render() {
        this.updateStatus.startTimer();

        const container = document.createElement('div');
        container.className = 'game-info';
        
        container.innerHTML = `
            <h2>游戏信息</h2>
            <p>回合数：<span id="turn-count">0</span></p>
            <p>用时：<span id="game-time">00:00</span></p>
        `;
        return container;
    }

    getGameInfo() {
        return {
            turnCount: this.turnCount,
            gameTime: this.gameTime,
            startTime: this.startTime
        }
    }
}