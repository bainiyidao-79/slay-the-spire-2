import { notFound } from "next/navigation";
import { marked } from "marked";

import { ArticleView } from "@/components/ArticleView";
import { CardTable } from "@/components/CardTable";
import {
  getArticleByPath,
  getCardTable,
  getDir,
  getSectionLabel,
  listAllContentPaths,
} from "@/lib/content";

// 树状内容页：/cards/<角色>/<卡> 等 2-4 级路由（栏目索引 + 文章详情一体）
export const dynamicParams = false;

export default async function TreePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path: segments } = await params;
  const section = segments[0];
  const sectionLabel = getSectionLabel(section);

  // 1) 文章页
  const article = getArticleByPath(segments);
  if (article) {
    const html = marked.parse(article.content, { async: false });
    const parentDir = getDir(segments.slice(0, -1).join("/"));
    const related = (parentDir?.articles ?? [])
      .filter((a) => a.path !== article.path)
      .slice(0, 8)
      .map((a) => ({ title: a.title, href: `/${a.path}` }));
    return (
      <ArticleView
        title={article.meta.title}
        description={article.meta.description}
        section={section}
        sectionLabel={sectionLabel}
        content={html}
        related={related}
      />
    );
  }

  // 2) 栏目/子栏目索引页
  const dir = getDir(segments.join("/"));
  if (dir) {
    const introHtml = dir.intro
      ? marked.parse(dir.intro, { async: false })
      : null;
    const cardTable = getCardTable(dir.path);
    return (
      <div className="flex flex-1">
        <main className="flex-1 p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-foreground">
            {sectionLabel}
            {dir.path.includes("/") ? ` — ${dir.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}` : ""}
          </h1>

          {introHtml ? (
            <div
              className="prose prose-sm mt-4 max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          ) : null}

          {cardTable ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-foreground">
                {cardTable.character} Cards
              </h2>
              <div className="mt-3">
                <CardTable rows={cardTable.rows} />
              </div>
            </div>
          ) : null}

          {dir.subdirs.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Sections
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dir.subdirs.map((s) => (
                  <a
                    key={s.path}
                    href={`/${s.path}`}
                    className="rounded-lg border p-4 transition hover:bg-muted/50"
                  >
                    <div className="text-sm font-medium capitalize text-foreground">
                      {s.name.replace(/-/g, " ")}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {s.count} pages
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {dir.articles.length > 0 ? (
            <div className="mt-6 space-y-3">
              {dir.articles.map((a) => (
                <a
                  key={a.path}
                  href={`/${a.path}`}
                  className="block rounded-lg border p-4 transition hover:bg-muted/50"
                >
                  <div className="text-sm font-medium text-foreground">
                    {a.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {a.description}
                  </div>
                </a>
              ))}
            </div>
          ) : null}
        </main>
      </div>
    );
  }

  notFound();
}

export function generateStaticParams() {
  return listAllContentPaths().map((segments) => ({ path: segments }));
}
