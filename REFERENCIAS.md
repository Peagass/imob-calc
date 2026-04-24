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

## Checklist ao adicionar novo conteúdo

- [ ] Verificar se os valores numéricos são da legislação/tabela vigente no ano atual
- [ ] Nunca escrever "2024" em títulos SEO, descrições ou textos de UI sem confirmar que é o ano correto
- [ ] Para artigos de notícias (`content/noticias/`): usar dados com fonte e data explícita
- [ ] Para FAQs (`lib/faq.ts`): conferir se os valores citados ainda são válidos
- [ ] Quando a fonte for uma API já integrada (BCB), confiar nos dados em tempo real — não hardcodar

---

## APIs integradas (dados em tempo real)

| Dado | API | Endpoint |
|---|---|---|
| SELIC, CDI | Banco Central do Brasil | `api.bcb.gov.br` |
| IGP-M, IPCA, INPC, INCC | Banco Central do Brasil | `api.bcb.gov.br` |
| TR | Banco Central do Brasil | `api.bcb.gov.br` |

Esses índices **não devem ser hardcodados** — sempre consumir via API para garantir atualidade.
