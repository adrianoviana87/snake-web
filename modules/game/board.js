import { GameComponent } from '../engine/gameComponent.js'

export class Board extends GameComponent {
	constructor(width, height) {
		super()
		this.width = width
		this.height = height
		this.name = 'board'
	}

	/**
	 * Referência a area de jogo no HTML.
	 * @type {HTMLElement}
	 */
	_ref

	initialize() {
		this._ref = document.getElementById('board')
		const boardRef = this._ref
		boardRef.style.gridTemplateRows = `repeat(${this.height}, 1fr`
		boardRef.style.gridTemplateColumns = `repeat(${this.width}, 1fr`

		boardRef.innerHTML = ''

		const total = this.width * this.height
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const cell = document.createElement('div')
				cell.dataset.y = y
				cell.dataset.x = x
				boardRef.appendChild(cell)
			}
		}
	}

	/**
	 * Remove as classes css das células nas posições indicadas.
	 * @param {Array<import('../engine/vector2d.js').Vector2D>} positions - as posições a serem limpas.
	 * @param {Array<String>} [classNamesToRemove] - as classes css para serem removidas.
	 */
	clear(positions, ...classNamesToRemove) {
		for (const pos of positions) {
			const cell = this.getCellAt(pos)
			if (cell) {
				cell.classList.remove(classNamesToRemove)
			}
		}
	}

	getCellAt({ x, y }) {
		const cell = this._ref.querySelector(`*[data-x='${x}'][data-y='${y}']`)

		return cell
	}
}
