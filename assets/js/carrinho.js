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

// GERENCIAMENTO DO CARRINHO
let carrinho = {
    itens: []
};

// Elementos
const listaProdutos = document.querySelector('.lista-produtos');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const resumoPedido = document.getElementById('resumo-pedido');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const badgeCarrinho = document.querySelector('.badge-carrinho');

// Função para carregar carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        console.log('Carrinho carregado:', carrinho);
        atualizarBadge();
        renderizarCarrinho();
    } else {
        console.log('Carrinho vazio');
        mostrarCarrinhoVazio();
    }
}

// Função para salvar carrinho
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log('Carrinho salvo:', carrinho);
}

// Função para mostrar carrinho vazio
function mostrarCarrinhoVazio() {
    carrinhoVazio.classList.add('ativo');
    resumoPedido.style.display = 'none';
    listaProdutos.innerHTML = '';
}

// Função para atualizar badge
function atualizarBadge() {
    if (badgeCarrinho) {
        const totalItens = carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
        badgeCarrinho.textContent = totalItens;
    }
}

// Função para renderizar produtos
function renderizarCarrinho() {
    if (!carrinho.itens || carrinho.itens.length === 0) {
        mostrarCarrinhoVazio();
        return;
    }

    carrinhoVazio.classList.remove('ativo');
    resumoPedido.style.display = 'block';

    listaProdutos.innerHTML = carrinho.itens.map(item => `
        <div class="produto-item" data-id="${item.id}">
            <div class="produto-imagem">
                <img src="${item.imagem}" alt="${item.nome}">
            </div>
            
            <div class="produto-info">
                <h3 class="produto-nome">${item.nome}</h3>
                <div class="produto-avaliacao">
                    <span class="nota">${item.nota.toFixed(1)}</span>
                    <div class="estrelas">
                        ${gerarEstrelas(Math.round(item.nota))}
                    </div>
                </div>
                <div class="produto-controles">
                    <div class="controle-quantidade">
                        <button class="btn-quantidade btn-diminuir" 
                                data-id="${item.id}" 
                                ${item.quantidade <= 1 ? 'disabled' : ''}
                                aria-label="Diminuir quantidade de ${item.nome}">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantidade-valor">${item.quantidade}</span>
                        <button class="btn-quantidade btn-aumentar" 
                                data-id="${item.id}"
                                aria-label="Aumentar quantidade de ${item.nome}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="produto-preco-acoes">
                <span class="produto-preco">R$ ${formatarPreco(item.preco * item.quantidade)}</span>
                <button class="btn-remover" 
                        data-id="${item.id}" 
                        aria-label="Remover ${item.nome} do carrinho">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    adicionarEventListeners();
    calcularTotal();
}

// Função para adicionar event listeners
function adicionarEventListeners() {
    // Botões para aumentar quantidade
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            aumentarQuantidade(id);
        });
    });

    // Botões de diminuir quantidade
    document.querySelectorAll('.btn-diminuir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            diminuirQuantidade(id);
        });
    });

    // Botões de remover
    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const item = carrinho.itens.find(i => i.id === id);
            if (confirm(`Deseja remover "${item.nome}" do carrinho?`)) {
                removerItem(id);
            }
        });
    });
}

// Função para formatar preço
function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

// Função para gerar estrelas
function gerarEstrelas(nota) {
    const estrelaCheia = '<i class="fa-solid fa-star"></i>';
    const estrelaVazia = '<i class="fa-regular fa-star"></i>';

    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= nota ? estrelaCheia : estrelaVazia;
    }
    return html;
}

// Funções de controle
function aumentarQuantidade(id) {
    const item = carrinho.itens.find(i => i.id === id);
    if (item) {
        item.quantidade++;
        salvarCarrinho();
        renderizarCarrinho();
        atualizarBadge();
    }
}

function diminuirQuantidade(id) {
    const item = carrinho.itens.find(i => i.id === id);
    if (item && item.quantidade > 1) {
        item.quantidade--;
        salvarCarrinho();
        renderizarCarrinho();
        atualizarBadge();
    }
}

function removerItem(id) {
    carrinho.itens = carrinho.itens.filter(i => i.id !== id);
    salvarCarrinho();
    renderizarCarrinho();
    atualizarBadge();
}

// Função para calcular total
function calcularTotal() {
    const subtotal = carrinho.itens.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    subtotalElement.textContent = `R$ ${formatarPreco(subtotal)}`;
    totalElement.textContent = `R$ ${formatarPreco(subtotal)}`;
}

// Finalizar compra
const btnFinalizar = document.getElementById('btn-finalizar');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (!carrinho.itens || carrinho.itens.length === 0) {
            alert('Seu carrinho está vazio');
            return;
        }

        alert(`Finalizando compra de ${carrinho.itens.length} produto(s)!`);
    });
}

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCarrinho);