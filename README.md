# Binge-Watching-Assistant

追剧助手-谷歌扩展

> 在互联网发展迅速的今天，在线观看电视剧、综艺剧、番剧已成为一种趋势。保存视频的观看进度已然成为一种需求。
>
> 在线观看视频时，可以添加新剧，也可以更新当前视频的观看进度

https://chrome.google.com/webstore/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/pbnnheibacpamfaendimogbeaeciglpo

## vue开发

使用[vue-cli-plugin-chrome-extension-cli](https://github.com/sanyu1225/vue-cli-plugin-chrome-extension-cli)生成架构

## ide提示功能

    方法1（推荐） 
        File->Settings->Languages & Frameworks->JavaScript->Libraries->Download->输入chrome->Download and Install
    方法2
        npm install --save-dev @types/chrome

## 关于书签图标

https://developer.chrome.com/docs/extensions/how-to/ui/favicons?hl=zh-cn

## 关于标签同步问题

多设备同步的书签标签关系会对不上?

经研究[chrome源码](https://source.chromium.org/chromium/chromium/src/+/main:components/sync_bookmarks/bookmark_data_type_processor.cc;l=765)
，发现chrome内部的ID是全局统一的，但是`chrome.bookmarks`这个api获取的id实际上是`LOCAL_EXTERNAL_ID`
，哪怕是相同账号同步书签，不同设备之间生成的id也不同。

## todo

- [x] 升级manifest_version到v3：监听更新的逻辑需要改动，popup.js无法直接引用background.js了，全局变量的方式（bookmarkTabs）得改
- [x] 添加新页面时立即开启监听
- [ ] 监听tab时会判断页面完全加载才去更新书签，这样会使得页面加载缓慢时（js，图片等）无法正确更新书签。
- [x] 界面换vue重写
- [x] service_worker 无法永久运行，意味着“全局的书签-标签的关联变量”无法持久保存，导致一段时间后功能会失效，只能用存储代替。

> 根据定义，Service Worker 由事件驱动，在闲置时终止。这样，Chrome 就可以优化扩展程序的性能和内存消耗。

- [x] 打开eslint校验，优化构建的文件:将manifest.*.json合并使用一个,去掉background.html/helper.html。最好能优化构建出来的目录结构
- [ ] 优化依赖，减少打包后的文件大小，webpack打包后不压缩竟然有16M
- [ ] 书签删除时需要同步删除对应的标签
- [ ] [右键菜单快捷方式，删除按钮是否开启二次确认的选项](issues/2)

## changelog

### 1.2.4

> 完善书签和标签的关联关系，使用本地存储来保存关系，修复因为系统进入睡眠模式，service_worker停摆，导致关联失效（唤醒后无法正常更新追剧）的问题。

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

## 更新日志

```text
更新日志：
V1.2.3: 新增标签功能，可以让书签更好的分类
               新增书签列表是否折叠的选项功能，可以让列表更简洁
               新增书签标题文字去除功能，让书签显示更简洁
               新增插件新特性弹窗功能，新功能上线时更好的提示用户
               优化书签列表的图标，采用懒加载方式，使得书签列表加载的更快
V1.2.0：重构项目，让界面更美观
               新增功能：增加搜索模式，用于搜索列表中的追剧书签
               新增功能：增加文件夹分类模式
V1.1.6：修复service_worker沉寂，导致功能异常的问题
V1.1.4：升级manifest_version到v3。
               新增功能：在当前页面添加追剧时立即生效，无需重新打开
v1.1.3：修复未正确换行顶开操作按钮的bug
v1.1.2：修复多窗口时不能正确添加追剧的bug
v1.1.1：修复v1.0.4使用编辑功能使链接失效的bug，并优化了一波代码
v1.0.4：新增自动更新观看进度功能，看完新的一集电视再也无需手动更新观看进度了。
v1.0.3：添加书签的favicon.ico显示。
v1.0.2：增加拖拽排序。
v1.0.1：修复书签同步后无列表的bug。
v1.0.0：更新界面，删除右键操作，更改为界面操作。
v0.2.0：美化界面。
```
