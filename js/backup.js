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
    },10)
}
function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper > .content')
    console.log(domPaper)
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML = markdown.substring(0, n);
        domPaper.scrollTop = domPaper.scrollHeight
        if( n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    },10)
}

var result = `/*
*面试官好，我是xxx
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
/* 不玩了，我来介绍我自己 */
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
    #paper{       
    }
    /*
    * 接下来把 Markdown 变成HTML - marked.js
    */
    /*
    * 接下来给HTML加样式 
    * /
    /*
    * 这就是我的会动的简历了
    * 谢谢观看
    * / 
`
var md = `
# 自我介绍
# 技能
vue，JavaScript，html

# 作品
无缝轮播
canvas画板
在线简历


# 联系方式

-- QQ 1065367277
-- Email qasxed5@163.com
`
// 为什么 writeCode 是异步任务/函数
// createPaper 是同步任务/函数
writeCode('',result,()=>{  // writeCode call the function
    createPaper( ()=>{
        writeCode(result,result2, ()=>{
            writeMarkdown(md
                // , ()=>{
                //     markdownToHtml(()=>{
                //         write(result+result2, reuslt3)
                //     })
                // }
            )
        })
    } ) 
})  //  定闹钟： 50毫秒之后开始写第一行代码
// 1.定闹钟
// 2.writeCode 返回
// 3.执行fn2()
// 4.闹钟时间到
// 5.写第一行代码

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}




