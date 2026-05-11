const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const previewData = {
  dashboard: {
    kicker: "Daily overview",
    title: "Know what changed today.",
    text:
      "The dashboard shows the latest blood pressure, blood sugar, and medicine status with quick actions for new logs.",
    rows: [
      ["strong", "Today's Summary", "BP, sugar, medicine"],
      ["teal", "120 / 80 mmHg", "Within saved target"],
      ["blue", "98 mg/dL", "Fasting"],
      ["purple", "8:00 PM", "Next medicine reminder"],
    ],
  },
  history: {
    kicker: "Trends and timeline",
    title: "Review readings without digging.",
    text:
      "History groups recent BP, sugar, and medicine logs by date, with averages, highest values, and visual trend cards.",
    rows: [
      ["strong", "Blood Pressure History", "Today, yesterday, this week"],
      ["teal", "Average BP 121 / 79", "Last 30 days"],
      ["blue", "Latest sugar 102", "After meal"],
      ["purple", "Medicine taken", "31 logs saved"],
    ],
  },
  medicine: {
    kicker: "Reminders",
    title: "Stay close to your medicine routine.",
    text:
      "Medicine reminders show the week, next dose, due-now status, taken logs, and missed entries in one focused screen.",
    rows: [
      ["strong", "Next Dose", "Due at 8:00 PM"],
      ["purple", "Metformin", "1 tablet after dinner"],
      ["teal", "Daily schedule", "Mon Tue Wed Thu Fri Sat Sun"],
      ["blue", "Already taken", "Morning dose complete"],
    ],
  },
  reports: {
    kicker: "Export",
    title: "Prepare focused summaries.",
    text:
      "Reports can include profile context, latest readings, trends, medicines, and filtered data ranges for review or backup.",
    rows: [
      ["strong", "Doctor Visit Report", "PDF and CSV"],
      ["teal", "12 BP readings", "Target status included"],
      ["blue", "18 sugar readings", "Reading type included"],
      ["purple", "31 medicine logs", "Taken and missed"],
    ],
  },
};

const tabButtons = document.querySelectorAll("[data-preview]");
const previewKicker = document.querySelector("#preview-kicker");
const previewTitle = document.querySelector("#preview-title");
const previewText = document.querySelector("#preview-text");
const previewScreen = document.querySelector("#preview-screen");

const renderPreview = (key) => {
  const data = previewData[key];
  if (!data || !previewScreen) return;

  previewKicker.textContent = data.kicker;
  previewTitle.textContent = data.title;
  previewText.textContent = data.text;
  previewScreen.innerHTML = data.rows
    .map(
      ([tone, title, meta]) => `
        <div class="mini-row ${tone}">
          <span></span>
          <div>
            <b>${title}</b>
            <small>${meta}</small>
          </div>
        </div>
      `,
    )
    .join("");
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderPreview(button.dataset.preview);
  });
});

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (element) => {
  const target = Number(element.getAttribute("data-count"));
  const duration = 650;
  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    element.textContent = Math.round(target * progress).toString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 },
  );

  counters.forEach((counter) => countObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}
