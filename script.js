// ---------- year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- sticky header ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('toTop').style.opacity = window.scrollY > 500 ? '1' : '0.4';
});

// ---------- mobile menu ----------
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
const navCta = document.getElementById('navCta');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
  navCta.classList.toggle('mobile-open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  navCta.classList.remove('mobile-open');
}));

// ---------- scrollspy ----------
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      ro.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => ro.observe(el));

// ---------- typing effect ----------
// [EDIT: ROLES] change the words below to your own titles
const roles = ["Web Developer", "Android Developer", "UI/UX Designer", "ML Researcher"];
const typedEl = document.getElementById('typedRole');
let ri = 0, ci = 0, deleting = false;
function typeLoop(){
  const word = roles[ri];
  if(!deleting){
    ci++;
    typedEl.textContent = word.slice(0, ci);
    if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    typedEl.textContent = word.slice(0, ci);
    if(ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ---------- back to top ----------
document.getElementById('toTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ---------- contact form (front-end only demo) ----------
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('formToast').classList.add('show');
  this.reset();
});

// ---------- photo gallery + lightbox ----------
const galleryOverlay = document.getElementById('galleryOverlay');
const openGalleryBtn = document.getElementById('openGallery');
const closeGalleryBtn = document.getElementById('closeGallery');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbStage = document.getElementById('lbStage');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let currentPhoto = 0;

function openGallery(){
  galleryOverlay.classList.add('open');
  galleryOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeGallery(){
  galleryOverlay.classList.remove('open');
  galleryOverlay.setAttribute('aria-hidden', 'true');
  if(!lightbox.classList.contains('open')) document.body.style.overflow = '';
}
if(openGalleryBtn) openGalleryBtn.addEventListener('click', openGallery);
if(closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGallery);
galleryOverlay.addEventListener('click', (e) => { if(e.target === galleryOverlay) closeGallery(); });

function showPhoto(index){
  currentPhoto = (index + galleryItems.length) % galleryItems.length;
  // [EDIT: GALLERY] if you've added <img> tags inside .gallery-item, this will
  // reuse that same image src in the lightbox automatically.
  const item = galleryItems[currentPhoto];
  const img = item.querySelector('img');
  lbStage.innerHTML = img ? `<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt') || ''}">` : '<i class="fa-solid fa-image"></i>';
}
function openLightbox(index){
  showPhoto(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if(!galleryOverlay.classList.contains('open')) document.body.style.overflow = '';
}
galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => showPhoto(currentPhoto - 1));
lbNext.addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){ closeLightbox(); closeGallery(); }
  if(lightbox.classList.contains('open')){
    if(e.key === 'ArrowRight') showPhoto(currentPhoto + 1);
    if(e.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
  }
});