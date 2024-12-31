# Binge-Watching-Assistant

追剧助手-谷歌扩展

> 在互联网发展迅速的今天，在线观看电视剧、综艺剧、番剧已成为一种趋势。保存视频的观看进度已然成为一种需求。
>
> 在线观看视频时，可以添加新剧，也可以更新当前视频的观看进度

## 在线安装

[//]: # (- [Chrome]&#40;https://chrome.google.com/webstore/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/pbnnheibacpamfaendimogbeaeciglpo&#41;)

[//]: # (- [Edge]&#40;https://chrome.google.com/webstore/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/pbnnheibacpamfaendimogbeaeciglpo&#41;)

- <a href="https://chrome.google.com/webstore/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/pbnnheibacpamfaendimogbeaeciglpo" title="已在 Chrome Web Store 市场上发布的版本">![](https://img.shields.io/chrome-web-store/v/pbnnheibacpamfaendimogbeaeciglpo.svg?label=Google%20Chrome)</a>

- <a href="https://microsoftedge.microsoft.com/addons/detail/kijikbnlbgddamolcfnlelppffpkkmla" title="已在 Microsoft Edge 上发布的版本">![](https://img.shields.io/badge/dynamic/json?label=Edge%20Addons&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2FAddons%2Fgetproductdetailsbycrxid%2Fkijikbnlbgddamolcfnlelppffpkkmla)</a>

## vue开发

使用[vue-cli-plugin-chrome-extension-cli](https://github.com/sanyu1225/vue-cli-plugin-chrome-extension-cli)生成架构

## ide提示功能

    方法1（推荐） 
        File->Settings->Languages & Frameworks->JavaScript->Libraries->Download->输入chrome->Download and Install
    方法2
        npm install --save @types/chrome

## 关于书签图标

https://developer.chrome.com/docs/extensions/how-to/ui/favicons?hl=zh-cn

## todo

- [x] 升级manifest_version到v3：监听更新的逻辑需要改动，popup.js无法直接引用background.js了，全局变量的方式（bookmarkTabs）得改
- [x] 添加新页面时立即开启监听
- [ ] 监听tab时会判断页面完全加载才去更新书签，这样会使得页面加载缓慢时（js，图片等）无法正确更新书签。
- [x] 界面换vue重写
- [x] service_worker 无法永久运行，意味着“全局的书签-标签的关联变量”无法持久保存，导致一段时间后功能会失效，只能用存储代替。

> 根据定义，Service Worker 由事件驱动，在闲置时终止。这样，Chrome 就可以优化扩展程序的性能和内存消耗。

- [x] 打开eslint校验，优化构建的文件:将manifest.*.json合并使用一个,去掉background.html/helper.html。最好能优化构建出来的目录结构

## changelog

### 1.2.3

> 添加标签功能
>
> 书签图标采用懒加载
>
> 添加书签列表默认是否折叠的选项
>
> 添加标题文字去除功能
>
> 添加新特性弹窗的功能

### 1.2.0

> 重构项目，使用vue开发，让界面更美观
>
> 增加搜索模式，用于搜索列表中的追剧书签
>
> 增加文件夹分类模式

### 1.1.6

    修复service_worker沉寂，导致功能异常的问题

### 1.1.4

    升级manifest_version到v3
    在当前页面添加追剧时立即生效，无需重新打开

### 1.1.3

    修复未正确换行顶开操作按钮的bug

### 1.1.2

    修复多窗口时添加追剧不正确的bug

### 1.1.1

    修复v1.0.4编辑链接失效bug
    优化代码

### 1.0.4

    新增自动更新功能，看完新的一集电视再也无需手动更新追剧了。

### 1.0.3

    添加书签的favicon.ico

### 1.0.2

    增加拖拽排序

### 1.0.1

    修复书签同步后无列表的bug

### 1.0.0

    更新界面
    删除右键操作，更改为界面操作

### 0.2.0

    美化界面
