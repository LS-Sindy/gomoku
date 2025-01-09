import './style.css'
import { GamePage } from './components/game-page/game-page'
import { LoginPage } from './components/login-page/login-page'

class App {
    constructor() {
        this.app = document.getElementById('app');
        this.init();
    }

    init() {
        const loginPage = new LoginPage({
            onGameStart: (nickname) => this.startGame(nickname)
        });
        this.app.appendChild(loginPage.render());
    }

    startGame(nickname) {
        this.app.innerHTML = '';
        const gamePage = new GamePage(nickname);
        this.app.appendChild(gamePage.render());
    }
}

new App();