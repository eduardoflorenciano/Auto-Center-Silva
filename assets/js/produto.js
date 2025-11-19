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

// CONTROLE DE QUANTIDADE
const btnAumentar = document.getElementById('aumentar');
const btnDiminuir = document.getElementById('diminuir');
const inputQuantidade = document.getElementById('quantidadeProduto');

// Aumentar quantidade
btnAumentar.addEventListener('click', () => {
    let quantidade = parseInt(inputQuantidade.value);
    if (quantidade < 99) { // Limite máximo
        inputQuantidade.value = quantidade + 1;
        atualizarQuantidade();
    }
});

// Diminuir quantidade
btnDiminuir.addEventListener('click', () => {
    let quantidade = parseInt(inputQuantidade.value);
    if (quantidade > 1) { // Mínimo é 1
        inputQuantidade.value = quantidade - 1;
        atualizarQuantidade();
    }
});

// Função para animar mudança de quantidade
function atualizarQuantidade() {
    inputQuantidade.style.transform = 'scale(1.1)';
    setTimeout(() => {
        inputQuantidade.style.transform = 'scale(1)';
    }, 150);
}

// ADICIONAR AO CARRINHO
const btnAdicionarCarrinho = document.getElementById('btnAdicionarCarrinho');
const badgeCarrinho = document.querySelector('.badge-carrinho');

// Simula carrinho
let carrinho = {
    quantidade: 0,
    itens: []
};

btnAdicionarCarrinho.addEventListener('click', () => {
    const quantidade = parseInt(inputQuantidade.value);
    const nomeProduto = document.querySelector('.nome-produto').textContent;
    const precoProduto = document.querySelector('.valor-preco').textContent;

    // Adiciona ao carrinho
    carrinho.quantidade += quantidade;
    carrinho.itens.push({
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantidade,
        timestamp: new Date().toISOString()
    });

    // Atualiza badge
    badgeCarrinho.textContent = carrinho.quantidade;

    // Feedback visual
    btnAdicionarCarrinho.classList.add('adicionado');
    btnAdicionarCarrinho.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado ao carrinho!';

    // Animação no badge
    badgeCarrinho.style.transform = 'scale(1.5)';
    setTimeout(() => {
        badgeCarrinho.style.transform = 'scale(1)';
    }, 300);

    // Volta ao estado original após 2 segundos
    setTimeout(() => {
        btnAdicionarCarrinho.classList.remove('adicionado');
        btnAdicionarCarrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho de compras';
    }, 2000);

    // Salva no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Console para debug
    console.log('Produto adicionado ao carrinho:', carrinho);

    // Mostra notificação
    mostrarNotificacao('Produto adicionado ao carrinho com sucesso!');
});

// SISTEMA DE NOTIFICAÇÕES
function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    // Remove notificação anterior se existir
    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }

    // Cria nova notificação
    const notificacao = document.createElement('div');
    notificacao.classList.add('notificacao', tipo);
    notificacao.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${mensagem}</span>
    `;

    // Adiciona ao body
    document.body.appendChild(notificacao);

    // Adiciona estilos inline (ou crie uma classe CSS)
    Object.assign(notificacao.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        fontSize: '0.95rem'
    });

    // Remove após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Adiciona animações CSS para notificação
const styleNotificacao = document.createElement('style');
styleNotificacao.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleNotificacao);

// NAVEGAÇÃO DOS PRODUTOS RELACIONADOS
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const containerProdutos = document.querySelector('.produtos-relacionados');

// Verifica se as setas existem (podem não existir no mobile)
if (setaEsquerda && setaDireita) {
    let scrollAmount = 0;

    setaDireita.addEventListener('click', () => {
        const cardWidth = containerProdutos.querySelector('.card-produto').offsetWidth + 24;
        scrollAmount += cardWidth;
        containerProdutos.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    setaEsquerda.addEventListener('click', () => {
        const cardWidth = containerProdutos.querySelector('.card-produto').offsetWidth + 24;
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        containerProdutos.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Atualiza visibilidade das setas
    containerProdutos.addEventListener('scroll', () => {
        const maxScroll = containerProdutos.scrollWidth - containerProdutos.clientWidth;

        setaEsquerda.style.opacity = containerProdutos.scrollLeft === 0 ? '0.5' : '1';
        setaEsquerda.style.pointerEvents = containerProdutos.scrollLeft === 0 ? 'none' : 'auto';

        setaDireita.style.opacity = containerProdutos.scrollLeft >= maxScroll ? '0.5' : '1';
        setaDireita.style.pointerEvents = containerProdutos.scrollLeft >= maxScroll ? 'none' : 'auto';
    });
}

// BARRA DE PESQUISA
const inputPesquisa = document.getElementById('pesquisar');
const btnPesquisa = document.querySelector('.btn-search');

btnPesquisa.addEventListener('click', realizarPesquisa);

inputPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        realizarPesquisa();
    }
});

function realizarPesquisa() {
    const termo = inputPesquisa.value.trim();

    if (termo === '') {
        mostrarNotificacao('Digite algo para pesquisar', 'aviso');
        return;
    }

    console.log('Pesquisando por:', termo);
    mostrarNotificacao(`Pesquisando por: ${termo}`, 'info');
}

// CARREGAR CARRINHO DO LOCALSTORAGE
window.addEventListener('DOMContentLoaded', () => {
    // Recupera carrinho salvo
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        badgeCarrinho.textContent = carrinho.quantidade;
    }

    // Animação inicial da página
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ZOOM NA IMAGEM DO PRODUTO (BONUS)
const imagemProduto = document.getElementById('imagemPrincipal');

imagemProduto.addEventListener('click', () => {
    // Cria modal para zoom
    const modal = document.createElement('div');
    modal.classList.add('modal-zoom');
    modal.innerHTML = `
        <div class="modal-conteudo">
            <button class="fechar-modal" aria-label="Fechar">&times;</button>
            <img src="${imagemProduto.src}" alt="${imagemProduto.alt}">
        </div>
    `;

    // Estilos do modal
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        cursor: 'zoom-out'
    });

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Fecha modal ao clicar
    modal.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });

    const btnFechar = modal.querySelector('.fechar-modal');
    btnFechar.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.remove();
        document.body.style.overflow = '';
    });
});

// SMOOTH SCROLL (se houver âncoras)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// LAZY LOADING DE IMAGENS (BONUS)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// CONSOLE LOG ESTILIZADO (BRANDING)
console.log(
    '%c🚗 Auto Center Silva %c- Desenvolvido com ❤️',
    'background: #8F1515; color: white; padding: 8px 12px; font-size: 16px; font-weight: bold; border-radius: 4px;',
    'color: #8F1515; font-size: 14px; padding: 8px 0;'
);

console.log('%cVersão: 1.0.0', 'color: #666; font-size: 12px;');