# Política de Referências e Dados do Site

## Regra geral

**Todo dado numérico, tabela, limite ou taxa deve sempre usar a referência mais recente disponível.**
Antes de adicionar ou atualizar qualquer valor, verifique qual é o mês e ano atual e busque a fonte vigente.

---

## Dados que exigem atualização periódica

### Tabela IRPF — carnê-leão (mensal)
- **Fonte oficial:** [Receita Federal](https://www.gov.br/receitafederal/pt-br)
- **Atualização:** anual (geralmente em janeiro)
- **Arquivo:** `lib/calculators.ts` — constante `FAIXAS_IRPF_XXXX`
- **Atenção:** verificar se há redutores ou isenções adicionais vigentes (ex: Lei 15.270/2025 — isenção até R$ 5.000/mês em 2026)

### MCMV — faixas de renda e teto de imóveis
- **Fonte oficial:** [Ministério das Cidades](https://www.gov.br/cidades/pt-br) / Caixa Econômica Federal
- **Atualização:** pode mudar por portaria a qualquer momento
- **Arquivo:** `lib/calculators.ts` — constantes `MCMV_RENDA_F1/F2/F3` e `MCMV_LIMITE_IMOVEL`

### SELIC / CDI
- **Fonte:** API do Banco Central do Brasil — já consumida automaticamente em `app/api/indices/`
- Não precisa de atualização manual — vem em tempo real

### IGP-M / IPCA / INPC / TR
- **Fonte:** API do Banco Central do Brasil — já consumida automaticamente
- Não precisa de atualização manual

### CUB / SINAPI — custos de construção e reforma
- **Fonte:** [CBIC](https://www.cbicdados.com.br/menu/custo-de-construcao) / [CEF SINAPI](https://www.caixa.gov.br/poder-publico/apoio-poder-publico/sinapi/Paginas/default.aspx)
- **Atualização:** mensal
- **Arquivo:** `lib/calculators.ts` — constante `REFORMA_M2`
- **Frequência sugerida:** revisar a cada 6 meses ou quando o usuário reportar valores desatualizados

### Teto SFH
- **Fonte:** Resolução do Banco Central / Caixa Econômica Federal
- **Arquivo:** `app/fgts/page.tsx`
- Verificar no site da Caixa antes de atualizar

### Limites de isenção de ganho de capital (imóvel único)
- **Fonte:** Receita Federal — atualmente R$ 440.000 para imóvel único
- **Arquivo:** `lib/calculators.ts`

---

## Ferramentas e serviços externos sugeridos ao usuário

Ao recomendar qualquer ferramenta, plataforma ou serviço externo (para tráfego, SEO, analytics, marketing, desenvolvimento, etc.):

- **Confirme que o serviço ainda existe e está ativo.** Serviços encerrados não devem ser recomendados (ex: Yahoo Respostas, Google Podcasts, Heroku free tier, Parse).
- Prefira ferramentas com adoção atual consolidada e que estejam sendo ativamente desenvolvidas.
- Se houver incerteza sobre o status atual de um serviço, mencione isso explicitamente e sugira que o usuário verifique antes de investir tempo.
- O knowledge cutoff do modelo pode estar defasado — trate sugestões como ponto de partida, não como verdade absoluta.

---

## Checklist ao adicionar novo conteúdo

### Dados e legislação
- [ ] Verificar se os valores numéricos são da legislação/tabela vigente no ano atual
- [ ] Nunca escrever o ano corrente sem confirmar que é o ano correto
- [ ] Para artigos de notícias (`content/noticias/`): usar dados com fonte e data explícita
- [ ] Para FAQs (`lib/faq.ts`): conferir se os valores citados ainda são válidos
- [ ] Quando a fonte for uma API já integrada (BCB), confiar nos dados em tempo real — não hardcodar

### AEO/GEO — obrigatório em cada nova peça de conteúdo

**Notícia nova (`content/noticias/`):**
- [ ] Frontmatter completo: `title`, `description`, `date`, `category`, `tags`, `fonte`, `readingTime`, `mentions`
- [ ] `<Summary>` com fatos-chave no início do corpo (antes do primeiro parágrafo)
- [ ] Pelo menos 2 links internos para calculadoras relacionadas
- [ ] `llms.txt` atualizado com a nova URL na seção "Artigos e Análises"

**Guia novo (`content/blog/`):**
- [ ] Frontmatter completo: inclui `calculadora` e `calculadoraLabel`
- [ ] Links para a calculadora principal em pelo menos 2 pontos do corpo
- [ ] `llms.txt` atualizado se for guia de alta relevância (financiamento, impostos, aluguel)

**Calculadora nova (`app/[rota]/`):**
- [ ] `layout.tsx` com `HowToSchema` (4–5 passos "como calcular X")
- [ ] `page.tsx` com seção `<section>` de `<h2>` explicativos antes de `<FaqSection>`
- [ ] `lib/faq.ts` com 5 perguntas, incluindo "O que é [termo]?"
- [ ] `lib/related.ts` com entradas em `related` e `relatedGuides`
- [ ] `public/llms.txt` atualizado com a nova rota
- [ ] `app/sitemap.ts` — avaliar se entra em `highPriorityRoutes`

---

## APIs integradas (dados em tempo real)

| Dado | API | Endpoint |
|---|---|---|
| SELIC, CDI | Banco Central do Brasil | `api.bcb.gov.br` |
| IGP-M, IPCA, INPC, INCC | Banco Central do Brasil | `api.bcb.gov.br` |
| TR | Banco Central do Brasil | `api.bcb.gov.br` |

Esses índices **não devem ser hardcodados** — sempre consumir via API para garantir atualidade.
