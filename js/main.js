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
    '.fade-in, .fade-in-left, .fade-in-right, .program-item, .greeting-card, .timeline-item, .section-divider'
  ).forEach((el, i) => {
    el.style.setProperty('--i', i % 8);
    observer.observe(el);
  });

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
  // 単会一覧（data/units.json から地協名簿順に生成）
  // ==========================================
  const groupsEl = document.getElementById('activity-groups');
  if (groupsEl) {
    const el = (tag, cls, text) => {
      const n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text) n.textContent = text;
      return n;
    };
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    Promise.all([
      fetch('data/units.json').then(r => r.json()),
      fetch('data/map.json').then(r => r.json())
    ]).then(([units, mapData]) => {
      const groups = [];
      units.forEach((u) => {
        let g = groups.find(x => x.key === u.chikyo);
        if (!g) { g = { key: u.chikyo, name: u.chikyoName, cards: [] }; groups.push(g); }
        let c = g.cards.find(x => x.name === u.shokokai);
        if (!c) { c = { name: u.shokokai, units: [] }; g.cards.push(c); }
        c.units.push(u);
      });

      const chipRow = document.getElementById('chikyo-filter');
      groups.forEach((g) => {
        const section = el('div', 'activity-group');
        section.dataset.chikyo = g.key;
        const title = el('h3', 'activity-group-title', g.name);
        title.appendChild(el('span', 'activity-group-count', g.cards.length + '単会'));
        section.appendChild(title);

        const grid = el('div', 'activity-grid');
        g.cards.forEach((c) => {
          const card = el('div', 'activity-card');
          card.dataset.shokokai = c.name;
          card.appendChild(el('h4', 'activity-card-name', c.name));
          const tiles = el('div', 'activity-tiles');
          c.units.forEach((u) => {
            const tile = el('a', 'activity-tile activity-tile--' + u.type);
            tile.href = 'unit.html?id=' + encodeURIComponent(u.id);
            if (u.thumb) {
              const img = el('img');
              img.src = u.thumb;
              img.alt = u.name;
              img.loading = 'lazy';
              tile.appendChild(img);
            }
            tile.appendChild(el('span', 'activity-tile-label', u.type === 'youth' ? '青年部' : '女性部'));
            tiles.appendChild(tile);
          });
          card.appendChild(tiles);
          grid.appendChild(card);
          cardObserver.observe(card);
        });
        section.appendChild(grid);
        groupsEl.appendChild(section);

        const chip = el('button', 'chikyo-chip', g.name.replace('地域協議会', ''));
        chip.type = 'button';
        chip.dataset.chikyo = g.key;
        chipRow.appendChild(chip);
      });

      // ---------- 地協マップ ----------
      const SVG_NS = 'http://www.w3.org/2000/svg';
      const ROMAN = { geinan: 'GEINAN', geihoku: 'GEIHOKU', chuo: 'CHUOH', binan: 'BINAN', bihoku: 'BIHOKU' };
      const HINT = '地図の地域を押すと、その地協に切り替わります';
      const mapPanel = document.getElementById('chikyo-map');
      const mapSvg = document.getElementById('chikyo-map-svg');
      const mapName = document.getElementById('chikyo-map-name');
      const mapRoman = document.getElementById('chikyo-map-roman');
      const mapUnits = document.getElementById('chikyo-map-units');
      const mapHint = document.getElementById('chikyo-map-hint');
      let current = null;

      mapSvg.setAttribute('viewBox', mapData.viewBox);
      mapHint.textContent = HINT;
      const land = document.createElementNS(SVG_NS, 'path');
      land.setAttribute('d', mapData.land);
      land.setAttribute('class', 'map-land');
      mapSvg.appendChild(land);
      const regions = {};
      mapData.regions.slice().sort((a, b) => a.cx - b.cx).forEach((r, i) => {
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', r.d);
        path.setAttribute('class', 'map-region');
        path.style.setProperty('--i', i);
        path.dataset.chikyo = r.chikyo;
        path.dataset.unit = r.unit;
        mapSvg.appendChild(path);
        regions[r.unit + '商工会'] = path;
      });

      const goToCard = (name) => {
        const card = [...groupsEl.querySelectorAll('.activity-card')].find(c => c.dataset.shokokai === name);
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('is-flash');
        setTimeout(() => card.classList.remove('is-flash'), 1600);
      };
      const hover = (name, on) => {
        if (regions[name]) regions[name].classList.toggle('is-hover', on);
        mapHint.textContent = on ? name : HINT;
        mapHint.classList.toggle('is-unit', on);
      };

      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      const chikyoBtn = document.querySelector('.filter-btn[data-filter="chikyo"]');
      const show = (key) => {
        current = key;
        groupsEl.querySelectorAll('.activity-group').forEach((s) => {
          s.style.display = (!key || s.dataset.chikyo === key) ? '' : 'none';
        });
        chipRow.querySelectorAll('.chikyo-chip').forEach((c) => {
          c.classList.toggle('is-active', c.dataset.chikyo === key);
        });
        const g = groups.find(x => x.key === key);
        Object.values(regions).forEach(p => p.classList.remove('is-active'));
        mapUnits.textContent = '';
        mapName.textContent = g ? g.name : '';
        mapRoman.textContent = g ? ROMAN[g.key] : '';
        if (!g) return;
        [mapName, mapRoman].forEach((n) => { n.classList.remove('is-in'); void n.offsetWidth; n.classList.add('is-in'); });
        g.cards.forEach((c, j) => {
          const region = regions[c.name];
          if (region) {
            region.style.setProperty('--j', j);
            region.classList.add('is-active');
          }
          const li = el('li');
          const btn = el('button', 'chikyo-map-unit', c.name.replace('商工会', ''));
          btn.type = 'button';
          btn.style.setProperty('--j', j);
          btn.addEventListener('mouseenter', () => hover(c.name, true));
          btn.addEventListener('mouseleave', () => hover(c.name, false));
          btn.addEventListener('focus', () => hover(c.name, true));
          btn.addEventListener('blur', () => hover(c.name, false));
          btn.addEventListener('click', () => goToCard(c.name));
          li.appendChild(btn);
          mapUnits.appendChild(li);
        });
      };

      mapSvg.addEventListener('mouseover', (e) => {
        const r = e.target.closest('.map-region');
        if (r) hover(r.dataset.unit + '商工会', true);
      });
      mapSvg.addEventListener('mouseout', (e) => {
        const r = e.target.closest('.map-region');
        if (r) hover(r.dataset.unit + '商工会', false);
      });
      mapSvg.addEventListener('click', (e) => {
        const r = e.target.closest('.map-region');
        if (!r) return;
        if (r.dataset.chikyo !== current) show(r.dataset.chikyo);
        else goToCard(r.dataset.unit + '商工会');
      });

      allBtn.addEventListener('click', () => {
        allBtn.classList.add('is-active');
        chikyoBtn.classList.remove('is-active');
        chikyoBtn.setAttribute('aria-expanded', 'false');
        chipRow.classList.remove('is-open');
        mapPanel.classList.remove('is-open');
        show(null);
      });
      chikyoBtn.addEventListener('click', () => {
        chikyoBtn.classList.add('is-active');
        allBtn.classList.remove('is-active');
        chikyoBtn.setAttribute('aria-expanded', 'true');
        chipRow.classList.add('is-open');
        mapPanel.classList.add('is-open');
        mapSvg.classList.add('is-revealed');
        if (!current) show(groups[0].key);
      });
      chipRow.addEventListener('click', (e) => {
        const chip = e.target.closest('.chikyo-chip');
        if (chip) show(chip.dataset.chikyo);
      });
    });
  }

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
  // Photo Caption (tap toggle for mobile)
  // ==========================================
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.querySelectorAll('.unit-photo').forEach(photo => {
      photo.addEventListener('click', (e) => {
        // 他の開いているキャプションを閉じる
        document.querySelectorAll('.unit-photo.caption-active').forEach(p => {
          if (p !== photo) p.classList.remove('caption-active');
        });
        photo.classList.toggle('caption-active');
      });
    });

    // エリア外タップで閉じる
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.unit-photo')) {
        document.querySelectorAll('.unit-photo.caption-active').forEach(p => {
          p.classList.remove('caption-active');
        });
      }
    });
  }

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

  // ==========================================
  // 挨拶モーダル
  // ==========================================
  const modal = document.getElementById('greeting-modal');
  if (modal) {
    const modalBody = modal.querySelector('.greeting-modal-body');
    const modalName = modal.querySelector('.greeting-modal-name');
    const modalDiv = modal.querySelector('.greeting-modal-division');
    const modalClose = modal.querySelector('.greeting-modal-close');

    // 開く
    document.querySelectorAll('.greeting-link[data-modal]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const sourceId = link.dataset.modal;
        const source = document.getElementById(sourceId);
        if (!source) return;

        // カードから情報を取得
        const card = link.closest('.greeting-card');
        modalName.textContent = card.querySelector('.greeting-name').textContent;
        modalDiv.textContent = card.querySelector('.greeting-division').textContent;

        // モーダルにタイプクラスを設定
        modal.querySelector('.greeting-modal').className = 'greeting-modal';
        if (card.classList.contains('greeting-card--youth')) {
          modal.querySelector('.greeting-modal').classList.add('greeting-modal--youth');
        } else {
          modal.querySelector('.greeting-modal').classList.add('greeting-modal--women');
        }

        // 全文をコピー
        modalBody.innerHTML = source.innerHTML;

        document.body.style.overflow = 'hidden';
        modal.classList.add('is-active');
      });
    });

    // 閉じる
    function closeModal() {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) closeModal();
    });
  }

});
