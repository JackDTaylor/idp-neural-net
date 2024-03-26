export default class Node {
	index = -1;

	/** @type {AbstractLayer} */
	layer = null;

	/** @type {Edge[]} */
	outgoingEdges = [];

	/** @type {Edge[]} */
	incomingEdges = [];

	constructor(data = {}) {
		Object.assign(this, data);
	}

	get id() {
		return `${this.layer.index}.${this.index}`;
	}

	get title() {
		return `Node ${this.id}`;
	}

	calculateInput(inputData) {
		let result = Decimal(0);

		for(const edge of this.incomingEdges) {
			const value = Decimal(inputData[ edge.sourceNode.index ]);

			result = result.add(Decimal(edge.weight).mul(value));
		}

		return result;
	}
}
