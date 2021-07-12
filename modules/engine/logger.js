import { GameComponent } from './gameComponent.js';

export class Logger extends GameComponent {
	constructor(ref = null) {
		super()
		this.name = 'logger'
		this._ref = ref
	}

	log(message) {
		if (this.isEnabled && this._ref) {
			const li = document.createElement('li')
			li.textContent = message
			this._ref.children.push(li)
		}
	}
}