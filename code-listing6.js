function start() {
  const article = document.currentScript.parentElement.parentElement;
  const section = article.querySelector('section.module_content');
  if (!section) { setTimeout(start, 10); return; }
  console.log(section.innerHTML);
  //article.innerHTML += '<p>This is some extra content</p>';
}

start();
