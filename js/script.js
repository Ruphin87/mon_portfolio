// ============================================
// YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_PUBLIC_KEY = '6wrliTNT0megd55rl';
const EMAILJS_SERVICE_ID = 'service_902q12c';
const EMAILJS_TEMPLATE_ID = 'template_xry172i';

const EMAILJS_CONFIG_READY =
  EMAILJS_PUBLIC_KEY &&
  EMAILJS_SERVICE_ID &&
  EMAILJS_TEMPLATE_ID &&
  EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
  EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
  EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

if (window.emailjs && EMAILJS_CONFIG_READY) {
  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

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
// CONTACT FORM — SEND MESSAGE VIA EMAILJS
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const submitButton = document.getElementById('contactSubmit');
const submitText = submitButton?.querySelector('.submit-text');

if (contactForm && formNote && submitButton && submitText) {
  let isSending = false;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const subject = document.getElementById('cfSubject').value.trim();
    const message = document.getElementById('cfMessage').value.trim();

    if (!name) {
      formNote.textContent = 'Veuillez saisir votre nom.';
      formNote.classList.add('error');
      document.getElementById('cfName').focus();
      return;
    }

    if (!email) {
      formNote.textContent = 'Veuillez saisir votre adresse e-mail.';
      formNote.classList.add('error');
      document.getElementById('cfEmail').focus();
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      formNote.textContent = 'Veuillez saisir une adresse e-mail valide.';
      formNote.classList.add('error');
      document.getElementById('cfEmail').focus();
      return;
    }

    if (!subject) {
      formNote.textContent = 'Veuillez saisir l’objet du message.';
      formNote.classList.add('error');
      document.getElementById('cfSubject').focus();
      return;
    }

    if (!message) {
      formNote.textContent = 'Veuillez saisir votre message.';
      formNote.classList.add('error');
      document.getElementById('cfMessage').focus();
      return;
    }

    formNote.classList.remove('error');
    formNote.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    submitButton.classList.add('is-loading');
    submitText.textContent = 'Envoi en cours...';
    isSending = true;

    const templateParams = {
      name,
      email,
      subject,
      message,
      reply_to: email
    };

    if (!window.emailjs || !EMAILJS_CONFIG_READY) {
      console.warn('EmailJS is not configured yet. Replace the placeholder values in js/script.js.');
      formNote.textContent = 'Le service d\'envoi n\'est pas encore configuré. Remplacez les identifiants EmailJS dans le code.';
      formNote.classList.add('error');
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
      submitText.textContent = 'Envoyer';
      isSending = false;
      return;
    }

    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        formNote.textContent = 'Votre message a été envoyé avec succès. Merci de m\'avoir contacté !';
        formNote.classList.remove('error');
        submitText.textContent = 'Message envoyé ✓';
        submitButton.disabled = true;
        contactForm.reset();

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.classList.remove('is-loading');
          submitText.textContent = 'Envoyer';
          isSending = false;
        }, 1800);
      })
      .catch((error) => {
        console.error('EmailJS send error:', error);
        formNote.textContent = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
        formNote.classList.add('error');
        submitButton.disabled = false;
        submitButton.classList.remove('is-loading');
        submitText.textContent = 'Envoyer';
        isSending = false;
      });
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
