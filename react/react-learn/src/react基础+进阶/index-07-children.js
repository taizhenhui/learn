import React from 'react'
import ReactDOM from 'react-dom'
/**
# 传递元素内容

内置组件：div、h1、p

```html
<div>
asdfafasfafasdfasdf
</div>
```

如果给自定义组件传递元素内容，则React会将元素内容作为children属性传递过去。
 */
import CompChildren from "../components/CompChildren"

ReactDOM.render((
    <CompChildren content1={<h2>第2组元素内容</h2>} content2={<h2>第3组元素内容</h2>}>

        <h2>第1组元素内容</h2>

    </CompChildren>
), document.getElementById('root'));
