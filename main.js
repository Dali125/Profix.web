// Function to set the minimum borrow amount based on the selected loan type
function setBorrowAmount() {
    var loanType = document.querySelector('input[name="loanType"]:checked').value;
    var borrowAmountInput = document.getElementById('borrowAmount');
    
    if (loanType === 'personal' || loanType === 'student') {
        borrowAmountInput.min = 500;
        borrowAmountInput.placeholder = "Min: 500 Max: 5000000";
    } else if (loanType === 'business' || loanType === 'salaryAdvance') {
        borrowAmountInput.min = 1000;
        borrowAmountInput.placeholder = "Min: 1000 Max: 5000000";
    }
}

// Function to validate the entered borrow amount
function validateBorrowAmount() {
    var borrowAmount = parseFloat(document.getElementById('borrowAmount').value);
    var loanType = document.querySelector('input[name="loanType"]:checked').value;

    if ((loanType === 'personal' || loanType === 'student') && borrowAmount < 500) {
        alert('Borrow amount for Personal and Student Loans should be at least 500.');
        return false;
    } else if ((loanType === 'business' || loanType === 'salaryAdvance') && borrowAmount < 1000) {
        alert('Borrow amount for Business and Salary Advance Loans should be at least 1000.');
        return false;
    }
    return true;
}

// Function to calculate the total amount to pay back
function calculateTotal() {
    if (!validateBorrowAmount()) {
        return;
    }

    var borrowAmount = parseFloat(document.getElementById('borrowAmount').value);
    var loanDuration = parseInt(document.getElementById('loanDuration').value);
    var totalAmountElement = document.getElementById('totalAmount');

    if (!isNaN(borrowAmount) && !isNaN(loanDuration)) {
        var interestRate = loanDuration === 1 ? 0.15 : 0.20;
        var totalAmount = borrowAmount + (borrowAmount * interestRate);
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }
}

// Add event listeners to loan type radio buttons
document.querySelectorAll('input[name="loanType"]').forEach((elem) => {
    elem.addEventListener("change", setBorrowAmount);
});

// Initial setup to set the borrow amount based on the default selected loan type
document.addEventListener("DOMContentLoaded", function() {
    setBorrowAmount();
    
});
