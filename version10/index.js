// import testAddContent from './testAddContent.js';
import hilite from './hilite.js';

globalThis.__qybeleInteractiveMain = async function (content) {
  hilite(content);
  // testAddContent(content);
};