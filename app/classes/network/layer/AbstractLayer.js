import Edge from "../edge/Edge.js";
import Node from "../node/Node.js";
import sigmoid from "../../../functions/sigmoid.js";

export default class AbstractLayer {
	index = -1;

	/** @type {Node[]} */
	nodes = [];

	/** @type {AbstractLayer} */
	prevLayer = null;

	/** @type {AbstractLayer} */
	nextLayer = null;

	/** @type {function} */
	activationFn = x => x;

	constructor(size, activationFn = this.defaultActivationFn) {
		this.activationFn = activationFn;

		for(let i = 0; i < size; i++) {
			this.addNode(i);
		}
	}

	get defaultActivationFn() {
		return sigmoid;
	}

	get incomingEdges() {
		return this.nodes.reduce((result, node) => [...result, ...node.incomingEdges], []);
	}

	get outgoingEdges() {
		return this.nodes.reduce((result, node) => [...result, ...node.outgoingEdges], []);
	}

	createNode(index) {
		return new Node({ index, layer: this })
	}

	createEdge(sourceNode, targetNode) {
		return new Edge(sourceNode, targetNode);
	}

	addNode(index) {
		this.nodes.push(this.createNode(index));
	}

	initEdges() {
		if(!this.nextLayer) {
			return;
		}

		for(const source of this.nodes) {
			for(const target of this.nextLayer.nodes) {
				const edge = this.createEdge(source, target);

				source.outgoingEdges.push(edge);
				target.incomingEdges.push(edge);
			}
		}
	}

	/**
	 *
	 * @param {Number[]} inputData An array sized for this layer
	 * @return {Number[]} An array of size matching the next layer
	 */
	getDataForTheNextLayer(inputData) {
		if(inputData.length !== this.nodes.length) {
			throw new Error('Invalid layer data input: input array has to match the size of the layer')
		}

		if(!this.nextLayer) {
			// No next layer, return result
			return inputData;
		}

		return this.nextLayer.nodes.map(nextLayerNode => nextLayerNode.calculateInput(inputData));
	}

	activate(inputData) {
		return inputData.map(value => this.activationFn(value));
	}
}
