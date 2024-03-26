import AbstractLayer from "./AbstractLayer.js";
import BiasedNode from "../node/BiasedNode.js";

export default class HiddenLayer extends AbstractLayer {
	createNode(index) {
		return new BiasedNode({ index, layer: this })
	}
}
