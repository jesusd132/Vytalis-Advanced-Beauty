const links = Array.from(document.querySelectorAll('.nav-link'));
const underline = document.querySelector('.underline');

// Mueve la línea subrayada bajo el link activo
function moveUnderline(el) {
  if (!el || !underline) return;
  const navRect = el.closest('.links').getBoundingClientRect();
  const { left: linkLeft, width: linkWidth } = el.getBoundingClientRect();
  underline.style.left = (linkLeft - navRect.left) + 'px';
  underline.style.width = linkWidth + 'px';
}

// Al cargar la página
window.addEventListener('load', () => {
  const active = document.querySelector('.nav-link.active') || links[0];
  moveUnderline(active);
});

// Al redimensionar la ventana
window.addEventListener('resize', () => {
  const active = document.querySelector('.nav-link.active');
  moveUnderline(active);
});

// Click en los links de navegación
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSelector = link.getAttribute('href');
    const target = document.querySelector(targetSelector);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Marcar como activo
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveUnderline(link);
  });
});

// Actualizar link activo al hacer scroll
window.addEventListener('scroll', () => {
  let currentSection = null;
  let closestDistance = Infinity;

  links.forEach(link => {
    const targetSelector = link.getAttribute('href');
    const section = document.querySelector(targetSelector);
    
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const distanceFromTop = Math.abs(rect.top);

    // Si la sección está en viewport y es la más cercana al top
    if (rect.top <= 150 && rect.bottom >= 0 && distanceFromTop < closestDistance) {
      closestDistance = distanceFromTop;
      currentSection = link;
    }
  });

  if (currentSection) {
    links.forEach(l => l.classList.remove('active'));
    currentSection.classList.add('active');
    moveUnderline(currentSection);
  }
});

// Toggle expansión de las cards
document.addEventListener('DOMContentLoaded', () => {
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.card');
      
      // Cerrar otras cards si están abiertas
      document.querySelectorAll('.card.expanded').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('expanded');
        }
      });
      
      // Toggle la card actual
      card.classList.toggle('expanded');
    });
  });

  // Toggle para sub-cards dentro de cada card
  const subExpandBtns = document.querySelectorAll('.sub-expand-btn');
  subExpandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const subcard = btn.closest('.subcard');
      const card = btn.closest('.card');

      // Cerrar otras subcards dentro de la misma card
      if (card) {
        card.querySelectorAll('.subcard.subcard-expanded').forEach(other => {
          if (other !== subcard) other.classList.remove('subcard-expanded');
        });
      }

      subcard.classList.toggle('subcard-expanded');
    });
  });
});