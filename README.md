# Auto Center Silva

> Site institucional + e-commerce de pneus da Auto Center Silva, oficina mecânica localizada em Foz do Iguaçu – PR. Apresenta os serviços da empresa, depoimentos de clientes, loja de pneus com navegação por categorias, carrinho de compras funcional com `localStorage`, páginas de produto com zoom de imagem e sistema de notificações.

---

## Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Páginas e Seções](#-páginas-e-seções)
- [Loja de Pneus](#-loja-de-pneus)
- [Arquitetura JavaScript](#-arquitetura-javascript)
- [Sistema de Carrinho](#-sistema-de-carrinho)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Conceitos Aplicados](#-conceitos-aplicados)
- [Como Executar](#-como-executar)
- [Contato da Empresa](#-contato-da-empresa)

---

## Sobre o Projeto

A **Auto Center Silva** é uma oficina mecânica real localizada em Foz do Iguaçu – PR. Este projeto é o site institucional e loja virtual da empresa, desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks — com foco em responsividade, acessibilidade e uma experiência de compra completa no front-end.

O site abrange desde a apresentação da marca (slider, serviços, depoimentos, FAQ e localização com mapa embed) até um fluxo de e-commerce funcional: catálogo de pneus → página do produto → carrinho → checkout.

---

## Páginas e Seções

### `index.html` — Página Principal

| Seção | Descrição |
|---|---|
| **Header** | Logo, menu de navegação e badge do carrinho com contador; menu hamburger no mobile com overlay |
| **Slider** | 3 slides com autoplay a cada 6s, pausa ao hover, imagens distintas para desktop e mobile |
| **Por que nos escolher?** | 4 cards com diferenciais: Manutenção Preventiva, Diagnóstico e Reparo, Segurança e Conforto (sala de espera com TV, café, bolo e salgados) |
| **Sobre Nós** | Texto institucional com foto da oficina: qualidade, transparência e atendimento honesto |
| **Nossos Serviços** | 9 serviços com ícones: ABS, Alinhamento, Air-bag, Balanceamento, Freios, Injeção Eletrônica, Mecânica em Geral, Pneus e Suspensão |
| **Loja (prévia)** | 3 cards de pneus em destaque com avaliação por estrelas, link para a loja completa |
| **Depoimentos** | 4 depoimentos de clientes reais (Fernanda Bettiato, Rafael Bertolazo, Rafael Silva, Janaina Jana) |
| **Localização** | Mapa embed do Google Maps com o endereço real da empresa |
| **FAQ** | 3 perguntas frequentes em acordeão (`<details>`/`<summary>`): formas de pagamento, agendamento e prazo dos serviços |
| **Atendimento** | Formulário de contato (nome, e-mail, mensagem) com validação no front-end |
| **Footer** | Horário (Seg–Sex: 7h30–18h, Sáb: 7h30–12h), endereço, WhatsApp, e-mail e redes sociais |

### `loja.html` — Catálogo de Pneus

Catálogo completo dividido em 4 categorias, com busca em tempo real e navegação por setas.

### `produto.html` / `produto2.html` — Página do Produto

Detalhe do pneu com imagem ampliável, avaliação, seletor de quantidade e adição ao carrinho.

### `carrinho.html` — Carrinho de Compras

Gerenciamento de itens com controle de quantidade, remoção e cálculo do total.

### `login.html` — Login e Cadastro

Formulário de autenticação com validação de campos e opções de login social (Google e Facebook).

---

## Loja de Pneus

### Categorias

| Categoria | Produtos |
|---|---|
| **Mais Vendidos** | Ling Long 225/55/R18, XBRI 265/70/R16, XBRI 315/80/R22.5, Ling Long 215/75/R17.5, Sunset Tires 245/70/R16 |
| **Ling Long** | 185/65/15, 175/60/13, Green-MAX 185/35/17, 165/70/13, 175/60/13 e outros |
| **XBRI** | 265/70/R16, 315/80/R22.5 e demais modelos |
| **Novos** | Sunset 175/70/13, Duraturn 175/75/13, Nova Force 175/65/14, Ling Long 175/65/14, Gallant 205/60/15 e outros |

### Funcionalidades da Loja

- **Busca em tempo real** com normalização de acentos via `String.normalize('NFD')` — pesquisa funciona mesmo com ou sem acentuação
- **Filtragem por seção** — seções sem resultado são ocultadas automaticamente; mensagem de "sem resultados" é exibida quando nenhum pneu corresponde
- **Navegação por setas** — exibe 4 cards por vez; setas são desabilitadas quando não há mais itens na direção
- **Animação de entrada** das seções com `IntersectionObserver` (`opacity 0 → 1` + `translateY`)
- **Lazy loading** das imagens via `IntersectionObserver` com atributo `data-src`
- **Badge do carrinho** atualizado via `localStorage` ao carregar a página e sincronizado com outras abas via evento `storage`

---

## Arquitetura JavaScript

O projeto é dividido em 5 arquivos JS com responsabilidades bem definidas:

```
script.js      → Página principal
│  ├── class SliderAutoCenter   → Autoplay (6s), pause no hover, navegação manual
│  ├── Smooth scroll            → Todos os links âncora com scrollIntoView
│  ├── Menu hamburger           → Toggle + overlay + ESC + resize + aria-expanded
│  ├── IntersectionObserver     → Animação fade-in das seções ao scroll
│  ├── Formulário de contato    → Validação + alert de sucesso
│  └── Botão voltar ao topo     → Aparece após 450px de scroll

loja.js        → Catálogo de pneus
│  ├── Menu hamburger           → Mesma lógica do script.js
│  ├── formatarString()         → Normaliza texto: lowercase + trim + remove acentos
│  ├── realizarBusca()          → Filtra cards e seções, exibe mensagem sem resultados
│  ├── Navegação por setas      → Índice atual + 4 cards por vez, desabilita setas nos limites
│  ├── IntersectionObserver     → Lazy loading das imagens (data-src → src)
│  ├── IntersectionObserver     → Animação de entrada das seções de produtos
│  ├── Badge do carrinho        → Lê localStorage + evento storage (cross-tab)
│  └── Smooth scroll para âncoras (compensa altura do header fixo)

produto.js     → Página do produto
│  ├── Menu hamburger           → Mesma lógica
│  ├── Controle de quantidade   → +/- com animação scale, limite 1–99
│  ├── gerarIdProduto()         → Slug a partir do nome (lowercase, caracteres especiais → '-')
│  ├── converterPrecoParaNumero() → Remove R$, espaços, converte vírgula para ponto
│  ├── Adicionar ao carrinho    → Upsert: aumenta quantidade se já existe, insere se não
│  ├── mostrarNotificacao()     → Toast animado (slideInRight/Out), auto-remove em 3s
│  ├── Feedback no botão        → Texto muda para "✓ Adicionado!", reverte em 2s
│  ├── Zoom na imagem           → Modal fullscreen ao clicar, fecha no overlay ou ESC
│  └── Badge do carrinho        → Animação scale(1.5) ao adicionar

carrinho.js    → Carrinho de compras
│  ├── Menu hamburger           → Mesma lógica
│  ├── carregarCarrinho()       → Lê JSON do localStorage, renderiza ou exibe estado vazio
│  ├── renderizarCarrinho()     → Gera HTML dinâmico com template strings para cada item
│  ├── gerarEstrelas()          → HTML de estrelas cheias/vazias (Font Awesome)
│  ├── aumentarQuantidade()     → +1, salva, re-renderiza, atualiza badge
│  ├── diminuirQuantidade()     → -1 (mínimo 1), botão desabilitado se quantidade = 1
│  ├── removerItem()            → confirm() antes de remover, filtra array, salva
│  ├── calcularTotal()          → reduce() com preco × quantidade, formata para pt-BR
│  └── Botão finalizar compra   → Alert com quantidade de itens

login.js       → Login e cadastro
│  ├── Menu hamburger           → Mesma lógica
│  ├── Badge do carrinho        → Lê localStorage
│  └── Validação do formulário  → Campos obrigatórios (telefone + e-mail)
```

---

## Sistema de Carrinho

A chave `carrinho` no `localStorage` armazena um objeto JSON com array de itens:

```json
{
  "itens": [
    {
      "id": "ling-long-225-55-r18",
      "nome": "Ling Long 225/55/R18",
      "preco": 450.00,
      "quantidade": 2,
      "imagem": "assets/img/pneu1linglong.png",
      "nota": 4.5,
      "timestamp": "2025-04-24T22:00:00.000Z"
    }
  ]
}
```

**Fluxo completo de compra:**

```
loja.html (card de pneu)
  └── clica no card → produto.html

produto.html
  ├── Seleciona quantidade (1–99)
  └── Clica "Adicionar ao carrinho"
        ├── Coleta: nome, preço, nota, imagem, quantidade
        ├── Gera ID slug a partir do nome
        ├── Verifica se já existe no carrinho (upsert)
        ├── Salva no localStorage
        ├── Anima badge (scale 1.5 → 1)
        ├── Muda texto do botão → "✓ Adicionado!" por 2s
        └── Exibe toast de sucesso (desliza da direita, some em 3s)

carrinho.html
  ├── Carrega itens do localStorage
  ├── Renderiza cards com quantidade, preço total e estrelas
  ├── + / - atualiza quantidade em tempo real (mínimo 1)
  ├── 🗑️ confirm() antes de remover
  └── Recalcula subtotal e total a cada mudança
```

**Sincronização entre abas:** todas as páginas escutam o evento `window.storage` com a chave `carrinho` para manter o badge atualizado em tempo real.

---

## Estrutura do Projeto

```
Auto-Center-Silva/
│
├── index.html          # Página principal (institucional + prévia da loja)
├── loja.html           # Catálogo completo de pneus por categoria
├── produto.html        # Detalhe do pneu 1 (Ling Long 225/55/R18)
├── produto2.html       # Detalhe do pneu 2 (XBRI 265/70/R16)
├── carrinho.html       # Carrinho de compras
├── login.html          # Login e cadastro
│
└── assets/
    ├── css/
    │   ├── style.css       # Estilos da página principal e componentes globais
    │   ├── loja.css        # Grade de produtos, busca, setas e animações da loja
    │   ├── produto.css     # Layout de detalhe do produto, zoom, controle de quantidade
    │   ├── carrinho.css    # Lista de itens, controles de quantidade, resumo do pedido
    │   └── login.css       # Formulário de login/cadastro, botões sociais
    │
    ├── js/
    │   ├── script.js       # Slider (classe), menu, scroll, animações, formulário
    │   ├── loja.js         # Busca, navegação setas, lazy loading, badge
    │   ├── produto.js      # Quantidade, carrinho (upsert), notificação, zoom
    │   ├── carrinho.js     # CRUD do carrinho, renderização, cálculo de total
    │   └── login.js        # Badge, validação de cadastro
    │
    └── img/
        ├── logo.png / logo02.png           # Logos da empresa
        ├── img-1/2/3-desktop.jpg/.png      # Banners do slider (desktop)
        ├── img-1/2/3-mobile.png            # Banners do slider (mobile)
        ├── pneu1linglong.png ... pneu19.png # Fotos dos pneus (19 produtos)
        ├── pneu-card.png                   # Imagem genérica de card
        ├── oficina-sobre-nos.png           # Foto da oficina (Sobre Nós)
        ├── perfil-masculino/feminino.png   # Avatares dos depoimentos
        ├── [abs/alinhamento/air-bag/...].png # Ícones dos serviços (9 ícones)
        ├── etiqueta-eficiencia.webp        # Imagem de marketing
        ├── [localizacao/whatsapp/email/    
        │    instagram/facebook]-footer.png # Ícones do footer
        ├── logo-google.png / logo-face.png # Botões de login social
        ├── carrinho.png                    # Ícone do carrinho
        ├── car.png / pessoa.png / sofa.png # Ícones dos diferenciais
        └── seguranca.png / manutencao...   # Ícones dos cards "Por que nos escolher"
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| **HTML5** | — | Semântica (`<article>`, `<section>`, `<details>`), atributos ARIA, meta tags Open Graph, mapa embed |
| **CSS3** | — | Flexbox, Grid, variáveis CSS, media queries, animações (`@keyframes`) |
| **JavaScript ES6+** | — | Classes, `async/await`, arrow functions, template strings, `localStorage`, `IntersectionObserver`, evento `storage` |
| **Font Awesome** | 6 | Ícones de interface (estrelas, setas, lixeira, carrinho, check) |
| **Google Fonts** | — | Tipografia Inter (CDN) |
| **Google Maps Embed** | — | Mapa da localização real da empresa |

---

## Conceitos Aplicados

### JavaScript

| Conceito | Aplicação |
|---|---|
| **Classe ES6** | `SliderAutoCenter` com métodos `init`, `nextSlide`, `startAutoPlay`, `stopAutoPlay` |
| **`IntersectionObserver`** | Animação fade-in de seções (script.js), lazy loading de imagens (loja.js), animação das seções da loja |
| **`localStorage`** | Persistência do carrinho entre páginas e sessões; chave `carrinho` com JSON estruturado |
| **Evento `storage`** | Sincronização do badge do carrinho entre abas abertas simultaneamente |
| **`String.normalize('NFD')`** | Normalização de acentos na busca da loja (pesquisa sem acento encontra produto com acento) |
| **Upsert no carrinho** | Ao adicionar produto já existente, incrementa `quantidade` em vez de duplicar o item |
| **Toast de notificação** | Injetado dinamicamente no DOM com `@keyframes slideInRight/Out` criados via `document.createElement('style')` |
| **Modal de zoom** | Imagem do produto em fullscreen, criado dinamicamente, fecha no overlay ou ESC |
| **`DocumentFragment`** | Não utilizado diretamente, mas HTML dinâmico via `innerHTML` com `map().join('')` para o carrinho |
| **`aria-expanded`** | Atualizado dinamicamente no botão hamburger conforme estado do menu |

### CSS

| Recurso | Uso |
|---|---|
| Variáveis CSS | Cores e espaçamentos reutilizáveis |
| Flexbox + Grid | Layout do header, cards de serviços, grid de produtos e resumo do carrinho |
| `@keyframes` | Animação `slideInRight` / `slideOutRight` do toast de notificação |
| Media queries | Slider com imagens distintas para desktop/mobile; layout responsivo em todas as páginas |
| `position: sticky` | Header fixo com compensação no smooth scroll da loja |

### HTML Semântico e Acessibilidade

| Recurso | Uso |
|---|---|
| `<details>` / `<summary>` | FAQ em acordeão nativo, sem JavaScript |
| `<article>` | Cards de depoimentos e itens do carrinho |
| `<section>` com `id` | Âncoras do menu de navegação |
| `aria-label` | Botões do carrinho, hamburger, setas da loja e controles de quantidade |
| `aria-expanded` | Estado do menu mobile para leitores de tela |
| `loading="lazy"` | Lazy loading nativo nas imagens dos cards de produto |
| Meta Open Graph | `og:title`, `og:description`, `og:type` nas páginas da loja |

---

## Como Executar

Por ser um projeto estático (HTML/CSS/JS puro), não requer instalação ou back-end.

**Opção 1 — Abrir diretamente no navegador:**

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/Auto-Center-Silva.git
   ```
2. Abra o arquivo `index.html` no seu navegador.

**Opção 2 — Live Server (recomendado para desenvolvimento):**

1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.
2. Clique com o botão direito em `index.html` → **"Open with Live Server"**.

> **Atenção:** O carrinho é salvo no `localStorage` do navegador — os dados persistem entre sessões e são compartilhados entre páginas do mesmo domínio.

> **Atenção:** Conexão com a internet é necessária para carregar o Font Awesome, Google Fonts e o mapa embed do Google Maps.

---

## Contato da Empresa

| Canal | Informação |
|---|---|
| **Endereço** | Av. Beira-Rio — Vila Portes, Foz do Iguaçu – PR |
| **WhatsApp** | +55 (45) 99905-1549 |
| **E-mail** | autocentersilvamkt@gmail.com |
| **Facebook** | [Auto Center Silva](https://www.facebook.com/profile.php?id=61578792843865) |
| **Horário** | Segunda a sexta: 7h30–18h00 · Sábado: 7h30–12h00 |
