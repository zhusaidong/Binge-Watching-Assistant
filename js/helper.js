//const isDev = chrome.runtime.id !== 'pbnnheibacpamfaendimogbeaeciglpo';
const isDev = chrome.runtime.getManifest().name.includes("开发");

/**
 * 书签
 */
class Bookmark {
    /**
     * 主目录
     */
    mainBookmarkFolder;

    constructor(mainBookmarkFolder) {
        this.mainBookmarkFolder = mainBookmarkFolder;
    }

    /**
     *获取追剧助手书签列表
     * @returns {Promise<BookmarkTreeNode[]>}
     */
    getBookmarks() {
        let that = this;
        return new Promise(function (resolve) {
            that.getBookmarkFolder().then(function (result) {
                chrome.bookmarks.getChildren(result.id, function (results) {
                    resolve(results);
                });
            }, function () {
                console.log("getBookmarks.getBookmarkFolder.reject");
                resolve([]);
            });
        });
    }

    /**
     * 根据书签id获取书签内容
     * @param bookmarkId
     * @returns {Promise<BookmarkTreeNode>}
     */
    getBookmark(bookmarkId) {
        return new Promise(function (resolve) {
            chrome.bookmarks.get(bookmarkId.toString(), function (results) {
                if (results !== undefined && results.length > 0) {
                    resolve(results[0]);
                }
            });
        });
    }

    /**
     * 删除书签
     * @param bookmarkId
     * @param callback
     */
    deleteBookmark(bookmarkId, callback) {
        chrome.bookmarks.remove(bookmarkId.toString(), callback);
    }

    /**
     * 添加主书签文件夹
     * @param callback
     */
    addMainBookmarkFolder(callback) {
        let that = this;
        this.getBookmarkFolder().then(function () {
        }, function () {
            //如果创建时不指定parentId，则所创建的书签会默认加入到其他书签中
            chrome.bookmarks.create(
                {
                    title: that.mainBookmarkFolder,
                    url: '',
                }, callback);
        });
    }

    /**
     * 获取书签文件夹
     * @returns {Promise<BookmarkTreeNode>}
     */
    getBookmarkFolder() {
        let that = this;
        return new Promise(function (resolve, reject) {
            chrome.bookmarks.search(that.mainBookmarkFolder, function (results) {
                if (results.length === 0) {
                    reject();
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    /**
     * 添加书签
     * @param object BookmarkCreateArg
     * @param callback function
     */
    addBookmark(object, callback) {
        chrome.bookmarks.create(object, callback);
    }

    /**
     * setBadgeText
     */
    setBadgeText() {
        this.getBookmarks().then(function (bookmarks) {
            if (bookmarks.length > 0) {
                chrome.action.setBadgeText(
                    {
                        text: bookmarks.length.toString()
                    });
                if (bookmarks.length >= 100) {
                    chrome.action.setBadgeBackgroundColor({
                        color: "#ff0000"
                    });
                }
            }
        });
    }

    /**
     * 更新书签
     * @param bookmarkId - bookmark id
     * @param tab - BookmarkChangesArg
     * @param callback - function
     */
    updateBookmark(bookmarkId, tab, callback) {
        let changes = {};
        if (tab.title !== undefined) {
            changes.title = tab.title;
        }
        if (tab.url !== undefined) {
            changes.url = tab.url;
        }

        chrome.bookmarks.update(bookmarkId.toString(), changes, callback);
    }

    /**
     * 移动书签
     * @param bookmarkId
     * @param toIndex
     * @param callback
     */
    moveBookmark(bookmarkId, toIndex, callback) {
        chrome.bookmarks.move(bookmarkId.toString(), {
            index: toIndex
        }, callback);
    }
}

/**
 * 存储
 */
class Store {
    /**
     * 保存数据
     * @param key
     * @param value
     * @param callback
     */
    setSyncData(key, value, callback) {
        chrome.storage.sync.set({[key]: JSON.stringify(value)}, callback);
    }

    /**
     * 读取数据
     * @param key
     * @returns {Promise<object>}
     */
    getSyncData(key) {
        return new Promise(function (resolve) {
            chrome.storage.sync.get(key, function (object) {
                if(object === undefined || object[key] === undefined){
                    resolve(null)
                } else {
                    resolve(JSON.parse(object[key]));
                }
            });
        });
    }
}

/**
 * 标签页
 */
class Tab {
    /**
     * 创建tab
     * @param url
     * @returns {Promise<object>}
     */
    create(url) {
        return new Promise(function (resolve) {
            chrome.tabs.create({
                url: url
            }, function (tab) {
                resolve(tab);
            });
        });
    }

    /**
     * 监听tab更新
     * @param callback
     */
    onUpdated(callback) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (callback !== undefined && changeInfo.status === "complete") {
                callback(tabId, changeInfo, tab);
            }
        });
    }

    /**
     * 监听tab移除
     * @param callback
     */
    onRemoved(callback) {
        chrome.tabs.onRemoved.addListener(callback);
    }
}

export const bookmark = new Bookmark(chrome.runtime.getManifest().name);
export const tabs = new Tab();

/**
 * 发送消息
 * @param msg 消息
 */
export function sendMessage(msg){
    chrome.runtime.sendMessage(msg);
}

/**
 * 监听消息
 * @param requestCallback 消息回调
 */
export function listenMessage(requestCallback){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
        // console.log("get the message[request]", request)
        // console.log("get the message[sender]", sender)
        if(sender.id !== "joofmpiiaojlabiemjajakihgpgamoil" && sender.id !== "pbnnheibacpamfaendimogbeaeciglpo"){
            return;
        }
        requestCallback(request);
        sendResponse({msg: "ok"});
    });
}

/**
 * 初始化
 */
export function initBackground(){
    bookmark.addMainBookmarkFolder();
    bookmark.setBadgeText();

    console.log(chrome.runtime.id)

    //创建扩展的菜单
    chrome.contextMenus.create({
        id: 'bwa-main',
        title: '去书签管理器管理追剧的书签',
        type: 'normal',
        contexts: ['action']
    });
    if(isDev){
        chrome.contextMenus.create({
            id: 'bwa-dev-options',
            title: '开发者选项',
            type: 'normal',
            contexts: ['action'],
        });
        chrome.contextMenus.create({
            id: 'bwa-dev-open-popup',
            title: '打开popup.html',
            type: 'normal',
            parentId: 'bwa-dev-options',
            contexts: ['action']
        });
        chrome.contextMenus.create({
            id: 'bwa-dev-open-options',
            title: '打开options.html',
            type: 'normal',
            parentId: 'bwa-dev-options',
            contexts: ['action']
        });
    }
    chrome.contextMenus.onClicked.addListener((info, t) => {
        switch (info.menuItemId){
            case "bwa-main":
                bookmark.getBookmarkFolder().then(b => {
                    tabs.create('chrome://bookmarks/?id=' + b.id);
                });
                break;
            case "bwa-dev-open-popup":
                tabs.create(chrome.runtime.getURL("/html/popup.html"));
                break;
            case "bwa-dev-open-options":
                tabs.create(chrome.runtime.getURL("/html/options.html"));
                break;
        }
    })
}

//======v.1.1.5=================

/**
 * 工具类
 */
class Utils {
    /**
     * 相同主机地址
     * @param url1
     * @param url2
     * @returns {boolean}
     */
    theSameHostUrl(url1, url2) {
        return new URL(url1).origin === new URL(url2).origin;
    }
}

//export const utils = new Utils();

export function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "16");
    return url.toString();
}

const store = new Store();

class Options {
    #optionsKey = 'options';

    saveOption(key, value) {
        let that = this;
        this.getOptions().then(options => {
            if (options == null) {
                options = {};
            }
            options[key] = value;
            that.saveOptions(options);
        });
    };

    getOption(key) {
        let that = this;
        return new Promise(resolve => {
            that.getOptions().then(options => {
                resolve(options == null ? null : options[key]);
            });
        });
    };

    saveOptions(options) {
        store.setSyncData(this.#optionsKey, options);
    };

    getOptions() {
        return store.getSyncData(this.#optionsKey);
    };
}

export const options = new Options();
