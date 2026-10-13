/* ============================================================
   Booking form
   ============================================================ */
const bookingForm = document.getElementById("bookingForm");
const message     = document.getElementById("message");
const checkin     = document.getElementById("checkin");
const checkout    = document.getElementById("checkout");

const today = new Date();
const date  = today.getFullYear() + "-" +
              String(today.getMonth() + 1).padStart(2, "0") + "-" +
              String(today.getDate()).padStart(2, "0");

checkin.min  = date;
checkout.min = date;

checkin.addEventListener("change", function () {
  checkout.min = checkin.value;
  if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkin.value || !checkout.value) {
    message.textContent = "Please select both check-in and check-out dates.";
    return;
  }
  if (checkout.value <= checkin.value) {
    message.textContent = "Check-out must be after check-in.";
    return;
  }

  message.textContent = "Your hotel search is ready! Selected hotel: " +
    document.getElementById("hotel").value + ". This is a demo booking page.";
});

/* Subscribe ------------------------------------------------ */
document.getElementById("subscribeForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("subscribeMessage").textContent = "Thank you for subscribing!";
  this.reset();
});

/* ============================================================
   Hero carousel
   ============================================================ */
const slides = document.querySelectorAll(".carousel-slide");
const dotsWrap = document.getElementById("carouselDots");
let current = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll("button");

function goTo(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
  restart();
}

document.querySelector(".carousel-btn.prev").addEventListener("click", () => goTo(current - 1));
document.querySelector(".carousel-btn.next").addEventListener("click", () => goTo(current + 1));

function restart() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 5000);
}
restart();

/* ============================================================
   Mobile nav + dropdown toggle
   ============================================================ */
const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("mainNav");

hamburger.addEventListener("click", () => mainNav.classList.toggle("open"));

document.querySelectorAll(".has-dropdown > .nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle("open");
    }
  });
});

/* ============================================================
   Dynamic content
   ============================================================ */
const hotels = [
  { name: "Hotel Taj Mahal Palace", loc: "Mumbai, India",     price: "₹191,000", img: "assets/Hotel Taj Mahal Palace.webp" },
  { name: "Mont Blanc",             loc: "Zurich, Switzerland", price: "₹305,824", img: "assets/Mont Blanc.jpg" },
  { name: "Hotel Marriott",         loc: "Melbourne, Australia", price: "₹114,000", img: "assets/Hotel Marriott.webp" }
];

document.getElementById("hotelGrid").innerHTML = hotels.map(h => `
  <article class="hotel-card">
    <img src="${h.img}" alt="${h.name}" loading="lazy" />
    <div class="card-body">
      <h3>${h.name}</h3>
      <p class="loc">${h.loc}</p>
      <span class="price-tag">${h.price}</span>
    </div>
  </article>`).join("");

const deals = [
  { title: "Paris Eurostar Breaks",    img: "assets/PARIS EUROSTAR BREAKS.webp" },
  { title: "Tropical Island Escapes",  img: "assets/TROPICAL ISLAND ESCAPES.webp" }
];

document.getElementById("dealsGrid").innerHTML = deals.map(d => `
  <a href="#" class="deal">
    <img src="${d.img}" alt="${d.title}" loading="lazy" />
    <h3>${d.title}</h3>
  </a>`).join("");

const blogs = [
  { title: "Best places to visit in India", url: "#" }
];

document.getElementById("blogList").innerHTML = blogs.map(b => `
  <article class="blog-item">
    <h3>${b.title}</h3>
    <a href="${b.url}" class="read-more">Read more <i class="fa fa-arrow-right"></i></a>
  </article>`).join("");
