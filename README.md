---
typora-root-url: images
---

# tab-component

标签页组件

案例版本 cocos creator  2.3.3 



自定义艺术字体组件 

![](https://github.com/uer7e67/tab-component/blob/master/images/%E5%AD%97%E4%BD%9333.gif)

版本 cocos creator  2.3.3 

chars  这个属性是自定义的字体符号 挨个输上去就行了 

因为creator 自带的 LabelAtlas 只支持 开头 也就是它是根据这个ascII 按顺序排的 如果你的字体图片顺序不对 是不能用的 



自定义的pageView指示器组件 

版本 cocos creator  2.3.3 

原本的pageView指示器 只支持一种图片样式  但是项目需要两种图片切换

这里继承了原来的指示器 重写了 _changedState 这个方法

![](https://github.com/uer7e67/tab-component/blob/master/images/zhishiqi1.gif)
