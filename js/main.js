document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Loading Screen
  // ==========================================
  const loadingScreen = document.getElementById('loading');
  if (loadingScreen) {
    const loadNum = loadingScreen.querySelector('.loading-num');
    if (loadNum) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        loadNum.textContent = count;
        if (count >= 60) clearInterval(interval);
      }, 30);
    }
    setTimeout(() => {
      loadingScreen.classList.add('is-hidden');
    }, 2400);
  }

  // ==========================================
  // Scroll Progress Bar
  // ==========================================
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ==========================================
  // Hero 60 Count-Up
  // ==========================================
  const heroNumber = document.querySelector('.hero-number');
  if (heroNumber) {
    const numEl = heroNumber.querySelector('.num');
    if (numEl) {
      let count = 0;
      const target = 60;
      const delay = 600;
      setTimeout(() => {
        const interval = setInterval(() => {
          count++;
          numEl.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 25);
      }, delay);
    }
  }

  // ==========================================
  // ANNIVERSARY Letter-by-Letter
  // ==========================================
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    const letters = badge.querySelectorAll('.badge-letter');
    letters.forEach((letter, i) => {
      letter.style.animationDelay = (0.3 + i * 0.06) + 's';
    });
  }

  // ==========================================
  // Corner Decoration Animation
  // ==========================================
  const corners = document.querySelectorAll('.hero-decoration .corner');
  setTimeout(() => {
    corners.forEach(c => c.classList.add('is-animated'));
  }, 200);

  // ==========================================
  // Scroll Animation Observer
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right, .program-item, .greeting-card, .timeline-item, .activity-card, .section-divider'
  ).forEach((el, i) => {
    el.style.setProperty('--i', i % 8);
    observer.observe(el);
  });

  // ==========================================
  // Activity Card Stagger
  // ==========================================
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.activity-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('is-visible');
          }, i * 100);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const activityGrid = document.querySelector('.activity-grid');
  if (activityGrid) {
    activityGrid.querySelectorAll('.activity-card').forEach(c => {
      c.classList.remove('is-visible');
    });
    cardObserver.observe(activityGrid);
  }

  // ==========================================
  // Timeline Grow
  // ==========================================
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-growing');
        const items = entry.target.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, 300 + i * 250);
        });
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline').forEach(tl => {
    tl.querySelectorAll('.timeline-item').forEach(item => {
      item.classList.remove('is-visible');
    });
    timelineObserver.observe(tl);
  });

  // ==========================================
  // Counter Animation (Stats)
  // ==========================================
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const step = target / steps;
        let frame = 0;
        const timer = setInterval(() => {
          frame++;
          const progress = frame / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * target);
          if (frame >= steps) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + suffix;
        }, duration / steps);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(c => counterObserver.observe(c));

  // ==========================================
  // Parallax on Scroll
  // ==========================================
  const parallaxSections = document.querySelectorAll('.section--program, .section--greeting');
  window.addEventListener('scroll', () => {
    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const speed = 0.05;
      const offset = rect.top * speed;
      section.style.transform = 'translateY(' + offset + 'px)';
    });
  });

  // ==========================================
  // Mobile Nav Toggle
  // ==========================================
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  // ==========================================
  // History Tabs
  // ==========================================
  document.querySelectorAll('.history-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.target;
      document.querySelectorAll('.timeline-panel').forEach(panel => {
        const isTarget = panel.id === target;
        panel.hidden = !isTarget;
        if (isTarget) {
          panel.classList.remove('is-growing');
          panel.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('is-visible');
          });
          setTimeout(() => {
            panel.classList.add('is-growing');
            panel.querySelectorAll('.timeline-item').forEach((item, i) => {
              setTimeout(() => item.classList.add('is-visible'), 300 + i * 250);
            });
          }, 50);
        }
      });
    });
  });

  // ==========================================
  // Activity Filter
  // ==========================================
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.activity-card');
      cards.forEach(card => {
        card.style.transition = 'opacity 0.25s ease';
        card.style.opacity = '0';
      });
      setTimeout(() => {
        let delay = 0;
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
            }, delay);
            delay += 80;
          } else {
            card.style.display = 'none';
          }
        });
      }, 250);
    });
  });

  // ==========================================
  // Members Chart Bar Animation
  // ==========================================
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.chart-bar');
        bars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('is-grown'), i * 120);
        });
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.chart-container:not([hidden])').forEach(c => chartObserver.observe(c));

  // ==========================================
  // Chart Tabs
  // ==========================================
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.chart;
      document.querySelectorAll('.chart-container').forEach(container => {
        const isTarget = container.id === 'chart-' + target;
        container.hidden = !isTarget;
        if (isTarget) {
          container.querySelectorAll('.chart-bar').forEach(bar => bar.classList.remove('is-grown'));
          setTimeout(() => {
            container.querySelectorAll('.chart-bar').forEach((bar, i) => {
              setTimeout(() => bar.classList.add('is-grown'), i * 120);
            });
          }, 50);
        }
      });
    });
  });

  // ==========================================
  // Header Background on Scroll
  // ==========================================
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(27, 42, 74, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
      } else {
        header.style.background = 'rgba(27, 42, 74, 0.95)';
        header.style.boxShadow = 'none';
      }
    });
  }

});
