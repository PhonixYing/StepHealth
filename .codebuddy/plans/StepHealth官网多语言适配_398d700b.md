---
name: StepHealth官网多语言适配
overview: 为 StepHealth 静态官网（首页/隐私政策/支持页共 3 个页面）加入多语言能力：简体中文（默认）基础上新增英文、繁体中文、日文三种语言；首次访问按浏览器语言自动匹配，手动切换后通过 localStorage 记忆偏好。
todos:
  - id: create-i18n-engine
    content: 新建 i18n.js，内置简体/英文/繁体/日文四语字典与翻译引擎（语言解析、localStorage、URL 参数、防闪烁、select 绑定、缺键回退）
    status: completed
  - id: adapt-index
    content: 改造 index.html：全量文案打 data-i18n/data-i18n-html 标记，header 加语言选择器，head 加 bootstrap 脚本与 Noto Sans TC/JP 字体
    status: completed
    dependencies:
      - create-i18n-engine
  - id: adapt-legal-pages
    content: "改造 privacy.html 与 support.html：加翻译标记、语言选择器、bootstrap 脚本与字体，引入 i18n.js，顺带修复邮箱 mailto: 前缀"
    status: completed
    dependencies:
      - create-i18n-engine
  - id: update-styles
    content: 更新 styles.css 与 legal.css：语言选择器样式、html[lang] 各语言字体栈、移动端适配
    status: completed
    dependencies:
      - adapt-index
      - adapt-legal-pages
  - id: verify-multilingual
    content: 用 [skill:agent-browser] 打开三个页面，逐一切换四种语言截图核验文案完整、字形正确、偏好记忆生效
    status: completed
    dependencies:
      - update-styles
---

## 产品概述

将 StepHealth 静态官网（首页、隐私政策、支持与反馈共 3 个页面）适配为简体中文（默认）/ 英文 / 繁体中文 / 日文四种语言，保持现有视觉风格与页面结构不变。

## 核心功能

- 三个页面全部可见文本、标题（title）、meta description、aria-label 均支持 4 种语言切换
- 语言决定逻辑：优先 URL 参数（?lang=）→ localStorage 记忆的手动选择 → 浏览器语言自动匹配（zh/en/ja/zh-TW，匹配不到回退简体中文）
- 用户在导航区通过语言选择器手动切换，切换后立即生效并记住偏好
- 含混合标签的文案（如 br/em/a/small 结构）、首页手机示意屏内 mock 文案（日期、步数目标等）同样正确本地化
- 日文/繁体中文使用正确字形字体（Noto Sans JP / Noto Sans TC），不出现简体字形渲染

## 技术选型

沿用现有"零构建纯静态 + 原生 JS"架构，不引入框架或第三方 i18n 库：

- **语言包 + 运行时替换**：新建 `i18n.js`（与 `script.js` 同级的全局脚本），内置 4 种语言字典与翻译引擎
- **语言切换器**：原生 `<select>`（无障碍、三页复用、无需额外弹层脚本），样式用 CSS 融入品牌视觉
- **字体**：三页 Google Fonts 链接补充 `Noto Sans TC`、`Noto Sans JP`（400–800），通过 `html[lang]` 调整 `--sans` 变量中的字体优先级，避免简体字形渲染日文/繁中

## 实现方案

**策略**：为每个需翻译的节点打 `data-i18n` 标记，由 `i18n.js` 在 `DOMContentLoaded` 时按解析出的语言一次性替换全部文本、title、meta、aria-label，并更新 `<html lang>`。

**语言解析链**：`URL ?lang=` → `localStorage["stephealth_lang"]` → `navigator.language` 映射（`zh-Hant/zh-TW/zh-HK→zh-TW`，`en→en`，`ja→ja`，其余含 `zh→zh-CN`，其他→zh-CN）→ 默认 `zh-CN`。

**关键决策与权衡**：

- 单一 HTML + 客户端替换（而非每语言独立页面）：避免三份页面重复维护，内容天然一致；代价是 SEO 默认只索引简体中文，作为官网落地页可接受，且提供 `?lang=` 便于分享指定语言版本。
- 混合标签节点采用 `data-i18n-html`，字典存受控静态 HTML（全部为自产文案、无用户输入，无 XSS 风险）；纯文本节点用 `data-i18n`（textContent）。
- 翻译原则：专有名词（StepHealth、Apple 健康、HealthKit、StoreKit、Pro、iCloud、App Store）保留原文；全大写装饰性 eyebrow（如 PRIVACY POLICY、SUPPORT）保持英文风格；手机屏 mock 数字不变，日期与文案结构本地化（如 Friday, August 7 / 金曜日 8月7日）；App Store 徽章文案本地化但保留双行版式。
- 防闪烁：每个页面 `<head>` 内嵌约 10 行 bootstrap 脚本，在解析前设置 `<html lang>`；当目标语言非简体中文时临时隐藏 body（`visibility:hidden`），翻译应用完成后再显示，避免首帧闪现简体中文。

**性能**：字典对象约 15–25KB、单次遍历页面内约 100 个标记节点，开销可忽略；无额外网络请求，不阻塞现有动画（IntersectionObserver 的 .reveal 初始隐藏恰好进一步掩盖应用翻译前的状态）。

## 实施要点

- `index.html` 手机示意屏内文案（今天，走得不错 / 目标 8,000 步 / 星期五，8 月 7 日 / 连续 12 天 / 本周平均 7,840 步 / 约相当于 3 个苹果的热量等）与各 `aria-label`、`meta description` 均须打标记，勿遗漏。
- `support.html` 邮箱链接缺少 `mailto:`（`href="lidonghui11911@gmail.com"`），本次顺带修正为 `mailto:lidonghui11911@gmail.com`。
- 日文与繁中页面必须前置对应 Noto 字体：`html[lang="ja"]{--sans:"Manrope","Noto Sans JP",...}`，`html[lang="zh-TW"]` 同理前置 TC；`styles.css` 与 `legal.css` 的 `--sans` 均需覆盖。
- `i18n.js` 在键缺失时回退简体中文并 `console.warn`，便于验证遗漏；`script.js` 无需改动（移动菜单仅监听 `a` 点击，与 select 不冲突）。
- 爆炸半径控制：仅新增 `i18n.js`、修改 3 个 HTML 与 2 个 CSS，保持相对路径、不引入构建流程、不做无关重构。

## 架构设计

组件划分与数据流：

```
head 内联 bootstrap ──▶ 设 html lang（防闪烁）
        │
i18n.js：语言字典(4) + 语言解析 + applyLanguage()
        │  DOMContentLoaded
        ▼
  替换 [data-i18n]/[data-i18n-html]/[data-i18n-attr-*]、
  title、meta description、html lang、select 选中态
        │  用户切换 select → change 事件
        ▼
  写入 localStorage → 重新 applyLanguage()
```

- **语言包层**：`STEPHEALTH_I18N[lang]`，key 与页面 data 标记一一对应
- **引擎层**：语言解析、偏好读写、DOM 应用、防闪烁与缺键回退
- **展示层**：三页 data 标记 + 各页 header 内的语言选择器

## 目录结构

```
StepHealth/
├── i18n.js            # [NEW] 4 语字典 + 翻译引擎（语言解析/localStorage/URL 参数/applyLanguage/select 绑定）
├── index.html         # [MODIFY] 全量文案打 data-i18n 标记；header 加语言选择器；head 加 bootstrap 脚本与 Noto TC/JP 字体
├── privacy.html       # [MODIFY] 同上；header 右侧加语言选择器；引入 i18n.js（原页面无脚本）
├── support.html       # [MODIFY] 同上；修复邮箱链接 mailto:
├── styles.css         # [MODIFY] 语言选择器样式（桌面/移动端）、html[lang] 字体栈覆盖
└── legal.css          # [MODIFY] 语言选择器样式（适配紧凑 header）、html[lang] 字体栈覆盖
```

`script.js`、`assets/`、`README.md` 不涉及改动。

## 关键代码结构

```js
// i18n.js 对外接口与字典结构（示意，非完整实现）
window.STEPHEALTH_I18N = {
  'zh-CN': { /* 键: 简体原文 */ },
  'en':    { /* 键: English */ },
  'zh-TW': { /* 键: 繁體中文 */ },
  'ja':    { /* 键: 日本語 */ }
};
// HTML 约定：
//   纯文本节点  <span data-i18n="hero.badge"></span>
//   混合标签    <h1 data-i18n-html="hero.title"></h1>   // 值为受控静态 HTML，含 <br>/<em> 等
//   无障碍      <a data-i18n-attr-aria-label="download.aria"></a>
//   页面级      document.title / meta[name=description] 由固定键 pageTitle / pageDescription 更新
window.StepHealthI18n = {
  resolveLang: function () { /* ?lang → localStorage → navigator.language 映射 → 'zh-CN' */ },
  applyLanguage: function (lang) { /* 更新 html lang/title/meta/全部标记节点/select 选中态，缺键回退 zh-CN 并 console.warn */ },
  init: function () { /* 绑定 .lang-select change、DOMContentLoaded 后 apply + 解除防闪烁 */ }
};
```

## Agent Extensions

### Skill

- **agent-browser**
- Purpose: 实施完成后打开本地页面，逐一切换四种语言截图核验：文本是否全部本地化、日文/繁中字形渲染是否正确、语言选择器与记忆功能是否生效
- Expected outcome: 每种语言截图无遗漏英文残留与布局错乱，切换与刷新后语言保持（localStorage 记忆）验证通过