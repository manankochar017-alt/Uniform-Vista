document.getElementById('year').textContent = new Date().getFullYear();

/* ============ NAVBAR SCROLL STATE ============ */
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============ MOBILE MENU ============ */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* ============ ACTIVE NAV LINK ON SCROLL ============ */
const sections = ['home', 'about', 'products', 'reviews', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(document.querySelectorAll('.nav-link'));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
sections.forEach(s => sectionObserver.observe(s));

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ============ HERO BACKGROUND SLIDESHOW ============ */
const heroBgImgs = document.querySelectorAll('.hero-bg-img');
if (heroBgImgs.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  let heroBgIndex = 0;
  setInterval(() => {
    heroBgImgs[heroBgIndex].classList.remove('active');
    heroBgIndex = (heroBgIndex + 1) % heroBgImgs.length;
    heroBgImgs[heroBgIndex].classList.add('active');
  }, 1500);
}

/* ============ HERO PARALLAX FABRIC LAYERS ============ */
const hero = document.getElementById('home');
const fabric1 = document.getElementById('fabricLayer');
const fabric2 = document.getElementById('fabricLayer2');

if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5);
    const y = (e.clientY / h - 0.5);
    fabric1.style.transform = `translate(${x * 24}px, ${y * 24}px)`;
    fabric2.style.transform = `translate(${x * -36}px, ${y * -36}px)`;
  });
}

/* ============ 3D TILT ON PRODUCT & REVIEW CARDS ============ */
function attachTilt(el, strength = 10) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-4px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
}
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.product-card').forEach(el => attachTilt(el, 9));
}

/* ============ REVIEWS RAIL: ARROWS + DRAG SCROLL ============ */
const rail = document.getElementById('reviewsRail');
const railLeft = document.getElementById('railLeft');
const railRight = document.getElementById('railRight');
const cardStep = () => (rail.querySelector('.review-card')?.offsetWidth || 300) + 22;

railLeft.addEventListener('click', () => rail.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
railRight.addEventListener('click', () => rail.scrollBy({ left: cardStep(), behavior: 'smooth' }));

let isDown = false, startX = 0, scrollStart = 0;
rail.addEventListener('pointerdown', (e) => {
  isDown = true;
  startX = e.clientX;
  scrollStart = rail.scrollLeft;
  rail.setPointerCapture(e.pointerId);
});
rail.addEventListener('pointermove', (e) => {
  if (!isDown) return;
  rail.scrollLeft = scrollStart - (e.clientX - startX);
});
rail.addEventListener('pointerup', () => { isDown = false; });
rail.addEventListener('pointercancel', () => { isDown = false; });

/* ============ PRODUCT MODAL ============ */
const productModal = document.getElementById('productModal');
const modalMedia = document.getElementById('modalMedia');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('productModalClose');
const modalBackdrop = document.getElementById('productModalBackdrop');

function openProductModal(card) {
  const photo = card.querySelector('.product-icon-photo img');
  const icon = card.querySelector('.product-icon svg');
  const tag = card.querySelector('.product-tag');
  const title = card.querySelector('h3');
  const desc = card.querySelector('p');

  if (photo) {
    modalMedia.innerHTML = '';
    const imgClone = photo.cloneNode(true);
    modalMedia.appendChild(imgClone);
  } else {
    modalMedia.innerHTML = icon ? icon.outerHTML : '';
  }
  modalTag.textContent = tag ? tag.textContent : '';
  modalTitle.textContent = title ? title.textContent : '';
  modalDesc.textContent = desc ? desc.textContent : '';

  productModal.classList.add('open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.product-card').forEach(card => {
  if (card.classList.contains('product-card-cta')) return; // this card just links to Contact
  card.addEventListener('click', (e) => {
    if (e.target.closest('.card-link')) return; // let the gifting link work normally
    openProductModal(card);
  });
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProductModal(card);
    }
  });
});

modalClose.addEventListener('click', closeProductModal);
modalBackdrop.addEventListener('click', closeProductModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal.classList.contains('open')) closeProductModal();
});

/* ============ BOOKING PREVIEW ============ */
const prefDate = document.getElementById('prefDate');
const prefTime = document.getElementById('prefTime');
const interest = document.getElementById('interest');
const bpText = document.getElementById('bpText');

function updateBookingPreview() {
  const hasDate = prefDate.value;
  const hasTime = prefTime.value;
  if (!hasDate && !hasTime) {
    bpText.textContent = 'Pick a date and time to see it here.';
    return;
  }
  const dateStr = hasDate
    ? new Date(prefDate.value + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'a date to be confirmed';
  const timeStr = hasTime
    ? new Date('2000-01-01T' + prefTime.value).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    : 'a time to be confirmed';
  const topic = interest.value ? ` about ${interest.value}` : '';
  bpText.textContent = `30-min call${topic} on ${dateStr} at ${timeStr}.`;
}
[prefDate, prefTime, interest].forEach(el => el && el.addEventListener('change', updateBookingPreview));

/* set min date to today so users can't pick the past */
if (prefDate) {
  const today = new Date().toISOString().split('T')[0];
  prefDate.setAttribute('min', today);
}