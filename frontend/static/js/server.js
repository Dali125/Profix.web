const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

const calculateEMI = () => {
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let loanTenure = parseFloat(loanTenureInput.value);

    let interest = interestRate / 12 / 100;

    let emi =
        loanAmount *
        interest *
        (Math.pow(1 + interest, loanTenure) /
            (Math.pow(1 + interest, loanTenure) - 1));

    return emi;
};

const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenureInput.value * emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmountInput.value);
    totalInterestValue.innerHTML = totalInterestPayable;
};

const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};

init();

calculateBtn.addEventListener("click", () => {
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: loanAmountInput.value,
            rate: interestRateInput.value,
            tenure: loanTenureInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        updateData(parseFloat(data.emi));
    })
    .catch(error => console.error('Error:', error));
});
