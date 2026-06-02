const eventFees = {
  market: "$0",
  sports: "$5",
  clinic: "$3",
  festival: "$8"
};

const nearbyEvents = [
  { name: "Central Civic Hall", lat: 40.7128, lon: -74.0060 },
  { name: "Riverside Park Stage", lat: 40.7158, lon: -74.0154 },
  { name: "Northside Market", lat: 40.7221, lon: -73.9985 },
  { name: "Community Sports Field", lat: 40.7063, lon: -74.0122 }
];

let formDirty = false;

function markFormDirty() {
  formDirty = true;
  sessionStorage.setItem("portalFormDirty", "true");
}

function updateEventFee(value) {
  const selectedFee = document.getElementById("selectedFee");
  const feeText = value ? `Selected event fee: ${eventFees[value] || "$0"}` : "Select an event to see the fee.";
  selectedFee.textContent = feeText;
  localStorage.setItem("preferredEventType", value);
  sessionStorage.setItem("lastEventType", value);
  markFormDirty();
  console.log("Event type changed:", value, feeText);
}

function setEventFeeDisplay(value) {
  const selectedFee = document.getElementById("selectedFee");
  selectedFee.textContent = value ? `Selected event fee: ${eventFees[value] || "$0"}` : "Select an event to see the fee.";
}

function restorePreferences() {
  const savedType = localStorage.getItem("preferredEventType");
  const eventType = document.getElementById("eventType");
  if (savedType) {
    eventType.value = savedType;
    setEventFeeDisplay(savedType);
  }

  const lastType = sessionStorage.getItem("lastEventType");
  if (lastType && !savedType) {
    eventType.value = lastType;
    setEventFeeDisplay(lastType);
  }

  const feeType = document.getElementById("feedbackType");
  setFeedbackFeeDisplay(feeType.value);

  const storedDirty = sessionStorage.getItem("portalFormDirty");
  formDirty = storedDirty === "true";
  if (!savedType && !lastType) {
    document.getElementById("selectedFee").textContent = "Select an event to see the fee.";
  }
}

function validatePhone() {
  const phoneInput = document.getElementById("phone");
  const status = document.getElementById("phoneStatus");
  const phonePattern = /^\d{3}[- ]?\d{3}[- ]?\d{4}$/;
  if (!phoneInput.value) {
    status.textContent = "";
    return;
  }

  if (phonePattern.test(phoneInput.value.trim())) {
    status.textContent = "Phone number looks valid.";
    status.classList.remove("warning");
  } else {
    status.textContent = "Enter a valid phone number such as 555-123-4567.";
    status.classList.add("warning");
  }
  markFormDirty();
}

function showFeedbackFee(value) {
  setFeedbackFeeDisplay(value);
  sessionStorage.setItem("selectedFeedbackCategory", value);
  markFormDirty();
}

function setFeedbackFeeDisplay(value) {
  const fee = document.getElementById("feedbackFee");
  const fees = {
    general: "General feedback: no fee",
    transport: "Transport support: $2",
    family: "Family services: $4"
  };
  fee.textContent = fees[value] || "Select a category to view the fee.";
}

function showSubmitConfirmation() {
  const output = document.getElementById("registrationOutput");
  output.textContent = "Submit clicked. Your registration will be processed next.";
  console.log("Registration submit button clicked");
}

function handleRegistrationSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("eventDate").value;
  const eventType = document.getElementById("eventType").value;
  const message = document.getElementById("message").value.trim();
  const output = document.getElementById("registrationOutput");
  const feeText = eventFees[eventType] || "$0";

  output.textContent = `Confirmation: ${name} is registered for ${eventType || "the selected event"} on ${date}. A confirmation was sent to ${email}. Fee: ${feeText}. Notes: ${message}`;
  formDirty = false;
  sessionStorage.removeItem("portalFormDirty");
  console.log("Registration submitted", { name, email, date, eventType, message });
}

function captureKeyEvent(event) {
  const keyStatus = document.getElementById("keyStatus");
  const textLength = document.getElementById("feedbackText").value.length;
  keyStatus.textContent = `Characters typed: ${textLength} | Last key: ${event.key}`;
  markFormDirty();
}

function updateCharacterCount() {
  setCharacterCountDisplay();
  markFormDirty();
}

function setCharacterCountDisplay() {
  const keyStatus = document.getElementById("keyStatus");
  const textLength = document.getElementById("feedbackText").value.length;
  keyStatus.textContent = `Characters typed: ${textLength}`;
}

function submitFeedbackConfirmation() {
  console.log("Feedback button clicked");
  document.getElementById("keyStatus").textContent = "Feedback button clicked. Your message is ready to send.";
}

function enlargeGalleryImage(image) {
  image.classList.toggle("enlarged");
}

function videoReady() {
  document.getElementById("videoStatus").textContent = "Video ready to play.";
}

window.videoReady = videoReady;

function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  document.getElementById("eventType").value = "";
  document.getElementById("selectedFee").textContent = "Select an event to see the fee.";
  document.getElementById("feedbackType").value = "general";
  document.getElementById("feedbackFee").textContent = "General feedback: no fee";
  document.getElementById("registrationOutput").textContent = "Preferences cleared.";
  formDirty = false;
  console.log("Preferences cleared");
}

function findNearbyEvents() {
  const output = document.getElementById("geoOutput");

  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported in this browser.";
    return;
  }

  output.textContent = "Finding your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const nearest = findNearestEvent(latitude, longitude);
      output.textContent = `Latitude: ${latitude.toFixed(5)}\nLongitude: ${longitude.toFixed(5)}\nNearest event: ${nearest.name}`;
      sessionStorage.setItem("lastGeoLatitude", String(latitude));
      sessionStorage.setItem("lastGeoLongitude", String(longitude));
      markFormDirty();
      console.log("Geolocation success", position.coords);
    },
    (error) => {
      const messages = {
        1: "Permission denied. Allow location access to find nearby events.",
        2: "Position unavailable right now.",
        3: "Location request timed out. Try again.",
      };
      output.textContent = messages[error.code] || "Unable to determine your location.";
      console.log("Geolocation error", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function findNearestEvent(latitude, longitude) {
  let nearestEvent = nearbyEvents[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const event of nearbyEvents) {
    const distance = haversineDistance(latitude, longitude, event.lat, event.lon);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestEvent = event;
    }
  }

  return nearestEvent;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const toRadians = (value) => (value * Math.PI) / 180;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

window.addEventListener("beforeunload", (event) => {
  if (formDirty) {
    event.preventDefault();
    event.returnValue = "You have unfinished changes on the form page.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  restorePreferences();
  setCharacterCountDisplay();
  const promoVideo = document.getElementById("promoVideo");
  if (promoVideo && promoVideo.readyState >= 3) {
    videoReady();
  }
});