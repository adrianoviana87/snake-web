import { GameBase } from '../engine/gameBase.js'
import { Board } from './board.js'
import { Controls } from './controls.js'
import { Food } from './food.js'
import { MESSAGES } from './message.js'
import { Score } from './score.js'
import { Snake } from './snake.js'

export class SnakeGame extends GameBase {
	speedStep = 1
	maxSpeed = 150

	initialize() {
		this.addComponent(new Controls())
		this.addComponent(new Board(20, 20))
		this.addComponent(new Snake())
		this.addComponent(new Food())
		this.addComponent(new Score({ step: 10 }))
	}

	onMessageReceived(kind) {
		switch (kind) {
			case MESSAGES.FOOD_EATEN:
				this.addComponent(new Food())
				this.updateDelay = Math.max(this.maxSpeed, this.updateDelay - this.speedStep)
				break
		}
	}
}
