// script.js - menu, reveal on scroll, carousel, modal, lightbox

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  menuBtn?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  // Simple scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
      }
    });
  }, {threshold: 0.15});
  reveals.forEach(r => observer.observe(r));

  // Testimonial carousel (simple)
  const slider = document.getElementById('testimonialSlider');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let tIndex = 0;
  const slides = slider?.querySelectorAll('.testimonial') || [];
  function showTestimonial(i){
    if (!slider) return;
    tIndex = (i + slides.length) % slides.length;
    slider.style.transform = `translateX(-${tIndex * 100}%)`;
  }
  prevBtn?.addEventListener('click', () => showTestimonial(tIndex - 1));
  nextBtn?.addEventListener('click', () => showTestimonial(tIndex + 1));
  // auto rotate
  setInterval(() => showTestimonial(tIndex + 1), 7000);

  // Course modal
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('courseModalTitle');
  const modalDesc = document.getElementById('courseModalDesc');
  document.querySelectorAll('.open-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  modal?.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }));

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.gallery-item').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      lightboxImg.src = href;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  document.querySelectorAll('.lightbox-close').forEach(b => b.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }));

  // Enroll form - just a demo action
  document.getElementById('enrollForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! Your enrollment request has been received. We will contact you soon.');
    e.target.reset();
    window.location.hash = '#testimonials';
  });

  // Small: close nav when clicking a link (mobile)
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
});
