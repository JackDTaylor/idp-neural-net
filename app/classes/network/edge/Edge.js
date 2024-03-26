import formatWeight from "../../../functions/formatWeight.js";
import unitRandom from "../../../functions/unitRandom.js";

export default class Edge {
	/** @type {Node} */
	sourceNode;

	/** @type {Node} */
	targetNode;

	weight = unitRandom();

	constructor(sourceNode, targetNode) {
		this.sourceNode = sourceNode;
		this.targetNode = targetNode;
	}

	get id() {
		return `${this.sourceNode.id}-${this.targetNode.id}`;
	}

	get title() {
		return  `Edge ${this.id}\nWeight: ${formatWeight(this.weight)}`;
	}
}
