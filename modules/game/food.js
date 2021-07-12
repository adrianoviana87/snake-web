import { GameComponent } from '../engine/gameComponent.js'
import { Vector2D } from '../engine/vector2d.js'
import { MESSAGES } from './message.js'

export class Food extends GameComponent {
	constructor() {
		super()
		this.name = 'food'
	}

	/** @type {import('./board').Board} **/
	boardRef

	/**
	 * A posição da comida.
	 * @type {Vector2D}
	 */
	position

	/**
	 * Inicializa a comida.
	 * Define sua posição.
	 */
	initialize() {
		this.setPosition()
		this.boardRef = this.game.findComponentByName('board')
	}

	update() {
		const cell = this.boardRef.getCellAt(this.position)
		if (!cell) {
			console.warn(`Celula nao encontrada x: ${this.position.x}, y: ${this.position.y}`)
			return
		}

		cell.classList.add('food')
	}

	onMessageReceived(kind, extraInfo) {
		switch (kind) {
			case MESSAGES.FOOD_EATEN:
				if (extraInfo === this) {
					this.game.removeComponent(this)
					this.boardRef.clear([this.position], 'food')
				}
		}
	}

	/**
	 * Define uma posição aleatória dentro da área de jogo
	 * e que não colide com a snake.
	 */
	setPosition() {
		/** @type {import('./board').Board}*/
		const board = this.game.findComponentByName('board')
		if (!board) {
			throw new Error('A area de jogo não foi encontrada.')
		}

		const pos = Vector2D.generateRandom({
			minX: 0,
			minY: 0,
			maxX: board.width,
			maxY: board.height,
		})

		/** @type {import('./snake').Snake} */
		const snake = this.game.findComponentByName('snake')
		if (!snake) {
			console.warn('snake não encontrada.')
		} else if (snake.collides(pos)) {
			// O ponto gerado está em cima da snake.
			// Tente de novo.
			return this.setPosition()
		}

		this.position = pos
	}
}