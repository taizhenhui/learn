import helloWorld from './hello-world'
import imgSrc from './assets/entry.fd620404.png'
import jpgUrl from './assets/jinkesi.jpg'
import exampleTxt from './assets/example.txt'

helloWorld();

const img = document.createElement('img');
img.style.cssText = 'width:300px'
img.src = imgSrc;
document.body.appendChild(img);

// const img2 = document.createElement('img');
// img2.style.cssText = 'width:300px'
// img2.src = jpgUrl;
// document.body.appendChild(img2);

const block = document.createElement('p');
block.style.cssText = 'width:300px; background:pink'
block.textContent = exampleTxt;
document.body.appendChild(block);

const img3 = document.createElement('img');
img3.style.cssText = 'width:300px; display: block'
img3.src = jpgUrl;
document.body.appendChild(img3);