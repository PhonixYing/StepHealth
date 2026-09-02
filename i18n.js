/* StepHealth 官网多语言引擎
 * =====================================================
 * 依赖：i18n-boot.js（head 中同步执行，负责防闪烁与字体）
 *
 * HTML 标记约定：
 *   data-i18n-title="pageTitle"          → 页面标题（只写在一个元素上）
 *   data-i18n-description="pageDesc"     → meta description（只写在一个 meta 上）
 *   data-i18n="some.key"                 → 替换该元素的 textContent
 *   data-i18n-html="some.key"            → 替换该元素的 innerHTML（值可含 br/em/span 等受控标签）
 *   data-i18n-attr-aria-label="some.key" → 设置 aria-label 属性
 *   <select class="lang-select">         → 语言选择器，切换时写入 localStorage
 *
 * 语言解析优先级：URL ?lang= > localStorage > navigator.language > zh-CN
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'stephealth_lang';
  var LANGS = ['zh-CN', 'zh-TW', 'ja', 'en'];

  var DICT = {
    'zh-CN': {
      pageTitle: 'StepHealth - 看懂每天的每一步',
      pageDesc: 'StepHealth 是一款简洁、重视隐私的每日计步 App。连接 Apple 健康，看懂每一天的活动节奏。',
      langAria: '选择语言',
      backHome: '← 返回首页',
      brandAria: 'StepHealth 首页',
      navAria: '主导航',

      /* ============ index.html ============ */
      navFeatures: '功能',
      navPrivacy: '隐私',
      navDownload: '下载 App <span>↗</span>',
      menuAria: '打开导航',
      heroEyebrow: '为日常活动而生',
      heroTitle: '每一步，都算数。<br /><em>也都值得被看见。</em>',
      heroDesc: 'StepHealth 把 Apple 健康里的活动数据，变成清晰、有温度的每日记录。没有复杂的训练计划，只有陪你走得更远的好习惯。',
      storeAria: '在 App Store 下载 StepHealth',
      storeBadge: '<small>在 App Store</small>下载',
      exploreLink: '探索功能 <span>↓</span>',
      heroProof: '为更自在的每一天而设计',
      phoneAria: 'StepHealth 今日活动页面示意',
      tagStreak: '连续 12 天',
      tagStreakSub: '保持你的节奏',
      tagKmSub: '今日距离',
      tagGoal: '目标完成',
      tagGoalSub: '今天的你很棒',
      phoneDate: '星期五，8 月 7 日',
      phoneRefresh: '刷新',
      phoneHeadline: '今天，走得不错。',
      phoneSteps: '步',
      phoneGoal: '目标 8,000 步',
      phoneComplete: '<span>✓</span> 今日目标已达成',
      phoneDist: '距离',
      phoneCal: '活动热量',
      phoneEqLabel: '约相当于',
      phoneEqValue: '3 个苹果的热量',
      introQuote: '不必追赶别人，<br />只要比昨天的自己，多走一步。',
      introMark: '你的步伐<br />由你定义',
      featEyebrow: '清晰，而不复杂',
      featTitle: '把活动，变成<br /><em>你愿意每天打开的事。</em>',
      featIndex1: '01 / 今日',
      featTitle1: '一眼看懂<br />今天走了多远',
      featDesc1: '步数、距离、活动热量和目标进度，都在最重要的位置。',
      featRingNote: '已完成 106%',
      featIndex2: '02 / 趋势',
      featTitle2: '让坚持<br />看得见',
      featDesc2: '按周、按月回顾属于你的活动轨迹。',
      featChartNote: '本周平均 <b>7,840</b> 步',
      featIndex3: '03 / 目标',
      featTitle3: '不紧绷的<br />小小鼓励',
      featDesc3: '设定适合自己的目标，温柔地保持节奏。',
      featIndex4: '04 / 趣味换算',
      featTitle4: '数字，也可以很有画面感。',
      featDesc4: '用苹果热量、操场圈数等生活化语言，理解每一次出发。',
      featEqNote: '约<br /><b>95</b><br />kcal',
      privacyEyebrow: '你的数据，属于你',
      privacyTitle: '健康数据，不该成为商品。',
      privacyDesc: 'StepHealth 通过 Apple 健康读取活动记录，数据主要在你的设备上处理。我们不售卖健康数据，不做广告追踪，也不需要注册账号。',
      privacyLink: '阅读隐私政策 <span>↗</span>',
      proEyebrow: 'StepHealth Pro',
      proTitle: '给想走得更远的你。',
      proSub: '一次解锁，把你的每一段坚持好好收藏。',
      proCardTitle: 'StepHealth<br /><em>Pro 终身版</em>',
      proCardDesc: '完整历史、深度洞察、报告导出、专属小组件和更多个性化设置。',
      proLearn: '了解 Pro <span>↗</span>',
      proLi1: '年度与完整历史趋势',
      proLi2: '周报、月报与数据导出',
      proLi3: '多个目标计划与提醒',
      proLi4: '专属小组件与主题',
      closingEyebrow: '从今天开始',
      closingTitle: '走出自己的<br /><em>每一步。</em>',
      closingDesc: '不需要完美的开始。现在，就已经很好。',
      footerSlogan: '每一步，都算数。',
      footerPrivacy: '隐私政策',
      footerSupport: '支持与反馈',

      /* ============ privacy.html ============ */
      privacyPageTitle: '隐私政策 - StepHealth',
      privacyPageDesc: 'StepHealth 隐私政策',
      privacyH1: '隐私政策',
      privacyUpdated: '最后更新：2026 年 8 月 7 日',
      privacyIntro: 'StepHealth 是一款重视隐私的日常活动记录 App。我们希望你清楚了解：哪些数据用于提供功能，以及这些数据如何被保护。',
      privacyS1H: '我们处理的数据',
      privacyS1P: '在你通过系统授权后，StepHealth 会从 Apple 健康读取步数、步行/跑步距离和活动能量数据。这些数据仅用于在 App 中向你展示今日活动、趋势、目标进度及相关估算。你可随时在 iPhone 的“健康”或“设置”中撤销授权。',
      privacyS2H: '数据如何存储和使用',
      privacyS2P: '健康数据主要在你的设备本地处理。StepHealth 不会出售你的健康数据，不会将其用于广告或跨 App 追踪，也不会用于建立营销画像。若你主动启用 iCloud 同步，只有你的目标、偏好和计划会通过你的个人 iCloud 账户同步；Apple 健康中的步数数据不会由 StepHealth 上传。',
      privacyS3H: '第三方服务',
      privacyS3P: 'StepHealth 使用 Apple 提供的 HealthKit 和 StoreKit 服务，以读取你授权的健康数据并处理购买。相关服务受 Apple 的隐私政策约束。我们不会向广告网络出售或共享健康数据。',
      privacyS4H: '你的选择',
      privacyS4P: '你可以随时撤销健康数据访问权限、删除 App 本地数据，或通过 Apple 的订阅与购买设置管理已购项目。撤销权限后，StepHealth 将无法继续读取对应的健康数据。',
      privacyS5H: '联系我们',
      privacyS5P: '如对本政策或个人数据有任何疑问，请通过 <a href="support.html">支持与反馈页面</a> 联系我们。',
      privacyS6H: '政策更新',
      privacyS6P: '如本政策发生重大变更，我们会在本页面更新发布日期。继续使用 StepHealth 即表示你同意更新后的政策。',

      /* ============ support.html ============ */
      supportPageTitle: '支持与反馈 - StepHealth',
      supportPageDesc: 'StepHealth 支持与反馈',
      supportH1: '支持与反馈',
      supportTagline: '我们很乐意听见你的声音。',
      supportIntro: '无论是使用问题、功能建议，还是想和我们分享你坚持走下去的故事，都欢迎联系我们。',
      supportS1H: '联系支持团队',
      supportEmail: '请发送邮件至 <a href="mailto:lidonghui11911@gmail.com">lidonghui11911@gmail.com</a>。',
      supportHint: '来信中附上 App 版本号、iPhone 型号和问题截图，会帮助我们更快定位问题。',
      supportFaqH: '常见问题',
      faqQ1: '为什么步数没有更新？',
      faqA1: '请确认已在系统弹窗中允许 StepHealth 读取 Apple 健康数据，并在“健康”App 中确认当天已有记录。健康数据同步可能会有短暂延迟，回到 StepHealth 后下拉刷新即可。',
      faqQ2: '如何更改每日步数目标？',
      faqA2: '打开 App 的“目标”页面，即可在“每日步数目标”中调整。目标会保存在你的设备上。',
      faqQ3: '如何恢复 Pro 购买？',
      faqA3: '在 App 的“我的 > StepHealth Pro”中选择“恢复购买”。购买与恢复均通过 Apple 账户处理。',
      faqQ4: '如何管理健康数据权限？',
      faqA4: '前往 iPhone“健康”App，点击你的头像后选择“App 与服务”，再找到 StepHealth，即可查看或更改访问权限。'
    },

    'zh-TW': {
      pageTitle: 'StepHealth - 看懂每天的每一步',
      pageDesc: 'StepHealth 是一款簡潔、重視隱私的每日計步 App。連接 Apple 健康，看懂每一天的活動節奏。',
      langAria: '選擇語言',
      backHome: '← 返回首頁',
      brandAria: 'StepHealth 首頁',
      navAria: '主要導覽',

      navFeatures: '功能',
      navPrivacy: '隱私',
      navDownload: '下載 App <span>↗</span>',
      menuAria: '開啟選單',
      heroEyebrow: '為日常活動而生',
      heroTitle: '每一步，都算數。<br /><em>也都值得被看見。</em>',
      heroDesc: 'StepHealth 把 Apple 健康裡的活動資料，變成清晰、有溫度的每日記錄。沒有複雜的訓練計畫，只有陪你走得更遠的好習慣。',
      storeAria: '在 App Store 下載 StepHealth',
      storeBadge: '<small>在 App Store</small>下載',
      exploreLink: '探索功能 <span>↓</span>',
      heroProof: '為更自在的每一天而設計',
      phoneAria: 'StepHealth 今日活動頁面示意',
      tagStreak: '連續 12 天',
      tagStreakSub: '保持你的節奏',
      tagKmSub: '今日距離',
      tagGoal: '目標完成',
      tagGoalSub: '今天的你很棒',
      phoneDate: '星期五，8 月 7 日',
      phoneRefresh: '重新整理',
      phoneHeadline: '今天，走得真不錯。',
      phoneSteps: '步',
      phoneGoal: '目標 8,000 步',
      phoneComplete: '<span>✓</span> 今日目標已達成',
      phoneDist: '距離',
      phoneCal: '活動熱量',
      phoneEqLabel: '約相當於',
      phoneEqValue: '3 顆蘋果的熱量',
      introQuote: '不必追趕別人，<br />只要比昨天的自己，多走一步。',
      introMark: '你的步伐<br />由你定義',
      featEyebrow: '清晰，而不複雜',
      featTitle: '把活動，變成<br /><em>你願意每天打開的事。</em>',
      featIndex1: '01 / 今日',
      featTitle1: '一眼看懂<br />今天走了多遠',
      featDesc1: '步數、距離、活動熱量和目標進度，都在最重要的位置。',
      featRingNote: '已完成 106%',
      featIndex2: '02 / 趨勢',
      featTitle2: '讓堅持<br />看得見',
      featDesc2: '按週、按月回顧屬於你的活動軌跡。',
      featChartNote: '本週平均 <b>7,840</b> 步',
      featIndex3: '03 / 目標',
      featTitle3: '不緊繃的<br />小小鼓勵',
      featDesc3: '設定適合自己的目標，溫柔地保持節奏。',
      featIndex4: '04 / 趣味換算',
      featTitle4: '數字，也可以很有畫面感。',
      featDesc4: '用蘋果熱量、操場圈數等生活化語言，理解每一次出發。',
      featEqNote: '約<br /><b>95</b><br />kcal',
      privacyEyebrow: '你的資料，屬於你',
      privacyTitle: '健康資料，不該成為商品。',
      privacyDesc: 'StepHealth 透過 Apple 健康讀取活動記錄，資料主要在你的裝置上處理。我們不販售健康資料，不做廣告追蹤，也不需要註冊帳號。',
      privacyLink: '閱讀隱私權政策 <span>↗</span>',
      proEyebrow: 'StepHealth Pro',
      proTitle: '給想走得更遠的你。',
      proSub: '一次解鎖，把你的每一段堅持好好收藏。',
      proCardTitle: 'StepHealth<br /><em>Pro 終身版</em>',
      proCardDesc: '完整歷史、深度洞察、報表匯出、專屬小工具和更多個人化設定。',
      proLearn: '了解 Pro <span>↗</span>',
      proLi1: '年度與完整歷史趨勢',
      proLi2: '週報、月報與資料匯出',
      proLi3: '多個目標計劃與提醒',
      proLi4: '專屬小工具與主題',
      closingEyebrow: '從今天開始',
      closingTitle: '走出自己的<br /><em>每一步。</em>',
      closingDesc: '不需要完美的開始。現在，就已經很好。',
      footerSlogan: '每一步，都算數。',
      footerPrivacy: '隱私權政策',
      footerSupport: '支援與回饋',

      privacyPageTitle: '隱私權政策 - StepHealth',
      privacyPageDesc: 'StepHealth 隱私權政策',
      privacyH1: '隱私權政策',
      privacyUpdated: '最後更新：2026 年 8 月 7 日',
      privacyIntro: 'StepHealth 是一款重視隱私的日常活動記錄 App。我們希望你清楚了解：哪些資料用於提供功能，以及這些資料如何被保護。',
      privacyS1H: '我們處理的資料',
      privacyS1P: '在你透過系統授權後，StepHealth 會從 Apple 健康讀取步數、步行／跑步距離和活動能量資料。這些資料僅用於在 App 中向你顯示今日活動、趨勢、目標進度及相關估算。你可隨時在 iPhone 的「健康」或「設定」中撤銷授權。',
      privacyS2H: '資料如何儲存和使用',
      privacyS2P: '健康資料主要在你的裝置本機處理。StepHealth 不會出售你的健康資料，不會將其用於廣告或跨 App 追蹤，也不會用於建立行銷輪廓。若你主動啟用 iCloud 同步，只有你的目標、偏好和計劃會透過你的個人 iCloud 帳號同步；Apple 健康中的步數資料不會由 StepHealth 上傳。',
      privacyS3H: '第三方服務',
      privacyS3P: 'StepHealth 使用 Apple 提供的 HealthKit 與 StoreKit 服務，以讀取你授權的健康資料並處理購買。相關服務受 Apple 的隱私權政策約束。我們不會向廣告聯播網出售或共享健康資料。',
      privacyS4H: '你的選擇',
      privacyS4P: '你可以隨時撤銷健康資料存取權限、刪除 App 本機資料，或透過 Apple 的訂閱與購買設定管理已購項目。撤銷權限後，StepHealth 將無法繼續讀取對應的健康資料。',
      privacyS5H: '聯絡我們',
      privacyS5P: '如對本政策或個人資料有任何疑問，請透過 <a href="support.html">支援與回饋頁面</a> 與我們聯絡。',
      privacyS6H: '政策更新',
      privacyS6P: '如本政策發生重大變更，我們會在本頁面更新發布日期。繼續使用 StepHealth 即表示你同意更新後的政策。',

      supportPageTitle: '支援與回饋 - StepHealth',
      supportPageDesc: 'StepHealth 支援與回饋',
      supportH1: '支援與回饋',
      supportTagline: '我們很樂意聽見你的聲音。',
      supportIntro: '無論是使用問題、功能建議，還是想和我們分享你堅持走下去的故事，都歡迎與我們聯絡。',
      supportS1H: '聯絡支援團隊',
      supportEmail: '請寄送郵件至 <a href="mailto:lidonghui11911@gmail.com">lidonghui11911@gmail.com</a>。',
      supportHint: '來信中附上 App 版本號、iPhone 型號和問題截圖，會幫助我們更快定位問題。',
      supportFaqH: '常見問題',
      faqQ1: '為什麼步數沒有更新？',
      faqA1: '請確認已在系統彈窗中允許 StepHealth 讀取 Apple 健康資料，並在「健康」App 中確認當天已有記錄。健康資料同步可能會有短暫延遲，回到 StepHealth 後下拉重新整理即可。',
      faqQ2: '如何更改每日步數目標？',
      faqA2: '打開 App 的「目標」頁面，即可在「每日步數目標」中調整。目標會儲存在你的裝置上。',
      faqQ3: '如何恢復 Pro 購買？',
      faqA3: '在 App 的「我的 > StepHealth Pro」中選擇「恢復購買」。購買與恢復均透過 Apple 帳號處理。',
      faqQ4: '如何管理健康資料權限？',
      faqA4: '前往 iPhone「健康」App，點擊你的頭像後選擇「App 與服務」，再找到 StepHealth，即可查看或變更存取權限。'
    },

    ja: {
      pageTitle: 'StepHealth - 毎日の一歩を、見える形に。',
      pageDesc: 'StepHealth は、シンプルでプライバシーに配慮した毎日の歩数計アプリ。Apple ヘルスケアと連携して、毎日の活動リズムを読み解きます。',
      langAria: '言語を選択',
      backHome: '← ホームへ戻る',
      brandAria: 'StepHealth ホーム',
      navAria: 'メインナビゲーション',

      navFeatures: '機能',
      navPrivacy: 'プライバシー',
      navDownload: 'アプリをダウンロード <span>↗</span>',
      menuAria: 'メニューを開く',
      heroEyebrow: '毎日のアクティビティのために',
      heroTitle: '一歩一歩が、<br /><em>ちゃんと見えている。</em>',
      heroDesc: 'StepHealth は Apple ヘルスケアのアクティビティデータを、わかりやすくて温かい毎日の記録に変えます。複雑なトレーニングプランは不要。ただ、もっと遠くへ歩きたくなる習慣を。',
      storeAria: 'App Store で StepHealth をダウンロード',
      storeBadge: '<small>App Store から</small>ダウンロード',
      exploreLink: '機能を見る <span>↓</span>',
      heroProof: 'より心地よい毎日のために',
      phoneAria: 'StepHealth 今日のアクティビティ画面のイメージ',
      tagStreak: '12 日連続',
      tagStreakSub: 'リズムをキープ',
      tagKmSub: '今日の距離',
      tagGoal: '目標達成',
      tagGoalSub: '今日もよく頑張りました',
      phoneDate: '金曜日 8 月 7 日',
      phoneRefresh: '更新',
      phoneHeadline: '今日もよく歩きました。',
      phoneSteps: '歩',
      phoneGoal: '目標 8,000 歩',
      phoneComplete: '<span>✓</span> 今日の目標を達成',
      phoneDist: '距離',
      phoneCal: '活動カロリー',
      phoneEqLabel: 'およそ',
      phoneEqValue: 'りんご 3 個分のカロリー',
      introQuote: '誰かに追いつく必要はない。<br />ただ昨日の自分より、もう一歩。',
      introMark: '自分のペースは<br />自分で決める',
      featEyebrow: 'シンプルで、わかりやすく',
      featTitle: 'アクティビティを、<br /><em>毎日開きたくなるものに。</em>',
      featIndex1: '01 / 今日',
      featTitle1: '一目でわかる<br />今日の歩み',
      featDesc1: '歩数・距離・活動カロリー・目標の進捗を、いちばん大事な場所にまとめて表示。',
      featRingNote: '106% 達成',
      featIndex2: '02 / トレンド',
      featTitle2: 'つづけたことが<br />見えてくる',
      featDesc2: '週ごと・月ごとに、あなたの活動の軌跡を振り返れます。',
      featChartNote: '今週の平均 <b>7,840</b> 歩',
      featIndex3: '03 / 目標',
      featTitle3: 'がんばりすぎない<br />小さなエール',
      featDesc3: '自分に合った目標を設定して、無理なくリズムを保ちましょう。',
      featIndex4: '04 / 楽しい換算',
      featTitle4: '数字が、ぐっと身近になる。',
      featDesc4: 'りんごのカロリーやトラックの周回数など、身近な言葉で毎日の一歩を実感できます。',
      featEqNote: '約<br /><b>95</b><br />kcal',
      privacyEyebrow: 'あなたのデータはあなたのもの',
      privacyTitle: '健康データは、商品じゃない。',
      privacyDesc: 'StepHealth は Apple ヘルスケアからアクティビティを読み取り、データは主に端末上で処理されます。健康データの販売はせず、広告トラッキングもなく、アカウント登録も不要です。',
      privacyLink: 'プライバシーポリシーを読む <span>↗</span>',
      proEyebrow: 'StepHealth Pro',
      proTitle: 'もっと遠くへ歩きたいあなたへ。',
      proSub: '一度の購入で、続けてきた日々をしっかり残せます。',
      proCardTitle: 'StepHealth<br /><em>Pro 買い切り版</em>',
      proCardDesc: '完全な履歴、より深いインサイト、レポートの書き出し、専用ウィジェットと、さらに細かなカスタマイズ。',
      proLearn: 'Pro について <span>↗</span>',
      proLi1: '年間・全履歴のトレンド',
      proLi2: '週次・月次レポートと書き出し',
      proLi3: '複数の目標プランとリマインダー',
      proLi4: '専用ウィジェットとテーマ',
      closingEyebrow: '今日からはじめよう',
      closingTitle: '自分のペースで<br /><em>一歩ずつ。</em>',
      closingDesc: '完璧なスタートは必要ありません。いまのあなたで、もう十分。',
      footerSlogan: '一歩一歩が、意味を持つ。',
      footerPrivacy: 'プライバシーポリシー',
      footerSupport: 'サポートとフィードバック',

      privacyPageTitle: 'プライバシーポリシー - StepHealth',
      privacyPageDesc: 'StepHealth プライバシーポリシー',
      privacyH1: 'プライバシーポリシー',
      privacyUpdated: '最終更新日：2026 年 8 月 7 日',
      privacyIntro: 'StepHealth は、プライバシーを大切にする日常活動記録アプリです。どのデータが機能提供に使われ、どのように守られるのかを、明確に知っておいていただきたいと考えています。',
      privacyS1H: '取り扱うデータ',
      privacyS1P: 'システムの許可を得た後、StepHealth は Apple ヘルスケアから歩数・歩行／ランニング距離・活動エネルギーを読み取ります。これらのデータは、アプリ内で今日のアクティビティ・トレンド・目標の進捗・関連する見積もりを表示するためだけに使用します。iPhone の「ヘルスケア」または「設定」からいつでも許可を取り消せます。',
      privacyS2H: 'データの保存と利用',
      privacyS2P: '健康データは主に端末のローカルで処理されます。StepHealth は健康データを販売せず、広告やアプリをまたぐトラッキング、マーケティングプロファイルの作成にも使用しません。iCloud 同期を有効にした場合、同期されるのは目標・設定・プランのみで、個人の iCloud アカウントを通じて行われます。Apple ヘルスケアの歩数データが StepHealth からアップロードされることはありません。',
      privacyS3H: 'サードパーティサービス',
      privacyS3P: 'StepHealth は、許可された健康データの読み取りと購入処理のために、Apple 提供の HealthKit と StoreKit を使用します。これらのサービスは Apple のプライバシーポリシーに従います。健康データを広告ネットワークに販売・共有することはありません。',
      privacyS4H: 'あなたの選択',
      privacyS4P: '健康データへのアクセス権はいつでも取り消せます。アプリのローカルデータを削除したり、Apple のサブスクリプション・購入設定から購入を管理したりすることも可能です。取り消した後、StepHealth は対応する健康データを読み取れなくなります。',
      privacyS5H: 'お問い合わせ',
      privacyS5P: '本ポリシーや個人データについてご質問がある場合は、<a href="support.html">サポート・フィードバックページ</a>からご連絡ください。',
      privacyS6H: 'ポリシーの更新',
      privacyS6P: '本ポリシーに重大な変更がある場合は、このページの公開日を更新します。StepHealth を使い続けることは、更新後のポリシーに同意したものとみなされます。',

      supportPageTitle: 'サポートとフィードバック - StepHealth',
      supportPageDesc: 'StepHealth サポートとフィードバック',
      supportH1: 'サポートとフィードバック',
      supportTagline: 'あなたの声を聞かせてください。',
      supportIntro: '使い方のご質問、機能のご提案、歩きつづけた日々のストーリーなど、どんなことでもお気軽にご連絡ください。',
      supportS1H: 'サポートチームへの連絡',
      supportEmail: 'メールは <a href="mailto:lidonghui11911@gmail.com">lidonghui11911@gmail.com</a> までお送りください。',
      supportHint: 'メールに App のバージョン・iPhone の機種・問題のスクリーンショットを添えていただくと、より早く解決できます。',
      supportFaqH: 'よくある質問',
      faqQ1: '歩数が更新されないのはなぜ？',
      faqA1: 'システムのダイアログで StepHealth による Apple ヘルスケアの読み取りを許可しているかご確認ください。また「ヘルスケア」App に当日の記録があるかも確認してください。健康データの同期には短い遅延が生じることがあります。StepHealth に戻って下に引っ張って更新してみてください。',
      faqQ2: '毎日の歩数目標はどう変更する？',
      faqA2: 'アプリの「目標」画面を開き、「毎日の歩数目標」で調整できます。目標は端末に保存されます。',
      faqQ3: 'Pro の購入はどう復元する？',
      faqA3: 'アプリの「マイ > StepHealth Pro」から「購入を復元」を選択してください。購入と復元はすべて Apple アカウントを通じて処理されます。',
      faqQ4: '健康データのアクセス権限はどう管理する？',
      faqA4: 'iPhone の「ヘルスケア」App を開き、プロフィールをタップして「App とサービス」を選び、StepHealth を見つけると、アクセス権限の確認・変更ができます。'
    },

    en: {
      pageTitle: 'StepHealth - See Every Step You Take',
      pageDesc: 'StepHealth is a simple, privacy-first daily step counter. Connect Apple Health and see the rhythm of your every day.',
      langAria: 'Select language',
      backHome: '← Back to home',
      brandAria: 'StepHealth home',
      navAria: 'Main navigation',

      navFeatures: 'Features',
      navPrivacy: 'Privacy',
      navDownload: 'Download the app <span>↗</span>',
      menuAria: 'Open menu',
      heroEyebrow: 'Made for everyday movement',
      heroTitle: 'Every step counts.<br /><em>And every step deserves to be seen.</em>',
      heroDesc: 'StepHealth turns your activity data from Apple Health into a clear, warm daily record. No complicated training plans — just habits that help you walk further.',
      storeAria: 'Download StepHealth on the App Store',
      storeBadge: '<small>Download on the</small>App Store',
      exploreLink: 'Explore features <span>↓</span>',
      heroProof: 'Designed for more easeful days',
      phoneAria: 'StepHealth Today screen preview',
      tagStreak: '12-day streak',
      tagStreakSub: 'Keep your rhythm',
      tagKmSub: "Today's distance",
      tagGoal: 'Goal reached',
      tagGoalSub: "You're doing great today",
      phoneDate: 'Friday, August 7',
      phoneRefresh: 'Refresh',
      phoneHeadline: 'Nice walking today.',
      phoneSteps: 'steps',
      phoneGoal: 'Goal: 8,000 steps',
      phoneComplete: '<span>✓</span> Daily goal reached',
      phoneDist: 'Distance',
      phoneCal: 'Active energy',
      phoneEqLabel: 'About',
      phoneEqValue: '3 apples of energy',
      introQuote: 'You don\'t need to catch up with anyone.<br />Just take one more step than yesterday.',
      introMark: 'Your pace,<br />your call',
      featEyebrow: 'Clear, never complicated',
      featTitle: 'Turn activity into<br /><em>something you open every day.</em>',
      featIndex1: '01 / Today',
      featTitle1: 'See at a glance<br />how far you went today',
      featDesc1: 'Steps, distance, active energy and goal progress — all in the most important place.',
      featRingNote: '106% done',
      featIndex2: '02 / Trends',
      featTitle2: 'Make your persistence<br />visible',
      featDesc2: 'Look back on your own activity story, week by week and month by month.',
      featChartNote: 'Weekly average <b>7,840</b> steps',
      featIndex3: '03 / Goals',
      featTitle3: 'Gentle nudges,<br />no pressure',
      featDesc3: 'Set goals that fit you, and keep your rhythm with kindness.',
      featIndex4: '04 / Fun conversions',
      featTitle4: 'Numbers become vivid.',
      featDesc4: 'Understand every outing in everyday terms — apple calories, track laps and more.',
      featEqNote: '≈<br /><b>95</b><br />kcal',
      privacyEyebrow: 'Your data, yours alone',
      privacyTitle: 'Health data should not be a commodity.',
      privacyDesc: 'StepHealth reads your activity records through Apple Health, and your data is mainly processed on your device. We don\'t sell health data, we don\'t do ad tracking, and no account is needed.',
      privacyLink: 'Read the Privacy Policy <span>↗</span>',
      proEyebrow: 'StepHealth Pro',
      proTitle: 'For those who want to walk further.',
      proSub: 'Unlock once, and keep every stretch of persistence beautifully archived.',
      proCardTitle: 'StepHealth<br /><em>Pro — Lifetime</em>',
      proCardDesc: 'Full history, deeper insights, report exports, exclusive widgets and more personalization.',
      proLearn: 'Learn about Pro <span>↗</span>',
      proLi1: 'Yearly and full history trends',
      proLi2: 'Weekly and monthly reports and export',
      proLi3: 'Multiple goal plans and reminders',
      proLi4: 'Exclusive widgets and themes',
      closingEyebrow: 'Start today',
      closingTitle: 'Walk your own<br /><em>every step.</em>',
      closingDesc: 'You don\'t need a perfect start. Right now, this is already good.',
      footerSlogan: 'Every step counts.',
      footerPrivacy: 'Privacy Policy',
      footerSupport: 'Support & Feedback',

      privacyPageTitle: 'Privacy Policy - StepHealth',
      privacyPageDesc: 'StepHealth Privacy Policy',
      privacyH1: 'Privacy Policy',
      privacyUpdated: 'Last updated: August 7, 2026',
      privacyIntro: 'StepHealth is a privacy-first daily activity journal. We want you to clearly understand which data powers our features and how it is protected.',
      privacyS1H: 'Data we process',
      privacyS1P: 'After you grant permission, StepHealth reads steps, walking/running distance and active energy data from Apple Health. This data is used only to show you today\'s activity, trends, goal progress and related estimates in the app. You can revoke access at any time in the Health app or in Settings on your iPhone.',
      privacyS2H: 'How data is stored and used',
      privacyS2P: 'Health data is mainly processed locally on your device. StepHealth does not sell your health data, use it for advertising or cross-app tracking, or build marketing profiles. If you enable iCloud sync, only your goals, preferences and plans sync through your personal iCloud account; step data in Apple Health is never uploaded by StepHealth.',
      privacyS3H: 'Third-party services',
      privacyS3P: 'StepHealth uses Apple\'s HealthKit and StoreKit services to read your authorized health data and process purchases. Those services are governed by Apple\'s privacy policy. We never sell or share health data with advertising networks.',
      privacyS4H: 'Your choices',
      privacyS4P: 'You can revoke health data access, delete the app\'s local data, or manage your purchases through Apple\'s subscription and purchase settings at any time. Once revoked, StepHealth can no longer read the corresponding health data.',
      privacyS5H: 'Contact us',
      privacyS5P: 'If you have questions about this policy or your personal data, please contact us through the <a href="support.html">support page</a>.',
      privacyS6H: 'Policy updates',
      privacyS6P: 'If we make significant changes to this policy, we will update the publication date on this page. Continued use of StepHealth means you accept the updated policy.',

      supportPageTitle: 'Support & Feedback - StepHealth',
      supportPageDesc: 'StepHealth Support & Feedback',
      supportH1: 'Support & Feedback',
      supportTagline: 'We\'d love to hear from you.',
      supportIntro: 'Usage questions, feature suggestions, or stories about how persistence has carried you — feel free to reach out.',
      supportS1H: 'Contact the support team',
      supportEmail: 'Please email <a href="mailto:lidonghui11911@gmail.com">lidonghui11911@gmail.com</a>.',
      supportHint: 'Including your app version, iPhone model and screenshots of the issue helps us resolve it faster.',
      supportFaqH: 'FAQ',
      faqQ1: 'Why isn\'t my step count updating?',
      faqA1: 'Make sure you allowed StepHealth to read Apple Health data when prompted, and confirm that the Health app has records for today. Health data sync can lag briefly — pull to refresh after returning to StepHealth.',
      faqQ2: 'How do I change my daily step goal?',
      faqA2: 'Open the Goals screen in the app and adjust your daily step goal there. Your goal is saved on your device.',
      faqQ3: 'How do I restore my Pro purchase?',
      faqA3: 'In the app, go to My > StepHealth Pro and choose Restore Purchases. Purchases and restores are handled through your Apple Account.',
      faqQ4: 'How do I manage health data permissions?',
      faqA4: 'Open the Health app on your iPhone, tap your profile, select Apps & Services, then find StepHealth to review or change its access.'
    }
  };

  /* ---------- 工具 ---------- */

  function normalize(raw) {
    if (!raw) return null;
    var v = String(raw).toLowerCase().replace(/_/g, '-');
    if (v === 'zh-cn' || v === 'zh-sg' || v === 'zh-hans' || v === 'zh') return 'zh-CN';
    if (v.indexOf('zh') === 0) return 'zh-TW'; // zh-tw / zh-hk / zh-mo / zh-hant
    if (v.indexOf('ja') === 0) return 'ja';
    if (v.indexOf('en') === 0) return 'en';
    return null;
  }

  function urlLang() {
    try {
      var m = location.search.match(/[?&]lang=([^&]+)/);
      if (m) return normalize(decodeURIComponent(m[1]));
    } catch (e) { /* ignore */ }
    return null;
  }

  function storedLang() {
    try { return normalize(localStorage.getItem(STORAGE_KEY)); }
    catch (e) { return null; }
  }

  function navLang() {
    var raw = navigator.language || (navigator.languages && navigator.languages[0]) || '';
    return normalize(raw);
  }

  function resolveLang() {
    return urlLang() || storedLang() || navLang() || 'zh-CN';
  }

  function translate(lang, key) {
    var dict = DICT[lang] || DICT['zh-CN'];
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    if (lang !== 'zh-CN' && Object.prototype.hasOwnProperty.call(DICT['zh-CN'], key)) {
      if (typeof console !== 'undefined' && console.warn) console.warn('[i18n] fallback zh-CN for "' + lang + '": ' + key);
      return DICT['zh-CN'][key];
    }
    if (typeof console !== 'undefined' && console.warn) console.warn('[i18n] missing key: ' + key);
    return '';
  }

  /* ---------- 应用语言 ---------- */

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'zh-CN';
    document.documentElement.setAttribute('lang', lang);

    var i, els, el, key;

    els = document.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute('data-i18n-title');
      document.title = translate(lang, key);
    }

    els = document.querySelectorAll('[data-i18n-description]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute('data-i18n-description');
      el.setAttribute('content', translate(lang, key));
    }

    els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute('data-i18n');
      el.textContent = translate(lang, key);
    }

    els = document.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute('data-i18n-html');
      el.innerHTML = translate(lang, key);
    }

    els = document.querySelectorAll('[data-i18n-attr-aria-label]');
    for (i = 0; i < els.length; i++) {
      el = els[i];
      key = el.getAttribute('data-i18n-attr-aria-label');
      el.setAttribute('aria-label', translate(lang, key));
    }

    var sel = document.querySelector('.lang-select');
    if (sel) sel.value = lang;

    // 同步 <html lang> 上的字体变量（CSS 通过 html[lang] 切换字体栈）
    document.documentElement.classList.remove('i18n-boot');
  }

  /* ---------- 事件绑定 ---------- */

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.classList && t.classList.contains('lang-select') && t.value) {
      try { localStorage.setItem(STORAGE_KEY, t.value); } catch (err) { /* ignore */ }
      apply(t.value);
    }
  });

  function boot() {
    var lang = resolveLang();
    document.documentElement.setAttribute('lang', lang); // 与 i18n-boot.js 结果保持一致
    apply(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.StepHealthI18n = {
    apply: apply,
    resolve: resolveLang
  };
})();
