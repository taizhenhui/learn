# HTML

HyperText Markup Language 超文本标记语言



## 结构（html 4.0）

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

## html - 根标签

```html
<html lang="en"></html>
en 代表是英文，zh 是中文，德语是 de
```

## head - 头部标签

配置网页

```html
<head></head>
```

#### mate - 标签

为网页配置信息

```html
<meta charset = “utf-8”>
charset 字符集
	gb2312 	国家编码字符集（简体，亚裔字符集）
	gbk			（gb2312+繁体）
	unicode 是万国码，包括了所有国家的语言
	uft-8 	是 unicode

告诉搜索引擎爬虫，我们的网站是关于什么内容的
<meta content = “服饰” name = “keywords”> 
<meta content = “时装” name = “description”>
```

#### link - 标签

引入外部资源

```html
<link rel="stylesheet" type="text/css" href="theme.css"/>
```

#### style - 标签

给标签元素样式的标签

```html
<style></style>
```



#### title -  标签

设置浏览器标签页的名字

```html
<title>网页名字</title>
```



#### script - 标签

脚本标签

```html
<script></script>
```



## *body- 身体标签

浏览器展示信息的标签

```html
<body></body>
```

### 常用标签

|  标签   | 双标签/单标签 | 是否独占一行 | 描述                                   | 属性                                                         |
| :-----: | :-----------: | :----------: | :------------------------------------- | :----------------------------------------------------------- |
|   div   |      双       |      √       | 容器                                   |                                                              |
|  span   |      双       |              | 容器                                   |                                                              |
|    p    |      双       |      √       | 段落                                   |                                                              |
|  h1-h6  |      双       |      √       | 标题 加粗字体， 从 1 到 6 字体依次减小 |                                                              |
| strong  |      双       |              | 字体加粗                               |                                                              |
|   em    |      双       |              | 字体倾斜                               |                                                              |
|   del   |      双       |              | 字体设置中划线                         |                                                              |
|   br    |      单       |      √       | 换行                                   |                                                              |
|   hr    |      单       |      √       | 水平线                                 |                                                              |
| ol > li |      双       |      √       | 有序列表                               | type = （1、a、A、I、i）<br />reversed=reversed（倒序）<br />start = ’180‘  (想从第几个开始拍，start 里面写数字几) |
| ul > li |      双       |      √       | 无序列表                               | type = (disc, square,circle)                                 |
|   img   |      单       |      √       | 图片                                   | src = ' '  url 路径，<br />alt = ' ' 占位符 - 图片没有时，展示的信息 <br />title = ' ' 提示符 - 当鼠标放上去，就会显示这个信息 |
|    a    |      双       |              | 超链接                                 | href = ' ' 超链接 - https:/ /baidu.com<br />href = ' #idName' 锚点<br />href = ' tel:138~' 打电话 <br />href = ' mailto: xxx @ qq.com' 发邮件<br />href = ' javascript:~' 协议限定符 |
|  form   |      双       |      √       | 表单  能发送数据                       | method = “get/post”这是 form 发送数据的两种方式<br />action = “http:/ /ssffg.php”这是发送给谁，就是 action 的位置 |
|  input  |      单       |              | 输入框                                 | type = ' '<br />text - 文本输入框<br />password - 密码输入框 <br />submit - 提交<br />radio - 单选框<br />checkbox - 复选框<br /><br />name = ' ' 提交时的字段名<br />value = ' ' 输入框的值<br />onfocus = “”是想鼠标聚焦时发生什么事<br />onblur = “”是在鼠标失去焦点时发生的状态 |
| select  |      双       |              | 下拉菜单                               | name = ' ' 提交时的字段                                      |
| option  |      双       |      √       | 下拉菜单的选项                         | value = ' '  select的name的值                                |
|   ...   |               |              |                                        |                                                              |

#### div

独占一行

```html
<div>
  最重要的容器
</div>
```



#### span

不独占一行

```html
<span>文本修饰 最好的容器</span>
```



#### p

独占一行

本身自带样式 margin padding

```html
<p> 段落 标签 </p>
```



#### h1-h6

独占一行

本身自带样式 文字大小 文字加粗

```html
<h1> 一级 标题 </h1>
<h2> 二级 标题 </h2>
<h3> 三级 标题 </h3>
<h4> 四级 标题 </h4>
<h5> 五级 标题 </h5>
<h6> 六级 标题 </h6>
```



#### strong

文字加粗

```html
 <strong>strong</strong>
```



#### em

文字倾斜

```html
<em>em</em>
```



#### del

设置文字中划线

```html
<del>del</del>
```



#### br

换行

```html
<br />
```



#### hr

水平线

```html
<hr />
```



#### ol li

有序列表

**tyle** = '1'  /  tyle = 'a' / tyle = 'A'  /  tyle = 'I' / tyle = 'i' 

**reversed** = 'reversed'  倒序

**start** = '2' 开始排序的起始位置

```html
<ol tyle = '1'>
  <li>qwe</li>
  <li>asd</li>
  <li>zxc</li>
</ol>
```



#### ul li

无序列表

type = “**disc**” 意思是 discircle，实心圆

type = “**square**” 意思是 square，实心方块

type = “**circle**” 意思是 circle，圈(空心圆)

> ul 和 li 是一个很好的天生父子结构(柜子与抽屉)，可以做导航栏

```html
<ul type = “disc”>
  <li>qwe</li>
  <li>asd</li>
  <li>zxc</li>
</ul>
```



#### img

图片标签

src = ' ' 网上 url  /  本地的绝对路径  /  本地的相对路径

alt = ' ' 占位符 - 图片加载失败时，展示的信息

title = ' ' 提示符 - 当鼠标放上去，展示的信息

```html
<img src="" alt="" title="">
```



#### a

超链接 标签

target = '_blank' 打开空白标签

href = ' ' 超链接 - https:/ /baidu.com

```html
超链接			 <a href="www.baidu.com" target="_blank"></a>
锚点				<a href="#idName"></a>
打电话			 <a href="tel:138~"></a>
发邮件			 <a href="mailto: xxx @ qq.com"></a>
协议限定符		<a href="javascript:~"></a>   
```



#### form

表单 能发送数据

form method = “get/post”这是 form 发送数据的两种方式

action = “http:/ /ssffg.php”这是发送给谁，就是 action 的位置

> form 表单里面还需要配合 input 来写，**input** **里面需要** **type**

```html
<form method="get" action="">
    <input type="text">
</form>
```



#### input

输入框

type = ' ' 指定输入框类型

name = ' ' 提交时的字段

value = ' ' 可以设置初始值

onfocus = ' ' 聚焦时发生什么事

onblur = ' ' 失焦时发生什么事

```html
<form method="get" action="">
	<input type="text" name='username'> 文本框
	<input type="password" name='password'> 密码框
  <input type = “radio”> 单选框
  <input type = “checkbox”> 复选框
  <input type="submit" value="login"> 登录按钮（提交）
</form>
```

radio - 单选框

相同的name是一组单选

checked 可以设置默认值

```html
男:<input type="radio" name="sex" checked>
女:<input type="radio" name="sex">
```



checkbox - 复选框

相同的name是一组多选

checked 可以设置默认值

```html
a:<input type="checkbox" name="select" value="a" checked>
b:<input type="checkbox" name="select" value="b" checked>
c:<input type="checkbox" name="select" value="c">
d:<input type="checkbox" name="select" value="d">
```



#### select option

下拉菜单，可以选值

```html
<select name="name" id="">
  <option value="">qwe</option>
  <option value="">asd</option>
  <option value="">zxc</option>
</select>
```



## 注释

```html
<!-- 内容 -->
```

