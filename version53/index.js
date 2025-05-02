import hilite from './hilite.js';

let hasRun = false;
globalThis.__qybeleInteractiveMain = async function (content) {
  if (hasRun) { return; }
  hasRun = true;
  content = content || $('section.module_content');
  console.log("Check", content);
  hilite(content);
  let dir = import.meta.url.split('/').slice(0, -1).join('/');
  $('head').append(`<link rel="stylesheet" href="${dir}/css/tables-and-figures.css">`);
};

globalThis.__qybeleInteractiveMain();