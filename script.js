const revealElements = document.querySelectorAll('.reveal');
const heroVideo = document.querySelector('.hero-media');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  revealObserver.observe(element);
});

if (heroVideo) {
  const setPlaybackRate = () => {
    heroVideo.playbackRate = 0.6;
  };

  setPlaybackRate();
  heroVideo.addEventListener('loadedmetadata', setPlaybackRate);
}

const mobileCards = document.querySelectorAll('.srv-card');
const mobileQuery = window.matchMedia('(max-width: 900px)');

const syncMobileCards = () => {
  if (!mobileCards.length) return;

  if (mobileQuery.matches) {
    mobileCards.forEach((card, index) => {
      if (!card.dataset.mobileReady) {
        card.dataset.mobileReady = 'true';
        card.tabIndex = 0;

        card.addEventListener('click', () => {
          if (!mobileQuery.matches) return;

          const isOpen = card.classList.contains('is-open');
          mobileCards.forEach((item) => item.classList.remove('is-open'));
          if (!isOpen) card.classList.add('is-open');
        });

        card.addEventListener('keydown', (event) => {
          if (!mobileQuery.matches) return;
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          card.click();
        });
      }
    });

    if (![...mobileCards].some((card) => card.classList.contains('is-open'))) {
      mobileCards[0].classList.add('is-open');
    }
  } else {
    mobileCards.forEach((card) => card.classList.remove('is-open'));
  }
};

syncMobileCards();
mobileQuery.addEventListener('change', syncMobileCards);

const heroParallax = document.querySelector('[data-parallax]');
const heroVisual = document.querySelector('.hero-visual');

if (heroParallax && heroVisual && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    heroParallax.style.transform =
      `perspective(1200px) rotateX(${-y * 0.42}deg) rotateY(${x * 0.42}deg) translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    heroParallax.style.transform = '';
  });
}
