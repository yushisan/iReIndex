# iReData

## 下载及安装
```
$ git clone git@github.com:Dark-Chef-K/iReIndex.git
$ npm install
```

## 项目简介

通过 Vue框架 对网站艾瑞数据（Angular）进行仿制，网站的主要功能是对数据的处理和展示。

## 在线预览
http://www.player-ky.top/iReIndex

## 技术及组件
```
Vue + Vue-cli + Vue-router + Axios + Element-ui + Echarts
```

## 功能介绍

- 数据展示
```
借助 Element-ui 组件搭建项目UI界面完成初级数据显示
```
- 数据可视化
```
借助 Echarts 完成对数据的二次加工图形化
```
- 懒加载
```
信息列表部分写了个自定义指令 v-lazyLoad 根据组件滚动时最后一条信息与底边距离判断是否需要加载更多信息
```
- 数据对比
```
在 App指数 和 PC指数 分类中，可以添加最多5条信息进行比较（可选择日期和类别）
```
- 数据分类
```
可以通过分类选项筛选指定类别的信息
```
- 数据检索
```
通过搜索框可以快速查找指定信息
```


## 数据来源
艾瑞数据 http://data.iresearch.com.cn

## API接口
由于官方没有开放免费的接口，所以只能在官网一点一点自己扒出来了

## 项目中遇到的问题
- 数据可视化（数据→图表即时更新部分）  

  为了还原原网站图表效果，项目中使用了之前从未接触过的图表组件 Echarts，还原过程是比较痛苦的，啃了两天文档还是做出来了。  
  
  搜遍 Echarts 文档没找到即时更新图表的方法，所以只能自己写一个，也很简单，methods 里写一个 updateChart 方法用于重置图表，在 watch 里监测数据 data ，一旦 data 改变，就重新渲染图表。
```
methods: {
    updateChart() {
        var option = {
        /*
        *数据处理过程省略
        **/ 
        };
        this.myChart.setOption(option,true);
    }
},
watch: {
    data() {
    	this.updateChart();
    }
}
```
- 数据请求过程中，子组件数据报错 undefined  
这个报错虽然不影响后面页面渲染，但是看着很不舒服  
解决办法：在子组件上用 v-if 绑定传入的数据，数据不为 null && length != 0 时再渲染
```
<map-chart :attrData="attrData" v-if="attrData && attrData.length != 0"></map-chart>
<p v-if="!(attrData && attrData.length != 0)" class="noData">暂无数据</p>
```
## 部分截图

![image](https://github.com/Dark-Chef-K/iReIndex/blob/master/%E6%88%AA%E5%9B%BE.jpg?raw=true)
