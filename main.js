
// Change the business details in site-config.js. This script powers the mobile menu and quote form.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navlinks');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close ✕' : 'Menu ☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu ☰';
  }));
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const cfg = window.SITE_CONFIG || {};
document.querySelectorAll('[data-business-name]').forEach(el => el.textContent = cfg.name || 'Cariboo Ridge Outdoor Services');
document.querySelectorAll('[data-phone]').forEach(el => { el.textContent = cfg.phoneDisplay || 'Add phone number'; if(cfg.phoneTel) el.href = 'tel:' + cfg.phoneTel; });
document.querySelectorAll('[data-email]').forEach(el => { el.textContent = cfg.email || 'Add email address'; if(cfg.email) el.href = 'mailto:' + cfg.email; });
document.querySelectorAll('[data-location]').forEach(el => el.textContent = cfg.serviceArea || 'Cariboo region, BC');
const form = document.querySelector('#quote-form');
if(form){
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Website quote request — ' + (data.get('service') || 'Outdoor services'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\nPhone: ' + data.get('phone') + '\nEmail: ' + data.get('email') +
      '\nService: ' + data.get('service') + '\nLocation: ' + data.get('location') + '\nPreferred timing: ' + data.get('timing') +
      '\n\nProject details:\n' + data.get('details')
    );
    if(cfg.email){
      window.location.href = 'mailto:' + cfg.email + '?subject=' + subject + '&body=' + body;
      document.querySelector('#form-status').textContent = 'Your email app should open with your request ready to send. Please press Send in your email app.';
    } else {
      document.querySelector('#form-status').textContent = 'The form is ready, but the business email has not been set. Add it in site-config.js before publishing.';
    }
  });
}
