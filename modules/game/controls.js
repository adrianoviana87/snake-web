import { GameComponent } from '../engine/gameComponent.js';
import { KEY } from '../engine/key.js';

export class Controls extends GameComponent {
	/** @type {HTMLElement} **/
	buttonUpRef

	/** @type {HTMLElement} **/
	buttonDownRef
	
	/** @type {HTMLElement} **/
	buttonLeftRef

	/** @type {HTMLElement} **/
	buttonRightRef

	initialize() {
		this.buttonUpRef = document.getElementById('button-up')
		this.buttonDownRef = document.getElementById('button-down')
		this.buttonLeftRef = document.getElementById('button-left')
		this.buttonRightRef = document.getElementById('button-right')

		this.buttonUpRef.addEventListener('touchstart', this.onButtonUpClick.bind(this))
		this.buttonUpRef.addEventListener('click', this.onButtonUpClick.bind(this))
		this.buttonDownRef.addEventListener('touchstart', this.onButtonDownClick.bind(this))
		this.buttonDownRef.addEventListener('click', this.onButtonDownClick.bind(this))
		this.buttonLeftRef.addEventListener('touchstart', this.onButtonLeftClick.bind(this))
		this.buttonLeftRef.addEventListener('click', this.onButtonLeftClick.bind(this))
		this.buttonRightRef.addEventListener('touchstart', this.onButtonRightClick.bind(this))
		this.buttonRightRef.addEventListener('click', this.onButtonRightClick.bind(this))
	}

	dispose() {
		this.buttonUpRef.removeEventListener('touchstart', this.onButtonUpClick)
		this.buttonUpRef.removeEventListener('click', this.onButtonUpClick)
		this.buttonDownRef.removeEventListener('touchstart', this.onButtonDownClick)
		this.buttonDownRef.removeEventListener('click', this.onButtonDownClick)
		this.buttonLeftRef.removeEventListener('touchstart', this.onButtonLeftClick)
		this.buttonLeftRef.removeEventListener('click', this.onButtonLeftClick)
		this.buttonRightRef.removeEventListener('touchstart', this.onButtonRightClick)
		this.buttonRightRef.removeEventListener('click', this.onButtonRightClick)
	}

	onButtonUpClick() {
		this.game.input.addKey(KEY.UP)
	}

	onButtonDownClick() {
		this.game.input.addKey(KEY.DOWN)
	}

	onButtonLeftClick() {
		this.game.input.addKey(KEY.LEFT)
	}

	onButtonRightClick() {
		this.game.input.addKey(KEY.RIGHT)
	}
}