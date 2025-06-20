document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cardName = document.getElementById("cardName").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const planSelect = document.getElementById("planSelect").value.trim();

    let errorMessage = "";

    if (cardName.length === 0) {
        errorMessage += "Name on Card is required.\n";
    }

    if (cardNumber.length === 0) {
        errorMessage += "Card Number is required.\n";
    }

    const cvvPattern = /^[0-9]{3,4}$/;
    if (!cvvPattern.test(cvv)) {
        errorMessage += "CVV should be 3 or 4 digits.\n";
    }

    if (expiryDate.length === 0) {
        errorMessage += "Expiry Date is required.\n";
    }

    if (planSelect.length === 0) {
        errorMessage += "Please select a plan.\n";
    }

    const errorDiv = document.getElementById("errorMessage");
    if (errorMessage) {
        errorDiv.textContent = errorMessage;
        return;
    }

    window.location.href = planSelect;
});
