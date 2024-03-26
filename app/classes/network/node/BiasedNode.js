import Node from "./Node";
import formatWeight from "../../../functions/formatWeight.js";
import unitRandom from "../../../functions/unitRandom.js";

export default class BiasedNode extends Node {
	bias = unitRandom();

	get title() {
		return `${super.title}\nBias: ${formatWeight(this.bias)}`;
	}

	calculateInput(inputData) {
		return super.calculateInput(inputData).add(Decimal(this.bias));
	}
}
