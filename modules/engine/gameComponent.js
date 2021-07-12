import { GameTime } from './gameTime.js'

export class GameComponent {
	/**
	 * A referência a engine.
	 * @type {import('./gameBase.js').GameBase}
	 */
	game

	/**
	 * O nome do componente.
	 * @type {String}
	 */
	name

	/**
	 * Indica se o componente está ativo.
	 */
	isEnabled = true

	/**
	 * Trata a mensagem recebida.
	 * @param {String} kind - o tipo da mensagem.
	 * @param {*} [extraInfo] - informações extras.
	 */
	onMessageReceived(kind, extraInfo = null) {
	}

	/**
	 * Inicializa o componente.
	 */
	initialize() {
	}


	/**
	 * Atualiza a lógica do componente.
	 * @param {GameTime} time - o tempo de jogo.
	 */
	update(time) {
	}

	/**
	 * Limpa os recursos alocados do componente.
	 */
	dispose() {
	}
}