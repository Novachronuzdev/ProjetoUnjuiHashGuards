(function () {
    var saved = null;
    try { saved = localStorage.getItem("unjui_theme"); } catch (e) { }
    var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", saved || (dark ? "dark" : "light"));
})();

/* Se uma imagem não carregar (ex.: extensão ou maiúscula/minúscula diferente),
       tenta outras extensões. Se nenhuma funcionar, mostra na própria tela qual
       arquivo não foi encontrado (ajuda a diagnosticar no celular). */
const EXTS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];

function mostrarErroImagem(img, caminho) {
    const pai = img.parentElement;
    if (img.classList.contains("brand-logo-img")) { img.style.visibility = "hidden"; return; }
    if (!pai || pai.querySelector(".img-erro-msg")) return;
    const aviso = document.createElement("div");
    aviso.className = "img-erro-msg";
    aviso.textContent = "Imagem não encontrada: " + caminho;
    pai.appendChild(aviso);
    img.style.visibility = "hidden";
}

function limparErroImagem(img) {
    const pai = img.parentElement;
    const aviso = pai && pai.querySelector(".img-erro-msg");
    if (aviso) aviso.remove();
    img.style.visibility = "";
}

document.addEventListener("load", function (e) {
    if (e.target && e.target.tagName === "IMG" && e.target.id !== "lightbox-img") limparErroImagem(e.target);
}, true);

document.addEventListener("error", function (e) {
    const img = e.target;
    if (!img || img.tagName !== "IMG") return;
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:")) return;
    const m = src.match(/^(.*)\.([A-Za-z0-9]+)$/);
    if (!m) return;
    if (img.dataset.base !== m[1]) { img.dataset.base = m[1]; img.dataset.i = "0"; img.dataset.orig = src; }
    let i = parseInt(img.dataset.i, 10);
    while (i < EXTS.length && EXTS[i] === m[2]) i++;
    if (i >= EXTS.length) {
        if (img.id !== "lightbox-img") mostrarErroImagem(img, img.dataset.orig || src);
        return;
    }
    img.dataset.i = String(i + 1);
    img.src = m[1] + "." + EXTS[i];
}, true);

/* WhatsApp */
const WHATSAPP_NUMBER = "5533984294352";
let tamanhoAtivoHero = "M";

function montarLinkWpp(nome, tamanho) {
    const msg = `Olá! Quero pedir o Rash Guard ${nome} no tamanho ${tamanho}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function selecionarTamanhoCard(idCard, nome, tamanho, btn) {
    document.getElementById("chips-" + idCard).querySelectorAll(".card-chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("btn-order-" + idCard).href = montarLinkWpp(nome, tamanho);
    mostrarToast(`Tamanho ${tamanho} selecionado para ${nome}`);
}

function trocarImagemCard(imgId, imgSrc, btn) {
    const img = document.getElementById(imgId);
    img.dataset.base = "";
    limparErroImagem(img);
    img.src = imgSrc;
    btn.parentElement.querySelectorAll(".view-tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

/* Filtros da vitrine */
function filtrarProdutos(categoria, btn) {
    document.querySelectorAll(".filter-btn").forEach(botao => {
        botao.classList.toggle("active", botao === btn);
        botao.setAttribute("aria-pressed", String(botao === btn));
    });

    document.querySelectorAll(".grid-products .card").forEach(card => {
        const exibir = categoria === "todos" || card.dataset.category === categoria;
        card.hidden = !exibir;
    });
}

/* Destaque (hero) alternando a cada 5 segundos */
const heroData = [
    {
        tag: "Vitrine Oficial Unjui • Jiu-Jitsu No-Gi", title: "MANTO DIVINO",
        punchline: "A armadura sagrada da sua evolução no tatame.",
        desc: "Sublimação total em tecido de alta compressão elástica multidirecional (4-way stretch). Arte sacra em altíssima definição, costuras planas flatlock de 6 fios e blindagem contra queimaduras e atrito no tatame.",
        img: "assets/manto-divino.jpg", badge: "Destaque Oficial", badgeColor: "var(--gold)"
    },
    {
        tag: "Edição Especial • Jiu-Jitsu No-Gi", title: "SÃO JORGE",
        punchline: "O Santo Guerreiro blindando seus treinos.",
        desc: "Inspirada no Santo Guerreiro. Brasão papal frontal com as chaves cruzadas e estampa dorsal de São Jorge derrotando o dragão. Blindagem, fé e compressão no tatame.",
        img: "assets/sao-jorge-frente.png", badge: "Edição São Jorge", badgeColor: "var(--red)"
    }
];
let currentHeroIndex = 0;

function selecionarTamanhoHero(tamanho, mostrarMensagem = true) {
    tamanhoAtivoHero = tamanho;
    document.getElementById("hero-chips").querySelectorAll(".chip-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent.trim() === tamanho);
    });
    const nome = heroData[currentHeroIndex].title;
    document.getElementById("hero-wpp-btn").href = montarLinkWpp(nome, tamanho);
    if (mostrarMensagem) mostrarToast(`Tamanho ${tamanho} selecionado para o ${nome}`);
}

function rotacionarHero() {
    const texto = document.getElementById("hero-text-content");
    const img = document.getElementById("hero-img-element");
    const badge = document.getElementById("hero-badge");
    texto.style.opacity = 0; img.style.opacity = 0; badge.style.opacity = 0;

    setTimeout(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroData.length;
        const d = heroData[currentHeroIndex];
        document.getElementById("hero-tag").textContent = d.tag;
        document.getElementById("hero-title").textContent = d.title;
        const p = document.getElementById("hero-punchline");
        p.textContent = d.punchline; p.style.borderColor = d.badgeColor;
        document.getElementById("hero-desc").textContent = d.desc;
        img.dataset.base = "";
        limparErroImagem(img);
        img.src = d.img;
        img.alt = "Rash Guard " + d.title;
        badge.textContent = d.badge; badge.style.borderColor = d.badgeColor; badge.style.color = d.badgeColor;
        selecionarTamanhoHero(tamanhoAtivoHero, false);
        texto.style.opacity = 1; img.style.opacity = 1; badge.style.opacity = 1;
    }, 500);
}
setInterval(rotacionarHero, 5000);

/* Lightbox */
function abrirLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").classList.add("active");
    document.body.style.overflow = "hidden";
}
function fecharLightbox(event, force = false) {
    if (force || event.target.id === "lightbox") {
        document.getElementById("lightbox").classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* Tema, menu, modais e aviso */
function alternarTema() {
    const novo = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", novo);
    try { localStorage.setItem("unjui_theme", novo); } catch (e) { }
    mostrarToast("Tema alterado para " + (novo === "dark" ? "escuro" : "claro"));
}

function toggleMenu(abrir) {
    const burger = document.getElementById("burger-btn");
    const aberto = abrir !== undefined ? abrir : burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(aberto));
    document.getElementById("mobile-menu").classList.toggle("active", aberto);
    document.getElementById("mobile-overlay").classList.toggle("active", aberto);
}

function abrirModal(id) { document.getElementById(id).classList.add("open"); }
function fecharModal(id) { document.getElementById(id).classList.remove("open"); }
function fecharModalPorClique(e, id) { if (e.target.id === id) fecharModal(id); }

let toastTimer;
function mostrarToast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("visible"), 2500);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharModal("modal-size");
        fecharModal("modal-exchange");
        fecharLightbox(e, true);
        toggleMenu(false);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
});