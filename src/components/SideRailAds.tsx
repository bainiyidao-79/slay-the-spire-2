import { siteConfig } from "@/config/site";
import { AdFrame } from "@/components/AdFrame";

/**
 * 左右浮动竖幅广告位（扬哥 2026-09-11 定标，对齐同行站布局）：
 * - 160x600 竖屏条幅，左右两侧 sticky，全程可见（超长页用户滚动到哪广告都在）
 * - 仅大屏渲染（窄屏隐藏，不挤内容）
 * - ads.sideRail 留空 = 完全不渲染，用户零感知（无广告时不显示空框）
 */
export function SideRailAds() {
  const code = siteConfig.ads?.sideRail;
  if (!code) return null;
  return (
    <>
      <div className="pointer-events-auto fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
        <AdFrame code={code} width={160} height={600} label="Side rail advertisement (left)" />
      </div>
      <div className="pointer-events-auto fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
        <AdFrame code={code} width={160} height={600} label="Side rail advertisement (right)" />
      </div>
    </>
  );
}
