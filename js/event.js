const params = new URLSearchParams(window.location.search);
const eventType = params.get("event");

// Events data
const eventsData = {
  cairokee: {
    title: "Cairokee Live Concert",
    meta: "Cairo • New Administrative Capital • 20 July",
    desc: "A live concert by Cairokee band featuring their most popular songs."
  },
  concert: {
    title: "Live Concert",
    meta: "Cairo • 25 July • 8:00 PM",
    desc: "Experience an unforgettable live concert with top artists."
  },
  tech: {
    title: "Tech Conference",
    meta: "Giza • 2 August • 10:00 AM",
    desc: "A conference for developers and tech leaders."
  },
  football: {
    title: "Football Match",
    meta: "Alexandria • 10 August • 6:00 PM",
    desc: "Watch the biggest teams compete live."
  }
};

// 🛑 Guard: prevent invalid access
if (!eventType || !eventsData[eventType]) {
  window.location.replace("home.html");
}

// Inject data
document.getElementById("eventTitle").innerText = eventsData[eventType].title;
document.getElementById("eventMeta").innerText = eventsData[eventType].meta;
document.getElementById("eventDesc").innerText = eventsData[eventType].desc;

// Save current event (for booking / PHP later)
localStorage.setItem("currentEvent", eventType);
