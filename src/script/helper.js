//是否是开发模式
const isDevMode = process.env.NODE_ENV === 'development'

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
            that.getMainBookmarkFolder().then(result => {
                chrome.bookmarks.getSubTree(result.id, function (results) {
                    resolve(results[0].children);
                });
            }, function () {
                console.log("getBookmarks.getMainBookmarkFolder.reject");
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
        this.getMainBookmarkFolder().then(function () {
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
    getMainBookmarkFolder() {
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

    addBookmarkV2(object, callback) {
        let that = this;
        this.getMainBookmarkFolder().then(function (result) {
            that.addBookmark(
                {
                    parentId: result.id,
                    index: result.children !== undefined ? result.children.length : 0,
                    title: object.title,
                    url: object.url,
                }, callback);
        });
    }

    /**
     * 创建书签文件夹
     * @param title
     * @param callback
     */
    createBookmarkFolder(title, callback) {
        this.addBookmarkV2(
            {
                title: title,
            }, callback);
    }

    /**
     * setBadgeText
     */
    setBadgeText() {
        this.getBookmarks().then(function (bookmarks) {
            //循环获取文件夹里的书签数
            let count = 0;
            for (let i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].children !== undefined) {
                    count += bookmarks[i].children.length
                } else {
                    count += 1;
                }
            }
            if (count > 0) {
                chrome.action.setBadgeText(
                    {
                        text: count.toString()
                    }).then();
                if (count >= 100) {
                    chrome.action.setBadgeBackgroundColor({
                        color: "#ff0000"
                    }).then();
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

    moveBookmarkToFolder(bookmarkId, parentId, toIndex, callback) {
        chrome.bookmarks.move(bookmarkId.toString(), {
            parentId: parentId,
            index: toIndex
        }, callback);
    }
}

/**
 * 存储
 */
class Store {
    /**
     * 保存同步数据
     * @param key
     * @param value
     * @param callback
     */
    setSyncData(key, value, callback) {
        this.#setStorageData(chrome.storage.sync, key, value, callback);
    }

    /**
     * 读取同步数据
     * @param key
     * @returns {Promise<object>}
     */
    getSyncData(key) {
        return this.#getStorageData(chrome.storage.sync, key);
    }

    /**
     * 保存本地数据
     * @param key
     * @param value
     * @param callback
     */
    setLocalData(key, value, callback) {
        this.#setStorageData(chrome.storage.local, key, value, callback);
    }

    /**
     * 读取本地数据
     * @param key
     * @returns {Promise<object>}
     */
    getLocalData(key) {
        return this.#getStorageData(chrome.storage.local, key);
    }

    /**
     * 获取存储数据
     * @param {chrome.storage.StorageArea} storageArea
     * @param {string} key
     * @returns {Promise<object>}
     */
    #getStorageData(storageArea, key) {
        //storageArea.getBytesInUse(used => console.log("used", used, storageArea.QUOTA_BYTES))
        return new Promise(function (resolve) {
            storageArea.get(key, function (object) {
                if (object[key] === undefined) {
                    resolve({});
                } else {
                    resolve(JSON.parse(object[key]));
                }
            });
        });
    }

    /**
     * 保存数据
     * @param {chrome.storage.StorageArea} storageArea
     * @param {string} key
     * @param {object} value
     * @param {function} callback
     */
    #setStorageData(storageArea, key, value, callback) {
        storageArea.set({[key]: JSON.stringify(value)}, callback);
    }

    /**
     * 清除本地数据
     */
    clearLocal() {
        chrome.storage.local.clear().then();
    }
}

/**
 * 标签页
 */
class Tab {
    #updatedListener;
    #removedListener;

    /**
     * 创建tab
     * @param url
     * @returns {Promise<chrome.tabs.Tab>}
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
        console.log("添加监听器，监听tab更新")
        this.#updatedListener = function (tabId, changeInfo) {
            if (callback !== undefined && changeInfo.status === "complete") {
                //修复：“触发complete时标题还是老的”的bug
                setTimeout(function () {
                    chrome.tabs.get(tabId).then(tab => {
                        callback(tabId, tab);
                    });
                }, 500);
            }
        };

        chrome.tabs.onUpdated.addListener(this.#updatedListener);
    }

    /**
     * 移除updated监听器
     */
    removeUpdatedListener() {
        chrome.tabs.onUpdated.removeListener(this.#updatedListener);
        //console.log("onUpdated.hasListeners", chrome.tabs.onUpdated.hasListeners());
    }

    /**
     * 监听tab移除
     * @param callback
     */
    onRemoved(callback) {
        this.#removedListener = callback;
        chrome.tabs.onRemoved.addListener(this.#removedListener);
    }

    /**
     * 移除removed监听器
     */
    removeRemovedListener() {
        chrome.tabs.onUpdated.removeListener(this.#updatedListener);
    }

    /**
     * 获取当前激活的标签
     * @returns {Promise<chrome.tabs.Tab>}
     */
    getCurrentTab() {
        return new Promise(function (resolve) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
                resolve(tab[0]);
            });
        })
    }
}

/**
 * 设置存储类
 */
class Settings {
    settingStore;

    constructor(store) {
        this.settingStore = store;
    }

    get() {
        let that = this;
        return new Promise(function (resolve) {
            that.settingStore.getSyncData(CONFIG_STORE_SETTINGS_KEY).then(settings => {
                resolve(settings);
            });
        });
    }

    set(key, data) {
        let that = this;
        that.settingStore.getSyncData(CONFIG_STORE_SETTINGS_KEY).then(settingsStore => {
            settingsStore[key] = data;
            that.settingStore.setSyncData(CONFIG_STORE_SETTINGS_KEY, settingsStore);
        });
    }
}

/**
 * 提醒类
 */
class Notice {
    once(key, callback) {
        store.getLocalData("notice").then(data => {
            console.log("localData.data=", data)
            if (data[key] === undefined) {
                callback();
                let newVar = {};
                newVar[key] = true;
                store.setLocalData("notice", newVar);
            }
        });
    }
}

/**
 * 发送消息
 * @param msg 消息
 */
export function sendMessage(msg) {
    chrome.runtime.sendMessage(msg).then();
}

/**
 * 监听消息
 * @param requestCallback 消息回调
 */
export function listenMessage(requestCallback) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        //console.log("get the message[request]", request)
        //console.log("get the message[sender]", sender)

        //chrome crx id：pbnnheibacpamfaendimogbeaeciglpo
        //edge crx id：kijikbnlbgddamolcfnlelppffpkkmla
        const crxIds = ["pbnnheibacpamfaendimogbeaeciglpo", "kijikbnlbgddamolcfnlelppffpkkmla"];
        if (!isDevMode && !sender.id.includes(crxIds)) {
            return;
        }
        requestCallback(request);
        sendResponse({msg: "ok"});
    });
}

/**
 * 运行时环境
 */
class Runtime {
    /**
     * 获取插件配置
     * @returns {chrome.runtime.Manifest}
     */
    getManifest() {
        return chrome.runtime.getManifest();
    }

    /**
     * 获取平台信息
     * @returns {Promise<chrome.runtime.PlatformInfo>}
     */
    getPlatformInfo() {
        return chrome.runtime.getPlatformInfo();
    }

    /**
     * 获取扩展的url
     * @returns {module:url.URL}
     */
    getFaviconUrl() {
        return new URL(chrome.runtime.getURL("/_favicon/"));
    }
}

export const CONFIG_STORE_TAG_KEY = "tag.list";
export const CONFIG_STORE_SETTINGS_KEY = "settings";

export var runtime = new Runtime();
export var bookmark = new Bookmark(runtime.getManifest().name + (isDevMode ? "开发版" : ""));
export var tabs = new Tab();
export var store = new Store();
export var settingsStore = new Settings(store);
export var notice = new Notice();
