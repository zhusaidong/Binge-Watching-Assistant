var helper, init, store, tabs;

var MainBookmarkFolder = "追剧助手";
var bookmarkTabs = {};

helper =
    {
        //获取追剧助手书签列表
        getBookmarks: () => {
            return new Promise(function (resolve, reject) {
                helper.getBookmarkFolder().then(function (results) {
                    chrome.bookmarks.getChildren(results.id, function (results) {
                        resolve(results);
                    });
                });
            });
        },
        getBookmark: (bookmarkId) => {
            return new Promise(function (resolve, reject) {
                chrome.bookmarks.get(bookmarkId.toString(), function (results) {
                    resolve(results);
                });
            });
        },
        //删除书签
        deleteBookmark: (bookmarkId) => {
            chrome.bookmarks.remove(bookmarkId.toString(), function () {
                helper.setBadgeText();
            });
        },
        //添加追剧助手书签文件夹
        addMainBookmarkFolder: () => {
            chrome.bookmarks.search(MainBookmarkFolder, function (results) {
                if (!results || results.length === 0) {
                    //如果创建时不指定parentId，则所创建的书签会默认加入到其他书签中
                    chrome.bookmarks.create(
                        {
                            title: MainBookmarkFolder,
                            url: '',
                        }, function (results) {
                        });
                }
            });
        },
        getBookmarkFolder: () => {
            return new Promise(function (resolve, reject) {
                chrome.bookmarks.search(MainBookmarkFolder, function (results) {
                    resolve(results[0]);
                });
            });
        },
        //添加书签
        addBookmark: (object, callback) => {
            chrome.bookmarks.create(object, function (results) {
                callback.call();
            });
        },
        //setBadgeText
        setBadgeText: () => {
            helper.getBookmarks().then(function (bookmarks) {
                chrome.browserAction.setBadgeText(
                    {
                        text: bookmarks.length > 0 ? bookmarks.length.toString() : ''
                    });
            });
        },
        //更新书签
        updateBookmark: (bookmarkId, tab, callback) => {
            chrome.bookmarks.update(bookmarkId.toString(),
                {
                    title: tab.title,
                    url: tab.url,
                }, function (results) {
                    if (callback !== undefined) {
                        callback.call();
                    }
                });
        },
        //移动书签
        moveBookmark: (bookmarkId, toIndex) => {
            chrome.bookmarks.move(Number(bookmarkId).toString(), {
                index: toIndex
            }, function (bookmark) {
                //console.log(bookmark);
            });
        }
    };

store =
    {
        //保存数据
        setLocalData: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
        },
        //读取数据
        getLocalData: (key) => {
            return JSON.parse(localStorage.getItem(key));
        },

        //保存数据
        setSyncData: (key, value) => {
            chrome.storage.sync.set({[key]: JSON.stringify(value)}, function () {
            });
        },
        //读取数据
        getSyncData: (key) => {
            return new Promise(function (resolve, reject) {
                chrome.storage.sync.get(key, function (object) {
                    resolve(JSON.parse(object[key]));
                });
            });
        }
    };

tabs = {
    //创建tab
    create: (url) => {
        return new Promise(function (resolve) {
            chrome.tabs.create({
                url: url
            }, function (tab) {
                resolve(tab);
            });
        });

    },
    //监听tab更新
    onUpdated: (callback) => {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (callback !== undefined) {
                callback(tabId, changeInfo, tab);
            }
        });
    },
    //创建并监听tab
    createAndListen: (bookmarkId) => {
        helper.getBookmark(bookmarkId).then(function (result) {
            tabs.create(result[0].url).then(function (tab) {
                bookmarkTabs[tab.id] = bookmarkId;
            });
        });
    },
    //创建tab update监听器
    createListening: () => {
        tabs.onUpdated(function (tabId, changeInfo, tab) {
            console.log("onUpdated");
            var bookmarkIdByTab = bookmarkTabs[tab.id];
            if (bookmarkIdByTab !== undefined && changeInfo.status === "complete") {
                helper.updateBookmark(bookmarkIdByTab, tab)
            }
        });
    },
};

init = () => {
    helper.addMainBookmarkFolder();
    helper.setBadgeText();
    tabs.createListening();
};

init();
