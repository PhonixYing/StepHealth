/* StepHealth i18n boot —— 必须在 <body> 渲染前同步执行：
   1) 尽早确定语言并写入 <html lang>
   2) 非默认语言时给 <html> 加 .i18n-boot（CSS 隐藏 body，避免首帧闪现简体中文）
   3) 按语言把 Google Fonts 链接中的 CJK 字体族换成对应语言的字体 */
(function () {
  'use strict';
  var STORE = 'stephealth_lang';
  var DEFAULT_LANG = 'zh-CN';

  function normalize(raw) {
    if (!raw) return null;
    var v = String(raw).toLowerCase().replace(/_/g, '-');
    if (v === 'zh-cn' || v === 'zh-sg' || v === 'zh-hans' || v === 'zh') return 'zh-CN';
    if (v.indexOf('zh') === 0) return 'zh-TW'; // zh-tw / zh-hk / zh-mo / zh-hant
    if (v.indexOf('ja') === 0) return 'ja';
    if (v.indexOf('en') === 0) return 'en';
    return null;
  }

  var lang = DEFAULT_LANG;
  try {
    var m = window.location.search.match(/[?&]lang=([^&]+)/);
    if (m) {
      var q = normalize(decodeURIComponent(m[1]));
      if (q) lang = q;
    } else {
      var st = normalize(window.localStorage.getItem(STORE));
      if (st) {
        lang = st;
      } else {
        var n = normalize(window.navigator.language || '');
        if (n) lang = n;
      }
    }
  } catch (e) { /* 隐私模式等场景忽略 */ }

  document.documentElement.setAttribute('lang', lang);
  if (lang !== DEFAULT_LANG) document.documentElement.classList.add('i18n-boot');

  var link = document.querySelector('link[data-fonts]');
  if (link) {
    var cjk = 'Noto Sans SC';
    if (lang === 'zh-TW') cjk = 'Noto Sans TC';
    else if (lang === 'ja') cjk = 'Noto Sans JP';
    var orig = link.getAttribute('href');
    link.setAttribute('data-fonts-base', orig);
    link.setAttribute('href', orig.replace(/family=Noto\+Sans\+SC/g, 'family=' + cjk.replace(/ /g, '+')));
  }

  // 兜底：若 i18n.js 未能加载（如被网络拦截），2s 后强制显示页面，避免永久空白
  setTimeout(function () {
    document.documentElement.classList.remove('i18n-boot');
  }, 2000);
})();
