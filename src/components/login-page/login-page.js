import { MESSAGES } from '../../utils/constants';

export class LoginPage {
    constructor({ onGameStart }) {
        this.onGameStart = onGameStart;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'login-container';

        const title = document.createElement('h1');
        title.textContent = MESSAGES.GAME_TITLE;
        
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="login-form">
                <input type="text" id="nickname" placeholder="${MESSAGES.NICKNAME_REQUIRED}" required>
                <button type="submit" id="start-game">${MESSAGES.START_GAME}</button>
            </div>
        `;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nickname = form.querySelector('#nickname').value.trim();
            if (nickname) {
                this.onGameStart(nickname);
            }
        });

        container.appendChild(title);
        container.appendChild(form);
        return container;
    }
}