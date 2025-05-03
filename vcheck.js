(() => {
  const g = globalThis;

  // A global store (abstraction of localStorage)
  if (!g._qyistore) {
    const p = '_qyistore';
    try {
      g[p] = JSON.parse(localStorage[p]);
    }
    catch (_e) { g[p] = {}; }
    g[p].save = function () {
      localStorage[p] = JSON.stringify(this);
    };
    g[p].clear = () => {
      g[p] = {};
      localStorage[p] = '{}';
    };
  }

  // Check the version to load
  async function checkVersion() {
    let storedVersion = g._qyistore.version;
    let onlineVersion = await (await fetch('https://raw.githubusercontent.com/ironboy/qybele-interactive/refs/heads/main/version.txt')).text();
    if (storedVersion !== onlineVersion) {
      g._qyistore.version = onlineVersion;
      g._qyistore.save();
      location.reload();
    }
  }

  // Load the correct version of the boot script
  g.__qyinterstart = () => {
    checkVersion();
    let version = g._qyistore.version;
    if (!version) { return; }
    if (!document.querySelector('script#qybele-interactive-script')) {
      let s = document.createElement('script');
      s.setAttribute('id', 'qybele-interactive-script');
      s.setAttribute('type', 'module');
      s.setAttribute('src', `https://cdn.jsdelivr.net/gh/ironboy/qybele-interactive/version${version}/index.js`);
      document.querySelector('head').append(s);
    }
    (function s() {
      g.__qyinterstartBoot ? g.__qyinterstartBoot() : setTimeout(s, 20);
    })();

  };
})();