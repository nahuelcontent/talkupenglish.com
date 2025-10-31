const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const yearEl = document.getElementById('year');
const desktopMedia = window.matchMedia('(min-width: 1025px)');

const closeNavOnOutsideClick = (event) => {
  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', closeNavOnOutsideClick);
  }
};

const syncNavState = () => {
  if (!navMenu || !navToggle) return;

  if (desktopMedia.matches) {
    navMenu.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', closeNavOnOutsideClick);
  } else if (navToggle.getAttribute('aria-expanded') === 'true') {
    navMenu.setAttribute('aria-hidden', 'false');
  } else {
    navMenu.setAttribute('aria-hidden', 'true');
  }
};

const addMediaChangeListener = (listener) => {
  if (typeof desktopMedia.addEventListener === 'function') {
    desktopMedia.addEventListener('change', listener);
  } else if (typeof desktopMedia.addListener === 'function') {
    desktopMedia.addListener(listener);
  }
};

if (navToggle && navMenu) {
  syncNavState();
  addMediaChangeListener(syncNavState);

  navToggle.addEventListener('click', () => {
    if (desktopMedia.matches) return;

    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.setAttribute('aria-hidden', String(expanded));

    if (!expanded) {
      requestAnimationFrame(() => {
        document.addEventListener('click', closeNavOnOutsideClick);
      });
    } else {
      document.removeEventListener('click', closeNavOnOutsideClick);
    }
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && !desktopMedia.matches) {
      navMenu.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closeNavOnOutsideClick);
    }
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
