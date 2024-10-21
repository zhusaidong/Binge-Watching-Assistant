import {bookmark, listenMessage, settingsStore, tabs} from '@/script/helper';

//有活动期间，保活
//@see https://blog.csdn.net/qq_35606400/article/details/136327698
//fixme: 当操作系统进入睡眠时，保活将失效。
let keepAlive = null;

/**
 * 全局的书签-标签的关联变量
 * @type {{}}
 */
const bookmarkTabs = {};

/**
 * 初始化
 */
const initBackground = () => {
    bookmark.addMainBookmarkFolder();
    bookmark.setBadgeText();
}

/**
 * 标签监听器
 */
const tabListener = () => {
    /**
     * 创建tab update监听器
     */
    tabs.onUpdated(function (tabId, tab) {
        let bookmarkIdByTab = bookmarkTabs[tabId];
        if (bookmarkIdByTab !== undefined) {
            bookmark.getBookmark(bookmarkIdByTab).then(function () {
                settingsStore.get().then(settingsStore => {
                    const titleRegList = settingsStore["titleRegList"] !== undefined ? settingsStore["titleRegList"] : [];
                    let titleReg = titleRegList.find(titleReg => tab.url.includes(titleReg.domain));
                    const newTitle = titleReg !== undefined ? tab.title.replace(titleReg.removeTitle, "") : tab.title;

                    bookmark.updateBookmark(bookmarkIdByTab, {title: newTitle, url: tab.url});
                });
            });
        }
    });
    /**
     * 创建tab remove监听器
     */
    tabs.onRemoved(function (tabId) {
        let bookmarkIdByTab = bookmarkTabs[tabId];
        if (bookmarkIdByTab !== undefined) {
            delete bookmarkTabs[tabId];
        }

        //没有需要监听时移除监听器
        if (Object.keys(bookmarkTabs).length === 0) {
            console.log("移除tab监听器")
            tabs.removeUpdatedListener();
            tabs.removeRemovedListener();
        }
    });
}

/**
 * 监听tab时启动保活
 */
const startWaitWhenListenTab = () => {
    if (keepAlive === null) {
        keepAlive = setInterval(waitUntil, 5 * 1000);
        console.log("create keepAlive");
    }
}

/**
 * 保活定时任务
 */
function waitUntil() {
    console.log("living");
    chrome.runtime.getPlatformInfo().then(() => {
    });
    let bookmarkTabSize = Object.keys(bookmarkTabs).length;
    //console.log("bookmarkTabSize", bookmarkTabSize)
    if (bookmarkTabSize === 0) {
        clearInterval(keepAlive);
        keepAlive = null;
    }
}

initBackground();

/**
 * 创建监听
 */
listenMessage(request => {
    const bookmarkId = request.bookmark_id;
    const tabId = request.tab_id;

    //调用时创建监听
    if (Object.keys(bookmarkTabs).length === 0) {
        console.log("创建tab监听器")
        tabListener();
    }

    if (tabId == null) {
        bookmark.getBookmark(bookmarkId).then(function (bookmark) {
            tabs.create(bookmark.url).then(function (tab) {
                bookmarkTabs[tab.id] = bookmarkId;
            });
        });
    } else {
        bookmarkTabs[tabId] = bookmarkId;
    }
    startWaitWhenListenTab();
});
