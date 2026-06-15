/* =============================================
   SCROLL ANIMATIONS — Franchising Factory
   ============================================= */
(function () {

  /* ---------- 1. MARCAR ELEMENTOS ---------- */
  function tag(selector, cls, extra) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (cls) el.classList.add(cls);
      if (extra) el.style.transitionDelay = (i * extra) + 's';
    });
  }

  // Seções inteiras
  tag('.about-label',   'from-left');
  tag('.about-text h2', 'from-left');
  tag('.about-text p',  'from-left');
  tag('.about-btns',    'from-left');
  tag('.about-photo',   'from-right');

  tag('.section-label',    '');
  tag('.section-title',    '');
  tag('.section-subtitle', '');
  tag('.section-text',     '');

  // Cards com delay em cascata
  tag('.service-card',  'scale-up', 0.08);
  tag('.benefit-card',  'scale-up', 0.08);
  tag('.blog-card',     'scale-up', 0.1);

  // Quem somos
  tag('.quem-somos-text h2', 'from-left');
  tag('.quem-somos-text p',  'from-left');
  tag('.quem-somos-gallery img', 'scale-up', 0.06);

  // CTA Banner
  tag('.cta-banner-text', '');
  tag('.cta-banner-sub',  '');
  tag('.cta-banner-stat', 'scale-up');
  tag('.cta-banner-btns', '');

  // Schedule
  tag('.schedule-inner h2', '');
  tag('.schedule-inner .btn', 'scale-up');

  // FAQ
  tag('.faq-item', '', 0.05);

  // Portfolio
  tag('.portfolio-gallery img', 'scale-up', 0.04);

  // Stats block
  tag('.adm-stat', 'scale-up', 0.08);

  /* ---------- 2. INTERSECTION OBSERVER ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---------- 3. COUNTER ANIMATION ---------- */
  // Anima o número "+1000 clientes"
  function animateCount(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = '+ de ' + Math.floor(start).toLocaleString('pt-BR') + ' clientes atendidos!';
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const ctaStat = document.querySelector('.cta-banner-stat');
  if (ctaStat) {
    const statObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCount(ctaStat, 1000, 1200);
        statObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statObserver.observe(ctaStat);
  }

  /* ---------- 4. PARALLAX SUTIL NO HERO ---------- */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrollY * 0.25}px) scale(1.05)`;
      }
    }, { passive: true });
  }

})();
