import hilite from './hilite.js';

const sleep = ms => new Promise(res => setTimeout(res, ms));

let hasRun = false;
globalThis.__qybeleInteractiveMain = async function (content) {
  // if (hasRun) { return; }
  hasRun = true;
  while (true) {
    content = content || $('section.module_content');
    if (content.length) { break; }
    await sleep(200);
  }
  hilite(content);
  let dir = import.meta.url.split('/').slice(0, -1).join('/');
  $('head').append(`<link rel="stylesheet" href="${dir}/css/tables-and-figures.css">`);
  // open external links in a new window
  content[0] && content[0].addEventListener('click', e => {
    let a = e.target.closest('a');
    if (!a) { return; }
    let href = a.getAttribute('href');
    if (!href) { return; }
    if (href.startsWith('http')) {
      a.setAttribute('target', '_blank');
    }
  });
  // follow links on images that have links in url/src
  content[0] && content[0].addEventListener('click', e => {
    let img = e.target.closest('img[src*="link="]');
    if (!img) { return; }
    let url = 'https://' + img.getAttribute('src').split('link=')[1].split('&')[0];
    globalThis.open(url, '_blank');
  });
};

globalThis.__qybeleInteractiveMain();