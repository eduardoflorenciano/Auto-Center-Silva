# 🚗 Auto Center Silva

Site institucional e e-commerce de uma oficina mecânica localizada em Foz do Iguaçu – PR. O projeto apresenta os serviços da empresa, depoimentos de clientes, loja de pneus com carrinho de compras funcional e formulário de contato.

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Páginas](#páginas)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Como Executar](#como-executar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## 🧪 Sobre o Projeto

Landing page + loja virtual desenvolvidas com HTML, CSS e JavaScript puro (vanilla), sem dependências de frameworks. O layout é totalmente responsivo, adaptado para dispositivos móveis e desktops, com foco em usabilidade e acessibilidade.

---

## 🚀 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---
## 🎯 Funcionalidades

- **Slider automático** com autoplay e pausa ao passar o mouse, navegação manual e responsivo (imagens distintas para desktop/mobile)
- **Menu hamburger** para mobile com overlay, travamento de scroll e fechamento por tecla ESC
- **Animações de scroll** com `IntersectionObserver` para entrada suave de seções
- **Loja de pneus** com sistema de busca em tempo real (com normalização de acentos), navegação por setas entre cards e lazy loading de imagens
- **Carrinho de compras** persistido via `localStorage`, com controle de quantidade por produto, remoção de itens com confirmação e cálculo dinâmico de subtotal e total
- **Página de produto** com seleção de quantidade e adição ao carrinho
- **Badge do carrinho** atualizado em tempo real (inclusive entre abas, via evento `storage`)
- **Formulário de contato** com validação básica no front-end
- **Cadastro/Login** com validação de campos obrigatórios
- **Botão "voltar ao topo"** com aparecimento ao scroll

---

## 📑 Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Página principal: slider, sobre nós, serviços, prévia da loja, depoimentos, FAQ e contato |
| `loja.html` | Catálogo completo de pneus com busca e navegação por setas |
| `produto.html` / `produto2.html` / `produto3.html` | Páginas de detalhe de produto com seleção de quantidade e adição ao carrinho |
| `carrinho.html` | Carrinho de compras com gestão de itens e resumo do pedido |
| `login.html` | Página de login e cadastro |

---

## 📁 Estrutura de Arquivos

```
Auto-Center-Silva/
├── index.html
├── loja.html
├── produto.html
├── produto2.html
├── produto3.html
├── carrinho.html
├── login.html
└── assets/
    ├── css/
    │   ├── style.css        # Estilos da página principal
    │   ├── loja.css         # Estilos da loja
    │   ├── produto.css      # Estilos da página de produto
    │   ├── carrinho.css     # Estilos do carrinho
    │   └── login.css        # Estilos de login/cadastro
    ├── js/
    │   ├── script.js        # Scripts da página principal
    │   ├── loja.js          # Busca, navegação e lazy loading da loja
    │   ├── produto.js       # Controle de quantidade e adição ao carrinho
    │   ├── carrinho.js      # Gerenciamento completo do carrinho
    │   └── login.js         # Validação e badge do carrinho
    └── img/
        └── ...              # Logos, ícones, imagens dos produtos e banners
```

---

## 🛠️ Como Executar

Por ser um projeto estático (sem back-end), basta abrir o arquivo `index.html` no navegador. Para uma melhor experiência de desenvolvimento, recomenda-se usar uma extensão de servidor local como o **Live Server** (VS Code):

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/Auto-Center-Silva.git
   ```

2. Abra a pasta no VS Code e inicie o Live Server, ou simplesmente abra o `index.html` diretamente no navegador.

> **Obs.:** O carrinho utiliza `localStorage`, portanto os dados são salvos no navegador do usuário entre sessões.

---

## 🧩 Tecnologias Utilizadas

- **HTML5** – Semântica, acessibilidade com atributos ARIA e SEO básico via meta tags
- **CSS3** – Flexbox, Grid, variáveis CSS, media queries e animações
- **JavaScript (ES6+)** – Classes, arrow functions, `IntersectionObserver`, `localStorage`
- **Font Awesome 6** – Ícones
- **Google Fonts** – Tipografia (Inter)
