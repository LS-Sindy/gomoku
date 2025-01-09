export class Storage {
    static saveGameRecord(record) {
        const records = this.getGameRecords()
        records.push(record)
        localStorage.setItem('gameRecords', JSON.stringify(records))
    }

    static getGameRecords() {
        return JSON.parse(localStorage.getItem('gameRecords') || '[]')
    }

    static savePlayerStats(stats) {
        localStorage.setItem('playerStats', JSON.stringify(stats))
    }

    static getPlayerStats() {
        return JSON.parse(localStorage.getItem('playerStats') || '{}')
    }
}