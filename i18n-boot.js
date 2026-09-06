/* StepHealth i18n boot —— 必须在 <body> 渲染前同步执行：
   1) 尽早确定语言并写入 <html lang>
   2) 非默认语言时给 <html> 加 .i18n-boot（CSS 隐藏 body，避免首帧闪现英文基底文案）
   3) 按语言设置 dir（ar → rtl，首帧即正确方向）
   4) 按语言把 Google Fonts 链接中的 CJK/阿拉伯字体族换成对应语言的字体 */
(function () {
  'use strict';
  var STORE = 'stephealth_lang';
  var DEFAULT_LANG = 'en';
  var RTL_LANGS = ['ar'];

  function normalize(raw) {
    if (!raw) return null;
    var v = String(raw).toLowerCase().replace(/_/g, '-');
    // 旧码兼容：zh-CN → zh-Hans、zh-TW → zh-Hant（localStorage 旧值与 ?lang=zh-CN/zh-TW 链接）
    if (v === 'zh' || v === 'zh-cn' || v === 'zh-sg' || v === 'zh-hans') return 'zh-Hans';
    if (v === 'zh-tw' || v === 'zh-hk' || v === 'zh-mo' || v === 'zh-hant') return 'zh-Hant';
    if (v.indexOf('zh-hans') === 0) return 'zh-Hans'; // zh-Hans-SG / zh-Hans-CN ...
    if (v.indexOf('zh-hant') === 0) return 'zh-Hant'; // zh-Hant-HK / zh-Hant-TW ...
    if (v.indexOf('zh') === 0) return 'zh-Hant'; // 其余 zh-* 地区变体沿用繁体（zh-hk/zh-mo 等）
    if (v.indexOf('pt') === 0) return v === 'pt-pt' ? 'pt-PT' : 'pt-BR'; // 裸 pt 及未指定地区 → pt-BR
    if (v.indexOf('es') === 0) return 'es'; // es / es-419 / es-ES ...
    if (v.indexOf('fr') === 0) return 'fr';
    if (v.indexOf('ar') === 0) return 'ar'; // ar / ar-EG / ar-SA ...
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
      var rawSt = window.localStorage.getItem(STORE);
      var st = normalize(rawSt);
      if (st) {
        lang = st;
        // 旧码 zh-CN / zh-TW → 新码 zh-Hans / zh-Hant，检测到旧码时回写升级
        if (rawSt && st !== rawSt) {
          try { window.localStorage.setItem(STORE, st); } catch (e) { /* ignore */ }
        }
      } else {
        var n = normalize(window.navigator.language || '');
        if (n) lang = n;
      }
    }
  } catch (e) { /* 隐私模式等场景忽略 */ }

  var root = document.documentElement;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', RTL_LANGS.indexOf(lang) !== -1 ? 'rtl' : 'ltr');
  if (lang !== DEFAULT_LANG) root.classList.add('i18n-boot');

  var link = document.querySelector('link[data-fonts]');
  if (link) {
    var cjk = 'Noto Sans SC';
    if (lang === 'zh-Hant') cjk = 'Noto Sans TC';
    else if (lang === 'ja') cjk = 'Noto Sans JP';
    else if (lang === 'ar') cjk = 'Noto Sans Arabic';
    var orig = link.getAttribute('href');
    link.setAttribute('data-fonts-base', orig);
    link.setAttribute('href', orig.replace(/family=Noto\+Sans\+SC/g, 'family=' + cjk.replace(/ /g, '+')));
  }

  // 兜底：若 i18n.js 未能加载（如被网络拦截），2s 后强制显示页面，避免永久空白
  setTimeout(function () {
    document.documentElement.classList.remove('i18n-boot');
  }, 2000);
})();
