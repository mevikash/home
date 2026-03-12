/* ============================================
   VIKASH MEGHWAL PORTFOLIO - script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initParticles();
  initTypewriter();
  initScrollAnimations();
  initCounters();
  initSkillBars();
  initSkillTabs();
  initDarkMode();
  initMobileMenu();
  buildSkillBars();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks').classList.remove('open');
      }
    });
  });

  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ===== PARTICLE / MOLECULE CANVAS ANIMATION ===== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', function () {
    resize();
    initParticleArray();
  });

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 2.5 + 1.5;
    this.alpha = Math.random() * 0.5 + 0.3;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 255, 218, ' + this.alpha + ')';
    ctx.fill();
    // Outer ring
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  function initParticleArray() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticleArray();

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(100, 255, 218, ' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animFrame = requestAnimationFrame(animate);
  }
  animate();
}

/* ===== TYPEWRITER EFFECT ===== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    'Ph.D. Researcher in Materials Science',
    'Computational Chemist',
    'Surface Scientist & AFM Expert',
    'Full Stack Developer',
    'Graduate Research Assistant @ UT Austin'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 90;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  setTimeout(type, 1000);
}

/* ===== SCROLL REVEAL ANIMATIONS ===== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, (i % 4) * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-number');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, 0, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (end - start) * eased);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

/* ===== BUILD SKILL BARS FROM DATA ATTRIBUTES ===== */
function buildSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  bars.forEach(function (bar) {
    const skill = bar.getAttribute('data-skill');
    const level = bar.getAttribute('data-level');
    bar.innerHTML = `
      <div class="skill-bar-inner">
        <div class="skill-bar-header">
          <span>${skill}</span>
          <span>${level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-width="${level}"></div>
        </div>
      </div>
    `;
  });
}

/* ===== SKILL BAR ANIMATION ===== */
function initSkillBars() {
  // Re-observe after bars are built
  setTimeout(function () {
    const fills = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach(el => observer.observe(el));
  }, 300);
}

/* ===== SKILL TABS ===== */
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skill-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = this.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        // Re-animate skill bars in the newly visible panel
        setTimeout(function () {
          const fills = panel.querySelectorAll('.skill-bar-fill');
          fills.forEach(function (fill) {
            fill.style.width = '0%';
            setTimeout(function () {
              const width = fill.getAttribute('data-width');
              fill.style.width = width + '%';
            }, 100);
          });
        }, 50);
      }
    });
  });
}

/* ===== DARK / LIGHT MODE TOGGLE ===== */
function initDarkMode() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // Load saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  toggle.addEventListener('click', function () {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      toggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      const icon = hamburger.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
}

/* ===== SKILL BAR OBSERVER (deferred after build) ===== */
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    const fills = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          if (width) entry.target.style.width = width + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach(el => observer.observe(el));
  }, 800);
});

/* ============================================================
   ADVANCED INTERACTIVITY — Custom Cursor, Glitter, Aurora,
   Magnetic Buttons, Tilt Cards, Scroll Progress, Lenis Smooth Scroll
   ============================================================ */

/* ----- AURORA BACKGROUND BLOBS ----- */
(function initAurora() {
  const aurora = document.createElement('div');
  aurora.className = 'aurora-bg';
  aurora.innerHTML = '<div class="aurora-blob"></div><div class="aurora-blob"></div><div class="aurora-blob"></div>';
  document.body.insertBefore(aurora, document.body.firstChild);
})();

/* ----- SCROLL PROGRESS BAR ----- */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ----- LENIS SMOOTH SCROLL ----- */
(function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    duration: 1.4,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smooth: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();

/* ----- CUSTOM CURSOR ----- */
(function initCustomCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    spawnTrailSparkle(mouseX, mouseY);
  });

  // Smooth ring follow
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover effect
  document.querySelectorAll('a, button, .magnetic, .research-card, .pub-card, .project-card, .skill-tag, .btn').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', function () {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });

  // Click effect
  document.addEventListener('mousedown', function () {
    dot.classList.add('click');
    ring.classList.add('click');
  });
  document.addEventListener('mouseup', function () {
    dot.classList.remove('click');
    ring.classList.remove('click');
  });
})();

/* ----- CURSOR TRAIL SPARKLES ----- */
var lastSparkleTime = 0;
function spawnTrailSparkle(x, y) {
  var now = Date.now();
  if (now - lastSparkleTime < 40) return; // throttle
  lastSparkleTime = now;

  var sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';

  var size = Math.random() * 6 + 3;
  var colors = ['#64ffda', '#a78bfa', '#ff6bff', '#fff', '#ffd700'];
  var color  = colors[Math.floor(Math.random() * colors.length)];
  var offsetX = (Math.random() - 0.5) * 20;
  var offsetY = (Math.random() - 0.5) * 20;

  sparkle.style.cssText = [
    'width:' + size + 'px',
    'height:' + size + 'px',
    'background:' + color,
    'left:' + (x + offsetX) + 'px',
    'top:'  + (y + offsetY) + 'px',
    'box-shadow: 0 0 ' + (size * 2) + 'px ' + color
  ].join(';');

  document.body.appendChild(sparkle);
  setTimeout(function () { sparkle.remove(); }, 600);
}

/* ----- GLITTER CANVAS (ambient floating sparkles) ----- */
(function initGlitterCanvas() {
  var canvas = document.getElementById('glitterCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H;
  var glitters = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var colors = ['#64ffda', '#a78bfa', '#ff6bff', '#ffffff', '#ffd700', '#7b2fff'];

  function Glitter() {
    this.reset();
  }
  Glitter.prototype.reset = function () {
    this.x      = Math.random() * W;
    this.y      = Math.random() * H;
    this.size   = Math.random() * 2.5 + 0.5;
    this.alpha  = 0;
    this.maxAlpha = Math.random() * 0.7 + 0.2;
    this.speed  = Math.random() * 0.4 + 0.1;
    this.color  = colors[Math.floor(Math.random() * colors.length)];
    this.vx     = (Math.random() - 0.5) * 0.3;
    this.vy     = -Math.random() * 0.5 - 0.1;
    this.phase  = 'in'; // 'in' | 'out'
  };
  Glitter.prototype.update = function () {
    if (this.phase === 'in') {
      this.alpha += 0.02;
      if (this.alpha >= this.maxAlpha) this.phase = 'out';
    } else {
      this.alpha -= 0.015;
      if (this.alpha <= 0) this.reset();
    }
    this.x += this.vx;
    this.y += this.vy;
  };
  Glitter.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.size * 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Spawn glitters
  for (var i = 0; i < 120; i++) {
    var g = new Glitter();
    g.alpha = Math.random() * g.maxAlpha; // start at random phase
    glitters.push(g);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    glitters.forEach(function (g) { g.update(); g.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ----- MAGNETIC BUTTON EFFECT ----- */
(function initMagneticButtons() {
  document.querySelectorAll('.magnetic, .btn').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var cx = rect.left + rect.width  / 2;
      var cy = rect.top  + rect.height / 2;
      var dx = (e.clientX - cx) * 0.35;
      var dy = (e.clientY - cy) * 0.35;
      el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(1.05)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'translate(0, 0) scale(1)';
    });
  });
})();

/* ----- 3D TILT ON CARDS ----- */
(function initCardTilt() {
  var cards = document.querySelectorAll(
    '.research-card, .pub-card, .project-card, .award-card, .exp-card, .edu-card'
  );

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width  / 2;
      var cy = rect.height / 2;
      var rotY =  ((x - cx) / cx) * 8;
      var rotX = -((y - cy) / cy) * 8;
      card.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale3d(1.03,1.03,1.03)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });
})();

/* ----- SECTION TITLE LETTER-BY-LETTER REVEAL ----- */
(function initTitleAnimations() {
  document.querySelectorAll('.section-title').forEach(function (title) {
    // Split text into spans but preserve the inner <span class="accent"> tag
    var html = title.innerHTML;
    // Wrap each character outside of HTML tags in a span
    var result = '';
    var inTag = false;
    var delay = 0;
    for (var i = 0; i < html.length; i++) {
      if (html[i] === '<') { inTag = true; result += html[i]; continue; }
      if (html[i] === '>') { inTag = false; result += html[i]; continue; }
      if (inTag) { result += html[i]; continue; }
      if (html[i].trim() === '') { result += html[i]; continue; }
      result += '<span class="title-char" style="display:inline-block;opacity:0;transform:translateY(20px);transition:opacity 0.4s ' + (delay * 0.04) + 's,transform 0.4s ' + (delay * 0.04) + 's">' + html[i] + '</span>';
      delay++;
    }
    title.innerHTML = result;

    // Observe and trigger
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.title-char').forEach(function (ch) {
            ch.style.opacity = '1';
            ch.style.transform = 'translateY(0)';
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(title);
  });
})();

/* ----- ENHANCED PARTICLE MOUSE INTERACTION ----- */
(function enhanceParticles() {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  var mousePos = { x: -9999, y: -9999 };

  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', function () {
    mousePos.x = -9999;
    mousePos.y = -9999;
  });

  // Expose for particle repulsion (piggybacks on existing particle loop)
  window._portfolioMousePos = mousePos;
})();
