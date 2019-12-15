	let select = document.getElementById("select");
	let select2 = document.getElementById("select2");
	let button = document.getElementById("button");
	let result = document.getElementById("result");
	let currency = document.getElementById("currency")
	async function getExchangeRate(fromCurrency, toCurrency) {
	const response = await fetch('http://data.fixer.io/api/latest?access_key=c2d1d626a186df8a3304a794d4bc9582&format=1');
	const formatedResponse = await response.json();
	const rate = formatedResponse.rates;
	const euro = 1 / rate[fromCurrency];
	const exchangeRate = euro * rate[toCurrency];
	
	return exchangeRate;
}
	


async function getSelect() {
	const response = await fetch('http://data.fixer.io/api/latest?access_key=c2d1d626a186df8a3304a794d4bc9582&format=1');
	const formatedResponse = await response.json();
	const rate = formatedResponse.rates;
	return Object.keys(rate);
}
	function fillSelect(currency) {
		currency.forEach(el => {
			let option = document.createElement("option")
			option.setAttribute('value',el);
			option.textContent = el;
			let option2 = option.cloneNode(true);
			select.append(option);
			select2.append(option2);
		})
	}
	getSelect()
	.then(r => {
		fillSelect(r);
	})

	button.onclick = () => {
		getExchangeRate(select.value,select2.value)
		.then(r => {
			result.textContent = "Exchange Rate: " + r;
		})
		getCountries(select2.value)
	.then(r => {
		rate(r);
	})
	}

async function getCountries(toCurrency) {
		const response = await fetch(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
		const formatedResponse = await response.json();
		let country = formatedResponse.map(el => {
			return el.name;
		})
		return country;
	} 
	function rate(city) {
		currency.innerHTML = "You can spend these in the following countries: " + "<strong>" + city.join(",") + "</strong>";
	}
