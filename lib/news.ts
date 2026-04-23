import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content/noticias");

export interface NewsMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  fonte?: string;
  readingTime: number;
}

export interface NewsPost extends NewsMeta {
  content: string;
}

export function getAllNews(): NewsMeta[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(NEWS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<NewsMeta, "slug">) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsBySlug(slug: string): NewsPost {
  const filePath = path.join(NEWS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...(data as Omit<NewsMeta, "slug">), content };
}
