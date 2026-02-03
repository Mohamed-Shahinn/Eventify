document.addEventListener("DOMContentLoaded", () => {

  const seatsGrid = document.getElementById("seatsGrid");
  const selectedCount = document.getElementById("selectedCount");

  if (!seatsGrid) return;

  const MAX_SEATS = 6;

  // Reserved seats (static for demo / DB later)
  const reservedSeats = [3, 7, 12, 18, 22, 27, 31, 35, 41, 46, 49];

  // Load previous selection if exists
  let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

  for (let i = 1; i <= 50; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.dataset.seat = `S${i}`;

    // Reserved
    if (reservedSeats.includes(i)) {
      seat.classList.add("reserved");
    }

    // Restore selected seats
    if (selectedSeats.includes(`S${i}`)) {
      seat.classList.add("selected");
    }

    seat.addEventListener("click", () => {
      if (seat.classList.contains("reserved")) return;

      const seatId = seat.dataset.seat;

      // Remove seat
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(s => s !== seatId);
      } 
      // Add seat
      else {
        if (selectedSeats.length >= MAX_SEATS) {
          alert(`You can select up to ${MAX_SEATS} seats only`);
          return;
        }
        seat.classList.add("selected");
        selectedSeats.push(seatId);
      }

      selectedCount.innerText = `${selectedSeats.length} seats selected`;
      localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    });

    seatsGrid.appendChild(seat);
  }

  // Update count on load
  selectedCount.innerText = `${selectedSeats.length} seats selected`;

  // Continue to booking
  window.goToBooking = function () {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    window.location.href = "booking.html";
  };

});
