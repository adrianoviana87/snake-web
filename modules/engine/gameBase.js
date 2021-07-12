import { InputService } from './input.js'
import { GameTime } from './gameTime.js'
import { GameComponent } from './gameComponent.js'
import { Logger } from './logger.js'

export class GameBase {
	/**
	 * Indica se o jogo já foi inicializado.
	 */
	_hasInitialized = false

	/**
	 * @summary
	 * Quantidade de quadros por segundo desejada.
	 * @description
	 * Quanto tempo (em ms) deve esperar para cada quadro.
	 */
	updateDelay = 400

	/**
	 * O identificador do temporizador utilizado pelo jogo para desenhar.
	 */
	_timerId

	/**
	 * O tempo de jogo usado para desenhar.
	 */
	gameTime = new GameTime()

	/**
	 * Indica se o jogo está pausado.
	 */
	isPaused = false

	/**
	 * O sistema de entrada.
	 */
	input = new InputService()

	/**
	 * Utilitario de logs.
	 */
	logger = new Logger()

	/**
	 * Os componentes do jogo.
	 * @type {Array<GameComponent>}
	 */
	components = []

	componentsToRemove = []

	componentsToAdd = []

	_addComponent(component) {
		if (this.components.includes(component)) {
			console.warn(`componente ${component.name} já está adicionado.`)
			return
		}

		this.components.push(component)
	}

	_removeComponent(component) {
		const index = this.components.indexOf(component)
		if (index >= 0) {
			this.components.splice(index, 1)
		}
	}

	_addComponents() {
		if (this.componentsToAdd.length > 0) {
			for (const component of this.componentsToAdd) {
				component.initialize()
				this._addComponent(component)
			}

			this.componentsToAdd.splice(0)
		}
	}

	_removeComponents() {
		if (this.componentsToRemove.length > 0) {
			for (const component of this.componentsToRemove) {
				component.isEnabled = false
				component.dispose()
				this._removeComponent(component)
			}

			this.componentsToRemove.splice(0)
		}
	}

	/**
	 * Adiciona um componente ao jogo.
	 * @param {GameComponent} component - o componente a ser adicionado.
	 * @param {String} [name] - o nome do componente. Se não informado, será utilizado o nome padrão.
	 */
	addComponent(component, name = null) {
		if (name) {
			component.name = name
		}

		component.game = this

		if (this._hasInitialized) {
			this.componentsToAdd.push(component)
		} else {
			this._addComponent(component)
		}
	}

	/**
	 * Remove um componente.
	 * @param {GameComponent} component - o componente a ser removido.
	 */
	removeComponent(component) {
		component.isEnabled = false
		if (this._hasInitialized) {
			this.componentsToRemove.push(component)
		} else {
			this._removeComponent(component)
		}
	}

	/**
	 * Envia uma mensagem para todos os componentes do jogo.
	 * @param {String} kind - o tipo de mensagem.
	 * @param {*} [extraInfo] - informações extras.
	 */
	sendMessage(kind, extraInfo = null) {
		this.logger.log(`Event: ${JSON.stringify({ kind, extraInfo: !!extraInfo })}`)

		for (const component of this.components) {
			component.onMessageReceived(kind, extraInfo)
		}

		this.onMessageReceived(kind, extraInfo)
	}

	/**
	 * Procura um componente do jogo pelo nome.
	 * Returna o primeiro que encontrar.
	 * @param {String} name - o nome do componente.
	 * @returns {GameComponent | undefined} O componente encontrado
	 */
	findComponentByName(name) {
		return this.components.find(component => component.name === name)
	}

	/**
	 * Returna um array com todos os componentes que possui o nome indicado.
	 * @param {String} name - o nome do componente a ser procurado.
	 * @returns {Array<GameComponent>} Os componentes encontrados.
	 */
	queryComponentsByName(name) {
		return this.components.filter(component => component.name === name)
	}

	/**
	 * Inicializa o jogo
	 */
	_initialize() {
		this.input.initialize()
		this.addComponent(this.logger)
		this.initialize()
		for (const component of this.components) {
			component.initialize()
		}

		this._hasInitialized = true
	}

	/**
	 * Inicializa o jogo.
	 */
	initialize() {
	}

	/**
	 * Atualiza a lógica do jogo.
	 * @param {GameTime} time - informações sobre o tempo de jogo.
	 */
	_update(time) {
		for (const component of this.components) {
			if (component.isEnabled) {
				component.update(time)
			}
		}

		this.update(time)
		this.input.flush()
		this._addComponents()
		this._removeComponents()
	}

	/**
	 * Trata a mensagem recebida.
	 * @param {String} kind - o tipo da mensagem.
	 * @param {*} [extraInfo] - informações extras.
	 */
	onMessageReceived(kind, extraInfo = null) {
	}

	/**
	 * Atualiza a lógica do jogo.
	 * @param {GameTime} time - informações sobre o tempo de jogo.
	 */
	update(time) {
	}

	/**
	 * Inicia a execução do jogo.
	 */
	run() {
		this._initialize()

		let timeSinceLastIteration = new Date().getTime()
		this._timerId = setInterval(() => {
			if (this.isPaused) {
				return
			}

			const now = new Date().getTime()
			this.gameTime.tick(now - timeSinceLastIteration)
			if (this.gameTime.elapsed >= this.updateDelay) {
				this._update(this.gameTime)
				timeSinceLastIteration = now
			}
		}, 0)
	}

	/**
	 * Libera os recursor alocados pelo jogo.
	 */
	dispose() {
		this.input.dispose()
		// Limpa os timers para que o jogo pare de rodar sozinho.
		clearInterval(this._timerId)

		// Limpa os componentes do jogo.
		for (const component of this.components) {
			component.dispose()
		}

		this.components.splice(0)
	}
}
