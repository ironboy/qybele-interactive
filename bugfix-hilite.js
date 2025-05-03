import fs from 'fs';
import path from 'path';

let dir = path.join(import.meta.dirname);
let distPath = path.join(fs.readdirSync(dir).filter(x => x.match(/version\d{1,}$/))[0], 'hilighter', 'dist.js');
let content = fs.readFileSync(distPath, 'utf-8');
let oldContent = content;
content = content.replaceAll(`throw new Error('The language "'+D.language+'" has no grammar.')`, 'location.reload()');
oldContent !== content ? console.log('Fixed!') : console.log('Nothing to fix!');
fs.writeFileSync(distPath, content, 'utf-8');