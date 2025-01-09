export const GAME_CONSTANTS = {
    BOARD_SIZE: 15,
    TOTAL_CELLS: 225, // 15 x 15
    WIN_COUNT: 5      // 连成5子获胜
}

export const PIECE_TYPE = {
    EMPTY: 0,
    BLACK: 1,
    WHITE: 2
}

export const GAME_STATUS = {
    PLAYING: 'playing',
    WIN: 'win',
    DRAW: 'draw'
}

export const MESSAGES = {
    GAME_TITLE: '五子棋',
    NICKNAME_REQUIRED: '请输入您的昵称',
    BLACK_TURN: '黑子',
    WHITE_TURN: '白子',
    BLACK_WIN: '黑子胜',
    WHITE_WIN: '白子胜',
    DRAW: '平局',
    START_GAME: '开始游戏'
}

export const STORAGE_KEYS = {
    GAME_RECORDS: 'gameRecords',
    PLAYER_STATS: 'playerStats'
}