(function () {
  'use strict';

  // ----- Typing effect -----
  const typingEl = document.getElementById('hero-typing');
  const phrases = [
    'Creative Developer',
    'UI/UX Designer',
    'App Developer',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  if (typingEl) setTimeout(type, 800);

  // ----- Header scroll -----
  const header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  const toggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const menuLinks = document.querySelectorAll('.nav-menu a');

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Skill bars animation on scroll -----
  const skillFills = document.querySelectorAll('.skill-fill');
  const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const fill = entry.target;
      const pct = fill.getAttribute('data-pct') || 0;
      fill.style.setProperty('--skill-pct', pct + '%');
      fill.classList.add('animated');
    });
  }, observerOptions);

  skillFills.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll(
    '.service-card, .project-card, .about-card, .gallery-item, .contact-info, .contact-form'
  );
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ----- Contact form (Formspree — messages go to mustafasodawala13@gmail.com) -----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var action = form.getAttribute('action');
      if (!action || action.indexOf('YOUR_FORM_ID') !== -1) {
        // No Formspree ID set: fallback to mailto so you still receive the message
        var name = form.querySelector('[name="name"]').value;
        var email = form.querySelector('[name="email"]').value;
        var subject = form.querySelector('[name="subject"]').value || 'Portfolio contact';
        var message = form.querySelector('[name="message"]').value;
        var mailto = 'mailto:mustafasodawala13@gmail.com?subject=' + encodeURIComponent(subject + ' - from ' + name) + '&body=' + encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
        window.location.href = mailto;
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            form.reset();
          } else {
            throw new Error('Send failed');
          }
        })
        .catch(function () {
          btn.textContent = 'Send failed — try emailing directly';
          btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        })
        .finally(function () {
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
          }, 3500);
        });
    });
  }

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
