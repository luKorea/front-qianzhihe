## 图片引入方式
```
public目录下的图片资源
background: url(/img/login/bg.png); 
src="../../../public/img/1.jpg"
相对于根文件目录层数+/public/+图片路径

src目录下 assets图片资源 style 中引入图片
background: url(../../assets/icon.png);

data(){}中引入图片
icon: require('@/assets/icon.png')
icon: require('../../assets/icon.png'),

style 中引入图片
background: url(../../assets/icon.png) 0 0 no-repeat; 

html中引入图片
<img src="@/assets/icon.png" alt="">
<img src="../../assets/icon.png" alt="">
```