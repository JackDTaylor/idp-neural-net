export default class NeuralNetworkController {
	/** @type {NeuralNetwork} */
	network = null;

	playIntervalId = null;

	onPlayStart = [];
	onPlayStop = [];

	constructor(network) {
		this.network = network;
	}

	get isPlaying() {
		return !!this.playIntervalId;
	}

	play() {
		this.playIntervalId = setInterval(() => this.step(), 0);

		this.onPlayStart.forEach(x => x());
	}

	pause() {
		clearInterval(this.playIntervalId);

		this.playIntervalId = null;

		this.onPlayStop.forEach(x => x());
	}

	step() {
		this.network.propagateError(this.network.feedData());
	}

	reset() {
		this.network.reset();
	}
}
