document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loan_amount');
    const loanRangeInput = document.getElementById('loan_range');
    const addButton = document.getElementById('add');
    const subButton = document.getElementById('sub');

    const updateLoanAmount = (value) => {
        loanAmountInput.value = value;
        loanRangeInput.value = value;
    };

    loanAmountInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= loanRangeInput.min && value <= loanRangeInput.max) {
            loanRangeInput.value = value;
        }
    });

    loanRangeInput.addEventListener('input', (e) => {
        loanAmountInput.value = e.target.value;
    });

    addButton.addEventListener('click', () => {
        let value = parseInt(loanAmountInput.value, 10) || 0;
        value = Math.min(value + 100, parseInt(loanRangeInput.max, 10));
        updateLoanAmount(value);
    });

    subButton.addEventListener('click', () => {
        let value = parseInt(loanAmountInput.value, 10) || 0;
        value = Math.max(value - 100, parseInt(loanRangeInput.min, 10));
        updateLoanAmount(value);
    });

    // Initialize the input values
    updateLoanAmount(loanRangeInput.min);
});