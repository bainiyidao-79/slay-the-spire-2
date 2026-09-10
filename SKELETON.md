# SKELETON: youtube-video-wiki

> 归档日期：2026-08-28
> 来源：拆解自 vvultimatum.net（单游戏 Roblox 攻略站）。
> 定位：**带 YouTube 视频 + 侧边栏目录树 + 图文混排**的游戏 Wiki 骨架。

## ⭐ 一句话定位
这是一个**内容+目录双栏**游戏 Wiki 骨架：首页/内页都有**侧边栏目录树**，首页可嵌入 **YouTube 视频**提升停留；内页支持**图文混排**（文字+图片），适合需要地图、路线、图解的攻略。

## 结构特征（索引必填）

| 特征维度 | 识别结果 |
|---------|---------|
| **媒体能力** | YouTube 视频嵌入 + 图文混排（MDX，支持内嵌图片） |
| **页面结构** | 主题式（多栏目）+ 双栏布局（内容区 + 侧边栏目录树） |
| **语言** | 单语言（英文为主；如需多语言需另选骨架） |
| **功能模块** | Hero 视频区 + 侧边栏目录树 + 面包屑 + 文章正文 + 相关推荐 + FAQ（可选） |
| **适合游戏类型** | Roblox/单游戏攻略站；多栏目（Race/Boss/Build/Map/Codes）中大型游戏；需要视频留人+图文攻略的游戏 |

## ⭐ 核心特色
1. **YouTube 视频嵌入**：首页/文章页可嵌入 YouTube 视频，用于提升用户停留时长、降低跳出率。
2. **侧边栏目录树**：内容区+目录双栏，用户可快速跳转到任意攻略章节，提升导航效率。
3. **图文混排**：MDX 正文支持插入图片，适合地图/路线图/图解类攻略。
4. **按需增减栏目**：骨架提供参考栏目，**实际建站必须按素材数量增减**，不做死链接。

## ⭐ 广告位（骨架预制，配置驱动）

两个预制广告位，全部在 `siteConfig.ads` 配置驱动，**填入广告代码（HTML/JS）即生效，留空则完全不渲染不占位**（上线无广告时页面干净）：

> ⚠️ **广告排布规范（2026-08-31 扬哥定调）**：侧边栏 Native Banner 在 Adsterra 后台 GET CODE 弹窗内设 **Widget layout = 1:4**（1 列 4 行竖排，勿信默认值 4:1/1:2）；底部 banner 用 Banner 728x90 格式。改布局是平台侧服务端配置，即时生效无需重新部署。详见 game-ad-monetize skill。

| 广告位 | 配置字段 | 位置 | 出现范围 |
|-------|---------|------|---------|
| 侧边栏广告 | `ads.sidebar` | 侧边栏最底部（菜单树 + Back to Home 之下） | 所有页 |
| 底部 banner 广告 | `ads.footerBanner` | 页脚上方、内容区结尾之下（内容区宽度） | **每页都有**（Footer 在全局布局） |

```ts
// src/config/site.ts
ads: {
  sidebar: '<div class="ad-box">...广告代码...</div>',
  footerBanner: '<script src="..."></script>',  // AdSense/Adsterra 等直接贴代码
},
```

- 广告代码通过 `AdSlot` 组件（`src/components/AdSlot.tsx`）以 `dangerouslySetInnerHTML` 渲染，支持 HTML/JS 片段
- 接入 AdSense/Adsterra 等联盟时，直接把代码段贴进对应字段即可，无需改任何组件

### ⚠️ 两种渲染模式的区别（重要）

| 广告位 | 组件 | 渲染方式 | 适用场景 |
|-------|------|---------|---------|
| 侧边栏 | `AdSlot` | dangerouslySetInnerHTML 直接注入 | 自管理型广告脚本（如 Native Banner：脚本加载后持续管理自己的容器，跨页持续显示） |
| 底部 banner | `AdFrame` | **iframe + document.write，每次路由变化重建** | document.write 型广告脚本（如 Adsterra 固定 Banner：只能在初始 HTML 解析期执行） |

> ✅ **AdFrame 已含滚动条修复（2026-08-31）**：srcdoc 包裹完整 HTML 骨架（margin:0 + overflow:hidden）+ scrolling=no——广告精确贴合容器，不再出双向滚动条（旧版默认 body margin 8px 导致溢出）。

**原因**：dangerouslySetInnerHTML 注入的 `<script>` 在 Next.js 客户端导航（Link 跳转、back 返回）时**不会重新执行**——这是 SPA 的通用限制。AdFrame 每次路由变化（usePathname）重建 iframe 并把广告代码写入其文档，iframe 文档解析期写入的脚本一定会执行，保证每个页面（含 SPA 跳转）都重新加载广告。

**若底部 banner 换用其他尺寸的 Banner 单元**（如 300×250），同步修改 `Footer.tsx` 中 `AdFrame` 的 `width/height` props。

## ⭐ 铁律：按实际内容增减栏目/按钮
- 骨架是**参考模板**，不是成品脚手架。
- **有多少素材做多少页面**；栏目/按钮必须与内容一一对应。
- 若只有 3 个栏目有内容，就只保留 3 个栏目按钮；若需要 8 个栏目，就新增到 8 个。
- **严禁空链接/死链接**。

## 三层分离
- **框架层**：Next.js + Tailwind + MDX（路由/布局/SEO/导航自动生成）
- **配置层**：`src/config/site.ts`（游戏名/主题色/官方链接/导航/YouTube 视频）
- **内容层**：`src/content/en/**/*.mdx`（换游戏只替换内容 + 改配置）

## YouTube 视频使用说明（Workflow 调用时）
- 当 Workflow 选择本骨架建站时，需要新增一步：**为该游戏找 YouTube 视频**。
- 优先级：**游戏官方 YouTube 频道**（播放量高/较新） > 该游戏播放量最高的热门视频。
- 视频嵌入格式：
  - `https://www.youtube.com/watch?v={VIDEO_ID}`
  - iframe：`https://www.youtube.com/embed/{VIDEO_ID}`
  - 缩略图：`https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`
- 写入配置：`src/config/site.ts` 的 `heroVideo.youtubeId`。

## 图片使用说明
- 内页支持图片（MDX 中直接写 Markdown 图片语法）。
- 若素材来源网站的攻略含地图/路线图/图解，**必须保留图片**（纯文字无法表达）。
- 注意：
  - 优先使用无水印/无 logo 的图片；
  - 若图片带水印，需在素材收集阶段标记并评估是否可用；
  - 图片路径统一放 `public/images/`。

## 本地验证
```bash
npm install
npm run verify
npm run build
```

## 已知适配点（换游戏时必改）
1. `src/config/site.ts`：游戏名、官方链接、YouTube 视频、导航栏目（按实际内容增减）
2. `src/content/en/**/*.mdx`：替换为真实攻略内容
3. `src/components/Sidebar.tsx`：目录树内容由 content 自动生成（无需手动维护）

## 文件/路径
- 骨架位置：`/home/admin/Documents/skeletons/youtube-video-wiki/`
- 骨架索引：`/home/admin/Documents/skeletons/skeleton-index.md`
- 游戏参数：`/home/admin/Documents/game-sites/<游戏文件夹>/setting.md`

## SEO 生成器（2026-08-30 新增）
- `src/app/sitemap.ts`：构建时按 content 目录自动生成 `/sitemap.xml`（首页 priority 1 / 栏目页 0.8 / 文章页 0.7，文章页 lastModified 取 frontmatter.updated）
- `src/app/robots.txt 生成`：`src/app/robots.ts` 生成 `/robots.txt`，自动带 `Sitemap: {siteUrl}/sitemap.xml`
- 域名来源：`NEXT_PUBLIC_SITE_URL` 环境变量（Vercel 项目里必须配置，否则 sitemap 会落到 localhost）
- 三个已上线站（big-walk-v2 / phantom-blade-zero-v2 / how-to-fish-v2）均已同步接入并验证

## GA 统计组件（2026-08-30 新增，game-seo-onboard 校验发现）
- `src/components/Analytics.tsx`：读取 `NEXT_PUBLIC_GA_ID` 环境变量，未配置时返回 null（不渲染任何脚本）；配置时加载 gtag.js 并初始化（anonymize_ip: true）
- 已在 `src/app/layout.tsx` 接线（body 末尾 `<Analytics />`）
- 用法：Vercel 配 `NEXT_PUBLIC_GA_ID = G-XXXX` → 空提交触发 redeploy（NEXT_PUBLIC_* 构建时内联）→ 线上 `grep -oE 'G-[A-Z0-9]{9}'` 验证
- 背景：旧 basic-wiki 骨架自带 Analytics，新骨架此前缺失导致 GA env 配了也不生效（PBZ 的 G-0CFEQ6NH0F 即此情况，待补 env 后 redeploy）
