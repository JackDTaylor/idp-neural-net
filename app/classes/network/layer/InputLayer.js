import AbstractLayer from "./AbstractLayer.js";
import pipe from "../../../functions/pipe.js";

export default class InputLayer extends AbstractLayer {
	get defaultActivationFn() {
		return pipe;
	}
}
