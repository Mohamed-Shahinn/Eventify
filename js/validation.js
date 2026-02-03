// ===== Card number formatting =====
const cardNumberInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiry");
const errorBox = document.getElementById("errorBox");
const payBtn = document.getElementById("payBtn");

cardNumberInput.addEventListener("input", () => {
  let value = cardNumberInput.value.replace(/\D/g, "");
  value = value.match(/.{1,4}/g);
  cardNumberInput.value = value ? value.join(" ") : "";
});

expiryInput.addEventListener("input", () => {
  let value = expiryInput.value.replace(/\D/g, "");
  if (value.length > 2) {
    expiryInput.value = value.slice(0, 2) + "/" + value.slice(2, 4);
  } else {
    expiryInput.value = value;
  }
});

// ===== Payment handler =====
function pay(e) {
  e.preventDefault();

  // Extra safety check
  if (!localStorage.getItem("loggedInUser")) {
    window.location.replace("index.html");
    return;
  }

  // Reset error
  errorBox.style.display = "none";
  errorBox.innerText = "";

  const cardName = document.getElementById("cardName").value.trim();
  const cardNumberRaw = document.getElementById("cardNumber").value.replace(/\s/g, "");
  const expiry = expiryInput.value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // ===== Validation =====
  if (!cardName || !cardNumberRaw || !expiry || !cvv) {
    return showError("All payment fields are required");
  }

  if (cardName.length < 3) {
    return showError("Invalid card holder name");
  }

  if (cardNumberRaw.length !== 16 || isNaN(cardNumberRaw)) {
    return showError("Invalid card number");
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    return showError("Expiry date must be in MM/YY format");
  }

  const [mm, yy] = expiry.split("/").map(Number);
  const expDate = new Date(2000 + yy, mm);
  const now = new Date();

  if (expDate <= now) {
    return showError("Card has expired");
  }

  if (cvv.length !== 3 || isNaN(cvv)) {
    return showError("Invalid CVV");
  }

  // ===== Simulate payment =====
  payBtn.innerText = "Processing...";
  payBtn.disabled = true;

  setTimeout(() => {
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("totalPrice");
    window.location.href = "success.html";
  }, 1200);
}

// ===== Error helper =====
function showError(msg) {
  errorBox.innerText = msg;
  errorBox.style.display = "block";
  payBtn.innerText = "Pay Now";
  payBtn.disabled = false;
}
