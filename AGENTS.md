<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Estrutura do projeto

```
app/[rota]/
  layout.tsx     ← metadata + JsonLd + HowToSchema (server component)
  page.tsx       ← UI da calculadora (pode ser "use client")

content/noticias/  ← artigos MDX de notícias
content/blog/      ← guias MDX

components/
  HowToSchema.tsx  ← schema JSON-LD "como calcular X"
  Summary.tsx      ← bloco de resposta direta no topo de artigos
  FaqSection.tsx   ← FAQs expansíveis (primeiro item aberto por padrão)

lib/
  faq.ts           ← perguntas e respostas por rota
  related.ts       ← calculadoras e guias relacionados por rota
  news.ts          ← leitura dos MDX de notícias
  blog.ts          ← leitura dos MDX de blog

public/
  llms.txt         ← índice do site para crawlers de LLMs (atualizar manualmente)
```

---

# Padrão AEO/GEO — manter em todas as alterações

Estas regras garantem que o site seja citado por IAs (ChatGPT, Perplexity, Gemini). Siga sempre.

## Ao adicionar uma nova calculadora

1. **`layout.tsx`** — adicionar `HowToSchema` com 4–5 passos descrevendo "como calcular X":
   ```tsx
   import HowToSchema from "@/components/HowToSchema";
   // ...
   <HowToSchema
     name="Como calcular X"
     description="..."
     steps={[
       { name: "Passo curto", text: "Explicação em 1–2 frases com dados concretos." },
     ]}
   />
   ```

2. **`page.tsx`** — adicionar seção estática com `<h2>` **antes** de `<FaqSection>`:
   ```tsx
   <section className="mt-10 space-y-8">
     <div>
       <h2 className="text-xl font-bold text-slate-900 mb-3">O que é X?</h2>
       <p className="text-sm text-slate-600 leading-relaxed">
         Definição direta com dado concreto e fonte. Link para calculadora relacionada
         via <a href="/outra-calc" className="text-indigo-600 hover:underline">nome</a>.
       </p>
     </div>
     <div>
       <h2 className="text-xl font-bold text-slate-900 mb-3">Quando usar esta calculadora?</h2>
       <p className="text-sm text-slate-600 leading-relaxed">...</p>
     </div>
   </section>
   ```
   - Incluir pelo menos **1 dado numérico com fonte** (ex: "A Caixa pratica 11,49% a.a. em maio/2026")
   - Incluir pelo menos **1 link contextual** para calculadora relacionada

3. **`lib/faq.ts`** — adicionar 5 perguntas, incluindo obrigatoriamente:
   - `"O que é [termo principal]?"` — resposta em 2–3 frases
   - Pelo menos 1 pergunta com número concreto ("Qual o percentual mínimo de entrada?")

4. **`lib/related.ts`** — adicionar entradas em `related` e `relatedGuides`

5. **`public/llms.txt`** — adicionar linha na seção correta com URL e descrição de 1 linha

6. **`app/sitemap.ts`** — adicionar à `highPriorityRoutes` se for calculadora de alta intenção (financiamento, impostos, aluguel, investimento)

---

# Sempre prefira o que é mais recente

## Referências, dados e legislação

Ao escrever ou atualizar qualquer conteúdo — calculadoras, guias, FAQs, artigos de notícias, textos de UI — **use sempre a versão mais atual disponível**:

- Confirme o ano corrente antes de escrever qualquer data, faixa, limite ou taxa.
- Nunca assuma que um valor do seu treinamento ainda está vigente — legislation e políticas públicas mudam. Verifique a fonte oficial.
- Se não for possível verificar em tempo real, sinalize explicitamente que o valor pode estar desatualizado e indique onde o usuário pode confirmar.

## Ferramentas e serviços sugeridos

Ao recomendar qualquer ferramenta, plataforma, serviço ou recurso externo:

- **Verifique se o serviço ainda existe.** Exemplos de serviços que encerraram: Yahoo Respostas (encerrado 2021), Google Podcasts (encerrado 2024), Heroku free tier (encerrado 2022). Não os recomende.
- Prefira alternativas **ativas e com boa adoção atual**. Se houver dúvida sobre a existência ou status atual de um serviço, diga isso claramente ao invés de assumir que está no ar.
- Para ferramentas de desenvolvimento (bibliotecas, frameworks, CLIs), verifique se a versão que você conhece ainda é a atual ou se foi substituída por outra abordagem.
- O knowledge cutoff do modelo pode ser meses ou anos antes da data atual. Trate sugestões de ferramentas como pontos de partida para pesquisa, não como verdades absolutas.

## Resumo da regra

> **Dados: use a fonte oficial mais recente. Ferramentas: verifique se ainda existem antes de recomendar.**

---

# Como escrever um artigo de notícia (`content/noticias/`)

## Frontmatter obrigatório

```yaml
---
title: "Título com dado concreto e ano — ex: Selic a 14,50%: O Que Muda"
description: "2–3 frases. Deve responder à pergunta do título. Inclui dado principal e consequência."
date: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"   # opcional — preencher ao revisar conteúdo já publicado
category: "Financiamento | Mercado | Legislação | Construção | Investimento"
tags: ["tag1", "tag2", "tag3"]   # 4–7 tags, minúsculas, em português
fonte: "Nome da fonte principal"  # ex: "Banco Central do Brasil" ou "FipeZap / DataZap"
readingTime: 5                    # número inteiro, estimativa honesta em minutos
mentions: ["Entidade 1", "Entidade 2"]  # organizações citadas no artigo (para schema)
---
```

## Estrutura do corpo

```mdx
<Summary>
**Fato principal em negrito** — dado numérico com data. Segunda frase com consequência
direta. Terceira frase opcional com contexto ou comparação.
</Summary>

Parágrafo de abertura narrativo que explica o contexto. Primeira frase responde
ao título. Sem repetir literalmente o Summary.

## Título de seção com dado ou ação

Conteúdo com **dados em negrito**, fonte citada em prosa ("segundo o Banco Central..."),
tabelas quando houver comparação, e links internos para calculadoras relacionadas.

> **Use a [Calculadora de X](/rota)** para simular seu cenário específico.

![Alt text descritivo](https://images.unsplash.com/[id]?w=1200&q=80&auto=format&fit=crop)

## Próxima seção
...

---

Parágrafo de fechamento sem clickbait. Resume o que foi abordado e o que o leitor
deve fazer a seguir. Sem "fique ligado" ou "continue acompanhando".
```

## Regras de conteúdo

- **`<Summary>`** sempre no início, antes do primeiro parágrafo — 2–3 frases, fatos concretos
- **Dados com data explícita**: "em abril de 2026" — nunca "atualmente" ou "hoje"
- **Links para calculadoras** dentro do corpo em pontos naturais — pelo menos 2 por artigo
- **Imagens**: usar Unsplash com `?w=1200&q=80&auto=format&fit=crop`; alt text descritivo
- **Fonte**: citar no texto em prosa + no frontmatter `fonte:`
- **Categorias disponíveis**: `Financiamento`, `Mercado`, `Legislação`, `Construção`, `Investimento`
- **Nome do arquivo**: `[tema-principal]-[ano].mdx` — kebab-case, sem acentos, com ano no final

---

# Como escrever um guia de blog (`content/blog/`)

## Frontmatter obrigatório

```yaml
---
title: "Pergunta ou afirmação direta — ex: SAC ou PRICE: Qual Escolher?"
description: "1–2 frases. O que o leitor vai aprender. Menciona o benefício concreto."
date: "YYYY-MM-DD"
category: "Compra | Aluguel | Investimento | Impostos | Reforma | Condomínio"
tags: ["tag1", "tag2"]
calculadora: "/rota-da-calculadora"   # rota principal relacionada ao guia
calculadoraLabel: "Texto do botão →"  # ex: "Simular financiamento →"
readingTime: 6
---
```

## Estrutura do corpo

```mdx
Parágrafo de abertura que justifica a relevância do tema. Apresenta o problema
ou decisão que o leitor enfrenta. Sem rodeios — vai direto ao ponto.

## O que é [conceito principal]?

Definição direta em 2–3 frases. Sem enrolação acadêmica.

## Como funciona na prática

Exemplos numéricos concretos com valores realistas. Cálculos passo a passo
quando pertinente. Tabelas para comparações.

## Quando [X] compensa mais que [Y]?

Análise com cenários. Dados concretos. Links internos contextuais para
calculadoras relacionadas.

> **Calcule no seu caso com a [Calculadora de X](/rota).**

## Resumo / O que fazer agora

Bullet points com os takeaways principais. Ação concreta que o leitor pode
tomar imediatamente.
```

## Regras de conteúdo

- **Tom**: direto, prático, sem jargão desnecessário — o leitor quer números, não teoria
- **Exemplos**: sempre com valores realistas do mercado atual (citar ano)
- **Calculadora**: linkar para a calculadora principal pelo menos 2 vezes no corpo
- **Sem `<Summary>`**: guias de blog não usam esse componente (só notícias)
- **Comprimento**: 600–1.200 palavras. Guias longos demais perdem foco
- **Nome do arquivo**: `[o-que-o-leitor-busca].mdx` — pense na query de busca
