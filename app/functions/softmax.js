export default function softmax(x) {
	const max = Math.max(...x); // Находим максимальное значение вектора x
	const exps = x.map(val => Math.exp(val - max)); // Вычитаем максимальное значение для улучшения числовой стабильности
	const sumExps = exps.reduce((acc, val) => acc + val, 0); // Суммируем экспоненты

	return exps.map(val => val / sumExps); // Возвращаем вероятности, поделив каждую экспоненту на сумму всех экспонент
}