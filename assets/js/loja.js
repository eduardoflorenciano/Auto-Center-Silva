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

// SISTEMA DE BUSCA DE PRODUTOS
const inputPesquisa = document.getElementById('pesquisar');
const btnPesquisa = document.querySelector('.btn-search');
const semResultados = document.getElementById('semResultados');
const secoesProdutos = document.querySelectorAll('.secao-produtos');

// Função para formatar string (remover acentos, espaços, etc)
function formatarString(texto) {
    return texto
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Função de busca
function realizarBusca() {
    const termoBusca = formatarString(inputPesquisa.value);

    // Se busca estiver vazia, mostra tudo
    if (termoBusca === '') {
        mostrarTodosProdutos();
        return;
    }

    let encontrouResultado = false;

    // Percorre todas as seções
    secoesProdutos.forEach(secao => {
        const cards = secao.querySelectorAll('.produto-card');
        let secaoTemResultado = false;

        // Verifica cada card
        cards.forEach(card => {
            const titulo = formatarString(card.querySelector('.card-titulo').textContent);

            if (titulo.includes(termoBusca)) {
                card.style.display = 'flex';
                secaoTemResultado = true;
                encontrouResultado = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Esconde/mostra a seção inteira
        if (secaoTemResultado) {
            secao.style.display = 'block';
        } else {
            secao.style.display = 'none';
        }
    });

    // Mostra/esconde mensagem de "sem resultados"
    if (encontrouResultado) {
        semResultados.style.display = 'none';
    } else {
        semResultados.style.display = 'block';
    }
}

// Função para mostrar todos os produtos
function mostrarTodosProdutos() {
    secoesProdutos.forEach(secao => {
        secao.style.display = 'block';
        const cards = secao.querySelectorAll('.produto-card');
        cards.forEach(card => {
            card.style.display = 'flex';
        });
    });
    semResultados.style.display = 'none';
}

// Event listeners para busca
inputPesquisa.addEventListener('input', realizarBusca);
btnPesquisa.addEventListener('click', realizarBusca);

inputPesquisa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        realizarBusca();
    }
});

// Navegação com setas
document.querySelectorAll('.borda-produtos').forEach(bordaProdutos => {
    const setaEsquerda = bordaProdutos.querySelector('.seta-esquerda');
    const setaDireita = bordaProdutos.querySelector('.seta-direita');
    const containerScroll = bordaProdutos.querySelector('.produtos-scroll');

    if (!setaEsquerda || !setaDireita || !containerScroll) return;

    const cards = Array.from(containerScroll.querySelectorAll('.produto-card'));
    let indiceAtual = 0;
    const cardsPorVez = 4;

    // Função para atualizar exibição dos cards
    function atualizarExibicao() {
        cards.forEach((card, index) => {
            if (index >= indiceAtual && index < indiceAtual + cardsPorVez) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Atualiza estado das setas
        setaEsquerda.disabled = indiceAtual === 0;
        setaDireita.disabled = indiceAtual + cardsPorVez >= cards.length;
    }

    // Navegar para direita (próximos produtos)
    setaDireita.addEventListener('click', () => {
        if (indiceAtual + cardsPorVez < cards.length) {
            indiceAtual++;
            atualizarExibicao();
        }
    });

    // Navegar para esquerda (produtos anteriores)
    setaEsquerda.addEventListener('click', () => {
        if (indiceAtual > 0) {
            indiceAtual--;
            atualizarExibicao();
        }
    });

    // Inicializa exibição
    atualizarExibicao();
});

// Carregar carrinho do localStorage
const badgeCarrinho = document.querySelector('.badge-carrinho');

function atualizarBadgeCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo) {
        const carrinho = JSON.parse(carrinhoSalvo);
        const totalItens = carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
        badgeCarrinho.textContent = totalItens;

        if (totalItens > 0) {
            badgeCarrinho.classList.add('atualizado');
            setTimeout(() => {
                badgeCarrinho.classList.remove('atualizado');
            }, 500);
        }
    } else {
        badgeCarrinho.textContent = '0';
    }
}

// Atualiza badge ao carregar página
window.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho);

// Atualiza badge quando o localStorage mudar em outra aba
window.addEventListener('storage', (e) => {
    if (e.key === 'carrinho') {
        atualizarBadgeCarrinho();
    }
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animação de entrada das seções
const observerOpcoes = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const secaoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOpcoes);

// Aplica animação inicial
secoesProdutos.forEach(secao => {
    secao.style.opacity = '0';
    secao.style.transform = 'translateY(30px)';
    secao.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    secaoObserver.observe(secao);
});

// Prevenir comportamento padrão dos links
document.querySelectorAll('.produto-card').forEach(card => {
    card.addEventListener('click', (e) => {
        card.style.opacity = '0.7';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 150);
    });
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