let display = document.getElementById("display");
let originalAmountDisplay = document.getElementById("original-amount");
let gstAmountDisplay = document.getElementById("gst-amount");
let cgstAmountDisplay = document.getElementById("cgst-amount");
let sgstAmountDisplay = document.getElementById("sgst-amount");
let totalAmountDisplay = document.getElementById("total-amount");
let previousEntryDisplay = document.getElementById("previous-entry"); // Added for previous entry
let historyList = document.getElementById("history-list");

let currentValue = "";
let previousValue = "0.00"; // Initialized to show previous entry initially
let operator = null;

function appendNumber(number) {
    currentValue += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentValue === "") return;
    operator = op;
    previousValue = currentValue; // Store current value as previous before operator is set
    currentValue = "";
    previousEntryDisplay.innerText = previousValue; // Update previous entry display
}

function calculate() {
    if (operator && previousValue !== "") {
        currentValue = eval(`${previousValue} ${operator} ${currentValue}`);
        operator = null;
        previousValue = ""; // Reset previous value after calculation
        updateDisplay();
        clearGstDisplay();
    }
}

function addGST(gstRate) {
    let originalAmount = parseFloat(currentValue);
    let gstAmount = (originalAmount * (gstRate / 100)).toFixed(2);
    let cgstRate = (gstRate / 2).toFixed(2);
    let sgstRate = (gstRate / 2).toFixed(2);
    let cgstAmount = (gstAmount / 2).toFixed(2);
    let sgstAmount = (gstAmount / 2).toFixed(2);
    let totalAmount = (originalAmount + parseFloat(gstAmount)).toFixed(2);

    // Update breakdown display
    originalAmountDisplay.innerText = originalAmount.toFixed(2);
    gstAmountDisplay.innerText = gstAmount;
    cgstAmountDisplay.innerText = `${cgstAmount} (${cgstRate}%)`;
    sgstAmountDisplay.innerText = `${sgstAmount} (${sgstRate}%)`;
    totalAmountDisplay.innerText = totalAmount;

    // Add entry to history
    addToHistory(originalAmount, gstRate, totalAmount);

    currentValue = totalAmount;
    updateDisplay();
}

function clearDisplay() {
    currentValue = "";
    operator = null;
    updateDisplay();
    clearGstDisplay();
    previousEntryDisplay.innerText = previousValue; // Reset previous entry display
}

function updateDisplay() {
    display.value = currentValue || "0.00";
}

function clearGstDisplay() {
    originalAmountDisplay.innerText = "0.00";
    gstAmountDisplay.innerText = "0.00";
    cgstAmountDisplay.innerText = "0.00";
    sgstAmountDisplay.innerText = "0.00";
    totalAmountDisplay.innerText = "0.00";
}

function addToHistory(originalAmount, gstRate, totalAmount) {
    let historyEntry = `Original: ₹${originalAmount.toFixed(2)}, GST: ${gstRate}%, Total: ₹${totalAmount}`;
    let listItem = document.createElement("li");
    listItem.textContent = historyEntry;
    historyList.appendChild(listItem);
}

function toggleHistory() {
    const historySection = document.getElementById("history-section");
    historySection.style.display = historySection.style.display === "none" ? "block" : "none";
}
