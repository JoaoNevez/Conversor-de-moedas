const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// API gratuita de câmbio
const API_URL = 'https://api.exchangerate.host/latest';

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if(isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Digite um valor válido!';
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(`${API_URL}?base=${from}&symbols=${to}`);
        const data = await response.json();
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
        resultDiv.textContent = 'Erro ao converter. Tente novamente!';
        console.error(error);
    }
}

convertBtn.addEventListener('click', convertCurrency);
