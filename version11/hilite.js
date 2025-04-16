import 'hilighter/dist.js';

export default function hilite(content) {
  //globalThis.__qybeleInteractivePrismCodeList(document.querySelector('#root'), markdown);
  console.log(globalThis.__qybeleInteractivePrismCodeList);
  $('pre[data-code-details]').each(function () {
    console.log("I SEE YA", this);
  });
}