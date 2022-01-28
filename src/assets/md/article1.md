# 前端面试题总结

## HTML方面

### CSS中行内元素和块级元素的区别？

```
1.行内元素占据其内容边框对应的空间；块级元素占据标签所在一整行的空间；
2.默认情况下，行内元素不会以新的一行开始；块级元素会新起一行；
3.块级元素可以设置 width, height属性；而行内元素设置width, height无效；
4.行内元素的水平方向的margin padding对应水平方向属性有效，竖直方向属性无效；块级元素都有效；
5.块级元素可以包含行内元素和块级元素；行内元素不能包含块级元素；

常见的行内元素
	<span> <a> <lable> <b> <button> <input> <textarea> <img>
常见的块级元素
	<div> <p> <li> <h1>

```

## CSS方面

### 实现水平居中和垂直居中的方式

```css
1.水平居中
	1-1 行内元素：.parent { text-align:center; }
	1-2 块级元素：
		1-2-1 .son { margin-left: 0.5x父元素宽度-0.5x子元素宽度; }
		1-2-2 .son { margin: 0 auto; }
		1-2-3 flex布局 .parent { display: flex; justify-content: center; }
		1-2-4 绝对定位
			1-2-4-1 .son { position: absolute; left: 50%; transform: translate(-50%, 0); } 
			        .parent { position: relative; }
			1-2-4-2 .son { position: absolute; width: 宽度; left: 50%; margin-left: -0.5*宽度 } 
				    .parent { position: relative; }
			1-2-4-3 .son { position: absolute; width: 宽度; right: 0; left: 0; margin: 0 auto; } 
				    .parent { position: relative; }
2.垂直居中
	2-1 行内元素：单行文本 .parent { height: 高度; } .son { line-height: 高度; }
	2-2 块级元素
		2-2-1 flex布局 .parent { display: flex; align-items: center; }
		2-2-2 绝对定位
			2-2-2-1 .son { position: absolute; top: 50%; transform: translate( 0, -50%); }
				    .parent { position: relative; }
			2-2-2-2 .son { position: absolute; top: 50%; height: 高度; margin-top: -0.5高度; }
					.parent { position: relative; }
			2-2-2-3 .son { position: absolute; height: 高度; top: 0; bottom: 0; margin: auto 0; } 
					.parent { position: relative; }


```

### CSS有哪些选择器，优先级怎样？

| 选择器表示  | 选择器描述    | 选择器权重 |
| ----------- | ------------- | ---------- |
| * {  }      | 通配符选择器  | 0000       |
| 继承属性    |               | 0000       |
| div {  }    | 元素选择器    | 0001       |
| .box {  }   | 类/伪类选择器 | 0010       |
| #box1 {  }  | ID选择器      | 0100       |
| 行内样式    |               | 1000       |
| ！important |               | +∞         |

### 简述两种盒模型以及他们的区别

```
IE盒模型：{ box-sizing: border-box; } 
width = border+padding+content

W3C盒模型：{ box-sizing: content-box; } 
width 就等于内容区的width

区别：计算width/height的方法不同
```

### 简述一下BFC

```
块级格式化上下文（形成独立的渲染区域，内部元素的渲染不影响外界，可以清除浮动）；
形成BFC常见的条件
1.浮动 float不是none
2.绝对定位 position是absolute或者fixed
3.块级元素overflow不是visible
4.flex元素
5.行内块元素
```

## JavaScript方面

### JavaScript数据类型有哪些？

| 数据类型（基本类型） | 描述                                 |
| -------------------- | ------------------------------------ |
| Number               | 数字类型                             |
| Boolean              | 布尔型                               |
| String               | 字符型                               |
| undefined            | 未被定义                             |
| null                 | 空值                                 |
| symbol               | 符号型（等同于永远不会重复的字符串） |
|                      |                                      |
| 数据类型（引用类型） |                                      |
| Object               | 对象类型                             |



### 判断基本数据类型的方法？

| 方法                                 | 描述                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| typeof 数据                          | 基本都可以判断，但typeof null-->object,typeof function foo(){}-->object,typeof array-->object |
| 数据 instanceof 类型                 | 返回值为bool                                                 |
| Object.prototype.toString.call(数据) | 最完美的一种方法                                             |

### 为什么typeof null的结果是Object?

`null`是一种基本数据类型，存储在栈区；而`typeof null`的结果却是`Object`，而`Object`是引用数据类型，存储在堆区。其次，根据代码`alert (person instance of Object)`输出结果为`false`,我们可以知道`null`并不是`Object`的实例，两者之间存在矛盾。

简单来说，`typeof null`的结果为`Object`的原因是一个`bug`。在 `javascript` 的最初版本中，使用的 `32`位系统，`js`为了性能优化，使用低位来存储变量的类型信息。

| 数据类型     | 机器码标识     |
| ------------ | -------------- |
| 对象(Object) | 000            |
| 整数         | 1              |
| 浮点数       | 010            |
| 字符串       | 100            |
| 布尔         | 110            |
| `undefined`  | -2^31(即全为1) |
| `null`       | 全为0          |

在判断数据类型时，是根据机器码低位标识来判断的，而`null`的机器码标识为全`0`，而对象的机器码低位标识为`000`。所以`typeof null`的结果被误判为`Object`。

### 判断是否为数组有哪些方法？

```javascript
1.	isArray = Array.isArray || function(array){
  return Object.prototype.toString.call(array) === '[object Array]';
}
2.	arr instanceof Array
3.	Object.prototype.isPrototypeOf(arr, Array.prototype)
4.	Object.getPrototypeOf(arr) === Array.prototype
5.	Object.prototype.toString.call(arr) === '[object Array]'
```

### 解释一下原型和原型链

```
原型：JavaScript中的所有对象都有一个原型对象，它可以使用这个原型对象上的所有属性和方法；如果想要获取原型有两种方法；其一，通过对象的__proto__获取；其二，通过构造函数的prototype获取；
原型链：JavaScript对象如果想要使用某个属性或者方法，将会存在以下过程：
	首先在自己的属性或方法中查找，如果有就使用；如果没有，就在其隐式原型也就是__proto__中查找；
	如果有就使用，如果没有就在隐式原型中（也就是构造函数的prototype的__proto__）继续查找；
	如果有则使用，如果没有就以此类推继续查找，一直查到Object的prototype属性；
	如果此时还是没有所要查找的属性或者方法，则会报错；如果有则会正常使用，输出结果。
在这个过程中，从最初的JS对象到最后的Object.prototype就构成了一条原型链。
```

### 解释ES6的继承并实现继承

> 继承：JavaScript子对象可以使用父对象上的属性和方法

#### ES6实现继承：

```javascript
		class User {
          constructor(username,password) {
            this.username = username;
            this.password = password;
          }
          createComments(){
            console.log('我创建了一个评论')
          }
          deleteComments(){
            console.log('我删除了一个评论')
          }
        }

		// 若想要创建另一个类继承自上面的User类，则使用  extands User  即可
        class Admin extends User{
          deleteUser(){
            console.log('我删除了一个用户')
          }
        }
        let admin1 = new Admin("john","100100")
        admin1.deleteUser()				// 我删除了一个用户
        console.log(admin1.username,admin1.password)		// john,100100
        admin1.createComments()		// 我创建了一个评论
        admin1.deleteComments()		// 我删除了一个评论
```

#### ES5实现继承：

> ES5中不存在类（class）的概念，因此可以用构造函数的原型当作另一个构造函数的实例实现继承

```javascript
		function User(username,password) {
          this.username = username
          this.password = password
          this.deleteComments = function () {
            console.log('我删除了一个评论')
          }
          this.createComments = function () {
            console.log('我创建了一个评论')
          }
        }

        function Admin() {
            this.deleteUser = function () {
              console.log('我删除了一个用户')
            }
        }
        Admin.prototype = new User()
        let  admin1 = new Admin()
        admin1.deleteUser()		// 我删除了一个用户
        admin1.createComments()		// 我创建了一个评论
        admin1.deleteComments()		// 我删除了一个评论
```



### 解释一下闭包

```javascript
闭包：函数嵌套函数，由于内层函数使用了外层函数的数据，导致数据不会立即释放，则形成闭包；只要内部函数不执行，外部函数的变量就不会被销毁；利用闭包可以实现模块化，封装代码，解决全局变量冲突的问题。代码如下：
// 经典闭包
		function parent() {
            let a = 10;
            function son() {
              console.log(a)
            }
            return son
        }
        let foo = parent()
        foo()		// 10
// 利用闭包封装代码实现模块化
		let  foo = (function () {
            let a = 10;
            let b = 20;
            function add() {
                return a + b;
            }
            function sub() {
                return a - b;
            }
            return {
              add,
              sub
            }
        }) ()
        console.log(foo.add(),foo.sub())		// 30 -10
```

### 关于数组的一些方法

| 方法                                                         | 描述                                                         | 返回值                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------- |
| arr.toString()                                               | 把数组转换为数组值（逗号分隔）的字符串                       | （逗号分隔）的字符串         |
| arr.join("分隔符")                                           | 把数组转换为数组值（自定义分隔符分隔）的字符串               | （自定义分隔符分隔）的字符串 |
| arr.pop()                                                    | 从数组中删除最后一个元素                                     | 被删除的元素                 |
| arr.push()                                                   | （在数组结尾处）向数组添加一个新的元素                       | 新数组的长度                 |
| arr.shift()                                                  | 删除首个数组元素                                             | 被删除的元素                 |
| arr.unshift()                                                | （在开头）向数组添加新元素                                   | 新数组的长度                 |
| arr.reverse()                                                | 反转数组顺序                                                 | 反转后的数组                 |
| arr.splice(a,b,c)                                            | 从第a个元素开始，删除b个元素，再添加c                        | 被删除元素组成的数组         |
| arr.slice(a,b)                                               | 从index=a开始，裁切到index=b结束，包含a，但不包含b           | 被裁切下来的元素组成的数组   |
| arr1.concat(arr2,arr3,...)                                   | 把arr1，arr2等数组连接成一个数组                             | 连接之后的新数组             |
| arr.indexOf(item, start)                                     | 从index=start开始，包括start，搜索item                       | item在数组中的索引           |
| arr.filter(function(currentValue, index, arr), thisValue)    | 数组过滤，不改变原数组                                       | 过滤后的数组                 |
| arr.find(function(currentValue, index, arr), thisValue)      | 寻找第一个符合条件的数组项，不会改变原数组                   | 第一个符合条件的数组项       |
| arr.findIndex(function(currentValue, index, arr), thisValue) | 寻找第一个符合条件的数组项的索引，不会改变原数组             | 第一个符合条件的数组项的索引 |
| arr.forEach(function(currentValue, index, arr), thisValue)   | 按照自定义条件遍历数组，会改变原数组                         | undefined                    |
| arr.sort(function(a,b){return a-b})                          | 对数组进行排序，return a-b 从小到大排序，return b-a 从大到小排序，会改变原数组 | 排序后的数组                 |
| arr.map(function(currentValue, index, arr), thisValue)       | 按照自定义条件遍历数组，不会改变原数组                       | 自定义改变后的数组           |

### 箭头函数和普通函数的区别

```
1.箭头函数的()中参数只有一个时，()可以省略；普通函数不能省略；
2.箭头函数的函数体中只有返回值时可以省略return和{};普通函数不能省略；
3.箭头函数的this指向为：在哪里定义，就指向谁，普通函数的this指向为：谁调用，指向谁；
```

### cookie，session，sessionstorage，localstorage的区别

> HTTP 协议是一种`无状态协议`，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

```
cookie 和 session 区别

cookie 数据存放在客户端，session 数据放在服务器端。
cookie 本身并不安全，考虑到安全应当使用 session。
session 会在一定时间内保存在服务器上。如果访问量比较大，会比较消耗服务器的性能。考虑到减轻服务器性能方面的开销，应当使用 cookie 。
单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个域名最多保存 50 个 cookie。
将登陆信息等重要信息存放为 session、其他信息如果需要保留，可以放在 cookie 中。
```

```
cookie，sessionstorage，localstorage的区别

cookie：保存在客户端；可以设置过期时间，若不设置，则浏览器关闭之后失效；存储容量一般在4kb左右；每次都会携带在HTTP头中，如果使	用cookie保存过多数据会带来性能问题；
sessionstorage：保存在客户端；仅在当前网页会话下有效，关闭页面或刷新浏览器后就会被清除；存储容量大约5MB；不参与服务器客户端通	  信过程；
localstorage：保存在客户端；只要不手动清除，则永久存在；存储容量大约5MB；不参与服务器客户端通信过程；
```

### 深拷贝与浅拷贝的区别，及其实现方法

```
浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝,拷贝前后的两个对象互不影响。
	如let obj1 = {name:'小明',pet:{type:'狗子'}};对obj1分别进行浅拷贝和深拷贝之后，生成了一个obj2={name:'小明',pet:{type:'狗'}};和obj3={name:'小明',pet:{type:'狗'}}; 
	此时执行obj1.name="小红";obj1.pet.type="猫咪";
	此时，obj2={name:'小明',pet:{type:'猫咪'}};
		 obj3={name:'小明',pet:{type:'狗'}};
		 
浅拷贝代码实现：
	function shallowClone(obj) {
    let newObj = {}
    for (const objKey in obj) {
      newObj[objKey] = obj[objKey]
    }
    return newObj
  }
  
  深拷贝代码实现（递归实现）：
  function deepClone(obj) {
    let newObj = {}
    for (const objKey in obj) {
      if (obj[objKey] instanceof Object) {
        newObj[objKey] = deepClone(obj[objKey])
      }else {
        newObj[objKey] = obj[objKey]
      }
    }
    return newObj
  }
  
  深拷贝代码实现（json实现）：
  function deepClone(obj) {
  	let str = JSON.stringify(obj)
  	let newObj = JSON.prase(str)
  	return newObj
  }
```

### 改变this指向的方法

> call，apply，bind都可以改变this指向，且都是函数的方法

```
fun.call(指向的对象,传参1,传参2···)
fun.apply(指向的对象,[传参1,传参2···])
let a = fun.bind(指向的对象,传参1,传参2···);   a();    以返回值返回

运用：可以实现继承效果
		function Parent() {
            this.name = "par"
            this.eat = function () {
              console.log("父亲的吃方法")
            }
        }

        function Son() {
            Parent.call(this)
        }

        let son = new Son()
        console.log(son.name)
        son.eat()
```

### ES6新特性

```
1.ES5中只有局部作用域和全局作用域，ES6新增块级作用域，即{}。主要体现在let和var的区别中。
	if/for/while (true){
      let a = 10;
      var b = 20;
    }
    console.log(a)		报错
    console.log(b)		20
2.箭头函数
3.解构赋值
4.class类
5.symbol数据类型
```

### 谈一谈arguments

```
封装实参的类数组对象；
通过索引操作数据，可以获取长度；
函数调用时传递的参数都保存在arguments中；
即使不定义形参，也可以用arguments获取实参；
arguments.callee属性对应当前正在执行的函数对象；
```

### symbol数据类型

```
具有唯一标识的一个字符串；
不能被for in 遍历；
如果一个对象有symbol.iterator属性，则可以被for of遍历；
	let sym1 = Symbol("level")
    let sym2 = Symbol("family")
    const student = {
      name:"小明",
      age:18,
      [sym1]:"优秀",
      [sym2]:"富有"
    }
    // for in 只能遍历非symbol属性
    for (const key in student) {
      if (Object.hasOwnProperty.call(student, key)) {
        const element = student[key];
        console.log(element);
      }
    }
	// 以下可以遍历symbol属性
    console.log(Object.getOwnPropertySymbols(student));
```

### 讲一讲防抖与节流

```
防抖：用户触发事件过于频繁，只获取最后一次事件的操作
	function fangdou(callback, delay) {
      let t = null
      return function () {
        if (t !== null) {
          clearTimeout(t)
        }
        t = setTimeout(() => {
          callback.call(this)
        }, delay)
      }
    }
节流：控制高频事件执行的次数
	function jieliu(callback,delay){
      let flag = true
      return function(){
        if (flag) {
          setTimeout(() => {
            callback.call(this)
            flag = true
          }, delay);
        }
        flag = false
      }
    }
```

### 什么是回调地狱，如何解决？

```
回调地狱：函数作为参数层层嵌套
解决回调地狱：
function getTea(){
      return new Promise(function(resolve){
        setTimeout(() => {
          resolve("奶茶")
        }, 2000);
      })
    }

    function getHuoguo(){
      return new Promise(function(resolve){
        setTimeout(() => {
          resolve("火锅")
        }, 2000);
      })
    }

    function getCoffee(){
      return new Promise(function(resolve){
        setTimeout(() => {
          resolve("咖啡")
        }, 2000);
      })
    }
    
    // Promise解决
    getTea().then((data)=>{
      console.log(data);
      return getHuoguo()
    }).then((data1)=>{
      console.log(data1);
      return getCoffee()
    }).then((data2)=>{
      console.log(data2);
    })
	
	// async函数解决
    async function getData(){
      console.log(await getTea());
      console.log(await getHuoguo());
      console.log(await getCoffee());
    }
    getData()
```

### JavaScript单线程

```
单线程：一个任务执行之后再执行另一个方法
执行顺序：同步代码（调用栈中执行）---->nextTick()---->异步代码（1.微任务[Promise.then()]，2.宏任务[计时器，Ajax，读取文件]）---->setImmediate()
事件循环机制：JavaScript代码执行分为两个区域，同步代码在运行栈中，异步代码在任务队列中；代码执行过程中首先会检验运行栈中的同步代码是否执行完毕，若执行完毕，事件循环机制会检验任务队列中是否有异步代码，直到全部代码执行完毕。
```

### 事件委托

```
子级事件交给父级处理，简化代码；DOM操作过程中，有两个过程，事件捕获由外到内，接着事件冒泡由内到外；且事件从冒泡阶段开始执行；
```

## Ajax方面

### 说一下Ajax的流程

```
1.建立XMLHttpRequest对象;
2.设置回调函数;
3.配置请求信息，(如open,get方法)，使用open方法与服务器建立链接;
4.向服务器发送数据;
5.在回调函数中针对不同的响应状态进行处理;
```

### 1.创建XMLHttpRequest异步对象

```javascript
var xhr;  //定义一个变量,用于存放XMLHttpRequest对象
if(window.XMLHttpRequest) { 
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xhr = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```

### 2.设置回调函数

```javascript
xhr.onreadystatechange = callback；
```

### 3.使用open方法与服务器建立连接

```javascript
// get 方式
xhr.open("get", "test.php", true)

// post 方式发送数据 需要设置请求头
xhr.open("post", "test.php", true)
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
```

### 4.向服务器发送数据

```javascript
// get 不需要传递参数
xhr.send(null)

// post 需要传递参数
xhr.send("name=jay&age=18")
```

### 5.在回调函数中对不同的响应状态进行处理

```javascript
function callback() {
  // 判断异步对象的状态
  if(xhr.readyState == 4) {
    // 判断交互是否成功
    if(xhr.status == 200) {
      // 获取服务器响应的数据
      var res = xhr.responseText
      // 解析数据
      res = JSON.parse(res)
    }
  }
}
```

### ajax中的五种状态码

- 0：请求未初始化
- 1：服务器连接已建立(已调用open方法，但还未调用send)
- 2：请求已接收(已调用send方法)
- 3：请求处理中(请求已到达服务端，正在处理)
- 4：请求已完成，且响应已就绪

## 网络方面

### GET 和 POST方法的区别

```
1. GET使用URL或Cookie传参。而POST将数据放在BODY中。
2. GET的URL会有长度上的限制，则POST的数据则可以非常大。
3. POST比GET安全，因为数据在地址栏上不可见。
```

### 1-5有哪些常见的状态码

```
1XX系列：指定客户端应相应的某些动作，代表请求已被接受，需要继续处理。由于 HTTP/1.0 协议中没有定义任何 1xx 状态码，所以除非在		某些试验条件下，服务器禁止向此类客户端发送 1xx 响应。
2XX系列：代表请求已成功被服务器接收、理解、并接受。这系列中最常见的有200、201状态码。
3XX系列：代表需要客户端采取进一步的操作才能完成请求，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的 Location 	域中指明。这系列中最常见的有301、302状态码。
4XX系列：表示请求错误。代表了客户端看起来可能发生了错误，妨碍了服务器的处理。常见有：401、404状态码。
5XX系列：代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。	常见有500、503状态码。
```

| 状态码 | 具体含义                                                     |
| :----: | ------------------------------------------------------------ |
|  100   | 这个临时响应是用来通知客户端它的部分请求已经被服务器接收，且仍未被拒绝。 |
|  200   | 请求已成功，请求所希望的响应头或数据体将随此响应返回。       |
|  201   | 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，比如增删改操作成功时一般返回201状态码。 |
|  301   | 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。 |
|  302   | 请求的资源现在临时从不同的 URI 响应请求。                    |
|  401   | 当前请求需要用户验证                                         |
|  404   | 请求失败，请求所希望得到的资源未被在服务器上发现。           |
|  500   | 服务器遇到了一个未曾预料的状况，无法完成对请求的处理。       |
|  503   | 由于临时的服务器维护或者过载，服务器当前无法处理请求。       |

### HTTP2新特性

- 使用二进制格式传输，更高效、更紧凑。

- 对报头压缩，降低开销。

  HTTP1.1 协议以换行符作为纯文本的分隔符，而 HTTP2 将所有传输的信息分割为更小的消息和 帧，并采用二进制格式对它们编码。客户端和服务器会替我们完成必要的分帧工作。

- 多路复用，一个网络连接实现并行请求。

  在 HTTP 1.1 中，如果客户端要想发起多个并行请求以提升性能，则必须使 用多个 TCP 连接。这种模型也会导致队首阻塞，从而造成底层 TCP 连接的效率低下。

  但在HTTP2.0中，将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装是 HTTP 2 最重要的一项增强，从而带来巨大的性能提升。

- 服务器主动推送，减少请求的延迟。一个请求，服务端会发送多个可能用到的响应，实现性能提升

- 默认使用加密。

### 从输入url到渲染出页面的整个过程

1. 获取IP地址
2. TCP/IP三次握手建立链接
3. 浏览器向web服务器发送http请求
4. 浏览器渲染
5. 四次挥手断开连接

#### 1.获取IP地址

##### **通过DNS将URL解析成IP地址**

IP地址对应一台真实的物理机器，而且IP地址就像人的身份证是唯一的，用户请求服务器，只需要输入为该服务器分配的唯一的IP地址即可。但由于IP地址不便于记忆，因而使用较为语义化的域名来替代IP地址，而且一个域名可能对应了多个IP地址，比如用户输入www.baidu.com, 该域名下对应了多个IP，域名解析服务器会根据一定的规则分配给用户其中一个IP地址。

##### **DNS解析过程：**

1、在浏览器中输入www.qq.com域名，操作系统会先检查自己本地的hosts文件是否有这个网址映射关系，如果有，就先调用这个IP地址映射，完成域名解析。 

2、如果hosts里没有这个域名的映射，则查找本地DNS解析器缓存，是否有这个网址映射关系，如果有，直接返回，完成域名解析。

5、如果本地DNS服务器本地区域文件与缓存解析都失效，则根据本地DNS服务器的设置（是否设置转发器）进行查询，如果未用转发模式，本地DNS就把请求发至13台根DNS，根DNS服务器收到请求后会判断这个域名(.com)是谁来授权管理，并会返回一个负责该顶级域名服务器的一个IP。本地DNS服务器收到IP信息后，将会联系负责.com域的这台服务器。这台负责.com域的服务器收到请求后，如果自己无法解析，它就会找一个管理.com域的下一级DNS服务器地址(qq.com)给本地DNS服务器。当本地DNS服务器收到这个地址后，就会找qq.com域服务器，重复上面的动作，进行查询，直至找到www.qq.com主机。 

6、如果用的是转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，上一级服务器如果不能解析，或找根DNS或把转请求转至上上级，以此循环。不管是本地DNS服务器用是是转发，还是根提示，最后都是把结果返回给本地DNS服务器，由此DNS服务器再返回给客户机。

#### 2.TCP/IP三次握手建立链接

建立连接需要三个过程（三次握手）：

1. 客户机向服务器发送一个建立连接的请求（客户机向服务器拨打电话）
2. 服务器接到请求后发送同意连接的信号（服务器接听电话）
3. 主机接到同意连接的信号后，再次向服务器发送了确认信号（客户机：“喂喂喂，听得到吗？”）

为什么要进行三次握手？如果是两次握手，如下面的对话只有前两句，有可能出现的问题是：客户端之前发送了一个连接请求报文，由于网络原因滞留在网络中，后来到达服务器端，服务器接收到该请求，就会建立连接，等待客户端传送数据。而此时客户端压根就不知道发生了什么，白白造成了服务器资源浪费。 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33cfe04daf0846c397a5434ea6bc86c3~tplv-k3u1fbpfcp-watermark.awebp)

#### 3.浏览器向web服务器发送http请求

客户机与服务器建立TCP/IP连接后就可以通信了。

1. 浏览器根据解析到的IP地址和端口号发起HTTP请求，HTTP请求包括header和body。header中包括请求的方式（get和post）、请求的协议 （http、https、ftp）、请求的地址ip、缓存cookie。body中有请求的内容。例如：GET [www.google.com/](https://link.juejin.cn?target=https%3A%2F%2Fwww.google.com%2F) HTTP/1.1
2. 服务器接到请求后，会根据 HTTP 请求中的内容来决定如何获取相应的 HTML 文件
3. 服务器将得到的 HTML 文件发送给浏览器

get会产生一个tcp数据包，post则是两个（GET和POST最详细的总结传送门）

1. get请求时，浏览器会把headers和data一起发送出去，服务器响应200（返回数据），
2. post请求时，浏览器先发送headers，服务器响应100 continue， 浏览器再发送data，服务器响应200（返回数据）。

客户端请求静态资源和动态资源：

1. 静态资源：如果客户端请求的是静态资源，则web服务器根据URL地址到服务器的对应路径下查找文件，然后给客户端返回一个HTTP响应，包括状态行、响应头和响应正文。
2. 动态资源：如果客户端请求的是动态资源，则web服务器会调用CGI/VM执行程序完成相应的操作，如查询数据库，然后返回查询结果数据集，并将运行的结果–HTML文件返回给web服务器。Web服务器再将HTML文件返回给用户。

#### 4.浏览器渲染

1. DOM 树：解析 HTML 构建 DOM(DOM 树)
2. CSS 树：解析 CSS 构建 CSSOM(CSS 树)
3. 渲染树：CSSOM 和 DOM 一起生成 Render Tree(渲染树)
4. 布局（layout）：根据Render Tree浏览器就知道网页中有哪些节点，以及各个节点与 CSS 的关系，从而知道每个节点的位置和几何属性（重排）
5. 绘制（Paint）：根据计算好的信息绘制整个页面（重绘）

#### 5.四次挥手断开连接

**客户端没有数据发送时就需要断开连接，以释放服务器资源**。 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8001c473102b4b37b6efffeaeb0571f0~tplv-k3u1fbpfcp-watermark.awebp)

1. 客户端：我没有数据要发送了，打算断开连接
2. 服务器：你的请求我收到了，我这还有数据没有发送完成，你等下
3. 服务器：我的数据发送完毕，可以断开连接了
4. 客户端：ok，你断开连接吧（客户端独白：我将在2倍的最大报文段生存时间后关闭连接。如果我再次收到服务器的消息，我就知道服务器没有收到我的这句话，我就再发送一遍）。

最终服务器收到该客户端发送的消息断开连接，客户端也关闭连接。

## vue方面

## react方面       
