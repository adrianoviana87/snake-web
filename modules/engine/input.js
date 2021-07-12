import { KEY } from './key.js'

export class InputService {
	_keys = []
	_pressed = []

	/**
	 * Retorna um valor indicando se a tecla informada está pressionada.
	 * @param {KEY} keyCode - a tecla a ser verificada.
	 * @returns {Boolean}
	 */
	isKeyDown(keyCode) {
		return this._keys.includes(keyCode) || this._pressed.includes(keyCode)
	}

	/**
	 * Simula uma tecla sendo acionada.
	 * @param {KEY} key - a tecla a ser simulada.
	 */
	addKey(key) {
		if (!this._pressed.includes(key)) {
			this._pressed.push(key)
		}
	}

	/**
	 * Retorna um valor indicando se qualquer uma das teclas informadas está pressionada.
	 * @param {Array<KEY>} keyCodes - as teclas a serem verificadas.
	 * @returns {Boolean}
	 */
	isAnyKeyDown(keyCodes) {
		return keyCodes.some(keyCode => this.isKeyDown(keyCode))
	}

	initialize() {
		document.addEventListener('keydown', this._onKeyDown.bind(this))
		document.addEventListener('keyup', this._onKeyUp.bind(this))
	}

	dispose() {
		document.removeEventListener('keydown', this._onKeyDown)
		document.removeEventListener('keyup', this._onKeyUp)
	}

	/**
	 * Manipula evento de KeyDown
	 * @param {KeyboardEvent} event
	 */
	_onKeyDown(event) {
		event.preventDefault()
		event.stopPropagation()
		if (!this._keys.includes(event.code)) {
			this._keys.push(event.code)
		}
	}

	/**
	 * Manipula evento de KeyDown
	 * @param {KeyboardEvent} event
	 */
	_onKeyUp(event) {
		if (!this._pressed.includes(event.code)) {
			this._pressed.push(event.code)
		}

		event.preventDefault()
		event.stopPropagation()
		const index = this._keys.indexOf(event.code)
		if (index >= 0) {
			this._keys.splice(index, 1)
		}
	}

	flush() {
		this._pressed.splice(0)
	}
}
