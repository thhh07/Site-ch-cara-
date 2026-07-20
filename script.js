const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const aboutButton = document.querySelector('a[href="#sobre"]');
const aboutSection = document.getElementById("sobre");

function smoothScrollTo(targetY, durationMs) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

if (aboutButton && aboutSection) {
  aboutButton.addEventListener("click", (event) => {
    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      aboutSection.scrollIntoView();
      return;
    }

    const targetY = aboutSection.getBoundingClientRect().top + window.scrollY - 20;
    smoothScrollTo(targetY, 1400);
  });
}
