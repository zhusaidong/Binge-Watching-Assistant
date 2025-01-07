import {bookmark, bookmarkTabRef, contextMenu, message, settingsStore, tabs} from '@/script/helper';
import {MESSAGE_TYPE, SETTING_KEY} from "@/script/constant";

//监听事件的回调

const listenBookmarkTabRef = request => {
    const bookmarkId = request.bookmark_id;
    const tabId = request.tab_id;

    //接收到“打开书签”的消息，创建追剧监听器

    bookmarkTabRef.size().then(size => {
        console.log("bookmarkTabRef.size", size);
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
};

/**
 * 创建右键菜单
 */
const createContextMenuIfOpen = () => {
    //在扩展刷新/重新开启时，需要判断是否开启右键菜单
    settingsStore.getByKey(SETTING_KEY.ENABLE_CONTEXT_MENU, false).then(enableContextMenu => {
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

    message.setListener(MESSAGE_TYPE.BOOKMARK, listenBookmarkTabRef);
    message.setListener(MESSAGE_TYPE.CREATE_CONTEXT_MENU, () => {
        contextMenu.createContextMenu();
    });
    message.setListener(MESSAGE_TYPE.REMOVE_CONTEXT_MENU, menuId => {
        contextMenu.removeContextMenu(menuId);
    });
    message.startListening();

    createContextMenuIfOpen();
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
            settingsStore.getByKey(SETTING_KEY.TITLE_REG_LIST, []).then(titleRegList => {
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

//扩展重新加载/开启时，清空书签tab的关联关系
chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        bookmarkTabRef.clear().then();
    }
});
