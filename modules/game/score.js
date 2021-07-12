import { GameComponent } from '../engine/gameComponent.js';
import { MESSAGES } from './message.js';

export class Score extends GameComponent {
	constructor({ step }) {
		super()
		this.name = 'score'
		this.step = step
	}

	value = 0

	/** @type {HTMLElement} **/
	_valueRef

	/** @type {HTMLElement} **/
	_messageRef

	/** @type {HTMLElement} **/
	_appRef

	initialize() {
		this._valueRef = document.getElementById('score-value')
		this._messageRef = document.getElementById('score-message')
		this._appRef = document.getElementById('app')
		this._messageRef.textContent = ''
	}

	onMessageReceived(kind, extraInfo) {
		switch (kind) {
			case MESSAGES.FOOD_EATEN:
				this.value += this.step
				this._valueRef.textContent = this.value
				break
			case MESSAGES.GAME_OVER:
				this._messageRef.textContent = 'Game Over!!!'
				this._appRef.classList.add('game-over')
				break
		}
	}
}