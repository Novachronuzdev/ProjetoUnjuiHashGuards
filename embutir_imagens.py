"""
Gera o arquivo 'index-celular.html': uma cópia do index.html com TODAS as
imagens da pasta 'assets' embutidas dentro do próprio HTML (base64).
Esse arquivo único funciona no celular mesmo aberto direto do armazenamento,
do WhatsApp ou do Drive, sem precisar da pasta assets.

Como usar:
  1. Deixe este script, o index.html e a pasta assets na MESMA pasta.
  2. Rode:  python embutir_imagens.py
  3. Envie o arquivo index-celular.html para o celular.
"""
import base64, mimetypes, os, re, sys

pasta = os.path.dirname(os.path.abspath(__file__))
entrada = os.path.join(pasta, "index.html")
saida = os.path.join(pasta, "index-celular.html")
assets = os.path.join(pasta, "assets")

if not os.path.isdir(assets):
    sys.exit("Pasta 'assets' não encontrada ao lado do index.html.")

# Mapa: nome sem extensão (minúsculo) -> caminho real do arquivo
arquivos = {}
for nome in os.listdir(assets):
    base, ext = os.path.splitext(nome)
    if ext.lower() in (".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"):
        arquivos[base.lower()] = os.path.join(assets, nome)

html = open(entrada, encoding="utf-8").read()
usados, faltando = set(), set()

def trocar(m):
    base = m.group(1)
    caminho = arquivos.get(base.lower())
    if not caminho:
        faltando.add(m.group(0))
        return m.group(0)
    mime = mimetypes.guess_type(caminho)[0] or "image/jpeg"
    dados = base64.b64encode(open(caminho, "rb").read()).decode("ascii")
    usados.add(os.path.basename(caminho))
    return f"data:{mime};base64,{dados}"

# Troca qualquer 'assets/nome.ext' (no HTML e no JavaScript)
html = re.sub(r"assets/([A-Za-z0-9_\-]+)\.(?:png|jpe?g|webp|gif|svg)", trocar, html, flags=re.I)

open(saida, "w", encoding="utf-8").write(html)
print("Imagens embutidas:", ", ".join(sorted(usados)) or "nenhuma")
if faltando:
    print("NÃO encontradas na pasta assets:", ", ".join(sorted(faltando)))
print(f"Pronto: {saida} ({os.path.getsize(saida)/1024/1024:.1f} MB)")
