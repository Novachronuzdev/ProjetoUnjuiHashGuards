# Unjui | Vitrine de Rash Guards de Jiu-Jitsu

Landing page / vitrine virtual da **Unjui**, marca de rash guards para Jiu-Jitsu e No-Gi. Não há carrinho nem cadastro: o cliente escolhe o modelo e o tamanho e inicia o pedido direto pelo WhatsApp, com a mensagem já preenchida.

## Produtos

| Modelo | Descrição | Preço |
|---|---|---|
| **Manto Divino** | Estampa sacra com Ostensório e Pomba da Paz | R$ 120,00 |
| **São Jorge** | Brasão papal na frente e São Jorge derrotando o dragão nas costas | R$ 120,00 |

## Funcionalidades

- Destaque (hero) que alterna entre os produtos a cada 5 segundos
- Vitrine com seleção de tamanho (PP a XGG) em cada card
- Botão "Pedir pelo WhatsApp" com mensagem pronta, incluindo modelo e tamanho
- Alternância entre frente e costas no card do São Jorge
- Ampliação das imagens (lightbox)
- Tema claro e escuro, lembrado entre as visitas
- Guia de tamanhos e política de trocas em janelas (modais)
- Layout responsivo para celular e computador
- Botão flutuante de WhatsApp e links para o Instagram

## Estrutura do projeto

```
/
├── index.html              # Página completa (HTML, CSS e JavaScript)
├── embutir_imagens.py      # Gera uma versão com imagens embutidas
├── README.md
└── assets/
    ├── logo.png
    ├── manto-divino.jpg
    ├── sao-jorge-frente.png
    └── sao-jorge-verso.jpg
```

> Os nomes dos arquivos em `assets` precisam ser **idênticos** aos usados no código, incluindo letras maiúsculas e minúsculas.

## Como rodar localmente

1. Baixe ou clone o repositório.
2. Abra o `index.html` no navegador.

Para testar no celular, use a versão publicada (veja abaixo). Abrir o HTML solto no aparelho não carrega a pasta `assets`.

## Publicar na internet (GitHub Pages)

1. Envie o projeto para um repositório no GitHub (`index.html` e a pasta `assets` na raiz).
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e clique em **Save**.
4. Após cerca de 2 minutos, o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Alternativas: Netlify Drop, Vercel.

## Versão em arquivo único (para enviar por WhatsApp ou Drive)

Quando for preciso um único arquivo que funcione no celular sem a pasta `assets`:

```
python embutir_imagens.py
```

O script cria o `index-celular.html`, com todas as imagens embutidas.

## Como personalizar

| O que mudar | Onde |
|---|---|
| Número do WhatsApp | Constante `WHATSAPP_NUMBER` no script e links `wa.me/...` no HTML |
| Preços | Classes `hero-price` e `card-price` |
| Medidas do guia de tamanhos | Tabela dentro de `id="modal-size"` |
| Política de trocas | Janela `id="modal-exchange"` |
| Instagram | Links para `instagram.com/unjui_rashs` |
| Cores e fontes | Variáveis no início do `<style>` (`:root`) |
| Produtos do destaque | Lista `heroData` no JavaScript |

> As medidas do guia de tamanhos são valores de exemplo. Substitua pelas medidas reais das peças antes de divulgar.

## Tecnologias

HTML5, CSS3 e JavaScript puro, sem frameworks nem dependências. As fontes (Montserrat e Inter) vêm do Google Fonts.

## Contato

- WhatsApp: (33) 98429-4352
- Instagram: [@unjui_rashs](https://www.instagram.com/unjui_rashs)
- Atendimento em Governador Valadares e região

## Licença

© Unjui Rash Guards. Todos os direitos reservados.
