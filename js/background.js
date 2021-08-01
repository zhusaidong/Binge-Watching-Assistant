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

var utils = new Utils();

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
     * @returns {Promise<chrome.bookmarks.BookmarkTreeNode[]>}
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
     * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
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
     * @returns {Promise<chrome.bookmarks.BookmarkTreeNode>}
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
     * @param object BookmarkChangesArg
     * @param callback function(chrome.bookmarks.BookmarkTreeNode result){}
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

var helper = bookmark = new Bookmark(chrome.runtime.getManifest().name);

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
                if (object.hasOwnProperty(key)) {
                    resolve(JSON.parse(object[key]));
                } else {
                    resolve({});
                }
            });
        });
    }

    /**
     * 清除所有数据
     */
    clearAllData() {
        chrome.storage.sync.clear();
    }
}

var store = new Store();

class Options {
    #optionsKey = 'options';

    saveOption(key, value) {
        let that = this;
        this.getOptions().then(function (options) {
            if (options == null) {
                options = {};
            }
            options[key] = value;
            that.saveOptions(options);
        });
    };

    getOption(key) {
        let that = this;
        return new Promise(function (resolve) {
            that.getOptions().then(function (options) {
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

var options = new Options();

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
            that.create(result.url).then(function (tab) {
                that.listeningTab(tab, bookmarkId);
            });
        });
    }

    /**
     * 监听tab
     * @param tab
     * @param bookmarkId
     */
    listeningTab(tab, bookmarkId) {
        this.bookmarkTabs[tab.id] = bookmarkId;
    }

    /**
     * 创建tab update监听器
     */
    createUpdateListener() {
        let that = this;
        this.onUpdated(function (tabId, changeInfo, tab) {
            let bookmarkIdByTab = that.bookmarkTabs[tabId];
            if (bookmarkIdByTab !== undefined) {
                helper.getBookmark(bookmarkIdByTab).then(function (result) {
                    //判断tab的页面host不变才更新，防止误触
                    if (utils.theSameHostUrl(result.url, tab.url)) {
                        if (getSiteRegularSet === undefined) {
                            helper.updateBookmark(bookmarkIdByTab, tab);
                        } else {
                            getSiteRegularSet().then(function (siteRegularSet) {
                                //更新时解析标题
                                siteRegularParser.setRegularSet(siteRegularSet);
                                tab.title = siteRegularParser.parse(tab.url, tab.title);

                                helper.updateBookmark(bookmarkIdByTab, tab);
                            })
                        }
                    }
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

var tab = new Tab();

//初始化
let init = () => {
    bookmark.addMainBookmarkFolder();
    bookmark.setBadgeText();
    tab.createUpdateListener();
    tab.createRemoveListener();

    //创建扩展的菜单
    chrome.contextMenus.create({
        'title': '去书签管理器管理书签',
        contexts: ['browser_action'],
        onclick: function (info, t) {
            bookmark.getBookmarkFolder().then(b => {
                tab.create('chrome://bookmarks/?id=' + b.id);
            });
        }
    });
};

init();
