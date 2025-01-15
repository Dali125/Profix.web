document.addEventListener("DOMContentLoaded", () => {
    const loan_amount = document.getElementById('loan_amount');
    const loan_range = document.getElementById('loan_range');
    const borrowing_amount = document.getElementById('borrowing_amount');
    const interest_amount = document.getElementById('interest_amount');
    const repayment_amount = document.getElementById('repayment_amount');
    const next_salary_date = document.getElementById('next_salary_date');
    const add = document.getElementById('add');
    const sub = document.getElementById('sub');
    loan_amount.value = 200;
    loan_range.value = 200;
   
    sub.addEventListener('click', function () {
        loan_amount.value = parseInt(loan_amount.value) - 100;
        loan_range.value = parseInt(loan_amount.value);
        borrowing_amount.innerText = loan_amount.value;
        interest_amount.innerText = calculateInterest(loan_amount.value);
        repayment_amount.innerText = calculateTotalRepayAmount(loan_amount.value, parseInt(interest_amount.innerText))
    });
    add.addEventListener('click', function () {
        loan_amount.value = parseInt(loan_amount.value) + 100;
        loan_range.value = parseInt(loan_amount.value);
        borrowing_amount.innerText = loan_amount.value;
        interest_amount.innerText = calculateInterest(loan_amount.value);
        repayment_amount.innerText = calculateTotalRepayAmount(loan_amount.value, parseInt(interest_amount.innerText))
    });
    loan_range.addEventListener('input', function () {
        loan_amount.value = loan_range.value;
        borrowing_amount.innerText = loan_amount.value;
        interest_amount.innerText = calculateInterest(loan_amount.value);
        repayment_amount.innerText = calculateTotalRepayAmount(loan_amount.value, parseInt(interest_amount.innerText))
    });
    loan_amount.addEventListener('input', function () {
        console.log(loan_amount.value);
        loan_range.value = loan_amount.value;
        borrowing_amount.innerText = loan_amount.value;
        interest_amount.innerText = calculateInterest(loan_amount.value);
        repayment_amount.innerText = calculateTotalRepayAmount(loan_amount.value, parseInt(interest_amount.innerText))
    });
    next_salary_date.addEventListener('change', function () {
        alert(next_salary_date.value);
    });


    function calculateInterest(amount) {
        const rate = 0.2;

        return amount * rate;
    }

    function calculateTotalRepayAmount(loan_amount, interest_amount) {

        const l_amount = parseInt(loan_amount);

        return (l_amount + interest_amount)
    } 

    
})