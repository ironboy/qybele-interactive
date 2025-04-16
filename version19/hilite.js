import './hilighter/dist.js';

export default function hilite(content) {
  //globalThis.__qybeleInteractivePrismCodeList(document.querySelector('#root'), markdown);
  $('pre[data-code-details]').each(function () {
    let html = $(this).html()
      .replace(/<br>/g, '\n')
      .replace(/℅/g, '&lt;')
      .replace(/℆/g, '&gt;');
    let settings = $(this).attr('data-code-details');
    html = `<pre data-code-details="${settings}">${html}</pre>`;
    let div = $('<div></div>');
    $(this).replaceWith(div);
    globalThis.__qybeleInteractivePrismCodeList(div[0], html, true);
  });
}