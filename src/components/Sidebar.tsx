"use client";

import Link from "next/link";
import { ChevronDown, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig, type NavGroup } from "@/config/site";
import { AdSlot } from "@/components/AdSlot";

function NavItem({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`flex min-h-8 items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
        isActive
          ? "font-medium text-foreground bg-muted"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </Link>
  );
}

function NavGroup({ group }: { group: NavGroup }) {
  // 折叠目录树（扬哥 2026-09-11：超长侧栏按组收起）——原生 details，无 JS 状态，零崩溃风险
  const pathname = usePathname();
  const containsActive = group.children.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );
  return (
    <details className="group/nav mb-3" open={containsActive}>
      <summary className="mb-1 flex cursor-pointer select-none list-none items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 transition-colors hover:bg-muted/40 hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
        {group.title}
        <ChevronDown className="size-3 shrink-0 transition-transform group-open/nav:rotate-180" />
      </summary>
      <div className="space-y-0.5 pt-0.5">
        {group.children.map((item) => (
          <NavItem key={item.href} label={item.label} href={item.href} />
        ))}
      </div>
    </details>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background/50 lg:block">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <div className="mb-4 text-sm font-semibold leading-snug text-foreground">
          {siteConfig.name}
        </div>
        {siteConfig.nav.map((group) => (
          <NavGroup key={group.title} group={group} />
        ))}
        {/* 返回首页通栏按钮：浏览完整目录树后随时可一键回首页 */}
        <div className="mt-6 border-t border-border/60 pt-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-muted/40"
          >
            <Home className="size-4" />
            Back to Home
          </Link>
        </div>
        {/* 侧边栏底部广告位（菜单栏下方；ads.sidebar 留空则不渲染） */}
        <AdSlot
          code={siteConfig.ads?.sidebar}
          label="Sidebar advertisement"
          className="mt-6"
        />
      </div>
    </aside>
  );
}
