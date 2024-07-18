import {tabs, bookmark, listenMessage, initBackground} from './helper.js';

//全局的书签-标签的关联变量
const bookmarkTabs = {};
let bookmarkTabSize = 0;

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
    bookmarkTabSize--;
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
    bookmarkTabSize++;
    startWait();
});

//有活动期间，保活
//@see https://blog.csdn.net/qq_35606400/article/details/136327698
let keepAlive = null;
function startWait(){
    if(keepAlive === null){
        keepAlive = setInterval(waitUntil, 5 * 1000);
        console.log("create keepAlive");
    }
}
function waitUntil() {
    chrome.runtime.getPlatformInfo().then(r => {
    });
    if(bookmarkTabSize === 0){
        clearInterval(keepAlive);
        keepAlive = null;
    }
}
