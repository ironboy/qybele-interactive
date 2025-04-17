/*
  ironboy 2025
  Add a script (through the title in Qybele editing)
  that can post process content

  The reason for this boot loader is that we want
  to run our script as an ES Module, but we need the
  element with the content to postprocess and get
  that from using document.currentScript
  which is not available in ES Modules.

  Also gets the version from GitHub directly
  so that we can ask jsdelivr for the right version folder

  So here we get the content element and load the es6 module (index.js)
*/

// A small abstraction for local storage
if (!globalThis._qyistore) {
  const g = globalThis, p = '_qyistore';
  try {
    g[p] = JSON.parse(localStorage[p]);
  }
  catch (_e) { g[p] = {}; }
  g[p].save = function () {
    localStorage[p] = JSON.stringify(this, null, '  ');
  };
  g[p].clear = function () {
    g[p] = {};
    localStorage[p] = '{}';
  };
}

// Boot up
(() => {

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  async function addModuleScript(currentScript, version) {
    if (document.querySelector('head script#qybele-interactive-nh')) { return; }
    let src = currentScript.getAttribute('src');
    const dir = src.split('/').slice(0, -1).join('/');
    const moduleScriptTag = document.createElement('script');
    moduleScriptTag.setAttribute('src', dir + `/version${version}/index.js`);
    moduleScriptTag.setAttribute('type', 'module');
    moduleScriptTag.setAttribute('id', 'qybele-interactive-nh');
    document.querySelector('head').append(moduleScriptTag);
  }

  async function waitForContent(currentScript) {
    let $ = jQuery;
    const thisScriptTag = $(currentScript);
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

  function hideCodeListingsInitially() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      pre[data-code-details]{
        visibility:hidden !important;
      }
    `;
  }

  async function checkVersion() {
    let storedVersion = globalThis._qyistore.version;
    let onlineVersion = await (await fetch('https://raw.githubusercontent.com/ironboy/qybele-interactive/refs/heads/main/version.txt')).text();
    if (storedVersion !== onlineVersion) {
      globalThis._qyistore.version = onlineVersion;
      globalThis._qyistore.save();
      location.reload();
    }
  }

  async function boot() {
    let scriptTag = document.currentScript;
    checkVersion();
    let version = globalThis._qyistore.version;
    if (!version) { return; }
    console.info('Qybele Interactive v', version);
    hideCodeListingsInitially();
    await addModuleScript(scriptTag, version);
    const content = await waitForContent(scriptTag);
    const attr = 'data-qybele-interactive-post-processing-done';
    if (content.attr(attr) !== 'yes') {
      while (true) {
        if (globalThis.__qybeleInteractiveMain) { break; }
        await sleep(20);
      }
      globalThis.__qybeleInteractiveMain(content);
      content.attr(attr, 'yes');
    }
  }

  boot();
})();