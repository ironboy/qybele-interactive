import './hilighter/dist.js';

export default function hilite(content) {
  //globalThis.__qybeleInteractivePrismCodeList(document.querySelector('#root'), markdown);
  $('pre[data-code-details]').each(function () {
    let html = $(this).html()
      .replace(/<br>/g, '\n')
      .replace(/℅/g, '&lt;')
      .replace(/℆/g, '&t;');
    globalThis.__qybeleInteractivePrismCodeList(this, html, true);
  });
}