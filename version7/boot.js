/*
  ironboy 2025
  Add a script (through the title in Qybele editing)
  that can post process content

  The reason for this boot loader is that we want
  to run our script as an ES Module, but we need the
  element with the content to postprocess and get
  that from using document.currentScript
  which is not available in ES Modules.

  So here we get the content element and load the es6 module (index.js)
*/
(() => {

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  function addModuleScript() {
    if (document.querySelector('head script#qybele-interactive-nh')) { return; }
    const dir = document.currentScript.getAttribute('src').split('/').slice(0, -1).join('/');
    const moduleScriptTag = document.createElement('script');
    moduleScriptTag.setAttribute('src', dir + '/index.js');
    moduleScriptTag.setAttribute('type', 'module');
    moduleScriptTag.setAttribute('id', 'qybele-interactive-nh');
    document.querySelector('head').append(moduleScriptTag);
  }

  async function waitForContent() {
    let $ = jQuery;
    const thisScriptTag = $(document.currentScript);
    const htmlStructure = [...thisScriptTag.parents()];
    const mainParent = htmlStructure[1];
    let content;
    while (true) {
      content = $(mainParent).find('.module_content');
      if (content.html()) { break; }
      await sleep(20);
    }
    return content;
  }

  async function boot() {
    addModuleScript();
    const content = await waitForContent();
    while (true) {
      if (globalThis.__qybeleInteractiveMain) { break; }
      await sleep(20);
    }
    const attr = 'data-qybele-interactive-post-processing-done';
    if (content.attr(attr) !== 'yes') {
      await globalThis.__qybeleInteractiveMain(content);
      content.attr(attr, 'yes');
    }
  }
  boot();
})();
