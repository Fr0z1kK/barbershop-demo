// Burger menu for mobile navigation and accessibility
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
    // close menu on ESC
    document.addEventListener('keydown', (e) => {
      if(e.key === "Escape") nav.classList.remove('open');
    });
  }

  // Intersection Observer for section animation
  const animatedEls = document.querySelectorAll(
    '.service-card, .review-card, .gallery-grid img, section h2, .logo, .hero .logo, .hero .slogan, .btn-main'
  );
  if ('IntersectionObserver' in window) {
    const obsOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, obsOptions);
    animatedEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // Parallax tilt for service cards
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x*10}deg) rotateX(${y*-10}deg) scale(1.025)`;
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });

  // Lightbox for gallery images
  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  galleryImgs.forEach(img => {
    img.addEventListener('click', function() {
      showLightbox(img.src, img.alt);
    });
  });

  function showLightbox(src, alt) {
    let lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-bg"></div>
      <img src="${src}" alt="${alt}">
      <button class="lightbox-close" aria-label="Закрыть">×</button>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').onclick =
    lightbox.querySelector('.lightbox-bg').onclick = function() {
      document.body.style.overflow = '';
      lightbox.remove();
    };
    // ESC to close
    document.addEventListener('keydown', function escHandler(e) {
      if(e.key === "Escape") {
        document.body.style.overflow = '';
        lightbox.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // Review form handler with instant preview
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = reviewForm.name.value.trim();
      const text = reviewForm.review.value.trim();
      if (name && text) {
        const card = document.createElement('div');
        card.className = 'review-card fade-in-card';
        card.innerHTML = `
          <img src="img/default-avatar.png" alt="${name}">
          <div>
            <strong>${escapeHtml(name)}</strong>
            <p>${escapeHtml(text)}</p>
          </div>
        `;
        document.querySelector('.reviews-list').appendChild(card);
        reviewForm.reset();
        reviewForm.querySelector('.form-success').hidden = false;
        setTimeout(() => {
          reviewForm.querySelector('.form-success').hidden = true;
        }, 1800);
      }
    });
  }

  // Utility: escape HTML
  function escapeHtml(str) {
    return str.replace(/[<>"'&]/g, function(s) {
      return ({
        "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "&": "&amp;"
      })[s];
    });
  }
});
/* Lightbox styles injected dynamically for demo, in prod move to CSS */
(function() {
  const style = document.createElement('style');
  style.innerHTML = `
  .lightbox {
    position: fixed; z-index: 10001; top: 0; left: 0; width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: rgba(30,20,10,0.7);
    animation: fadeIn 0.25s;
  }
  .lightbox-bg {
    position: absolute; inset: 0; background: transparent; cursor: zoom-out;
  }
  .lightbox img {
    max-width: 80vw; max-height: 80vh; border-radius: 16px; box-shadow: 0 10px 40px #0005;
    animation: popIn 0.4s;
    z-index: 1;
  }
  .lightbox-close {
    position: absolute; top: 30px; right: 35px; font-size: 2.2rem;
    color: #fff; background: rgba(0,0,0,0.25); border: none; border-radius: 50%;
    cursor: pointer; z-index: 2; width: 44px; height: 44px; line-height: 44px;
    transition: background 0.23s;
  }
  .lightbox-close:hover { background: rgba(35,28,17,0.43);}
  `;
  document.head.appendChild(style);
})();