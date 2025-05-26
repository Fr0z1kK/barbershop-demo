document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Анимация появления секций
  const animatedEls = document.querySelectorAll(
    '.service-card, .gallery-grid img, section h2, .logo, .hero .logo, .hero .slogan, .btn-main'
  );
  if ('IntersectionObserver' in window) {
    const obsOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, obsOptions);
    animatedEls.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // Фильтрация услуг
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));

  let currentFilter = "all";
  function filterAndSort() {
    serviceCards.forEach(card => {
      const cats = card.getAttribute('data-category').split(' ');
      if (currentFilter === "all" || cats.includes(currentFilter)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      filterAndSort();
    });
  });

  // Показать бейдж "скидка" на комбо-услугах
  document.querySelectorAll('.service-card').forEach(card => {
    if (card.querySelector('.badge-sale')) {
      card.addEventListener('mouseenter', () => {
        card.querySelector('.badge-sale').style.display = "block";
      });
      card.addEventListener('mouseleave', () => {
        card.querySelector('.badge-sale').style.display = "none";
      });
    }
  });

  filterAndSort();
});
// ...ваш остальной код...

// Инициализация YClients Widget
window.addEventListener('DOMContentLoaded', function() {
  // Убедимся, что скрипт YClients уже загружен
  if (window.YC && window.YC.Widget) {
    window.ycWidget = new window.YC.Widget({
      companyId: 1449493, // ваш id компании, проверьте на портале YClients
      container: 'yclients-widget',
      theme: 'classic',
      button: false // мы используем свою кнопку
    });
  } else {
    // Если YC.Widget еще не загрузился, ждем инициализации
    let interval = setInterval(function() {
      if (window.YC && window.YC.Widget) {
        clearInterval(interval);
        window.ycWidget = new window.YC.Widget({
          companyId: 1449493,
          container: 'yclients-widget',
          theme: 'classic',
          button: false
        });
      }
    }, 300);
  }
});

// Для вашей кнопки:
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.yclients-btn-main');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.ycWidget && typeof window.ycWidget.open === 'function') {
        window.ycWidget.open();
      }
    });
  }
});
// ...другой код сайта...

// Карусель для галереи работ
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.querySelectorAll('img'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;

  function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.scrollTo({ left: slideWidth * current, behavior: 'smooth' });

    dotsContainer.querySelectorAll('button').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === current);
    });
  }

  // Dots
  function createDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const btn = document.createElement('button');
      if (idx === current) btn.classList.add('active');
      btn.addEventListener('click', () => {
        current = idx;
        updateCarousel();
      });
      dotsContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateCarousel();
  });

  // Swipe for mobile
  let startX = null;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) prevBtn.click();
    else if (startX - endX > 40) nextBtn.click();
    startX = null;
  });

  // Init
  createDots();
  updateCarousel();

  window.addEventListener('resize', updateCarousel);
});

// Автоматическая инициализация YClients виджета и работа кнопки
document.addEventListener('DOMContentLoaded', function() {
  // Автоинициализация YClients Widget
  function initYClientsWidget() {
    if (window.YC && window.YC.Widget) {
      window.ycWidget = new window.YC.Widget({
        companyId: 1449493, // Ваш ID компании YClients
        container: 'yclients-widget',
        theme: 'classic',
        button: false
      });
      // При необходимости можно отобразить сам контейнер
      var widgetDiv = document.getElementById('yclients-widget');
      if (widgetDiv) widgetDiv.style.display = 'none';
    } else {
      setTimeout(initYClientsWidget, 300);
    }
  }
  initYClientsWidget();

  // Кнопка открытия YClients
  const btn = document.querySelector('.yclients-btn-main');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.ycWidget && typeof window.ycWidget.open === 'function') {
        window.ycWidget.open();
      }
    });
  }
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.services-list li').forEach(li => {
      const cats = li.getAttribute('data-category').split(' ');
      if (filter === "all" || cats.includes(filter)) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });
});