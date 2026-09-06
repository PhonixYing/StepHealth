---
name: StepHealth 多语言扩展（9 语 + 英文基底 + RTL）
overview: 将 StepHealth 营销站（index/privacy/support 三页）的多语言体系从 4 语扩展到 9 语：新增 es / pt-BR / pt-PT / fr / ar 五种语言，语言码改用 zh-Hans / zh-Hant（兼容旧 zh-CN / zh-TW），基底语言全面切换为英语（静态文案、默认解析与字典回退均以 en 为兜底），并为阿拉伯语实现完整 RTL 镜像布局。
todos:
  - id: engine-refactor
    content: 重构 i18n.js 与 i18n-boot.js：9 语映射、兜底 en、zh-Hans/zh-Hant 化并兼容升级旧码 zh-CN/zh-TW、ar 设 dir=rtl、字体热替换扩展 Noto Sans Arabic
    status: completed
  - id: dict-l10n
    content: 在 i18n.js 新增 es/pt-BR/pt-PT/fr/ar 五个完整语言块（约 96 键×5，含法律页/FAQ/aria/storeBadge），与英文基底语气一致
    status: completed
    dependencies:
      - engine-refactor
  - id: html-en-base
    content: 将 index/privacy/support 三页静态文案全部改为英文基底，lang=en，select 扩为 9 个语言选项
    status: completed
    dependencies:
      - engine-refactor
  - id: rtl-css
    content: 在 styles.css 与 legal.css 增加 html[lang=ar] 字体与字距修正、html[dir=rtl] 物理定位与箭头镜像覆写（含移动端断点）
    status: completed
    dependencies:
      - engine-refactor
      - html-en-base
  - id: smoke-test
    content: 用 [skill:playwright-cli] 冒烟：9 语×3 页遍历、console 无缺键、ar RTL 截图、旧存储码升级与浏览器语言跟随验证
    status: completed
    dependencies:
      - dict-l10n
      - html-en-base
      - rtl-css
---

## 需求概述

为 StepHealth 官网新增 5 种语言：西班牙语（es）、巴西葡萄牙语（pt-BR）、葡萄牙葡萄牙语（pt-PT）、法语（fr）、阿拉伯语（ar），使网站共支持 9 种语言：en / zh-Hans / zh-Hant / es / pt-BR / pt-PT / fr / ar / ja。三页（首页、隐私政策、支持与反馈）全部文案随所选语言本地化。

## 已确认的产品决策

- 语言自动跟随浏览器：浏览器语言为上述任一种时，网站直接以该语言呈现（含子区域变体，如 es-419 → es、ar-EG → ar、裸 pt → pt-BR）。
- 兜底用英语：语言解析与字典回退均以英文为最终基底，无法识别的浏览器语言显示英文。
- 用户手动切换优先：用户在下拉框选择后写入本地存储，后续访问按用户选择；URL ?lang= 参数优先级最高。
- 全面切换英文基底：三页 HTML 的静态文案（无 JS / JS 失败时的回退内容）、title/meta/aria 均改为英文，与 en 字典一致。
- 中文语言码改用 zh-Hans / zh-Hant（含 html lang、select option value、URL 参数），同时自动兼容并升级旧值 zh-CN → zh-Hans、zh-TW → zh-Hant（localStorage 与 ?lang= 均兼容，存储值在检测到旧码时回写升级）。
- 阿拉伯语完整 RTL：lang=ar 时 html dir=rtl，文本与 flex/grid 流向自动镜像，物理定位装饰（悬浮标签、说明角标、装饰星、光球、下拉箭头、返回箭头等）手动镜像翻转，阿拉伯语标题关闭负字距与斜体连字效果，并加载 Noto Sans Arabic / Noto Naskh Arabic 字体。

## 核心功能

- 9 种语言的全量文案字典（三页正文、FAQ、法律条款、提示框、title/meta、aria-label、按钮角标等，约 96 个键 × 9）。
- 语言选择下拉框扩为 9 项，以各语言自称显示（English / Español / Français / Português (Brasil) / Português (Portugal) / العربية / 日本語 / 简体中文 / 繁體中文）。
- 解析链：URL ?lang= > localStorage 用户选择 > navigator.language 浏览器语言 > en 兜底。
- 防首帧闪错与字体热替换扩展到全部新语言；ar 页面首帧即正确方向（rtl）。
- 无 JS 或脚本失败时整站回退为英文静态内容（现有 2s 强制显示兜底机制保留）。

## 技术栈

- 纯静态站点（无构建、无依赖）：原生 HTML / CSS / 原生 ES5 风格 JS（现状即如此，继续沿用）。
- Google Fonts：Manrope + DM Mono + Noto Sans SC（基底链接），运行时按语言把 family=Noto+Sans+SC 热替换为 TC / JP / Arabic；es/pt-BR/pt-PT/fr 的重音字符由 Manrope latin-ext 子集自动覆盖，无需改字体链接。

## 实现思路

- 语言引擎保持现有「head 内 i18n-boot.js 同步定语言 + body 末 i18n.js 翻译」双文件结构，不引入模块化构建；normalize 映射与语言常量在两文件中保持逐字同步（现状即手写重复，改动时两处一起改，冒烟测试校验二者一致）。
- 基底从 zh-CN 切换到 en：boot 的 DEFAULT_LANG 与 i18n.js 的 resolveLang 兜底、translate 缺失回退均改为 en；en 分支不再加 .i18n-boot 遮罩（默认语言免闪）。
- normalize 扩展映射：en*→en；es/es-*→es；pt-PT→pt-PT，其余 pt*（含裸 pt）→pt-BR；fr*→fr；ar*→ar；ja→ja；zh-hans/zh-cn/zh-sg/裸 zh→zh-Hans；zh-hant/zh-tw/zh-hk/zh-mo/zh-*→zh-Hant；其余→null（最终落 en）。
- 存储升级：boot 读到旧码 zh-CN/zh-TW 时，除按新码解析外，立即 setItem 回写 zh-Hans/zh-Hant，保证后续访问 canonical；i18n.js 的 normalize 仍保留旧码映射以兼容直接命中 ?lang=zh-CN 的 URL。
- RTL：boot 与 i18n.js apply 都负责 documentElement.dir = (lang==='ar') ? 'rtl' : 'ltr'，boot 在首帧前设置以保证方向无闪变；CSS 用 html[dir="rtl"] 统一承载镜像覆写（对未来新增 RTL 语言通用），html[lang="ar"] 承载阿拉伯字体栈与排版修正（负字距、斜体 em 转 normal 等——阿拉伯连写文字必须取消 letter-spacing 与 italic）。
- 翻译质量：新增 5 语字典沿用现有文案基调（温暖、克制、隐私优先的营销语气），保留既有 HTML 结构标签（br/em/span/small/b/a），各语言习惯化 App Store 角标文案（storeBadge）、日期格式、FAQ 与法律条款表述。
- 静态英文基底：三页所有可见静态文本与 en 字典逐条一致；保留无 data-i18n 的设计性英文眉题（PRIVACY POLICY / SUPPORT）与不受语言影响的元素（© 2026、App Store 链接、品牌名）。

## 实现要点

- 复杂度：翻译为 DOM 遍历 + 字典 O(1) 查表，9 语言不改变量级；无新增网络请求开销（字体按需子集）。
- 两处 normalize 必须完全一致，否则首帧 lang 与运行期 lang 不一致；冒烟测试以 URL ?lang= 逐语言比对 documentElement.lang 与 boot 结果。
- 改动文件全部为既有文件，不新增文件、不引入依赖；script.js（汉堡菜单、reveal 动画）、App Store 链接、主题色等无关逻辑一律不动。
- 日志沿用 console.warn 缺键提示，冒烟测试将其作为「无缺键」断言依据。
- 防回归：translate 对 data-i18n-html 走 innerHTML，新增译文中的 & < > 需正确转义（如 faqA3 的 &gt; 场景）。

## 架构设计

```
i18n-boot.js（head 同步）
  ├─ normalize/解析（URL > localStorage > navigator.language > en 兜底）
  ├─ 旧码 zh-CN/zh-TW → 新码并回写存储
  ├─ 设置 <html lang> 与 dir(rtl|attr)，非 en 语言加 .i18n-boot 遮罩
  └─ Google Fonts family 热替换（SC→TC/JP/Noto Sans Arabic）
i18n.js（body 末）
  ├─ LANGS[9] + DICT{zh-Hans,zh-Hant,ja,en,es,pt-BR,pt-PT,fr,ar}
  ├─ apply()：按 data-i18n* 钩子翻译、同步 select.value、设置 lang/dir、移除遮罩
  └─ change 事件：写入 localStorage 并 apply
HTML ×3
  ├─ 静态基底全部英文，lang="en"
  ├─ data-i18n / data-i18n-html / data-i18n-title / data-i18n-description / data-i18n-attr-aria-label 钩子
  └─ select.lang-select 9 个 option
styles.css / legal.css
  ├─ html[lang] 字体栈变量（新增 ar 分支）
  ├─ html[lang="ar"] 排版修正（字距/斜体/字体）
  └─ html[dir="rtl"] 镜像覆写（物理定位与箭头内侧距）
```

## 目录结构

本实现不新增文件，全部为对既有文件的修改：

```
StepHealth/
├── i18n.js          # [MODIFY] 语言引擎与字典。LANGS 扩为 9 项；normalize 新映射与 zh 旧码兼容；兜底改 en；translate 缺失回退 en；apply 增加 dir 设置与旧存储码兼容；DICT 键 zh-CN→zh-Hans、zh-TW→zh-Hant；新增 es/pt-BR/pt-PT/fr/ar 五个完整语言块（每块约 96 键，覆盖三页全部正文、FAQ、法律条款、hint、title/meta、全部 aria-label、storeBadge 等，与英文基底语气一致）
├── i18n-boot.js     # [MODIFY] 首帧逻辑。DEFAULT_LANG 改 en；normalize 与 i18n.js 同步扩到 9 语；读存储时把旧码 zh-CN/zh-TW 升级回写为 zh-Hans/zh-Hant；lang=ar 时首帧即设 dir="rtl"；字体热替换新增 Noto Sans Arabic 分支；en 不再加 .i18n-boot
├── index.html       # [MODIFY] 静态基底全面英文化（lang="en"、title/meta/aria、全部可见文案与 en 字典一致）；select 扩为 9 个 option（值 zh-Hans/zh-Hant/es/pt-BR/pt-PT/fr/ar/ja/en，标签用各语言自称）；其余结构（App Store 链接、reveal、菜单等）原样保留
├── privacy.html     # [MODIFY] 同上：英文静态基底 + lang="en" + 9 项 select；body 内文案与 en 字典 privacy* 键一致；design 眉题 PRIVACY POLICY 保留
├── support.html     # [MODIFY] 同上：英文静态基底 + lang="en" + 9 项 select；body 文案与 en 字典 support*/faq* 键一致；含 &gt; 的 FAQ 文案转义正确
├── styles.css       # [MODIFY] 多语言区块：新增 html[lang="ar"] 字体栈（Noto Sans Arabic 前置）与排版修正（标题/眉题/品牌字距归零、em 取消 italic、feature-index 等阿拉伯文本字体回退）；新增 html[dir="rtl"] 镜像覆写（lang-select 箭头改左及内边距、float-tag/tag-icon 的 left/right 互换、ring-caption/chart-illustration i/privacy-star/pro-orb/page-glow 物理定位镜像、nav-download/text-link/arrow-link/light-button 箭头内侧距、insight-card em 自动边距、移动端 main-nav 定位）；760px/380px 断点内的 RTL 覆写一并补齐
└── legal.css        # [MODIFY] 同步：html[lang="ar"] 字体栈覆写；html[dir="rtl"] 镜像（lang-select 箭头、hint 左边框改内联侧、header/legal-actions 布局核对）
```

## 关键数据结构（仅列出跨文件约定，供实现时对齐）

- 语言码集合：`LANGS = ['en','es','fr','pt-BR','pt-PT','ar','ja','zh-Hans','zh-Hant']`（与 select option 值一一对应）。
- 浏览器映射表：en→en；es-*→es；pt-PT→pt-PT；pt-*→pt-BR；fr-*→fr；ar-*→ar；ja→ja；zh-hans/zh-cn/zh-sg/zh→zh-Hans；zh-hant/zh-tw/zh-hk/zh-mo/zh-*→zh-Hant；其余→null。
- 旧码兼容：normalize 输入 zh-CN→zh-Hans、zh-TW→zh-Hant；boot 发现存储值为旧码时回写新码。
- RTL 方向约定：lang==='ar' 时 dir='rtl'，其余 'ltr'；方向性箭头类文案（如 backHome 的 ←/→）在 ar 字典中按视觉方向镜像（实施后以冒烟截图为准微调）。

## Agent Extensions

### Skill

- **playwright-cli**
- 用途：在实施完成后做浏览器端冒烟验证——遍历 9 种语言 × 3 个页面，检查 console 无缺键/回退警告与空串渲染；验证 ?lang= 与下拉切换、旧 localStorage 值 zh-CN/zh-TW 自动升级、ar 页面 dir=rtl 与镜像布局截图、首帧语言一致性（html lang 在 boot 后与运行期一致）。
- 预期结果：产出 9 语遍历断言通过 + ar RTL 视觉截图与关键语言截图，确认无缺键、无首帧闪错、方向与排版正确。