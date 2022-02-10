# 一个简洁的后台Admin结构

[在线预览](http://www.web.liubingbing.xyz)

```
// 本地启动
git clone
cd vue-note-web

npm i
npm run serve
```







### 开发过程中遇到的一些问题

* scss正常相对路径引入背景图片报错路径不对
  ```
   background: url('@/assets/img/bg.png')   
   // 改为
   background: url('~@/assets/img/bg.png') 
  ```
*
