let r = parent;
if (!r.document.querySelector('[src="https://cdn.jsdelivr.net/gh/ironboy/qybele-interactive/fire.js"]')) {
  let s = r.document.createElement('script');
  s.setAttribute('src', 'https://cdn.jsdelivr.net/gh/ironboy/qybele-interactive/fire.js');
  r.document.querySelector('head').append(s);
}