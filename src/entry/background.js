import {bookmark, bookmarkTabRef, listenMessage, settingsStore, tabs} from '@/script/helper';

/**
 * 初始化
 */
const initBackground = () => {
    bookmark.addMainBookmarkFolder();
    bookmark.setBadgeText();

    /**
     * 创建“打开书签”的消息监听
     */
    listenMessage(request => {
        const bookmarkId = request.bookmark_id;
        const tabId = request.tab_id;

        //接收到“打开书签”的消息，创建追剧监听器
        bookmarkTabRef.size().then(size => {
            if (size === 0) {
                console.log("创建tab监听器")
                tabListener();
            }
        })

        //创建标签页和书签的追剧关联
        if (tabId == null) {
            //如果标签为null，先创建标签，再保存关联
            bookmark.getBookmark(bookmarkId).then(bookmark => {
                tabs.create(bookmark.url).then(tab => {
                    bookmarkTabRef.add(tab.id, bookmarkId);
                });
            });
        } else {
            bookmarkTabRef.add(tabId, bookmarkId);
        }
    });
}

/**
 * 标签监听器
 */
const tabListener = () => {
    /**
     * 创建tab update监听器
     */
    tabs.onUpdated(function (tabId, tab) {
        bookmarkTabRef.get(tabId).then(bookmarkIdByTab => {
            settingsStore.get().then(settingsStore => {
                const titleRegList = settingsStore["titleRegList"] !== undefined ? settingsStore["titleRegList"] : [];
                let titleReg = titleRegList.find(titleReg => tab.url.includes(titleReg.domain));
                const newTitle = titleReg !== undefined ? tab.title.replace(titleReg.removeTitle, "") : tab.title;

                bookmark.updateBookmark(bookmarkIdByTab, {title: newTitle, url: tab.url});
            });
        })
    });
    /**
     * 创建tab remove监听器
     */
    tabs.onRemoved(function (tabId) {
        bookmarkTabRef.remove(tabId).then(() => {
            bookmarkTabRef.size().then(size => {
                //没有需要监听的追剧时移除追剧监听器
                if (size === 0) {
                    console.log("移除tab监听器")
                    tabs.removeUpdatedListener();
                    tabs.removeRemovedListener();
                }
            })
        })
    });
}

initBackground();

/**
 * 更新插件时将sync的标签转换成local的标签，下个版本移除
 */
// const moveTagDataToLocalStorage = () => {
//     chrome.runtime.onInstalled.addListener(details => {
//         if (details.reason === chrome.runtime.OnInstalledReason.UPDATE && details.previousVersion === '1.2.4') {
//             store.getLocalData(CONFIG_STORE_TAG_KEY).then(tags => {
//                 if (Object.keys(tags).length === 0) {
//                     //需要转移数据
//                     store.getSyncData(CONFIG_STORE_TAG_KEY).then(tagData => {
//                         console.log("sync_data", tagData)
//                         if (Object.keys(tagData).length !== 0) {
//                             store.setLocalData(CONFIG_STORE_TAG_KEY, tagData);
//                             store.removeSyncData(CONFIG_STORE_TAG_KEY);
//                         }
//                     });
//                 }
//             })
//         }
//     });
// }
