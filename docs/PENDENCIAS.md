# Pendências que dependem do restaurante

O site foi construído **sem inventar informações**. Os itens abaixo precisam
ser confirmados pela equipe do Montanhas de Minas; até lá, o site oculta o
recurso ou usa uma alternativa segura (normalmente o WhatsApp).

## Essencial antes de publicar

- [ ] **Fotografias reais** — hoje o site usa ilustrações no lugar das fotos.
      Veja os nomes dos arquivos em `src/assets/fotos/README.md`.
- [ ] **Domínio oficial** — `url` em `src/config/site.ts`.
- [ ] **Cardápio oficial** (PDF, página ou link) — `menuUrl` em
      `src/config/site.ts`. Sem ele, "Consultar cardápio completo" abre o WhatsApp.
- [ ] **Conferir os horários** em `src/content/hours.ts` (quinta e sexta 17h–0h,
      sábado 16h–0h, domingo 8h–18h, segunda a quarta fechado).

## Recomendado

- [ ] **Link do perfil no Google** (avaliações) — `googleReviewsUrl` em
      `src/config/site.ts`. Hoje o botão abre a busca do restaurante no Google Maps.
- [ ] **Nota no Google** — `googleRating` (hoje 4,6). Atualizar quando mudar.
- [ ] **Depoimentos reais** — somente com texto original, nome público permitido
      e link da fonte, em `src/content/reviews.ts`.
- [ ] **Itens do cardápio** — nomes, descrições e preços exatamente como no
      cardápio oficial, no campo `items` de cada categoria em `src/content/menu.ts`.
- [ ] **Self-service** — se existir, mudar `confirmed: false` para `true` na
      categoria "Comida mineira e brasileira" (`src/content/menu.ts`).
- [ ] **Área infantil** e **música ao vivo** — confirmar e, com fotos
      autorizadas, ativar em `src/content/photos.ts`.
- [ ] **Programação de eventos** — cadastrar em `src/content/events.ts` (nome,
      data, horário, atração, imagem e informações de reserva).
- [ ] **Redes sociais oficiais** — `social` em `src/config/site.ts`.
- [ ] **Endereço completo** (rua/estrada e referência) — se houver, pode ser
      acrescentado em `src/config/site.ts`. Nunca usar coordenadas aproximadas.
- [ ] **Logotipo oficial** — substituir `src/components/Logo.astro` e rodar
      `node scripts/generate-brand-assets.mjs`.
