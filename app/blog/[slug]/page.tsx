import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";
import { Clock, ArrowLeft, Calculator } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "CalculaImóvel", url: SITE_URL },
    publisher: { "@type": "Organization", name: "CalculaImóvel", url: SITE_URL },
    url: `${SITE_URL}/blog/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CalculaImóvel", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
      ],
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-600 transition-colors">CalculaImóvel</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-slate-600 transition-colors">Guias</Link>
        <span>›</span>
        <span className="text-slate-600 truncate">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-5">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-slate-400 pb-6 border-b border-slate-100">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min de leitura
          </span>
          {post.tags?.map((tag) => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-li:text-slate-600 prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-10 prose-h3:mt-6">
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {/* CTA calculadora */}
      {post.calculadora && (
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <Calculator className="w-8 h-8 text-blue-200 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Calcule agora mesmo</h2>
          <p className="text-blue-100 text-sm mb-5 max-w-sm mx-auto">
            Use a calculadora gratuita e descubra o valor exato para o seu caso.
          </p>
          <Link
            href={post.calculadora}
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
          >
            {post.calculadoraLabel ?? "Abrir calculadora →"}
          </Link>
        </div>
      )}

      {/* Voltar */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Ver todos os artigos
        </Link>
      </div>
    </div>
  );
}
