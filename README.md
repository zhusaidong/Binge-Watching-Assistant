# 追剧助手：您的智能追剧&阅读伴侣

> 在互联网发展迅速的今天，在线观看电视剧、综艺、番剧已成为一种趋势。
>
> 追剧助手应运而生，这款专为追剧爱好者和阅读达人量身打造的谷歌浏览器插件。
>
> 它能够自动记录您观看电视剧、电影、动漫的集数，以及阅读系列文章、小说、博客的进度，让您不再为忘记进度而烦恼。
>
> 此外，您还可以为每个书签添加个性化标签，轻松管理海量内容。
>
> 同时，插件支持配置网站标题上的固定多余文字，一键优化书签标题，让其简洁明了，提升您的浏览体验。

## 功能详解

1. 自动保存进度

    - 追剧集数精准记录：

      在您沉浸于追剧世界时，追剧助手会在后台默默记录您观看的集数。无论是热门美剧、经典日漫，还是国产大剧，当您关闭浏览器或切换设备后，再次打开时，它都能精准定位到您上次观看的集数，让您无缝衔接追剧旅程，不错过任何精彩瞬间。

    - 阅读进度无缝衔接：

      阅读系列文章、网络小说、博客，只要您在网页上阅读，追剧助手都能自动标记您阅读到的篇章。下次打开时，它会直接跳转到您上次阅读的章节，节省您宝贵的时间，让您的阅读更加连贯，仿佛从未中断。

2. 书签标签管理

    - 个性化标签随心添：

      为每个书签添加专属标签，如“追剧”“小说”“学习资料”等。您可以根据自己的喜好和需求，自由定义标签名称，让书签管理更加个性化。通过标签，您可以快速筛选和查找相关内容，告别杂乱无章的书签列表，让书签管理变得井井有条。

3. 网站标题优化

    - 多余文字一键去除：

      很多网站的标题会包含一些固定且多余的信息，如网站名称、广告语等，这些内容会使得书签标题显得冗长且不直观。追剧助手允许您自定义配置需要去除的多余文字，一键清理标题，让书签标题只保留核心内容，让您的书签列表更加简洁清爽。

    - 简洁标题一目了然：

      经过优化后的书签标题更加简洁明了，一眼就能看出书签的具体内容，提高您的浏览效率。例如，将“XX小说网_热门小说推荐_书名”优化为“书名”，让您在众多书签中能够迅速识别出所需内容，无需再花费时间仔细辨认。

## 使用场景

1. 追剧场景
   每天晚上追完一集热门电视剧后，无需手动记录集数，追剧助手已经为您保存好了。第二天打开浏览器，直接点击书签就能继续观看，轻松享受追剧乐趣，让追剧变得更加轻松自在。
2. 阅读场景
   在工作间隙阅读一篇小说或者系列性的文章、博客，因时间原因不得不暂停。不用担心，追剧助手已经记录了您的阅读进度。

## 插件优势

1. 全自动操作：无需繁琐的手动设置，追剧助手自动为您完成进度保存、标签添加等操作，真正做到省时省力，让您能够更加专注于追剧和阅读本身。
2. 多平台兼容：支持主流的chrome和edge。
3. 高度自定义：标签名称、多余文字配置等都支持自定义，满足您个性化的使用需求，让您能够根据自己的习惯和喜好，打造专属的书签管理方式，让插件真正成为您的贴心助手。

## 在线安装

- <a href="https://chrome.google.com/webstore/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/pbnnheibacpamfaendimogbeaeciglpo" title="已在 Chrome Web Store 市场上发布的版本">![](https://img.shields.io/chrome-web-store/v/pbnnheibacpamfaendimogbeaeciglpo.svg?label=Google%20Chrome)</a>

- <a href="https://microsoftedge.microsoft.com/addons/detail/%E8%BF%BD%E5%89%A7%E5%8A%A9%E6%89%8B/kijikbnlbgddamolcfnlelppffpkkmla" title="已在 Microsoft Edge 上发布的版本">![](https://img.shields.io/badge/dynamic/json?label=Edge%20Addons&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2FAddons%2Fgetproductdetailsbycrxid%2Fkijikbnlbgddamolcfnlelppffpkkmla)</a>

## 关于开发

### vue开发

使用[vue-cli-plugin-chrome-extension-cli](https://github.com/sanyu1225/vue-cli-plugin-chrome-extension-cli)生成架构

### ide提示功能

    方法1（推荐） 
        File->Settings->Languages & Frameworks->JavaScript->Libraries->Download->输入chrome->Download and Install
    方法2
        npm install --save-dev @types/chrome

### 关于书签图标

https://developer.chrome.com/docs/extensions/how-to/ui/favicons?hl=zh-cn

### 关于标签同步问题

多设备同步的书签标签关系会对不上?

经研究[chrome源码](https://source.chromium.org/chromium/chromium/src/+/main:components/sync_bookmarks/bookmark_data_type_processor.cc;l=765)
，发现chrome内部的ID是全局统一的，但是`chrome.bookmarks`这个api获取的id实际上是`LOCAL_EXTERNAL_ID`
，哪怕是相同账号同步书签，不同设备之间生成的id也不同。

```javascript
/**
 * 更新插件时将sync的标签转换成local的标签，下个版本移除
 */
const moveTagDataToLocalStorage = () => {
        chrome.runtime.onInstalled.addListener(details => {
            if (details.reason === chrome.runtime.OnInstalledReason.UPDATE && details.previousVersion === '1.2.4') {
                store.getLocalData(CONFIG_STORE_TAG_KEY).then(tags => {
                    if (Object.keys(tags).length === 0) {
                        //需要转移数据
                        store.getSyncData(CONFIG_STORE_TAG_KEY).then(tagData => {
                            console.log("sync_data", tagData)
                            if (Object.keys(tagData).length !== 0) {
                                store.setLocalData(CONFIG_STORE_TAG_KEY, tagData);
                                store.removeSyncData(CONFIG_STORE_TAG_KEY);
                            }
                        });
                    }
                })
            }
        });
    }
```

### todo

- [ ] 监听tab时会判断页面完全加载才去更新书签，这样会使得页面加载缓慢时（js，图片等）无法正确更新书签。
- [ ] 优化依赖，减少打包后的文件大小，webpack打包后不压缩竟然有16M

## changelog

### 1.2.5

> 修复删除标签的bug

### 1.2.4

> 完善书签和标签的关联关系，使用本地存储来保存关系。
>
> 添加“删除二次确认”的选项，默认开启
>
> 添加“右键菜单”的功能，选项默认关闭
>
> 完善标签管理
>
> 添加edge浏览器的支持

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
V1.2.4: 完善书签和标签的关联关系，使用本地存储来保存关系
        选项页面添加右键菜单快捷方式，删除按钮是否开启二次确认的选项
        新增对edge浏览器的支持
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
