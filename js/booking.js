// Get selected seats
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

// Guard: prevent access without seats
if (selectedSeats.length === 0) {
  alert("Please select seats first");
  window.location.replace("event.html");
}

// Get current event
const eventKey = localStorage.getItem("currentEvent");

// Event names mapping
const eventNames = {
  cairokee: "Cairokee Live Concert",
  concert: "Live Concert",
  tech: "Tech Conference",
  football: "Football Match"
};

// Inject event name
const eventElement = document.querySelector(".summary-card p");
if (eventKey && eventNames[eventKey]) {
  eventElement.innerText = eventNames[eventKey];
}

// UI elements
const seatsList = document.getElementById("seatsList");
const totalPriceEl = document.getElementById("totalPrice");

const SEAT_PRICE = 450;
const totalPrice = selectedSeats.length * SEAT_PRICE;

// Render seats
selectedSeats.forEach(seat => {
  const li = document.createElement("li");
  li.innerText = `Seat ${seat}`;
  seatsList.appendChild(li);
});

// Render total price
totalPriceEl.innerText = totalPrice;

// Save for payment / PHP later
localStorage.setItem("totalPrice", totalPrice);
