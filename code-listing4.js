const article = document.currentScript.parentElement.parentElement;
const section = article.querySelector('section.module_content');
console.log(section.innerHTML);
//article.innerHTML += '<p>This is some extra content</p>';
