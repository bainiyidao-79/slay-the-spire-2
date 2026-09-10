import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Header() {
  // 扬哥 2026-09-11 定标：顶栏只留 游戏全名(左) + Steam 商店按钮(右)。
  // 旧横向导航(404 残留)、Home 按钮、类型徽章全部移除；Steam 按钮不叫 Play Now（避免"点了就能玩"的误导）。
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-1.5">
        <Link href="/" className="flex min-w-0 items-center">
          <span className="truncate text-base font-bold leading-tight tracking-tight text-foreground sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>
        {siteConfig.platformUrl && (
          <a
            href={siteConfig.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            View on Steam ↗
          </a>
        )}
      </div>
    </header>
  );
}
