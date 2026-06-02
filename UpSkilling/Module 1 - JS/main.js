console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
  alert("The page is fully loaded.");
});

const sampleEventName = "Community Spring Fair";
const sampleEventDate = "2026-06-18";
let sampleSeats = 30;
console.log(`${sampleEventName} on ${sampleEventDate} has ${sampleSeats} seats.`);
sampleSeats--;
console.log(`Seats left after one registration: ${sampleSeats}`);

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

class Event {
  constructor(name, date, seats, category, location) {
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
    this.location = location;
  }

  checkAvailability() {
    return this.seats > 0 && new Date(this.date) >= new Date();
  }
}

Event.prototype.describe = function () {
  return `${this.name} at ${this.location} on ${this.date}`;
};

const communityEvents = [
  new Event("Morning market walk", "2026-06-03", 18, "music", "Market district"),
  new Event("Family sports evening", "2026-06-05", 0, "sports", "Civic field"),
  new Event("Service desk clinic", "2026-05-20", 8, "clinic", "City hall"),
  new Event("Creative baking workshop", "2026-06-08", 12, "workshop", "Community kitchen")
];

function addEvent(eventList = [], eventItem) {
  eventList.push(eventItem);
  return eventList;
}

const categoryTracker = createCategoryTracker();

function createCategoryTracker() {
  const totals = {};
  return {
    track(category = "general") {
      totals[category] = (totals[category] || 0) + 1;
      return totals[category];
    },
    getTotal(category = "general") {
      return totals[category] || 0;
    }
  };
}

function registerUser(eventItem, seats = 1) {
  if (!eventItem) {
    throw new Error("No event selected.");
  }

  if (!eventItem.checkAvailability()) {
    throw new Error("This event is not available.");
  }

  if (eventItem.seats < seats) {
    throw new Error("Not enough seats available.");
  }

  eventItem.seats--;
  const totalForCategory = categoryTracker.track(eventItem.category);
  return `${eventItem.name} registered successfully. Remaining seats: ${eventItem.seats}. Total ${eventItem.category} registrations: ${totalForCategory}`;
}

function filterEventsByCategory(events = [], category = "all", callback = (eventItem) => true) {
  const clonedEvents = [...events];
  return clonedEvents
    .filter(({ category: eventCategory }) => category === "all" || eventCategory === category)
    .filter(callback);
}

function getEventEntries(eventItem) {
  return Object.entries(eventItem).map(([key, value]) => `${key}: ${value}`);
}

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
  const form = event.currentTarget;
  const elements = form.elements;
  const name = elements.fullName.value.trim();
  const email = elements.email.value.trim();
  const date = elements.eventDate.value;
  const eventType = elements.eventType.value;
  const message = elements.message.value.trim();
  const output = document.getElementById("registrationOutput");
  const feeText = eventFees[eventType] || "$0";

  try {
    if (!name || !email || !date || !eventType || !message) {
      throw new Error("Fill in every registration field.");
    }

    output.textContent = `Confirmation: ${name} is registered for ${eventType || "the selected event"} on ${date}. A confirmation was sent to ${email}. Fee: ${feeText}. Notes: ${message}`;
    formDirty = false;
    sessionStorage.removeItem("portalFormDirty");
    console.log("Registration submitted", { name, email, date, eventType, message });
    submitRegistrationAjax({ name, email, date, eventType, message });
  } catch (error) {
    output.textContent = error.message;
    console.error("Registration error:", error);
  }
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
        3: "Location request timed out. Try again."
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

function createJsLabSection() {
  const main = document.querySelector("main");
  if (!main || document.querySelector("#jsLab")) {
    return;
  }

  const section = document.createElement("section");
  section.id = "jsLab";
  section.innerHTML = `
    <h2>JavaScript Lab</h2>
    <p>Try category filtering, name search, remote loading, and registration actions from this live demo panel.</p>
    <div class="field" style="margin-bottom: 12px;">
      <label for="categoryFilter">Filter by category</label>
      <select id="categoryFilter">
        <option value="all">All events</option>
        <option value="music">Music</option>
        <option value="sports">Sports</option>
        <option value="clinic">Clinic</option>
        <option value="workshop">Workshop</option>
      </select>
    </div>
    <div class="field" style="margin-bottom: 12px;">
      <label for="quickSearch">Search by name</label>
      <input id="quickSearch" type="search" placeholder="Type an event name">
    </div>
    <div class="actions" style="margin-bottom: 12px;">
      <button type="button" class="secondary" id="loadThenBtn">Load with then/catch</button>
      <button type="button" class="secondary" id="loadAsyncBtn">Load with async/await</button>
    </div>
    <div id="loadStatus" class="status-box warning">Remote data not loaded yet.</div>
    <div id="eventList"></div>
  `;

  const eventsSection = document.querySelector("#events");
  eventsSection?.insertAdjacentElement("afterend", section);

  const categoryFilter = document.querySelector("#categoryFilter");
  const quickSearch = document.querySelector("#quickSearch");
  const loadThenBtn = document.querySelector("#loadThenBtn");
  const loadAsyncBtn = document.querySelector("#loadAsyncBtn");

  categoryFilter?.addEventListener("change", renderEventCards);
  quickSearch?.addEventListener("keydown", renderEventCards);
  loadThenBtn?.addEventListener("click", loadRemoteEventsThen);
  loadAsyncBtn?.addEventListener("click", loadRemoteEventsAsync);
}

function renderEventCards(eventList = communityEvents) {
  const listContainer = document.querySelector("#eventList");
  if (!listContainer) {
    return;
  }

  const category = document.querySelector("#categoryFilter")?.value || "all";
  const searchTerm = document.querySelector("#quickSearch")?.value.trim().toLowerCase() || "";
  const filteredEvents = filterEventsByCategory(eventList, category, ({ name }) => name.toLowerCase().includes(searchTerm));

  listContainer.innerHTML = "";

  const visibleEvents = filteredEvents.filter((eventItem) => {
    if (eventItem instanceof Event) {
      return eventItem.checkAvailability();
    }
    return true;
  });

  visibleEvents.forEach((eventItem) => {
    const card = document.createElement("article");
    card.className = "eventCard";
    card.innerHTML = `
      <h3>${eventItem.name}</h3>
      <p>${eventItem.location || "Community location"}</p>
      <p>${eventItem.date ? `Date: ${eventItem.date}` : eventItem.dateLabel || "Date pending"}</p>
      <p>${eventItem.seats !== undefined ? `Seats: ${eventItem.seats}` : eventItem.summary || "Community event"}</p>
      <div class="actions">
        <button type="button" class="primary register-card-btn">Register</button>
        <button type="button" class="secondary cancel-card-btn">Cancel</button>
      </div>
      <div class="status-box warning card-status"></div>
    `;

    const registerButton = card.querySelector(".register-card-btn");
    const cancelButton = card.querySelector(".cancel-card-btn");
    const statusBox = card.querySelector(".card-status");

    registerButton.onclick = () => {
      try {
        if (eventItem instanceof Event) {
          const result = registerUser(eventItem, 1);
          eventItem.userRegistrations = (eventItem.userRegistrations || 0) + 1;
          statusBox.textContent = result;
          renderEventCards(eventList);
        } else {
          statusBox.textContent = `Registered for ${eventItem.name}.`;
        }
      } catch (error) {
        statusBox.textContent = error.message;
      }
    };

    cancelButton.onclick = () => {
      if (eventItem instanceof Event) {
        if ((eventItem.userRegistrations || 0) > 0) {
          eventItem.seats++;
          eventItem.userRegistrations--;
          statusBox.textContent = `Registration canceled for ${eventItem.name}.`;
          renderEventCards(eventList);
        } else {
          statusBox.textContent = `You are not registered for ${eventItem.name}.`;
        }
      } else {
        statusBox.textContent = `Registration canceled for ${eventItem.name}.`;
      }
    };

    listContainer.appendChild(card);
  });
}

function displayUpcomingEvents() {
  const upcoming = communityEvents.filter((eventItem) => eventItem.checkAvailability());
  const output = document.querySelector("#loadStatus");
  if (output) {
    output.textContent = upcoming.length ? `${upcoming.length} upcoming events are available.` : "No upcoming events with seats are available.";
  }
  return upcoming;
}

function displayMusicEvents() {
  return communityEvents.filter((eventItem) => eventItem.category === "music");
}

function formatEventCards() {
  return communityEvents.map(({ name }) => `Workshop on ${name.split(" ").slice(-1)[0]}`);
}

function loadRemoteEventsThen() {
  const loadStatus = document.querySelector("#loadStatus");
  if (loadStatus) {
    loadStatus.textContent = "Loading remote events with then/catch...";
  }

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then((response) => response.json())
    .then((posts) => {
      const remoteEvents = posts.map(({ title, id }) => ({
        name: title,
        dateLabel: `Remote item #${id}`,
        summary: "Fetched with then/catch"
      }));
      renderEventCards(remoteEvents);
      if (loadStatus) {
        loadStatus.textContent = "Remote events loaded with then/catch.";
      }
    })
    .catch((error) => {
      console.error("Remote load failed:", error);
      if (loadStatus) {
        loadStatus.textContent = "Remote load failed. Showing local events instead.";
      }
      renderEventCards(communityEvents);
    });
}

async function loadRemoteEventsAsync() {
  const loadStatus = document.querySelector("#loadStatus");
  const spinner = loadStatus;
  if (spinner) {
    spinner.textContent = "Loading remote events with async/await...";
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = await response.json();
    const remoteEvents = posts.map(({ title, id }) => ({
      name: title,
      dateLabel: `Remote item #${id}`,
      summary: "Fetched with async/await"
    }));
    renderEventCards(remoteEvents);
    if (spinner) {
      spinner.textContent = "Remote events loaded with async/await.";
    }
  } catch (error) {
    console.error("Async remote load failed:", error);
    if (spinner) {
      spinner.textContent = "Async load failed. Showing local events instead.";
    }
    renderEventCards(communityEvents);
  }
}

function submitRegistrationAjax(payload) {
  const status = document.querySelector("#registrationOutput");
  if (status) {
    status.textContent = "Sending registration to the server...";
  }

  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration request failed.");
        }
        return response.json();
      })
      .then((data) => {
        if (status) {
          status.textContent = `Success: registration saved with id ${data.id || "mock"}.`;
        }
      })
      .catch((error) => {
        if (status) {
          status.textContent = `Failure: ${error.message}`;
        }
      });
  }, 800);
}

function initializeJQueryDemo() {
  if (!window.jQuery) {
    console.log("jQuery is not loaded. React or Vue would be a better fit for larger portals because they make reusable components and state management easier.");
    return;
  }

  const registerButton = window.jQuery("#registerBtn");
  registerButton.click(() => {
    window.jQuery(".eventCard").fadeOut(120).fadeIn(120);
  });
}

function logEventDetailsToConsole() {
  communityEvents.forEach((eventItem) => {
    console.log("Event entries:", getEventEntries(eventItem).join(" | "));
  });
}

function initializePortal() {
  restorePreferences();
  setCharacterCountDisplay();
  createJsLabSection();
  renderEventCards(communityEvents);
  displayUpcomingEvents();
  logEventDetailsToConsole();
  initializeJQueryDemo();

  const promoVideo = document.getElementById("promoVideo");
  if (promoVideo && promoVideo.readyState >= 3) {
    videoReady();
  }

  const eventType = document.getElementById("eventType");
  eventType?.addEventListener("change", (event) => updateEventFee(event.target.value));

  const feedbackType = document.getElementById("feedbackType");
  feedbackType?.addEventListener("change", (event) => showFeedbackFee(event.target.value));

  const feedbackText = document.getElementById("feedbackText");
  feedbackText?.addEventListener("keydown", captureKeyEvent);
  feedbackText?.addEventListener("input", updateCharacterCount);

  const phoneInput = document.getElementById("phone");
  phoneInput?.addEventListener("blur", validatePhone);

  const registrationForm = document.getElementById("registrationForm");
  registrationForm?.addEventListener("submit", handleRegistrationSubmit);

  const registerButton = document.getElementById("registerBtn");
  registerButton?.addEventListener("click", showSubmitConfirmation);

  const quickSearch = document.getElementById("quickSearch");
  quickSearch?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      renderEventCards(communityEvents);
    }
  });

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then((response) => response.json())
    .then((payload) => {
      console.log("Promise fetch result:", payload);
    })
    .catch((error) => {
      console.warn("Promise fetch failed:", error);
    });

  (async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=2");
      const users = await response.json();
      console.log("Async fetch result:", users);
    } catch (error) {
      console.warn("Async fetch failed:", error);
    }
  })();

  console.log("Framework note: React or Vue simplify reusable UI, state management, and large-scale component composition.");
}

window.addEventListener("beforeunload", (event) => {
  if (formDirty) {
    event.preventDefault();
    event.returnValue = "You have unfinished changes on the form page.";
  }
});

document.addEventListener("DOMContentLoaded", initializePortal);
