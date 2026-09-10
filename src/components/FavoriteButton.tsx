"use client";

import { useState } from "react";

/**
 * ★ 一键收藏按钮（扬哥 2026-09-11 定标：金色醒目，攻略页标题行右侧常驻）
 * 浏览器安全限制不允许 JS 直接写收藏夹，点击后引导 Ctrl+D（Mac: Cmd+D）。
 */
export function FavoriteButton({ mini = false }: { mini?: boolean }) {
  const [tipped, setTipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setTipped(true);
        setTimeout(() => setTipped(false), 2600);
      }}
      title="收藏本页"
      aria-label="收藏本页"
      className={`fav-btn${mini ? " mini" : ""}`}
    >
      {tipped ? "按 Ctrl + D 完成收藏 ✓" : "★ 收藏本站"}
    </button>
  );
}
