export default function saverMod(...args) {
  let orgSubmit = jQuery.fn.submit;
  jQuery.fn.submit = function (...args) {
    let content = {};
    for (let el of this[0].elements) {
      el.value && (content[el.name] = el.value);
    }
    let specialSend =
      ['resource_id', 'module_id', 'strTitle', 'strBody']
        .every(x => content[x]);
    if (specialSend) {
      let m = content.strBody.replace(/\\x3C/g, '<');
      m = m.replace(/<script[^>]*[^<]*<\/script>/g, '');
      m += globalThis.bodyInject;
      content.strBody = m;
      saveContentInQybele(content);
      return;
    }
    console.log(specialSend, content);
    //orgSubmit.apply(this, args);
  };
}

function saveContentInQybele(content) {
  let f = document.createElement('form');
  f.setAttribute('action', '/learning/article/admin/');
  f.setAttribute('method', 'post');
  let html = '';
  for (let { type, name } of formDescription()) {
    let realType = type === 'hidden' ? 'hidden' : 'text';
    html += `<input name="${name}" type="${realType}">`;
  }
  f.innerHTML = html;
  for (let name in content) {
    f.elements[name].value = content[name];
  }
  const g = globalThis;
  g.qyDoc.body.append(f);
  g.skipMainRenderOnNextLoad = true;
  f.submit();
}

function formDescription() {
  return [
    {
      "name": "strTitle",
      "type": "text",
      "value": ""
    },
    {
      "name": "strDescription",
      "type": "textarea",
      "value": ""
    },
    {
      "name": "type_select",
      "type": "select-one",
      "value": "illustration"
    },
    {
      "name": "sortableinput",
      "type": "text",
      "value": ""
    },
    {
      "name": "strBody",
      "type": "textarea",
      "value": ""
    },
    {
      "name": "tagfinderinput",
      "type": "text",
      "value": ""
    },
    {
      "name": "resource_id",
      "type": "hidden",
      "value": ""
    },
    {
      "name": "iRevision",
      "type": "hidden",
      "value": ""
    },
    {
      "name": "module_id",
      "type": "hidden",
      "value": ""
    },
    {
      "name": "pubto",
      "type": "hidden",
      "value": ""
    },
    {
      "name": "returnto",
      "type": "hidden",
      "value": ""
    }
  ];
}
