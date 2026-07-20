/**
 * Datas ja reservadas (YYYY-MM-DD). Edite esta lista conforme sua agenda real.
 */
const DATAS_OCUPADAS = new Set([
  "2026-05-16",
  "2026-05-17",
  "2026-05-15",
  "2026-05-22",
  "2026-05-23",
  "2026-05-24",

]);

const WHATSAPP_BASE = "https://wa.me/5561998202728";

const monthLabelEl = document.getElementById("cal-month-label");
const daysEl = document.getElementById("cal-days");
const prevBtn = document.getElementById("cal-prev");
const nextBtn = document.getElementById("cal-next");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toISODate(year, monthIndex, day) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

function formatDisplayDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth();

function renderCalendar() {
  if (!monthLabelEl || !daysEl) return;

  const first = new Date(viewYear, viewMonth, 1);
  const last = new Date(viewYear, viewMonth + 1, 0);
  const daysInMonth = last.getDate();
  const startWeekday = first.getDay();

  monthLabelEl.textContent = first.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  daysEl.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < startWeekday; i++) {
    const cell = document.createElement("div");
    cell.className = "cal-day cal-day-empty";
    cell.setAttribute("aria-hidden", "true");
    daysEl.appendChild(cell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toISODate(viewYear, viewMonth, day);
    const cellDate = new Date(viewYear, viewMonth, day);
    cellDate.setHours(0, 0, 0, 0);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-day";
    cell.textContent = String(day);

    const occupied = DATAS_OCUPADAS.has(iso);
    const isPast = cellDate < today;

    if (occupied || isPast) {
      cell.classList.add("cal-day-unavailable");
      cell.disabled = true;
      cell.setAttribute(
        "aria-label",
        isPast
          ? `${day} — data passada`
          : `${day} — indisponivel`
      );
    } else {
      cell.classList.add("cal-day-available");
      cell.setAttribute("aria-label", `${day} — disponivel`);
      cell.addEventListener("click", () => {
        const msg = encodeURIComponent(
          `Ola! Gostaria de reservar a Chacara das Oliveiras para ${formatDisplayDate(iso)}.`
        );
        window.open(`${WHATSAPP_BASE}?text=${msg}`, "_blank", "noopener,noreferrer");
      });
    }

    daysEl.appendChild(cell);
  }
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });
}

renderCalendar();
