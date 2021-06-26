function factorial(n, total = 1) {
	if (n === 0) {
		return total;
	}

	return factorial(n - 1, n * total);
}

module.exports = { factorial };
