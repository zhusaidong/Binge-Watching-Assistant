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
                chrome.browserAction.setBadgeText(
                    {
                        text: bookmarks.length.toString()
                    });
            }
            if (bookmarks.length >= 100) {
                chrome.browserAction.setBadgeBackgroundColor({
                    color: "#ff0000"
                });
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

var helper = bookmark = new Bookmark("追剧助手");

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
                resolve(JSON.parse(object[key]));
            });
        });
    }
}

var store = new Store();

/**
 * 标签页
 */
class Tab {
    bookmarkTabs = {};

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

    /**
     * 创建tab并监听
     * @param bookmarkId
     */
    createAndListen(bookmarkId) {
        let that = this;
        helper.getBookmark(bookmarkId).then(function (result) {
            tabs.create(result.url).then(function (tab) {
                that.bookmarkTabs[tab.id] = bookmarkId;
            });
        });
    }

    /**
     * 创建tab update监听器
     */
    createUpdateListener() {
        let that = this;
        this.onUpdated(function (tabId, changeInfo, tab) {
            let bookmarkIdByTab = that.bookmarkTabs[tabId];
            if (bookmarkIdByTab !== undefined) {
                helper.getBookmark(bookmarkIdByTab).then(function () {
                    helper.updateBookmark(bookmarkIdByTab, tab);
                });
            }
        });
    }

    /**
     * 创建tab remove监听器
     */
    createRemoveListener() {
        let that = this;
        this.onRemoved(function (tabId) {
            delete that.bookmarkTabs[tabId];
        });
    }
}

var tabs = new Tab();

//初始化
helper.addMainBookmarkFolder();
helper.setBadgeText();
tabs.createUpdateListener();
tabs.createRemoveListener();
