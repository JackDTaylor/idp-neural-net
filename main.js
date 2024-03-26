import './style.css'

import NeuralNetwork from "./app/classes/network/NeuralNetwork.js";

import InputLayer from "./app/classes/network/layer/InputLayer.js";
import HiddenLayer from "./app/classes/network/layer/HiddenLayer.js";
import OutputLayer from "./app/classes/network/layer/OutputLayer.js";

import NeuralNetworkPresenter from "./app/classes/network/NeuralNetworkPresenter.js";
import NeuralNetworkController from "./app/classes/network/NeuralNetworkController.js";
import sigmoid from "./app/functions/sigmoid.js";
import pipe from "./app/functions/pipe.js";

window.myNetwork = new NeuralNetwork(() => [
	new InputLayer(2),
	new HiddenLayer(2, sigmoid),
	new OutputLayer(2, sigmoid),
])

window.myNetworkController = new NeuralNetworkController(myNetwork);

window.myNetworkPresenter = new NeuralNetworkPresenter(myNetwork, myNetworkController);



window.SIG = sigmoid;

setTimeout(() => console.log(myNetwork.processData([0.05, 0.1], [0.01, 0.99]).map(x => x.val())), 100);

if(0) {
	window.Decimal = class Decimal {
		abs() {}
		absoluteValue() {}
		cmp() {}
		comparedTo() {}
		dp() {}
		decimalPlaces() {}
		div() {}
		dividedBy() {}
		idiv() {}
		dividedToIntegerBy() {}
		eq() {}
		equals() {}
		exponent() {}
		gt() {}
		greaterThan() {}
		gte() {}
		greaterThanOrEqualTo() {}
		isint() {}
		isInteger() {}
		isneg() {}
		isNegative() {}
		ispos() {}
		isPositive() {}
		isZero() {}
		lt() {}
		lessThan() {}
		lte() {}
		lessThanOrEqualTo() {}
		log() {}
		logarithm() {}
		sub() {}
		minus() {}
		mod() {}
		modulo() {}
		exp() {}
		naturalExponential() {}
		ln() {}
		naturalLogarithm() {}
		neg() {}
		negated() {}
		add() {}
		plus() {}
		sd() {}
		precision() {}
		sqrt() {}
		squareRoot() {}
		mul() {}
		times() {}
		todp() {}
		toDecimalPlaces() {}
		toExponential() {}
		toFixed() {}
		toint() {}
		toInteger() {}
		toNumber() {}
		pow() {}
		toPower() {}
		toPrecision() {}
		tosd() {}
		toSignificantDigits() {}
		toJSON() {}
		val() {}
		valueOf() {}
		toString() {}
	}
}