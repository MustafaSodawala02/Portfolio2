(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----- Typing effect (disabled when user prefers reduced motion) -----
  var typingEl = document.getElementById('hero-typing');
  var phrases = ['Creative Developer', 'UI/UX Designer', 'App Developer'];
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 100;

  function type() {
    if (!typingEl || prefersReducedMotion) return;
    var current = phrases[phraseIndex];
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

    window.setTimeout(type, typingSpeed);
  }

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = phrases[0];
      var cursor = document.querySelector('.typing-cursor');
      if (cursor) cursor.style.animation = 'none';
    } else {
      window.setTimeout(type, 800);
    }
  }

  // ----- Header scroll -----
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu + overlay -----
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var overlay = document.getElementById('nav-overlay');
  var menuLinks = document.querySelectorAll('#nav-menu a');

  function setMenuOpen(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
    if (overlay) {
      overlay.classList.toggle('active', open);
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    if (open) {
      var first = menu.querySelector('a');
      if (first) window.setTimeout(function () { first.focus(); }, 100);
    } else {
      toggle.focus();
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    var open = !menu.classList.contains('open');
    setMenuOpen(open);
  }

  if (toggle && menu) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-menu');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ----- Active nav from scroll -----
  var sectionIds = ['about', 'services', 'skills', 'projects', 'gallery', 'contact'];
  var navAnchors = document.querySelectorAll('.nav-menu a[href^="#"]');
  var headerEl = document.querySelector('.header');
  function updateActiveNav() {
    if (!navAnchors.length) return;
    var headerH = headerEl ? headerEl.offsetHeight : 72;
    var pos = window.scrollY + headerH + 24;
    var activeId = '';
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= pos) activeId = id;
    });
    navAnchors.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === '#' + activeId);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav, { passive: true });
  updateActiveNav();

  // ----- Skill bars animation on scroll -----
  var skillFills = document.querySelectorAll('.skill-fill');
  var observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var fill = entry.target;
      var pct = fill.getAttribute('data-pct') || 0;
      fill.style.setProperty('--skill-pct', pct + '%');
      fill.classList.add('animated');
    });
  }, observerOptions);

  skillFills.forEach(function (el) {
    observer.observe(el);
  });

  if (prefersReducedMotion) {
    skillFills.forEach(function (fill) {
      var pct = fill.getAttribute('data-pct') || 0;
      fill.style.setProperty('--skill-pct', pct + '%');
      fill.classList.add('animated');
    });
  }

  // ----- Reveal on scroll -----
  var revealEls = document.querySelectorAll(
    '.service-card, .project-card, .about-card, .gallery-item, .contact-info, .contact-form'
  );
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
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
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ----- Contact form -----
  var form = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  function announceForm(message) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.setAttribute('aria-live', 'polite');
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var action = form.getAttribute('action');
      if (!action || action.indexOf('YOUR_FORM_ID') !== -1) {
        var name = form.querySelector('[name="name"]').value;
        var email = form.querySelector('[name="email"]').value;
        var subject = form.querySelector('[name="subject"]').value || 'Portfolio contact';
        var message = form.querySelector('[name="message"]').value;
        var mailto =
          'mailto:mustafasodawala13@gmail.com?subject=' +
          encodeURIComponent(subject + ' - from ' + name) +
          '&body=' +
          encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
        window.location.href = mailto;
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      announceForm('Sending your message…');
      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            form.reset();
            announceForm('Message sent successfully. Thank you!');
          } else {
            throw new Error('Send failed');
          }
        })
        .catch(function () {
          btn.textContent = 'Send failed — try emailing directly';
          btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          announceForm('Send failed. Please email mustafasodawala13@gmail.com directly.');
        })
        .finally(function () {
          window.setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            announceForm('');
          }, 3500);
        });
    });
  }

  // ----- About photo: use initials until images/avatar.png loads -----
  var aboutAv = document.getElementById('about-avatar');
  var aboutImg = aboutAv ? aboutAv.querySelector('.about-photo-img') : null;
  if (aboutAv && aboutImg) {
    function showAboutPhoto() {
      aboutAv.classList.add('with-photo');
    }
    function dropBrokenPhoto() {
      aboutImg.remove();
    }
    if (aboutImg.complete && aboutImg.naturalHeight > 0) {
      showAboutPhoto();
    } else {
      aboutImg.addEventListener('load', showAboutPhoto);
      aboutImg.addEventListener('error', dropBrokenPhoto);
    }
  }

  // ----- Footer year -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
