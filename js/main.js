



var result = `/*
*你好，我是施志伟
*我将以动画的形式介绍我自己
*只用文字介绍太简单了
*就用代码介绍
*首先准备一些样式
*/

*{
    transition:all 1s;
}
html{
    background: rgb(222,222,222);
    font-size:16px;
}
#code{
    border:1px solid red;
    paading: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{
    color:#690;
}
.token.property{
    color:#905;
}
.token.punctuation{
    color: #DD4A68;
}

/* 加点3D效果 */

#code{
    transform: rotate(360deg);
}

/* 下面，我来介绍我自己 */
/* 我需要一张白纸 */

#code{
    position:fixed;
    left:0;
    width:50%;
    height:100%;
}
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    background: black;
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
    background: white;
    height:100%;
    width:100%;
}
`

var result2 = `
/*
* 接下来把 Markdown 变成HTML - marked.js
*/
`
var md = `
# 自我介绍

我叫施志伟，来自于江苏科技大学，从事前端。

## 技能
vue，JavaScript，html，css

## 作品
无缝轮播
canvas画板
会动的代码

## 联系方式

- QQ 1065367277
- Email qasxed5@163.com
`

var result3 = `
/*
* 这就是我的会动的简历了
*/ 
`

writeCode('',result,()=>{  // writeCode call the function
    createPaper( ()=>{
        writeMarkdown(md,()=>{
            writeCode(result,result2, ()=>{
                markDownToHtml(()=>{
                    writeCode(result+result2,result3,()=>{
                        console.log(11)
                    })
                })
            })
        })
    }) 
})

/* 把code写到#code和style标签里 */
function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix  || ''
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if( n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    },50)
}
function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML = markdown.substring(0, n);
        // domPaper.innerHTML = marked(markdown)
        domPaper.scrollTop = domPaper.scrollHeight
        if( n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    },100)
}

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
function markDownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markDownContainer = document.querySelector('#paper > .content')
    markDownContainer.replaceWith(div)
    fn.call()
}