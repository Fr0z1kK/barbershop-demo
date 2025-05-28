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

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Swiper
    const swiper = new Swiper('.gallery-carousel', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
        speed: 800,
        effect: 'slide',
        loopedSlides: 3,
        loopFillGroupWithBlank: true
    });

    // Массив изображений
    const galleryImages = Array.from({length: 14}, (_, i) => `img/work${i + 1}.jpg`);
    const galleryGrid = document.querySelector('.swiper-wrapper');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-image');
    let currentImageIndex = 0;

    // Создание слайдов
    galleryImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${src}" alt="Работа ${index + 1}" loading="lazy">`;
        
        slide.addEventListener('click', () => {
            openModal(index);
        });
        
        galleryGrid.appendChild(slide);
    });

    // Модальное окно
    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = galleryImages[index];
        modal.classList.add('active');
    }

    // Закрытие модального окна
    document.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Навигация в модальном окне
    document.querySelector('.modal-prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex];
    });

    document.querySelector('.modal-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex];
    });

    // Закрытие по клику вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Навигация с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            document.querySelector('.modal-prev').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.modal-next').click();
        }
    });

    // Пауза автопрокрутки при наведении на навигацию
    document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(button => {
        button.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        button.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });
    });
});