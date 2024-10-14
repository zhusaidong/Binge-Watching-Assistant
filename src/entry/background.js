import {tabs, bookmark, listenMessage, initBackground} from '@/script/helper';

//全局的书签-标签的关联变量
const bookmarkTabs = {};

//初始化
initBackground();

/**
 * 标签监听器
 */
const tabListener = () => {
    /**
     * 创建tab update监听器
     */
    tabs.onUpdated(function (tabId, changeInfo, tab) {
        let bookmarkIdByTab = bookmarkTabs[tabId];
        //bookmarkTabs.hasOwnProperty(tabId)
        if (bookmarkIdByTab !== undefined) {
            bookmark.getBookmark(bookmarkIdByTab).then(function () {
                bookmark.updateBookmark(bookmarkIdByTab, tab);
            });
        }
    });
    /**
     * 创建tab remove监听器
     */
    tabs.onRemoved(function (tabId) {
        let bookmarkIdByTab = bookmarkTabs[tabId];
        //bookmarkTabs.hasOwnProperty(tabId)
        if (bookmarkIdByTab !== undefined) {
            delete bookmarkTabs[tabId];
        }

        //没有需要监听时移除监听器
        // if (Object.keys(bookmarkTabs).length === 0) {
        //     console.log("移除tab监听器")
        //     chrome.tabs.onUpdated.removeListener();
        //     chrome.tabs.onRemoved.removeListener();
        // }
    });
}

tabListener();

/**
 * 创建监听
 */
listenMessage((request) => {
    const bookmarkId = request.bookmark_id;
    const tabId = request.tab_id;

    //调用时创建监听
    // if (Object.keys(bookmarkTabs).length === 0) {
    //     console.log("创建tab监听器")
    //     tabListener();
    // }

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

//有活动期间，保活
//@see https://blog.csdn.net/qq_35606400/article/details/136327698
//fixme: 当操作系统进入睡眠时，保活将失效。
let keepAlive = null;

/**
 * 监听tab时启动保活
 */
function startWaitWhenListenTab() {
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
