import { siteContent } from './content.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const showToast = (message) => {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
};

const setText = (selector, value) => {
  $$(selector).forEach((element) => { element.textContent = value; });
};

const getInitials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase();

const makeButton = ({ label, url, style = 'secondary' }) => {
  const link = document.createElement('a');
  link.className = `button button-${style}`;
  link.href = url;
  link.textContent = label;
  return link;
};

const renderProfile = () => {
  const { brand, profile, contact } = siteContent;
  const initials = brand.initials || getInitials(brand.name);

  document.title = `${brand.name} | ${profile.eyebrow}`;
  setText('[data-brand-name]', brand.name);
  setText('[data-brand-initials]', initials);
  setText('[data-eyebrow]', profile.eyebrow);
  setText('[data-tagline]', profile.tagline);
  setText('[data-intro]', profile.intro);
  setText('[data-owner-name]', profile.ownerName);
  setText('[data-location]', profile.location);

  if (profile.image) {
    const image = document.createElement('img');
    image.src = profile.image;
    image.alt = profile.imageAlt || `${brand.name} profile`;
    $('#profile-visual').replaceChildren(image);
  }

  const actions = $('#quick-actions');
  if (contact.email) actions.append(makeButton({ label: 'Email us', url: `mailto:${contact.email}`, style: 'primary' }));
  if (contact.phone) actions.append(makeButton({ label: 'Call us', url: `tel:${contact.phone.replace(/[^+\d]/g, '')}` }));
  if (!actions.children.length) actions.hidden = true;

  const inquiryButton = $('#inquiry-button');
  if (contact.whatsapp) {
    inquiryButton.href = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;
    inquiryButton.target = '_blank';
    inquiryButton.rel = 'noreferrer';
  } else if (contact.email) {
    inquiryButton.href = `mailto:${contact.email}?subject=${encodeURIComponent('Custom order inquiry')}`;
  } else {
    inquiryButton.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Add an email or WhatsApp number in src/content.js');
    });
  }
};

const renderLinks = () => {
  const list = $('#social-links');
  siteContent.links.forEach((item) => {
    const link = document.createElement(item.url ? 'a' : 'div');
    link.className = `social-link${item.url ? '' : ' is-placeholder'}`;

    if (item.url) {
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.setAttribute('aria-label', `${item.label}: ${item.description}`);
    }

    const icon = document.createElement('span');
    icon.className = 'social-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.shortLabel || item.label.slice(0, 2).toUpperCase();

    const copy = document.createElement('span');
    copy.className = 'social-copy';
    const title = document.createElement('strong');
    title.textContent = item.label;
    const description = document.createElement('small');
    description.textContent = item.url ? item.description : 'Add this link in src/content.js';

    const arrow = document.createElement('span');
    arrow.className = 'social-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = item.url ? '↗' : '—';

    copy.append(title, description);
    link.append(icon, copy, arrow);
    list.append(link);
  });
};

const setupSharing = () => {
  $('#share-button').addEventListener('click', async () => {
    const shareData = { title: siteContent.brand.name, text: siteContent.profile.tagline, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Page link copied!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') showToast('Use your browser menu to share this page.');
    }
  });
};

const setupRevealAnimations = () => {
  const items = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
    observer.observe(item);
  });
};

renderProfile();
renderLinks();
setupSharing();
setupRevealAnimations();
$('#current-year').textContent = new Date().getFullYear();
