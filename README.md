# flexible-ext

> 基于淘宝和ant的杂交方案，让你更好的使用rem适配移动端

- [x] 完美适配多种机型
- [x] 直接使用1px即可解决1px问题
- [x] 即使手机调整了系统字体大小，网页字体大小依旧完美适配


## 如何构建

在这里推荐使用![postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)这个库

```javascript
postcss: [
  require('postcss-pxtorem')({
    rootValue: 75,
    propWhiteList: [],
  }),
]
```
