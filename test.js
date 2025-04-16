const dir = document.currentScript.getAttribute('src').split('/').slice(0, -1).join('/');
const moduleScriptTag = document.createElement('script');
moduleScriptTag.setAttribute('src', dir + '/test2.js?tag=1234');
moduleScriptTag.setAttribute('type', 'module');
document.body.append(moduleScriptTag);