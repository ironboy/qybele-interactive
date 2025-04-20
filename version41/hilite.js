import './hilighter/dist.js';

// Don't collide CSS with Prism loaded by Qybele initially
const cssLink = document.querySelector('link[href*="prism"]');
cssLink && cssLink.remove();

export default function hilite() {
  $('pre[data-code-details]').each(function () {
    if ($(this).parents('[data-qybele-interactive-post-processing-done="yes"]').length) { return; }
    let orgHtml = $(this).html();
    let html = orgHtml
      .replace(/<br>/g, '\n')
      .replace(/℅/g, '&lt;')
      .replace(/℆/g, '&gt;');
    let settings = $(this).attr('data-code-details');
    html = `<pre data-code-details="${settings}">${html}</pre>`;
    let div = $(`<div>${orgHtml}</div>`);
    $(this).replaceWith(div);
    globalThis.__qybeleInteractivePrismCodeList(div[0], html, true);
  });
}