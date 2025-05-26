// Burger menu for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    // close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Плавное появление секций при скролле (IntersectionObserver)
  const animatedEls = document.querySelectorAll(
    '.service-card, .review-card, .gallery-grid img, section h2, .logo, .hero .logo, .hero .slogan, .btn-main'
  );
  if ('IntersectionObserver' in window) {
    const obsOptions = {
      threshold: 0.15
    };
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
});