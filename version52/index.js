import hilite from './hilite.js';

globalThis.__qybeleInteractiveMain = async function (content) {
  console.log("HI", content);
  hilite(content);
  let dir = import.meta.url.split('/').slice(0, -1).join('/');
  $('head').append(`<link rel="stylesheet" href="${dir}/css/tables-and-figures.css">`);
};