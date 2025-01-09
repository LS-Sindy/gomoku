import { saveGame } from './buttons/save-game';
import { regretGame } from './buttons/regret-game';
import { giveUpGame } from './buttons/give-up-game';
import { restartGame } from './buttons/restart-game';

export class PlayerInfo {
    constructor(playerName, gamePage) {
        this.playerName = playerName;
        this.gamePage = gamePage;  // 保存 gamePage 实例
        this.wins = 0;
        this.losses = 0;
        this.winRate = 0;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'player-info';
        
        const playerInfo = document.createElement('div');
        playerInfo.innerHTML = `
            <h2>玩家信息</h2>
            <p>昵称：<span id="player-name">${this.playerName}</span></p>
            <p>胜场：<span id="wins">${this.wins}</span></p>
            <p>负场：<span id="losses">${this.losses}</span></p>
            <p>胜率：<span id="win-rate">${this.winRate}%</span></p>
        `;

        const buttons = document.createElement('div');
        buttons.innerHTML = `
            <button id="regret-game">悔棋</button>
            <button id="give-up-game">认输</button>
            <button id="restart-game">重新开始</button>
            <button id="save-game">保存对局</button>
        `;

        buttons.addEventListener('click', (event) => {
            switch (event.target.id) {
                case 'regret-game':
                    regretGame(this.gamePage.gameInfo, this.gamePage);
                    break;
                case 'give-up-game':
                    giveUpGame(this.gamePage.gameInfo, this.gamePage);
                    break;
                case 'restart-game':
                    restartGame(this.gamePage.gameInfo, this.gamePage);
                    break;
                case 'save-game':
                    const playerStats = this.getPlayerInfo();
                    const turnCount = this.gamePage.gameInfo.getTurnCount();
                    const startTime = this.gamePage.gameInfo.getStartTime();
                    const duration = document.querySelector('#game-time').textContent;
                    saveGame(playerStats, false, turnCount, startTime, duration);
                    break;
            }
        });

        container.appendChild(playerInfo);
        container.appendChild(buttons);
        return container;
    }

    getPlayerInfo() {
        return {
            playerName: this.playerName,
            wins: this.wins,
            losses: this.losses,
            winRate: this.winRate
        }
    }
}