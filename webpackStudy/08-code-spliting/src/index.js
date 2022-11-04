import helloWorld from './hello-world'
import imgSrc from './assets/entry.fd620404.png'
import jpgUrl from './assets/jinkesi.jpg'
import exampleTxt from './assets/example.txt'
import './style.css'
import './style.less'
import Data from './assets/data.xml'
import Notes from './assets/data.csv'
import toml from './assets/data.toml'
import yaml from './assets/data.yaml'
import json5 from './assets/data.json5'
import _ from 'lodash'
import './async-module'


helloWorld();

const img = document.createElement('img');
img.style.cssText = 'width:300px'
img.src = imgSrc;
document.body.appendChild(img);

// const img2 = document.createElement('img');
// img2.style.cssText = 'width:300px'
// img2.src = jpgUrl;
// document.body.appendChild(img2);

const block = document.createElement('div');
block.style.cssText = 'width:200px;height:200px;background:pink'
block.classList.add('block-bg')
block.textContent = exampleTxt;
document.body.appendChild(block);

const img3 = document.createElement('img');
img3.style.cssText = 'width:300px; display: block'
img3.src = jpgUrl;
document.body.appendChild(img3);

document.body.classList.add('hello')

console.log(Data);
console.log(Notes);

console.log(toml.title);
console.log(toml.owner.name);

console.log('yaml',yaml)
console.log('yaml.title',yaml.title)
console.log('yaml.owner.name',yaml.owner.name)

console.log('json5',json5)
console.log('json5.title',json5.title)
console.log('json5.owner.name',json5.owner.name)

console.log("_.join(['AA','BB','CC'])", _.join(['AA','BB','CC'],' '))


const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click',()=>{
  //  webpackPrefetch: true
  import(/*webpackChunkName: 'math', webpackPreload: true*/'./math.js').then(({add})=>{
    console.log('add(4,5)',add(4, 5))
  })
})
document.body.appendChild(button)
