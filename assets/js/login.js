// MENU HAMBURGER MOBILE
const menuHamburger = document.querySelector('.menu-hamburger');
const navegacaoHeader = document.querySelector('.navegacao-header');
const menuLinks = document.querySelectorAll('.navegacao-header a');

// Criar overlay
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

// Função para toggle do menu
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
if (menuHamburger) {
    menuHamburger.addEventListener('click', toggleMenu);
}

// Fecha menu ao clicar no overlay
if (overlay) {
    overlay.addEventListener('click', toggleMenu);
}

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
    if (window.innerWidth > 768 && navegacaoHeader && navegacaoHeader.classList.contains('active')) {
        toggleMenu();
    }
});

// Fecha menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navegacaoHeader && navegacaoHeader.classList.contains('active')) {
        toggleMenu();
    }
});

// BADGE DO CARRINHO
const badgeCarrinho = document.querySelector('.badge-carrinho');

function atualizarBadgeCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo && badgeCarrinho) {
        const carrinho = JSON.parse(carrinhoSalvo);
        badgeCarrinho.textContent = carrinho.quantidade || 0;
    }
}

// Atualiza badge ao carregar página
window.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho);

// VALIDAÇÃO DO FORMULÁRIO
const formCadastro = document.querySelector('.formulario-cadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();

        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;

        // Validações básicas
        if (!telefone || !email) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        console.log('Dados do cadastro:', { telefone, email });
        alert('Cadastro realizado com sucesso!');
    });
}

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