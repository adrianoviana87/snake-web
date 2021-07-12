import { GameComponent } from '../engine/gameComponent.js'
import { Vector2D } from '../engine/vector2d.js'
import { KEY } from '../engine/key.js'
import { DIRECTION } from './direction.js'
import { Board } from './board.js'
import { MESSAGES } from './message.js'

/** @typedef {import('./food').Food} Food **/

export class Snake extends GameComponent {
	constructor() {
		super()
		this.name = 'snake'
	}

	/**
	 * A area de jogo da snake.
	 * @type {Board}
	 */
	board

	/**
	 * A direção em que a snake está andando.
	 * @type {DIRECTION}
	 */
	direction

	/**
	 * O corpo da snake.
	 * @type {Array<Vector2D>} 
	 */
	body = []

	/**
	 * Inicializa a snake.
	 */
	initialize() {
		this.board = this.game.findComponentByName('board')
		this.direction = DIRECTION.RIGHT

		this.body.push(new Vector2D(0, 0))
		this.body.push(new Vector2D(1, 0))
		this.body.push(new Vector2D(2, 0))
		this.body.push(new Vector2D(3, 0))
	}

	/**
	 * Atualiza a lógica do componente.
	 * @param {import('../engine/gameTime.js').GameTime} time
	 */
	update(time) {
		if (this.isOffscreen() || this.isOverlappingItself()) {
			this.game.sendMessage(MESSAGES.GAME_OVER)
			this.isEnabled = false
			return
		}

		this.clear()
		this.setDirection()

		const foodEaten = this.getFoodEaten()
		if (foodEaten) {
			this.game.sendMessage(MESSAGES.FOOD_EATEN, foodEaten)
		}

		this.move(Boolean(foodEaten))
		this.updateBoard()
	}

	updateBoard() {
		for (const part of this.body) {
			const cell = this.board.getCellAt(part)
			if (!cell) {
				console.warn(`Area ${part.x}, ${part.y} inválida.`)
			} else {
				cell.classList.add('snake')
			}
		}
	}

	clear() {
		this.board.clear(this.body, 'snake')
	}

	/**
	 * Muda a direção da snake de acordo com os comandos do jogador.
	 */
	setDirection() {
		if (this.game.input.isKeyDown(KEY.LEFT) && this.direction !== DIRECTION.RIGHT) {
			this.direction = DIRECTION.LEFT
		} else if (this.game.input.isKeyDown(KEY.UP) && this.direction !== DIRECTION.DOWN) {
			this.direction = DIRECTION.UP
		} else if (this.game.input.isKeyDown(KEY.RIGHT) && this.direction !== DIRECTION.LEFT) {
			this.direction = DIRECTION.RIGHT
		} else if (this.game.input.isKeyDown(KEY.DOWN) && this.direction !== DIRECTION.UP) {
			this.direction = DIRECTION.DOWN
		}
	}

	/**
	 * Verifica se a snake comeu uma comida.
	 * @returns {Food | undefined} A comida que a snake comeu.
	 */
	getFoodEaten() {
		const head = this.getHead()

		/** @type {Array<Food>} */
		const foods = this.game.queryComponentsByName('food')
		let foodEaten = foods.find(food => head.collides(food.position))

		return foodEaten
	}

	/**
	 * Obtém a cabeça da snake.
	 * @returns {Vector2D}
	 */
	getHead() {
		return this.body[this.body.length - 1]
	}

	/**
	 * Retorna um valor indicando se o ponto está sobrepondo a snake.
	 * @param {Vector2D} point - O ponto a ser testado.
	 * @returns {Boolean}
	 */
	collides(point) {
		return this.body.some(part => part.collides(point))
	}

	/**
	 * Retorna um valor indicando se a snake está fora da area.
	 */
	isOffscreen() {
		if (!this.board) {
			console.warn('A snake não possui a referência à area de jogo.')
			return false
		}

		const head = this.getHead()

		return head.x < 0
			|| head.x >= this.board.width
			|| head.y < 0
			|| head.y >= this.board.height
	}

	/**
	 * Obetém um valor indicando se a snake está se sobrepondo.
	 * @returns {Boolean}
	 */
	isOverlappingItself() {
		const head = this.getHead()
		const length = this.body.length - 2
		for (let i = 0; i < length; i++) {
			const part = this.body[i]
			if (part.collides(head)) {
				return true
			}
		}

		return false
	}

	/**
	 * Move a snake na direção correta. 
	 * @param {Boolean} [crescer] - indica se a snake deve crescer enquanto move.
	 */
	move(crescer = false) {
		const head = this.getHead().clone()

		switch (this.direction) {
			case DIRECTION.LEFT:
				head.x -= 1
				break
			case DIRECTION.UP:
				head.y -= 1
				break
			case DIRECTION.RIGHT:
				head.x += 1
				break
			case DIRECTION.DOWN:
				head.y += 1
				break
		}

		if (!crescer) {
			this.body.splice(0, 1)
		}

		this.body.push(head)
	}
}
