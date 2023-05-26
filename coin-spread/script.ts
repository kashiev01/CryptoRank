const spreadToken = (coinObj: Object, reqArray: String[]): String[] | null => {
	const requiredCoinsMap = new Map();
	const optionalCoinsMap = new Map();
	const copyCoins = { ...coinObj };
	const result = [];
	let totalCoinSum = 0;

	for (let coin in coinObj) {
		totalCoinSum = totalCoinSum + coinObj[coin];
	}

	console.log(totalCoinSum);
	if (reqArray.length > totalCoinSum) {
		return null;
	}
	for (let item of reqArray) {
		if (!item.includes("/")) {
			if (requiredCoinsMap.has(item)) {
				requiredCoinsMap.set(item, requiredCoinsMap.get(item) + 1);
			} else {
				requiredCoinsMap.set(item, 1);
			}
			copyCoins[item.toString()] = copyCoins[item.toString()] - 1;
			result.push(item);
		} else if (item.includes("/")) {
			if (optionalCoinsMap.has(item)) {
				optionalCoinsMap.set(item, optionalCoinsMap.get(item) + 1);
			} else {
				optionalCoinsMap.set(item, 1);
			}
		}
	}

	for (let [coin, amount] of optionalCoinsMap) {
		const splitArr = coin.split("/");
		for (let j of splitArr) {
			if (copyCoins[j] && copyCoins[j] > 0) {
				copyCoins[j] -= 1;
				result.push(j);
				break;
			}
		}
	}

	for (let coin in copyCoins) {
		if (copyCoins[coin] < 0) {
			return null;
		}
	}

	return result.sort();
};
