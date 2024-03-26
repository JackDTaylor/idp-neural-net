export default function sigmoid(x) {
	return Decimal(1).div(Decimal(1).add(Decimal(x).neg().exp()));
}

sigmoid.derivative = function(x) {
	return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}

sigmoid.derivative_fromTheIntentet = function(x) {
	const output = sigmoid(x);
	return output * (1 - output);
}