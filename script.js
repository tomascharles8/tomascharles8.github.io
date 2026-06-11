function toggleContraste() {
  document.body.classList.toggle('contrast');
}

function toggleMenu() {
  const nav = document.querySelector('.navigation');
  const button = document.querySelector('.nav-toggle');
  if (!nav) {
    return;
  }

  const isOpen = nav.classList.toggle('active');
  nav.setAttribute('aria-expanded', isOpen.toString());
  if (button) {
    button.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    button.setAttribute('aria-pressed', isOpen.toString());
  }
}

function closeMenu() {
  const nav = document.querySelector('.navigation');
  const button = document.querySelector('.nav-toggle');
  if (!nav || !nav.classList.contains('active')) {
    return;
  }

  nav.classList.remove('active');
  nav.setAttribute('aria-expanded', 'false');
  if (button) {
    button.setAttribute('aria-label', 'Abrir menu');
    button.setAttribute('aria-pressed', 'false');
  }
}

function submitForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const nome = (data.get('nome') || 'Cliente').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const telefone = (data.get('telefone') || '').toString().trim();
  const mensagem = (data.get('mensagem') || 'Gostaria de saber mais sobre os produtos.').toString().trim();

  const subject = encodeURIComponent('Contato da KAMPE-12: ' + nome);
  const body = encodeURIComponent(`${mensagem}\n\nNome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}`);

  const mailtoUrl = `mailto:tomasmanuelcharles8@gmail.com?subject=${subject}&body=${body}`;
  const whatsappUrl = `https://wa.me/258848303476?text=${encodeURIComponent('Olá, sou '+nome+'. '+mensagem+' Telefone: '+telefone)}`;

  window.open(whatsappUrl, '_blank', 'noopener');
  window.location.href = mailtoUrl;
  form.reset();
  alert('Obrigado, ' + nome + '! A sua mensagem foi enviada.');
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', submitForm);
  document.querySelectorAll('.navigation a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function setFooterYear() {
  const element = document.getElementById('year');
  if (element) {
    element.textContent = new Date().getFullYear();
  }
}

window.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  setFooterYear();
});
