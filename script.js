const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

function render(target) {
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response) => response.json())
    .then((data) => {
      for (const value in data.rates) {
        const option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        target.append(option);
      }
    });
}

function calculateRate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
    .then((response) => response.json())
    .then((data) => {
        const rateValue = data.rates[currencyTwo.value] / data.rates[currencyOne.value];
        rate.innerText = `1 ${currencyOne.value} = ${data.rates[currencyTwo.value] / data.rates[currencyOne.value]} ${currencyTwo.value}`;
        amountTwo.value = (amountOne.value * rateValue).toFixed(2);
    });
}

currencyOne.addEventListener("change", calculateRate);
amountOne.addEventListener("input", calculateRate);
currencyTwo.addEventListener("change", calculateRate);
amountTwo.addEventListener("input", calculateRate);

swap.addEventListener("click", (event) => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculateRate();
});

render(currencyOne);
render(currencyTwo);
calculateRate();
