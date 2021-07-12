export class GameTime {
	_elapsed = 0
	_total = 0

	get elapsed() {
		return this._elapsed
	}

	get total() {
		return this._total
	}

	reset() {
		this._total = this._elapsed = 0
	}

	tick(elapsed) {
		this._elapsed = elapsed
		this._total += elapsed
	}
}