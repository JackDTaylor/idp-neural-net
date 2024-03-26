export default class NeuralNetwork {
	epoch = 0;

	/** @type {AbstractLayer[]} */
	layers;

	config = {
		learningRate: 0.03,

		xScale: 200,
		yScale: 100,
	}

	compositionFn;
	activationFn;

	onInit = [];
	onErrorPropagated = [];

	constructor(generatorFn, activationFn) {
		this.compositionFn = generatorFn;
		this.activationFn = activationFn;

		this.init(this.compositionFn.apply(this));
	}

	init(layers) {
		this.epoch = 1;
		this.layers = layers;

		// Init layer indexes
		for(let i = 0; i < this.layers.length; i++) {
			this.layers[i].index = i;

			this.layers[i].prevLayer = this.layers[i - 1] || null;
			this.layers[i].nextLayer = this.layers[i + 1] || null;
		}

		// Init edges
		// NOTE: Requires ALL indexes to be initialized, so using a separate `for` loop
		for(const layer of this.layers) {
			layer.initEdges();
		}

		this.onInit.forEach(x => x());
	}

	reset() {
		this.init(this.compositionFn.apply(this));
	}

	/**
	 *
	 * @param {Number[]} data
	 * @param {?Number[]} targetValues
	 * @return {Number[]}
	 *
	 * @see https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/
	 */
	processData(data, targetValues = null) {
		data = data.map(Decimal);

		const net = [];
		const out = [];

		// Feedforward loop
		for(let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
			const layer = this.layers[layerIndex];

			net[layerIndex] = data;
			out[layerIndex] = layer.activate(net[layerIndex]).map(Decimal);

			data = layer.getDataForTheNextLayer(out[layerIndex]);
		}

		const outputValues = data;

		if(targetValues === null) {
			// No training data provided, just return the result without backpropagation
			return outputValues;
		}

		if(!Array.isArray(targetValues) || targetValues.length !== outputValues.length) {
			throw new Error('targetValues provided but invalid');
		}

		const outputLayer = this.layers.at(-1);

		let errTotal = Decimal(0);

		const outErrors = [];
		for(let nodeId = 0; nodeId < outputLayer.nodes.length; nodeId++) {
			const diff = Decimal(targetValues[nodeId]).sub(Decimal(outputValues[nodeId])); // target - out

			outErrors[ nodeId ] = Decimal(0.5).mul(diff.pow(2));
		}

		for(let nodeId = 0; nodeId < outputLayer.nodes.length; nodeId++) {
			errTotal = errTotal.add(outErrors[ nodeId ]);
		}


		const errTotalOverOut = [];
		const outOverNet = [];
		const netOverWeight = [];

		const deltas = [];

		for(let i = 0; i < out.at(-1).length; i++){
			const outVal = out.at(-1).at(i);
			const target = Decimal(targetValues[i]);

			errTotalOverOut[i] = outVal.sub(target);
			outOverNet[i] = outVal.mul(Decimal(1).sub(outVal)); // sigmoid.derivative(net.at(-1).at(i))
			netOverWeight[i] = out.at(-1 - 1).at(i);

			deltas[i] = errTotalOverOut[i].mul(outOverNet[i]).mul(netOverWeight[i])
		}

		console.log('net', net.map(x => x.map(x => x.val())));
		console.log('out', out.map(x => x.map(x => x.val())));
		console.log('err', outErrors.map(x => x.val()));

		console.log('errTotalOverOut', errTotalOverOut.map(x => x.val()));
		console.log('outOverNet',      outOverNet.map(x => x.val()));
		console.log('netOverWeight',   netOverWeight.map(x => x.val()));
		console.log('deltas',   deltas.map(x => x.val()));

		return data;
	}

	propagateError() {
		this.epoch++;

		this.onErrorPropagated.forEach(x => x());
	}
}
