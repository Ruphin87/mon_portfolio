// ============================================
// YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// HEADER SCROLL STATE
// ============================================
const header = document.getElementById('siteHeader');
function handleHeaderScroll() {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

// ============================================
// MOBILE MENU
// ============================================
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

function setActiveLink() {
  let current = sections[0]?.id;
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
const revealEls = document.querySelectorAll('.reveal, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.08}s`;
  revealObserver.observe(el);
});

// ============================================
// HERO TYPED ROLE ANIMATION
// ============================================
const roles = [
  "Étudiant en Master Intelligence Artificielle",
  "Spécialisé en Cybersécurité & IoT",
  "Développeur d'applications web & mobiles",
  "Passionné d'Intelligence Artificielle et de nouvelles technologies"
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
setTimeout(typeLoop, 900);

// ============================================
// ANIMATED COUNTERS
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  let current = 0;
  const duration = 1200;
  const stepTime = 30;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, stepTime);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ============================================
// CURSOR GLOW (desktop only)
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    cursorGlow.classList.add('active');
  });
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
}

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// CONTACT FORM — SEND MESSAGE
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const subject = document.getElementById('cfSubject').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    if (!name || !email || !subject || !message) {
      formNote.textContent = "Merci de remplir tous les champs avant d'envoyer.";
      formNote.classList.add('error');
      return;
    }

    formNote.classList.remove('error');

    const to = 'ruphinhenriratahinjanahary@gmail.com';
    const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailBody = encodeURIComponent(
      `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;

    formNote.textContent = "Votre application de messagerie va s'ouvrir pour envoyer le message. Merci !";
    contactForm.reset();
  });
}

// ============================================
// SMOOTH ANCHOR SCROLL (offset for fixed header)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
