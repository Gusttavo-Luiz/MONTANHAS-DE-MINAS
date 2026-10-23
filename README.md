# Restaurante Montanhas de Minas — site oficial

Site do **Restaurante Montanhas de Minas**, na zona rural de Itaúna, MG
(povoado de Campos): culinária mineira e brasileira, ambiente familiar e
natureza ao redor.

- **Estático e rápido**: páginas pré-renderizadas pelo [Astro](https://astro.build),
  sem frameworks no navegador — apenas pequenos scripts para menu, galeria,
  mapa e horário.
- **Dados centralizados**: textos, contatos, horários, cardápio, fotos e
  eventos ficam em `src/config/` e `src/content/`.
- **Sem informação inventada**: nenhum prato, preço, depoimento, evento,
  endereço ou foto é apresentado como fato sem confirmação. O que falta está em
  [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

## Seções

Cabeçalho (transparente → sólido, menu compacto no celular) · Hero · Nossa
essência · Cardápio · Nosso ambiente (galeria com visualizador) · Avaliações ·
Música e momentos especiais · Horários (com indicador "aberto agora" no fuso de
Itaúna) · Localização com mapa sob demanda · Contato e WhatsApp · Rodapé ·
Página 404. No celular, uma barra fixa oferece "Como chegar" e "WhatsApp".

## Comandos

Node.js **22.12+**.

| Comando | Ação |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Desenvolvimento em `http://localhost:4321` (mostra os nomes dos arquivos de fotos esperados) |
| `npm run build` | Verifica tipos e gera o site em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm test` | Build + testes Playwright (desktop, tablet e celular) |

Para os testes: `npx playwright install chromium` (uma vez), ou aponte
`PW_CHROMIUM_PATH` para um Chromium já instalado.

## Onde editar o conteúdo

| Arquivo | Conteúdo |
| --- | --- |
| `src/config/site.ts` | Nome, contatos e WhatsApp, mensagem pré-preenchida, link do cardápio oficial, link das avaliações no Google, nota no Google, redes sociais, domínio |
| `src/content/hours.ts` | Horário de funcionamento e aviso sobre feriados |
| `src/content/menu.ts` | Categorias do cardápio — e, quando houver o cardápio oficial, os itens e preços |
| `src/content/photos.ts` | Fotos de destaque e da galeria |
| `src/content/reviews.ts` | Pontos destacados nas avaliações e depoimentos reais (com fonte) |
| `src/content/events.ts` | Música ao vivo e eventos confirmados |
| `src/assets/fotos/` | Arquivos das fotos oficiais ([lista de nomes](src/assets/fotos/README.md)) |
| `src/components/Logo.astro` | Marca tipográfica provisória |
| `src/styles/global.css` | Paleta, tipografia e estilos base |

### Integrações

- **WhatsApp**: `https://wa.me/5537998561626` com mensagem pré-preenchida.
- **Como chegar**: link de rota do Google Maps fornecido pelo restaurante.
- **Mapa**: incorporado do Google Maps somente quando o visitante clica em
  "Carregar mapa" (mais rápido e sem enviar dados ao Google antes disso).
- **Cardápio completo**: enquanto `menuUrl` estiver vazio, o botão abre o
  WhatsApp pedindo o cardápio. Para um PDF, salve-o em `public/` (ex.:
  `public/cardapio.pdf`) e use `menuUrl: '/cardapio.pdf'`.
- **Avaliações**: enquanto `googleReviewsUrl` estiver vazio, o botão abre a
  busca do restaurante no Google Maps, onde ficam as avaliações.

## Publicação

O build gera arquivos estáticos em `dist/`, publicáveis em qualquer hospedagem
estática (Netlify, Vercel, Cloudflare Pages, servidor próprio etc.).
Antes de ir ao ar, preencha `url` em `src/config/site.ts` com o domínio oficial
(gera URLs canônicas, Open Graph e sitemap).

**Demonstração no GitHub Pages**: cada atualização da `main` publica uma versão
de demonstração (não indexada) em
<https://gusttavo-luiz.github.io/MONTANHAS-DE-MINAS/>
(`.github/workflows/pages.yml`). Configuração única no GitHub:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Imagens da marca

Favicons e `public/og-image.jpg` são gerados por
`node scripts/generate-brand-assets.mjs` (usa o Chromium do Playwright).
Rode novamente se a marca mudar.
