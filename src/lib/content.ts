import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

// game-database-wiki：树状内容层（content/en/<栏目>/<对象>/<子对象>.mdx，支持 2-4 级）
export type ArticleMeta = {
  path: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  keywords: string[];
  readTime?: string;
};

export type Article = {
  path: string;
  slug: string;
  meta: ArticleMeta;
  content: string;
};

export type SubDir = { name: string; path: string; count: number };

export type DirNode = {
  path: string;
  name: string;
  subdirs: SubDir[];
  articles: ArticleMeta[];
  intro: string | null; // _index.mdx 正文（如有）
  hasCardTable: boolean; // 目录含 cards.json 时渲染卡牌表
};

const contentRoot = path.join(process.cwd(), "src", "content", "en");

function readMeta(file: string, relPath: string): ArticleMeta {
  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  const slug = relPath.split("/").pop() as string;
  return {
    path: relPath,
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: String(data.updated ?? data.date ?? ""),
    category: String(data.category ?? relPath.split("/")[0]),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readTime: String(data.readTime ?? ""),
  };
}

function isDir(p: string): boolean {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function countArticles(absDir: string): number {
  let n = 0;
  for (const e of fs.readdirSync(absDir, { withFileTypes: true })) {
    if (e.isFile() && e.name.endsWith(".mdx") && e.name !== "_index.mdx") n += 1;
    else if (e.isDirectory()) n += countArticles(path.join(absDir, e.name));
  }
  return n;
}

// 目录节点：子栏目 + 本层文章 + _index.mdx 简介 + 卡牌表开关
export function getDir(dirRel = ""): DirNode | null {
  const abs = path.join(contentRoot, dirRel);
  if (dirRel && !isDir(abs)) return null;
  const entries = fs.existsSync(abs)
    ? fs.readdirSync(abs, { withFileTypes: true })
    : [];
  const subdirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const p = dirRel ? `${dirRel}/${e.name}` : e.name;
      return {
        name: e.name,
        path: p,
        count: countArticles(path.join(abs, e.name)),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const articles = entries
    .filter(
      (e) => e.isFile() && e.name.endsWith(".mdx") && e.name !== "_index.mdx"
    )
    .map((e) =>
      readMeta(
        path.join(abs, e.name),
        dirRel ? `${dirRel}/${e.name.replace(/\.mdx$/, "")}` : e.name.replace(/\.mdx$/, "")
      )
    )
    .sort((a, b) => a.title.localeCompare(b.title));
  const idx = path.join(abs, "_index.mdx");
  const intro = fs.existsSync(idx)
    ? matter(fs.readFileSync(idx, "utf-8")).content
    : null;
  const hasCardTable = fs.existsSync(path.join(abs, "cards.json"));
  return {
    path: dirRel,
    name: dirRel.split("/").pop() || "",
    subdirs,
    articles,
    intro,
    hasCardTable,
  };
}

export function getArticleByPath(segments: string[]): Article | null {
  const rel = segments.filter(Boolean).join("/");
  if (!rel) return null;
  const file = path.join(contentRoot, `${rel}.mdx`);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const slug = segments[segments.length - 1];
  return { path: rel, slug, meta: readMeta(file, rel), content };
}

// 全站内容路径（目录页 + 文章页），供 generateStaticParams 与 sitemap
export function listAllContentPaths(): string[][] {
  const out: string[][] = [];
  const walk = (rel: string) => {
    const abs = path.join(contentRoot, rel);
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const p = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        out.push(p.split("/"));
        walk(p);
      } else if (e.isFile() && e.name.endsWith(".mdx") && e.name !== "_index.mdx") {
        out.push(p.replace(/\.mdx$/, "").split("/"));
      }
    }
  };
  if (fs.existsSync(contentRoot)) walk("");
  return out;
}

export type CardRow = {
  name: string;
  path?: string;
  tier?: string;
  cost?: string;
  type?: string;
  rarity?: string;
  color?: string;
};

export function getCardTable(
  dirRel: string
): { character: string; rows: CardRow[] } | null {
  const f = path.join(contentRoot, dirRel, "cards.json");
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf-8"));
}

const sectionLabels: Record<string, string> = {
  characters: "Characters",
  cards: "Cards Database",
  relics: "Relics",
  bosses: "Bosses",
  builds: "Builds",
  news: "News & Updates",
  guides: "Guides",
  "game-overview": "Game Overview",
};

export function getSectionLabel(section: string): string {
  return sectionLabels[section] ?? section;
}
