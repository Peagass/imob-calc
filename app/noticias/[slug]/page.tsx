import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import { SITE_URL } from "@/lib/seo";
import { Clock, ArrowLeft, ExternalLink } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/noticias/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/noticias/${slug}`,
      type: "article",
      publishedTime: post.date,
      locale: "pt_BR",
      images: [{ url: `${SITE_URL}/noticias/${slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/noticias/${slug}/opengraph-image`],
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

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  const newsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "pt-BR",
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/noticias/${slug}` },
        image: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 },
        author: { "@type": "Organization", name: "CalculaImóvel", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "CalculaImóvel",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg`, width: 512, height: 512 },
        },
        url: `${SITE_URL}/noticias/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CalculaImóvel", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Notícias", item: `${SITE_URL}/noticias` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/noticias/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-600 transition-colors">CalculaImóvel</Link>
        <span>›</span>
        <Link href="/noticias" className="hover:text-slate-600 transition-colors">Notícias</Link>
        <span>›</span>
        <span className="text-slate-600 truncate">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          {post.fonte && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <ExternalLink className="w-3 h-3" />
              Fonte: {post.fonte}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-5">{post.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pb-6 border-b border-slate-100">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min de leitura
          </span>
          {post.tags?.slice(0, 3).map((tag) => (
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

      {/* Voltar */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <Link href="/noticias" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Ver todas as notícias
        </Link>
      </div>
    </div>
  );
}
