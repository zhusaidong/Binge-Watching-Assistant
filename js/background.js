import {tabs, bookmark, listenMessage, initBackground} from './helper.js';

//全局的书签-标签的关联变量
const bookmarkTabs = {};

//初始化
initBackground();

/**
 * 创建tab update监听器
 */
tabs.onUpdated(function (tabId, changeInfo, tab) {
    let bookmarkIdByTab = bookmarkTabs[tabId];
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
    delete bookmarkTabs[tabId];
});

//创建监听
listenMessage((request)=>{
    const bookmarkId = request.bookmark_id;
    const tabId = request.tab_id;
    if(tabId == null){
        bookmark.getBookmark(bookmarkId).then(function (bookmark) {
            tabs.create(bookmark.url).then(function (tab) {
                bookmarkTabs[tab.id] = bookmarkId;
            });
        });
    }else {
        bookmarkTabs[tabId] = bookmarkId;
    }
});
