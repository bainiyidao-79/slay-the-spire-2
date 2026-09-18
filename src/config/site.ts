export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

/** 首页轮播页（固定 3 篇；少于 3 篇时轮播按实际条数渲染） */
export type CarouselSlide = {
  /** 轮播配图（放 public/images/，宽高比按 790:292 裁切） */
  image: string;
  title: string;
  href: string;
};

/** 右侧游戏信息卡的字段行（原站字段：制作公司/发行公司/发售日期/游戏平台/游戏类型） */
export type GameInfoField = { label: string; value: string };

/** 左视频列的 YouTube 条目（官方频道代表作优先；2–4 个） */
export type VideoItem = { youtubeId: string; title: string };

/**
 * 主题色 token 名（供组件以 var() 引用）。
 * ⚠️ 色值唯一来源 = src/app/globals.css 的 @theme 块，本文件不重复定义色值。
 * 每站正式配色由 g-art-design 从游戏官方素材提取后覆盖 globals.css 的三个主槽位。
 */
export const themeTokens = {
  primary: "--color-primary",
  accent: "--color-accent",
  auxiliary: "--color-auxiliary",
} as const;

export type SiteConfig = {
  /** 游戏名（全站唯一来源） */
  name: string;
  shortName: string;

  /** SEO 三件套 */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };

  /** Hero 大图区（无顶栏，Hero 直顶） */
  hero: {
    /** keyart 大图路径；同时用作内容页右栏 banner */
    image: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };

  /** 首页横向轮播：3 篇，5s 自动换页 */
  carousel: {
    autoPlayMs: number;
    slides: CarouselSlide[];
  };

  /** 右侧游戏信息卡 */
  gameInfo: {
    title: string;
    /** 封面图路径（125×166 比例） */
    cover: string;
    fields: GameInfoField[];
    /** Steam 入口按钮（文案统一 View on Steam ↗） */
    ctaLabel: string;
    ctaHref: string;
  };

  /** 左视频列 YouTube id 列表（2–4 个，数量由右攻略区高度反推） */
  videos: VideoItem[];

  /** 官方链接（页脚展示；建议至少 1 条，其余留空则不渲染） */
  officialLinks: NavLink[];

  /** 全站攻略导航分组（首页攻略区 / 内容页右栏导航树共用；每站按真实内容增减） */
  nav: NavGroup[];

  /** 栏目简介（栏目页 L2 顶部一段话，key=section 目录名；缺省回退到「N guides…」） */
  sectionIntros?: Record<string, string>;

  /** 栏目兑底图池：内容页缺图时按栏目取图，避免与右栏 keyart 同图同屏（扬哥 2026-09-16） */
  sectionFallbackImages?: Record<string, string>;

  /** 页脚 */
  footer: {
    copyright: string;
    contactLabel: string;
    /** 联系方式（邮箱/表单链接文本）；不填则页脚不显示联系位 */
    contact?: string;
  };

  /** 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不占位 */
  ads?: {
    /** 首页攻略区顶部 banner（内容区宽度） */
    contentBanner?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
    /** 正文中横幅广告位（728×90）：位置在第一屏之后，长文自动多插一个位（同一份代码可多处复用） */
    articleInline?: string;
    /** 正文第二坑位代码（扬哥 2026-09-16：长文双广告位时用不同代码/创意，避免同屏重复）；缺省回退 articleInline */
    articleInline2?: string;
    /** 左右浮动竖幅 160×600 旧写法：只填此字段=左右共用同一单元（同屏创意相同） */
    sideRail?: string;
    /** 左侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailLeft?: string;
    /** 右侧竖幅广告单元（独立 key=独立竞价/创意/统计；优先于 sideRail） */
    sideRailRight?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Slay the Spire 2",
  shortName: "StS2",

  // ⚠️ 每站必改：SEO 三件套（title ≤60 字符 / description ≤160 字符）
  seo: {
    title: "Slay the Spire 2 Wiki — Guides, Builds, Classes & News",
    description:
      "Fan-made Slay the Spire 2 wiki: class guides, build walkthroughs, card and relic lists, patch news and game info for Mega Crit's deckbuilding roguelike.",
    keywords: "Slay the Spire 2, wiki, guide, builds, classes, cards, relics, news",
  },

  // ⚠️ 每站必改：keyart 大图（放 public/images/）
  hero: {
    image: "/images/sts2-hero-keyart.webp",
    eyebrow: "Wiki & Guide",
    title: "Slay the Spire 2",
    subtitle: "Classes · Builds · Cards · News",
  },

  // ⚠️ 每站必改：轮播 3 篇
  carousel: {
    autoPlayMs: 5000,
    slides: [
      {
        image: "/images/sts2-slide-necrobinder.webp",
        title: "All 5 Classes & Unlock Order",
        href: "/classes/classes-overview",
      },
      {
        image: "/images/sts2-slide-combat.webp",
        title: "Ironclad Dominate Vulnerable Engine",
        href: "/builds/ironclad-wheelchair-vulnerable-engine",
      },
      {
        image: "/images/sts2-slide-classes.webp",
        title: "Infinite Poison Loop Guide",
        href: "/builds/silent-infinite-poison",
      },
    ],
  },

  // ⚠️ 每站必改：信息卡字段（保持 5 行结构）
  gameInfo: {
    title: "Slay the Spire 2",
    cover: "/images/sts2-cover.webp",
    fields: [
      { label: "Developer", value: "Mega Crit" },
      { label: "Publisher", value: "Mega Crit" },
      { label: "Release Date", value: "Mar 5, 2026 (Early Access)" },
      { label: "Platforms", value: "PC (Win / macOS / Linux)" },
      { label: "Genre", value: "Roguelike Deck-builder" },
    ],
    ctaLabel: "View on Steam ↗",
    ctaHref: "https://store.steampowered.com/app/2868840/",
  },

  // ⚠️ 每站必改：YouTube 视频 id（2–4 个）
  videos: [
    { youtubeId: "PW22jwFNxU8", title: "Early Access Trailer" },
    { youtubeId: "ttVtllHkb4E", title: "Official Gameplay Trailer" },
    { youtubeId: "krDFltgjLtE", title: "Reveal Trailer" },
  ],

  officialLinks: [
    { label: "Official Site", href: "https://megacrit.com/" },
    { label: "Steam", href: "https://store.steampowered.com/app/2868840/" },
    { label: "X / Twitter", href: "https://x.com/megacrit" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCEFMIvLMz1cwKhB9GD_hAWw" },
    { label: "Discord", href: "https://discord.gg/slaythespire" },
  ],

  sectionIntros: {
    classes: "Every playable class in Slay the Spire 2 — stats, starter relics, unlock order and playstyle for all five characters.",
    basics: "Foundational guides: your first run, core mechanics, map routing, events and the systems under every climb.",
    builds: "Proven deck archetypes for every class — card priorities, turn templates and the win conditions behind each engine.",
    mechanics: "Deep dives on statuses, relics, patch changes and the boss at the top of the tower.",
    collections: "Reference compendiums: every card and every relic in Early Access, tabulated and searchable.",
    tech: "Launch, performance, multiplayer and save-file fixes for common issues.",
    news: "Launch records, patch coverage and the story of Early Access so far.",
  },

  sectionFallbackImages: {
    classes: "/images/sts2-slide-classes.webp",
    basics: "/images/sts2-event-blessing.webp",
    builds: "/images/sts2-ironclad-combat.webp",
    mechanics: "/images/sts2-symbiote-event.webp",
    collections: "/images/sts2-shop.webp",
    tech: "/images/sts2-slide-combat.webp",
    news: "/images/sts2-necrobinder-intro.webp",
  },

  nav: [
    {
      title: "Classes",
      children: [
        { label: "All 5 Classes Overview", href: "/classes/classes-overview" },
        { label: "Ironclad Guide", href: "/classes/ironclad-character-guide" },
        { label: "Silent Guide", href: "/classes/silent-character-guide" },
        { label: "Regent Guide", href: "/classes/regent-character-guide" },
        { label: "Necrobinder Guide", href: "/classes/necrobinder-character-guide" },
        { label: "Defect Guide", href: "/classes/defect-character-guide" },
      ],
    },
    {
      title: "Beginner Guides",
      children: [
        { label: "First Run Guide", href: "/basics/beginner-first-run-guide" },
        { label: "Four Core Mechanics", href: "/basics/four-core-mechanics" },
        { label: "Class Difficulty Ranking", href: "/basics/class-difficulty-ranking" },
        { label: "Map Rooms & Routing", href: "/basics/map-room-types-route-planning" },
        { label: "Deck Thinning", href: "/basics/deck-thinning-guide" },
        { label: "Act 1 Events", href: "/basics/act-1-events-guide" },
        { label: "The Lantern Key", href: "/basics/lantern-key-event" },
        { label: "Multi Lantern Keys", href: "/basics/multiple-lantern-keys-secret" },
        { label: "Multiplayer Setup", href: "/basics/how-to-join-multiplayer" },
        { label: "System Requirements", href: "/basics/system-requirements" },
      ],
    },
    {
      title: "Ironclad Builds",
      children: [
        { label: "Dominate Vuln Engine", href: "/builds/ironclad-wheelchair-vulnerable-engine" },
        { label: "Vulnerable Stack", href: "/builds/ironclad-vulnerable-stack" },
        { label: "Pommel Strike Rush", href: "/builds/ironclad-pommel-strike-rush" },
        { label: "Hellraiser Auto-Strike", href: "/builds/ironclad-hellraiser-flow" },
        { label: "Infinite Strike", href: "/builds/ironclad-infinite-strike" },
        { label: "Perfected Strike Stack", href: "/builds/ironclad-perfected-strike-stack" },
        { label: "Exhaust Enchant Engine", href: "/builds/ironclad-exhaust-enchant-engine" },
      ],
    },
    {
      title: "Silent Builds",
      children: [
        { label: "Fan of Knives AOE", href: "/builds/silent-fan-of-blades" },
        { label: "Poison Kill", href: "/builds/silent-poison-kill" },
        { label: "Infinite Poison", href: "/builds/silent-infinite-poison" },
        { label: "Blade-Poison Hybrid", href: "/builds/silent-blade-poison-hybrid" },
        { label: "Sly Zero-Cost Loop", href: "/builds/silent-sly-tricks" },
        { label: "Blade Bandit", href: "/builds/silent-blade-bandit" },
        { label: "Assassinate Burst", href: "/builds/silent-assassinate" },
      ],
    },
    {
      title: "Regent & Necrobinder",
      children: [
        { label: "Particle Wall Loop", href: "/builds/regent-particle-wall-infinite" },
        { label: "Infinite Chain", href: "/builds/regent-infinite-chain" },
        { label: "Radiate Burst", href: "/builds/regent-radiation-engine" },
        { label: "Starlight Engine", href: "/builds/regent-starlight-engine" },
        { label: "Doom Burst", href: "/builds/necrobinder-calamity-burst" },
        { label: "Soul Drain", href: "/builds/necrobinder-soul-drain" },
        { label: "Osty HP Wall", href: "/builds/necrobinder-ten-thousand-hand-wall" },
        { label: "Ethereal Motion", href: "/builds/necrobinder-nihil-perpetual-motion" },
      ],
    },
    {
      title: "Defect Builds",
      children: [
        { label: "Claw Swarm", href: "/builds/defect-claw-swarm" },
        { label: "Focus Lightning", href: "/builds/defect-focus-lightning" },
        { label: "Overclock Engine", href: "/builds/defect-overclock-compression" },
        { label: "Rocket Fist Infinite", href: "/builds/defect-rocket-fist-infinite" },
      ],
    },
    {
      title: "Mechanics & Patch",
      children: [
        { label: "0.105 Patch Overview", href: "/mechanics/0-105-patch-overview" },
        { label: "0.105 Class Tier List", href: "/mechanics/best-class-0-105-tier-list" },
        { label: "Aeonglass Boss Guide", href: "/mechanics/aeonglass-boss-guide" },
        { label: "Sword Sage Rework", href: "/mechanics/sword-sage-rework-explained" },
        { label: "Tesla Coil+ Change", href: "/mechanics/tesla-coil-change-explained" },
        { label: "Blade of Ink Nerf", href: "/mechanics/blade-of-ink-nerf-explained" },
        { label: "Pumpkin Candle Rework", href: "/mechanics/pumpkin-candle-rework" },
        { label: "Orobas Ancient Guide", href: "/mechanics/orobas-ancient-guide" },
        { label: "Orobas Relic Priority", href: "/mechanics/orobas-relic-priority" },
        { label: "Potion Relics", href: "/mechanics/potion-relics-guide" },
        { label: "Storm Power", href: "/mechanics/storm-power-explained" },
        { label: "Retention Status", href: "/mechanics/retention-status-explained" },
        { label: "Flanking Status", href: "/mechanics/flanking-status-explained" },
        { label: "Temp Strength", href: "/mechanics/temporary-strength-status-explained" },
        { label: "Frail Status", href: "/mechanics/frail-status-explained" },
        { label: "The Boot", href: "/mechanics/the-boot-relic-guide" },
        { label: "Tea of Discourtesy", href: "/mechanics/tea-of-discourtesy-relic-guide" },
        { label: "Loyalty Badge", href: "/mechanics/loyalty-badge-relic-guide" },
        { label: "Bestiary Secrets", href: "/mechanics/bestiary-secrets-lore" },
      ],
    },
    {
      title: "Collections",
      children: [
        { label: "All Cards List", href: "/collections/all-cards-list" },
        { label: "All Relics List", href: "/collections/all-relics-list" },
      ],
    },
    {
      title: "Tech & Fixes",
      children: [
        { label: "Won't Launch Fixes", href: "/tech/wont-launch-fixes" },
        { label: "Stuck on Launch", href: "/tech/stuck-on-launch-fixes" },
        { label: "Stutter Fixes", href: "/tech/stutter-fix" },
        { label: "Card Display Fixes", href: "/tech/card-display-fixes" },
        { label: "Multiplayer Disconnects", href: "/tech/multiplayer-disconnect-fixes" },
        { label: "Console Commands", href: "/tech/console-commands" },
        { label: "Install Mods", href: "/tech/how-to-install-mods" },
        { label: "Save File Location", href: "/tech/save-file-location" },
        { label: "Save File Editing", href: "/tech/save-file-editing" },
      ],
    },
    {
      title: "News",
      children: [
        { label: "Godot Engine Switch", href: "/news/slay-the-spire-2-switches-to-godot-engine" },
        { label: "Necrobinder Reveal", href: "/news/necrobinder-first-new-character" },
        { label: "Regent Reveal", href: "/news/regent-character-reveal" },
        { label: "March 5 Launch Date", href: "/news/early-access-dated-march-5-2026" },
        { label: "Launch Day 95% Positive", href: "/news/launch-day-95-percent-positive" },
        { label: "570K Concurrency Record", href: "/news/concurrent-570k-2026-record" },
        { label: "3M Sold in Week One", href: "/news/three-million-first-week-roadmap" },
        { label: "IGN 9/10 Review", href: "/news/ign-nine-review" },
        { label: "240M Runs Stats", href: "/news/240-million-runs-stats" },
      ],
    },
  ],

  footer: {
    copyright:
      "Fan-made wiki. Not affiliated with Mega Crit. Slay the Spire is a trademark of Mega Crit.",
    contactLabel: "Contact",
  },

  ads: {},
};
