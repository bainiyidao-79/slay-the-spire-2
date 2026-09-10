export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; children: NavLink[] };

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  /** Hero 区顶部小徽章文字（如 "WIKI GUIDE"），空串则不显示 */
  eyebrow?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;

  // 官方链接
  platformUrl?: string;
  /** 联系邮箱（页脚「联系我们」；留空/不填则页脚不显示该行）——扬哥待定中 */
  contactEmail?: string;
  discordUrl?: string;
  youtubeChannelUrl?: string;

  // 顶部导航（Header 用的平铺链接；不填则取 nav 第一组前 4 项）
  topNav?: NavLink[];

  // 侧边栏目录树（按实际内容增减，不做死链接）
  nav: NavGroup[];

  // 首页 YouTube 视频（Workflow 建站时填入：官方频道代表作 > 播放量最高热门视频）
  heroVideo?: {
    youtubeId: string;
    title?: string;
    description?: string;
  };

  // 首页「Trending Now」：精选文章（不填则整块隐藏）
  trending?: { label: string; href: string; description?: string }[];

  // 首页「What is <Game>?」介绍区（不填则整块隐藏）
  gameIntro?: {
    title?: string;
    paragraphs: string[];
    facts?: { label: string; value: string }[];
  };

  // 底部 CTA 大横幅（光晕容器，不填则整块隐藏）
  ctaBanner?: {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
  };

  // 站点级 SEO 关键词
  keywords?: string[];

  // 广告位（骨架预制）：填入广告代码（HTML/JS）即生效；留空则完全不渲染不展示
  ads?: {
    /** 侧边栏底部广告位（菜单栏下方） */
    sidebar?: string;
    /** 页面底部 banner 广告位（页脚上方，每页都有） */
    footerBanner?: string;
  };

  // 可选：FAQ
  faq?: { question: string; answer: string }[];
};

export const siteConfig: SiteConfig = {
  name: "Slay the Spire 2 Wiki",
  shortName: "STS2 Wiki",
  description:
    "A fan-made Slay the Spire 2 wiki: release date, platforms, price, builds & tier lists, builds, tier lists, boss guides and patch tracking — all backed by verified sources.",
  heroTitle: "Slay the Spire 2",
  heroSubtitle: "Builds • Tier Lists • Bosses • Patch Tracker",
  eyebrow: "Roguelike Deckbuilder",
  primaryCtaLabel: "Meet the Characters",
  primaryCtaHref: "/intro/what-is",

  platformUrl: "https://store.steampowered.com/app/2868840/",
  discordUrl: "https://discord.gg/slaythespire",
  youtubeChannelUrl: "https://www.youtube.com/channel/UCEFMIvLMz1cwKhB9GD_hAWw",
  keywords: ["slay the spire 2", "slay the spire 2 wiki", "slay the spire 2 builds", "slay the spire 2 tier list", "slay the spire 2 release date"],

  // ⚠️ 导航由 gen_nav.py 按 菜单-页面清单.json 自动生成（v2, 2026-09-10）——勿手改，重新生成后整段替换
  // ⚠️ v3 树状导航（内容框架2.0 全量：6+3+22+4+1+5 = 41 条，手工登记）
  nav: [
    { title: "Characters", children: [
      { label: "Characters Overview", href: "/characters" },
      { label: "Ironclad", href: "/characters/ironclad" },
      { label: "Silent", href: "/characters/silent" },
      { label: "Defect", href: "/characters/defect" },
      { label: "Regent", href: "/characters/regent" },
      { label: "Necrobinder", href: "/characters/necrobinder" },
    ] },
    { title: "Cards Database", children: [
      { label: "Card Tier List", href: "/cards/tier-list" },
      { label: "Ironclad Cards", href: "/cards/ironclad" },
      { label: "Silent Cards", href: "/cards/silent" },
      { label: "Defect Cards", href: "/cards/defect" },
      { label: "Regent Cards", href: "/cards/regent" },
      { label: "Necrobinder Cards", href: "/cards/necrobinder" },
    ] },
    { title: "Relics · Enemies · Events", children: [
      { label: "Relic Library (299)", href: "/relics" },
      { label: "Enemy Compendium (99)", href: "/enemies" },
      { label: "Event Choices (60)", href: "/events" },
    ] },
    { title: "Builds", children: [
      { label: "Builds Overview", href: "/builds/builds-overview" },
      { label: "Ironclad Builds Hub", href: "/builds/builds-ironclad" },
      { label: "Ironclad Dominate Build", href: "/builds/ironclad-dominate-build" },
      { label: "Ironclad Exhaust Build", href: "/builds/ironclad-exhaust-build" },
      { label: "Ironclad Strikes Build", href: "/builds/ironclad-strikes-build" },
      { label: "Silent Build Hub", href: "/builds/builds-silent" },
      { label: "Silent Sly Build", href: "/builds/silent-sly-build" },
      { label: "Silent Shiv Build", href: "/builds/silent-shiv-build" },
      { label: "Silent Poison Build", href: "/builds/silent-poison-build" },
      { label: "Defect Build Hub", href: "/builds/builds-defect" },
      { label: "Defect Frost Build", href: "/builds/defect-frost-build" },
      { label: "Defect Lightning Build", href: "/builds/defect-lightning-build" },
      { label: "Defect Dark Build", href: "/builds/defect-dark-build" },
      { label: "Defect Claw Build", href: "/builds/defect-claw-build" },
      { label: "Regent Build Hub", href: "/builds/builds-regent" },
      { label: "Regent Starfall Build", href: "/builds/regent-starfall-build" },
      { label: "Regent Star Mid-Range Build", href: "/builds/regent-star-midrange-build" },
      { label: "Regent Forge Build", href: "/builds/regent-forge-build" },
      { label: "Regent Infinites Build", href: "/builds/regent-infinites-build" },
      { label: "Necrobinder Build Hub", href: "/builds/builds-necrobinder" },
      { label: "Necrobinder Doom Build", href: "/builds/necrobinder-doom-build" },
      { label: "Necrobinder Osty Build", href: "/builds/necrobinder-osty-build" },
    ] },
    { title: "Guides", children: [
      { label: "Beginner Tips", href: "/guides/tips" },
      { label: "Mods & Tools", href: "/guides/mods" },
      { label: "Lantern Key", href: "/guides/lantern-key" },
      { label: "Bosses", href: "/bosses/bosses" },
    ] },
    { title: "News", children: [
      { label: "Patch Notes & Updates", href: "/news/patch-notes" },
    ] },
    { title: "Game Overview", children: [
      { label: "What Is Slay the Spire 2?", href: "/game-overview/what-is" },
      { label: "Release Date & Platforms", href: "/game-overview/release-date-and-platforms" },
      { label: "Price & Editions", href: "/game-overview/price-and-editions" },
      { label: "Co-op & Multiplayer", href: "/game-overview/co-op-and-multiplayer" },
      { label: "Reviews & Reception", href: "/game-overview/reviews-and-reception" },
    ] },
  ],

  topNav: [
    { label: "What Is Slay The Spire 2?", href: "/intro/what-is" },
    { label: "Release Date & Platforms", href: "/release/release-date-and-platforms" },
    { label: "Reviews & Reception", href: "/review/reviews-and-reception" },
    { label: "Tier List", href: "/guide/tier-list" },
    { label: "Characters & Classes", href: "/intro/characters-and-classes" },
    { label: "Mods & Tools", href: "/guide/mods" },
  ],

  // ⚠️ 官方频道 @MegaCrit 最高播放（150万）EA 预告
  heroVideo: {
    youtubeId: "PW22jwFNxU8",
    title: "Slay the Spire 2 - Early Access Trailer",
    description: "Watch the official Early Access trailer from Mega Crit's channel.",
  },

  trending: [
    { label: "Card Tier List", href: "/cards/tier-list", description: "Every card ranked S through D, updated per patch." },
    { label: "Characters", href: "/characters", description: "All five characters: mechanics, traits, build links." },
    { label: "Ironclad Builds", href: "/builds/builds-ironclad", description: "The Dominate engine and the Exhaust/Body Slam deck." },
    { label: "Regent Builds", href: "/builds/builds-regent", description: "Star Engine and Sovereign Blade archetypes." },
    { label: "Patch Notes", href: "/news/patch-notes", description: "Bi-weekly beta changes and what they mean for builds." },
  ],

  gameIntro: {
    title: "What is Slay the Spire 2?",
    paragraphs: [
      "Slay the Spire 2 is the sequel to Mega Crit's genre-defining roguelike deckbuilder. It launched into Early Access on Steam on March 5, 2026 at $24.99, and immediately became one of the year's biggest PC launches — peaking at 574,638 concurrent players in its first week (SteamDB).",
      "You climb a freshly-generated Spire with one of five characters (returning Ironclad, Silent and Defect, plus new Regent and Necrobinder), drafting cards and relics run by run. This time the series adds four-player online co-op, a revised map with branching paths, and a live balance cadence of roughly one patch every one to two weeks.",
    ],
    facts: [
      { label: "Developer", value: "Mega Crit" },
      { label: "Early Access", value: "March 5, 2026" },
      { label: "Price", value: "$24.99 USD" },
      { label: "Platforms", value: "PC (Steam) • console TBA" },
      { label: "Genre", value: "Roguelike deckbuilder" },
    ],
  },

  ctaBanner: {
    title: "Ready to climb the Spire?",
    description: "Check the tier list and the build guides before your first run — re-ranked with every patch.",
    buttonLabel: "Browse the Cards Database",
    buttonHref: "/guide/builds",
  },

  faq: [],
};
