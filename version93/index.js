import hilite from './hilite.js';

const sleep = ms => new Promise(res => setTimeout(res, ms));

// fix for qybele triggering prism grammar error
// when going to another article (not when loading fresh hard reload)
// based on us replacing throw grammar error in dist with call to the function below
globalThis._reloadOnGrammarError = () => {
  localStorage.restoreJsResourceMenuScrollPosTo =
    document.querySelector('#js-resource_menu').scrollTop;
  location.reload();
};

if (localStorage.restoreJsResourceMenuScrollPosTo) {
  let pos = localStorage.restoreJsResourceMenuScrollPosTo;
  delete localStorage.restoreJsResourceMenuScrollPosTo;
  while (!document.querySelector('#js-resource_menu')) {
    await sleep(100);
    document.querySelector('#js-resource_menu').scrollTop = pos;
  }
}
// end fix

const g = globalThis;
g.__qybele_interactive_hilite = hilite;

let hasRun = false;
async function boot(content) {
  while (true) {
    content = content || $('section.module_content');
    if (content.length) { break; }
    await sleep(200);
  }
  hilite();
  // width adjustment
  //let els = $('.resource_content_container, .module_content, .admin_tools');
  // els.css({ maxWidth: 850 });
  if (!hasRun) { // once!
    // add stylesheet
    let dir = import.meta.url.split('/').slice(0, -1).join('/');
    $('head').append(`<link rel="stylesheet" href="${dir}/css/tables-and-figures.css">`);
    // open external links in a new window
    document.body.addEventListener('click', e => {
      let a = e.target.closest('section.module_content a');
      if (!a) { return; }
      let href = a.getAttribute('href');
      if (!href) { return; }
      if (href.startsWith('http')) {
        a.setAttribute('target', '_blank');
      }
    });
    // follow links on images that have links in url/src
    document.body.addEventListener('click', e => {
      let img = e.target.closest('section.module_content img[src*="link="]');
      if (!img) { return; }
      let url = 'https://' + img.getAttribute('src').split('link=')[1].split('&')[0];
      globalThis.open(url, '_blank');
    });
  }
  hasRun = true;
};

// Entry point - boot
g.__qyinterstartBoot = () => {
  boot();
};