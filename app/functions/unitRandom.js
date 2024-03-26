const preparedData = [
	0.35,0.35,
	0.60,0.60,

	0.15,0.25,0.20,0.30,
	0.40,0.50,0.45,0.55,
].map(x => Decimal(x));


/**
 * Returns random number in range -1..+1
 * @return {number}
 */
export default function unitRandom() {
	return preparedData.shift();
	// return Math.random() * 2 - 1;
};