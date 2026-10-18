const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");
const hotelGrid = document.getElementById("hotelGrid");
const prevHotel = document.getElementById("prevHotel");
const nextHotel = document.getElementById("nextHotel");
const accountModal = document.getElementById("accountModal");
const modalTitle = document.getElementById("modalTitle");
const accountMessage = document.getElementById("accountMessage");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
            navLinks.classList.remove("open");
        }
    });
});

const today = new Date();
const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

checkin.min = todayString;
checkout.min = todayString;

checkin.addEventListener("change", () => {
    checkout.min = checkin.value || todayString;

    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = "";
    }
});

bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
        return;
    }

    if (checkout.value <= checkin.value) {
        bookingMessage.textContent = "Check-out must be after check-in.";
        return;
    }

    const destination = document.getElementById("location").value;
    const hotelType = document.getElementById("hotel").value;
    const rooms = document.getElementById("rooms").value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;

    bookingMessage.textContent =
        `Search details: ${hotelType} in ${destination}, ${checkin.value} to ${checkout.value}, ${rooms}, ${adults}, ${children}.`;

    document.getElementById("hotels").scrollIntoView({
        behavior: "smooth"
    });
});

nextHotel.addEventListener("click", () => {
    const cards = Array.from(hotelGrid.children);

    if (cards.length > 1) {
        hotelGrid.appendChild(cards[0]);
    }
});

prevHotel.addEventListener("click", () => {
    const cards = Array.from(hotelGrid.children);

    if (cards.length > 1) {
        hotelGrid.prepend(cards[cards.length - 1]);
    }
});

function openAccountModal(title) {
    modalTitle.textContent = title;
    accountMessage.textContent = "";
    accountModal.classList.add("active");
    accountModal.setAttribute("aria-hidden", "false");
}

function closeAccountModal() {
    accountModal.classList.remove("active");
    accountModal.setAttribute("aria-hidden", "true");
}

document.getElementById("signupBtn").addEventListener("click", () => {
    openAccountModal("Create Your Account");
});

document.getElementById("accountBtn").addEventListener("click", () => {
    openAccountModal("Welcome Back");
});

document.getElementById("closeModal").addEventListener("click", closeAccountModal);

accountModal.addEventListener("click", event => {
    if (event.target === accountModal) {
        closeAccountModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAccountModal();
    }
});

document.getElementById("accountForm").addEventListener("submit", event => {
    event.preventDefault();

    accountMessage.textContent =
        "Form validated. Connect a backend to enable account access.";
});

document.getElementById("subscribeForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const subscribeMessage = document.getElementById("subscribeMessage");

    if (!email) {
        subscribeMessage.textContent = "Please enter your email address.";
        return;
    }

    subscribeMessage.textContent =
        "Thank you for subscribing! Connect a backend to save your subscription.";

    event.target.reset();
});
