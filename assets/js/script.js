// Slides
class SliderAutoCenter {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 3;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        // Define primeiro slide
        document.getElementById('radio1').checked = true;

        // Inicia autoplay
        this.startAutoPlay();

        // Pausa autoplay ao hover
        const sliderContent = document.querySelector('.slider-content');
        sliderContent.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContent.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    nextSlide() {
        this.currentSlide++;

        if (this.currentSlide > this.totalSlides) {
            this.currentSlide = 1;
        }

        document.getElementById('radio' + this.currentSlide).checked = true;
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();

        }, 6000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Inicializa slider
const slider = new SliderAutoCenter();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu hamburger mobile
const menuHamburger = document.querySelector('.menu-hamburger');
const navegacaoHeader = document.querySelector('.navegacao-header');
const menuLinks = document.querySelectorAll('.navegacao-header a');

// Criar overlay
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

// Toggle do menu
function toggleMenu() {
    menuHamburger.classList.toggle('active');
    navegacaoHeader.classList.toggle('active');
    overlay.classList.toggle('active');

    // Atualiza aria-expanded
    const isExpanded = menuHamburger.classList.contains('active');
    menuHamburger.setAttribute('aria-expanded', isExpanded);

    // Previne scroll do body quando menu estiver aberto
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Abre/fecha menu ao clicar no botão
menuHamburger.addEventListener('click', toggleMenu);

// Fecha menu ao clicar no overlay
overlay.addEventListener('click', toggleMenu);

// Fecha menu ao clicar em um link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navegacaoHeader.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fecha menu ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navegacaoHeader.classList.contains('active')) {
        toggleMenu();
    }
});

// Fecha menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navegacaoHeader.classList.contains('active')) {
        toggleMenu();
    }
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Validação de formulário
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();

    if (nome && email && assunto) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
    }
});

// Botão de voltar ao início da página
window.addEventListener('scroll', function () {
    let scroll = document.querySelector('.btn-scroll-top')
    scroll.classList.toggle('active', window.scrollY > 450)
})

function backTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}