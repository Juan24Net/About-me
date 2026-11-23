const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuButton.textContent = isOpen ? '\u00d7' : '\u2630';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '\u2630';
  });
});

const projectCarousel = document.querySelector('.project-carousel');
if (projectCarousel) {
  const viewport = projectCarousel.querySelector('.project-grid');
  const track = projectCarousel.querySelector('.project-track');
  const cards = [...track.querySelectorAll('.project-card')];
  const pagination = document.querySelector('.carousel-pagination');
  let selectedIndex = 0;

  const dots = cards.map((card, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show project ${index + 1}`);
    dot.addEventListener('click', () => selectProject(index));
    pagination.append(dot);
    card.addEventListener('click', (event) => {
      if (!event.target.closest('a') && index !== selectedIndex) selectProject(index);
    });
    return dot;
  });

  function selectProject(index) {
    selectedIndex = (index + cards.length) % cards.length;
    const card = cards[selectedIndex];
    const offset = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
    track.style.transform = `translateX(${-offset}px)`;
    cards.forEach((item, itemIndex) => {
      const active = itemIndex === selectedIndex;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-current', String(active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === selectedIndex;
      dot.classList.toggle('is-selected', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  projectCarousel.querySelector('.carousel-prev').addEventListener('click', () => selectProject(selectedIndex - 1));
  projectCarousel.querySelector('.carousel-next').addEventListener('click', () => selectProject(selectedIndex + 1));
  window.addEventListener('resize', () => selectProject(selectedIndex));
  selectProject(0);
}