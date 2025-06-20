import './hilighter/dist.js';

// Don't collide CSS with Prism loaded by Qybele initially
const cssLink = document.querySelector('link[href*="prism"]');
cssLink && cssLink.remove();

export default function hilite() {
  $('pre[data-code-details]').each(function () {
    let orgHtml = $(this).html();
    let html = orgHtml
      .replace(/<br>/g, '\n')
      // special full width less than and greater than here! important!
      .replace(/＜/g, '&lt;')
      .replace(/＞/g, '&gt;');
    let settings = $(this).attr('data-code-details');
    if (!settings.split('[')[0]) {
      settings = 'markdown' + settings;
    }
    html = `<pre data-code-details="${settings}">${html}</pre>`;
    let div = $(`<div>${orgHtml}</div>`);
    $(this).replaceWith(div);
    globalThis.__qybeleInteractivePrismCodeList(div[0], html, true);
  });
}