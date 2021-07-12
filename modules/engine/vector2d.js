export class Vector2D {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	/**
	 * Gera um ponto aleatório.
	 * @param {Object} options - as opções de geração. 
	 * @param {Number} options.minX - o X mínimo.
	 * @param {Number} options.minY - o Y mínimo.
	 * @param {Number} options.maxX - o X máximo.
	 * @param {Number} options.maxY - o Y máximo.
	 * @returns {Vector2D} Um vetor gerado aleatoriamente dentro dos limites.
	 */ 
	static generateRandom({ minX, minY, maxX, maxY }) {
		const x = Math.floor(Math.random() * (maxX - minX) + minX)
		const y = Math.floor(Math.random() * (maxY - minY) + minY)

		return new Vector2D(x, y)
	}

	/**
	 * A posição horizontal.
	 * @type {Number}
	 */
	x

	/**
	 * A posição vertical.
	 * @type {Number}
	 */
	y

	/**
	 * Retorna um valor indicando se o outro ponto sobrepoe esse.
	 * @param {Vector2D} other - o outro ponto.
	 * @returns {Boolean}
	 */
	collides(other) {
		return this.x === other.x && this.y === other.y
	}

	/**
	 * Retorna uma nova instância do vetor
	 * com os mesmos valor deste.
	 * @returns {Vector2D}
	 */
	clone() {
		return new Vector2D(this.x, this.y)
	}
}