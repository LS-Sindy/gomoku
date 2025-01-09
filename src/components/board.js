import { GAME_CONSTANTS, PIECE_TYPE } from '../utils/constants'

export class Board {
    constructor(gameLogic, onMove) {
        this.gameLogic = gameLogic
        this.onMove = onMove
        this.element = null
    }

    render() {
        const board = document.createElement('div')
        board.id = 'board'

        for(let i = 0; i < GAME_CONSTANTS.TOTAL_CELLS; i++) {
            const cell = document.createElement('div')
            cell.className = 'grid-cell'
            cell.dataset.row = Math.floor(i / GAME_CONSTANTS.BOARD_SIZE)
            cell.dataset.col = i % GAME_CONSTANTS.BOARD_SIZE
            cell.dataset.piece = PIECE_TYPE.EMPTY
            board.appendChild(cell)
        }

        board.addEventListener('click', this.handleClick.bind(this))
        this.element = board
        return board
    }

    handleClick(e) {
        const cell = e.target.closest('.grid-cell')
        if (!cell) return

        const row = parseInt(cell.dataset.row)
        const col = parseInt(cell.dataset.col)
        const index = row * GAME_CONSTANTS.BOARD_SIZE + col
        const result = this.gameLogic.placePiece(row, col)
        if (result.success) {
            const piece = this.placePiece(row, col, result.nextPiece)
            this.onMove(result, index, result.nextPiece, piece.id)
        }
    }

    placePiece(row, col, pieceType) {
        const cell = this.element.children[row * GAME_CONSTANTS.BOARD_SIZE + col]
        const piece = document.createElement('div')
        piece.className = `piece ${pieceType === PIECE_TYPE.BLACK ? 'black' : 'white'}`
        piece.id = `piece-${row}-${col}`
        cell.appendChild(piece)

        return piece
    }
}