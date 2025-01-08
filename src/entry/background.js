import {bookmark, bookmarkTabRef, contextMenu, message, settingsStore, tabs} from '@/script/helper';

//监听事件的回调

const listenBookmarkTabRef = request => {
    const bookmarkId = request.bookmark_id;
    const tabId = request.tab_id;

    //接收到“打开书签”的消息，创建追剧监听器
    // bookmarkTabRef.size().then(size => {
    //     console.log("bookmarkTabRef.size", size);
    //     if (size === 0) {
    //         console.log("创建tab监听器")
    //         tabListener();
    //     }
    // })
    startWait();

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
};

/**
 * 创建右键菜单
 */
const createContextMenuIfOpen = () => {
    //在扩展刷新/重新开启时，需要判断是否开启右键菜单
    settingsStore.getByKey("enableContextMenu", false).then(enableContextMenu => {
        if (enableContextMenu === true) {
            contextMenu.createContextMenu()
        }
    });
}

/**
 * 初始化
 */
const initBackground = () => {
    bookmark.addMainBookmarkFolder();
    bookmark.setBadgeText();

    //创建消息监听

    message.setListener("bookmark", listenBookmarkTabRef);
    message.setListener("createContextMenu", () => {
        contextMenu.createContextMenu();
    });
    message.setListener("removeContextMenu", menuId => {
        contextMenu.removeContextMenu(menuId);
    });
    message.startListening();

    createContextMenuIfOpen();

    tabListener();
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
            settingsStore.get().then(settings => {
                const titleRegList = settings["titleRegList"] !== undefined ? settings["titleRegList"] : [];
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
            // bookmarkTabRef.size().then(size => {
            //     //没有需要监听的追剧时移除追剧监听器
            //     if (size === 0) {
            //         // console.log("移除tab监听器")
            //         tabs.removeUpdatedListener();
            //         tabs.removeRemovedListener();
            //     }
            // })
        })
    });
}

//浏览器重新打开，清空书签tab的关联关系
chrome.runtime.onStartup.addListener(() => {
    console.log('浏览器重新打开，清空书签tab的关联关系');
    bookmarkTabRef.clear().then();
});

//有活动期间，保活
//@see https://blog.csdn.net/qq_35606400/article/details/136327698
let keepAlive = null;

initBackground();

function startWait() {
    if (keepAlive === null) {
        keepAlive = setInterval(waitUntil, 5 * 1000);
        console.log("create keepAlive");
    }
}

function waitUntil() {
    chrome.runtime.getPlatformInfo().then();
    console.log("living");
    bookmarkTabRef.size().then(size => {
        //没有需要监听的追剧时移除追剧监听器
        if (size === 0) {
            clearInterval(keepAlive);
            keepAlive = null;
        }
    })
}
