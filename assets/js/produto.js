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
    document.body.style.overflow = isExpanded ? 'hidden' : '';
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
    if (quantidade < 99) {
        inputQuantidade.value = quantidade + 1;
        atualizarQuantidade();
    }
});

// Diminuir quantidade
btnDiminuir.addEventListener('click', () => {
    let quantidade = parseInt(inputQuantidade.value);
    if (quantidade > 1) {
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

// Função para gerar ID único baseado no nome do produto
function gerarIdProduto(nome) {
    // Remove espaços e caracteres especiais, converte para minúsculas
    return nome.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// Função para converter preço de string para número
function converterPrecoParaNumero(precoString) {
    // Remove "R$", espaços e converte vírgula e ponto
    return parseFloat(precoString.replace(/[^\d,]/g, '').replace(',', '.'));
}

// Função para carregar carrinho existente
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : { itens: [] };
}

// Adiciona ao carrinho
btnAdicionarCarrinho.addEventListener('click', () => {
    try {
        // Coleta os dados do produto
        const nomeProduto = document.querySelector('.nome-produto')?.textContent.trim();
        const precoTexto = document.querySelector('.valor-preco')?.textContent.trim();
        const notaTexto = document.querySelector('.nota')?.textContent.trim();
        const imagemElement = document.getElementById('imagemPrincipal');

        // Validações iniciais
        if (!nomeProduto || !precoTexto || !notaTexto) {
            throw new Error('Informações do produto incompletas');
        }

        if (!imagemElement) {
            throw new Error('Imagem do produto não encontrada');
        }

        // Processa os dados
        const precoNumero = converterPrecoParaNumero(precoTexto);
        const quantidade = parseInt(inputQuantidade.value);
        const imagemSrc = imagemElement.src;
        const nota = parseFloat(notaTexto);
        const idProduto = gerarIdProduto(nomeProduto);

        // Validações finais
        if (isNaN(precoNumero) || isNaN(quantidade) || isNaN(nota)) {
            throw new Error('Dados inválidos');
        }

        // Carrega e atualiza carrinho
        let carrinho = carregarCarrinho();

        // Verifica se o produto já existe no carrinho
        const produtoExistente = carrinho.itens.find(item => item.id === idProduto);

        if (produtoExistente) {
            // Se já existe, apenas aumenta a quantidade
            produtoExistente.quantidade += quantidade;
            console.log('Quantidade atualizada:', produtoExistente);
        } else {
            // Se não existe, adiciona novo item
            const novoProduto = {
                id: idProduto,
                nome: nomeProduto,
                preco: precoNumero,
                quantidade: quantidade,
                imagem: imagemSrc,
                nota: nota,
                timestamp: new Date().toISOString()
            };

            carrinho.itens.push(novoProduto);
            console.log('Novo produto adicionado:', novoProduto);
        }

        // Salva no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualiza o badge
        const totalItens = carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
        if (badgeCarrinho) {
            badgeCarrinho.textContent = totalItens;

            // Animação no badge
            badgeCarrinho.style.transform = 'scale(1.5)';
            setTimeout(() => {
                badgeCarrinho.style.transform = 'scale(1)';
            }, 300);
        }

        // Feedback visual no botão
        btnAdicionarCarrinho.classList.add('adicionado');
        btnAdicionarCarrinho.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado ao carrinho!';

        setTimeout(() => {
            btnAdicionarCarrinho.classList.remove('adicionado');
            btnAdicionarCarrinho.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho de compras';
        }, 2000);

        // Mostra notificação
        mostrarNotificacao('Produto adicionado ao carrinho com sucesso!');

        // Reseta quantidade para 1
        inputQuantidade.value = 1;

    } catch (erro) {
        console.error('Erro ao adicionar produto:', erro);
        alert(`Erro ao adicionar produto: ${erro.message}`);
    }
});

// SISTEMA DE NOTIFICAÇÕES
function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }

    const notificacao = document.createElement('div');
    notificacao.classList.add('notificacao', tipo);
    notificacao.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${mensagem}</span>
    `;

    document.body.appendChild(notificacao);

    Object.assign(notificacao.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: tipo === 'sucesso' ? '#4CAF50' : '#ff9800',
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

    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Animações CSS para notificação
const styleNotificacao = document.createElement('style');
styleNotificacao.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(styleNotificacao);

// CARREGAR BADGE AO INICIAR
window.addEventListener('DOMContentLoaded', () => {
    const carrinho = carregarCarrinho();
    const totalItens = carrinho.itens.reduce((total, item) => total + item.quantidade, 0);

    if (badgeCarrinho) {
        badgeCarrinho.textContent = totalItens;
    }

    // Animação inicial da página
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ZOOM NA IMAGEM DO PRODUTO
const imagemProduto = document.getElementById('imagemPrincipal');

if (imagemProduto) {
    imagemProduto.style.cursor = 'zoom-in';

    imagemProduto.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <button class="fechar-modal" style="align-self: flex-end; font-size: 2rem; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; margin-bottom: 1rem;">&times;</button>
                <img src="${imagemProduto.src}" alt="${imagemProduto.alt}" style="max-width: 90vw; max-height: 90vh; object-fit: contain;">
            </div>
        `;

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
            cursor: 'zoom-out',
            padding: '2rem'
        });

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('fechar-modal')) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
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