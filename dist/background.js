/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entry/helper.js":
/*!*****************************!*\
  !*** ./src/entry/helper.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bookmark: function() { return /* binding */ bookmark; },
/* harmony export */   initBackground: function() { return /* binding */ initBackground; },
/* harmony export */   listenMessage: function() { return /* binding */ listenMessage; },
/* harmony export */   sendMessage: function() { return /* binding */ sendMessage; },
/* harmony export */   tabs: function() { return /* binding */ tabs; }
/* harmony export */ });
/* harmony import */ var _Users_zhusaidong_Projects_ChromeProjects_Binge_Watching_Assistant_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

/**
 * 书签
 */
class Bookmark {
  constructor(mainBookmarkFolder) {
    /**
     * 主目录
     */
    (0,_Users_zhusaidong_Projects_ChromeProjects_Binge_Watching_Assistant_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mainBookmarkFolder", void 0);
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
    this.getBookmarkFolder().then(function () {}, function () {
      //如果创建时不指定parentId，则所创建的书签会默认加入到其他书签中
      chrome.bookmarks.create({
        title: that.mainBookmarkFolder,
        url: ''
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
        chrome.action.setBadgeText({
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
// class Store {
//     /**
//      * 保存数据
//      * @param key
//      * @param value
//      * @param callback
//      */
//     setSyncData(key, value, callback) {
//         chrome.storage.sync.set({[key]: JSON.stringify(value)}, callback);
//     }
//
//     /**
//      * 读取数据
//      * @param key
//      * @returns {Promise<object>}
//      */
//     getSyncData(key) {
//         return new Promise(function (resolve) {
//             chrome.storage.sync.get(key, function (object) {
//                 resolve(JSON.parse(object[key]));
//             });
//         });
//     }
// }

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
var bookmark = new Bookmark(chrome.runtime.getManifest().name);
var tabs = new Tab();

/**
 * 发送消息
 * @param msg 消息
 */
function sendMessage(msg) {
  chrome.runtime.sendMessage(msg);
}

/**
 * 监听消息
 * @param requestCallback 消息回调
 */
function listenMessage(requestCallback) {
  const isDevMode = "development" === 'development';
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //console.log("get the message[request]", request)
    //console.log("get the message[sender]", sender)
    if (!isDevMode && sender.id !== "pbnnheibacpamfaendimogbeaeciglpo") {
      return;
    }
    requestCallback(request);
    sendResponse({
      msg: "ok"
    });
  });
}

/**
 * 初始化
 */
function initBackground() {
  bookmark.addMainBookmarkFolder();
  bookmark.setBadgeText();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPrimitive; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toPropertyKey; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/entry/background.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/entry/helper.js");


//全局的书签-标签的关联变量
const bookmarkTabs = {};

//初始化
(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.initBackground)();

/**
 * 创建tab update监听器
 */
_helper_js__WEBPACK_IMPORTED_MODULE_0__.tabs.onUpdated(function (tabId, changeInfo, tab) {
  let bookmarkIdByTab = bookmarkTabs[tabId];
  //bookmarkTabs.hasOwnProperty(tabId)
  if (bookmarkIdByTab !== undefined) {
    _helper_js__WEBPACK_IMPORTED_MODULE_0__.bookmark.getBookmark(bookmarkIdByTab).then(function () {
      _helper_js__WEBPACK_IMPORTED_MODULE_0__.bookmark.updateBookmark(bookmarkIdByTab, tab);
    });
  }
});
/**
 * 创建tab remove监听器
 */
_helper_js__WEBPACK_IMPORTED_MODULE_0__.tabs.onRemoved(function (tabId) {
  let bookmarkIdByTab = bookmarkTabs[tabId];
  //bookmarkTabs.hasOwnProperty(tabId)
  if (bookmarkIdByTab !== undefined) {
    delete bookmarkTabs[tabId];
  }
});

//创建监听
(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.listenMessage)(request => {
  const bookmarkId = request.bookmark_id;
  const tabId = request.tab_id;
  if (tabId == null) {
    _helper_js__WEBPACK_IMPORTED_MODULE_0__.bookmark.getBookmark(bookmarkId).then(function (bookmark) {
      _helper_js__WEBPACK_IMPORTED_MODULE_0__.tabs.create(bookmark.url).then(function (tab) {
        bookmarkTabs[tab.id] = bookmarkId;
      });
    });
  } else {
    bookmarkTabs[tabId] = bookmarkId;
  }
  startWait();
});

//有活动期间，保活
//@see https://blog.csdn.net/qq_35606400/article/details/136327698
let keepAlive = null;
function startWait() {
  if (keepAlive === null) {
    keepAlive = setInterval(waitUntil, 5 * 1000);
    console.log("create keepAlive");
  }
}
function waitUntil() {
  console.log("living");
  chrome.runtime.getPlatformInfo().then(() => {});
  let bookmarkTabSize = Object.keys(bookmarkTabs).length;
  //console.log("bookmarkTabSize", bookmarkTabSize)
  if (bookmarkTabSize === 0) {
    clearInterval(keepAlive);
    keepAlive = null;
  }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUM7RUFDTixDQUFDLE1BQU07SUFDSDRFLFlBQVksQ0FBQzNDLEtBQUssQ0FBQyxHQUFHakMsVUFBVTtFQUNwQztFQUNBZ0YsU0FBUyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFJO0FBRXBCLFNBQVNELFNBQVNBLENBQUEsRUFBRztFQUNqQixJQUFJQyxTQUFTLEtBQUssSUFBSSxFQUFFO0lBQ3BCQSxTQUFTLEdBQUdDLFdBQVcsQ0FBQ0MsU0FBUyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUN0RixPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztFQUNuQztBQUNKO0FBRUEsU0FBU3FGLFNBQVNBLENBQUEsRUFBRztFQUNqQnRGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUNyQk4sTUFBTSxDQUFDOEMsT0FBTyxDQUFDOEMsZUFBZSxDQUFDLENBQUMsQ0FBQzlGLElBQUksQ0FBQyxNQUFNLENBQzVDLENBQUMsQ0FBQztFQUNGLElBQUkrRixlQUFlLEdBQUczQixNQUFNLENBQUM0QixJQUFJLENBQUNWLFlBQVksQ0FBQyxDQUFDeEUsTUFBTTtFQUN0RDtFQUNBLElBQUlpRixlQUFlLEtBQUssQ0FBQyxFQUFFO0lBQ3ZCRSxhQUFhLENBQUNOLFNBQVMsQ0FBQztJQUN4QkEsU0FBUyxHQUFHLElBQUk7RUFDcEI7QUFDSixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYndhLy4vc3JjL2VudHJ5L2hlbHBlci5qcyIsIndlYnBhY2s6Ly9id2EvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYndhLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2J3YS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2J3YS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J3YS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYndhLy4vc3JjL2VudHJ5L2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDkuabnrb5cbiAqL1xuY2xhc3MgQm9va21hcmsge1xuICAgIC8qKlxuICAgICAqIOS4u+ebruW9lVxuICAgICAqL1xuICAgIG1haW5Cb29rbWFya0ZvbGRlcjtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5Cb29rbWFya0ZvbGRlcikge1xuICAgICAgICB0aGlzLm1haW5Cb29rbWFya0ZvbGRlciA9IG1haW5Cb29rbWFya0ZvbGRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKuiOt+WPlui/veWJp+WKqeaJi+S5puetvuWIl+ihqFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2ttYXJrVHJlZU5vZGVbXT59XG4gICAgICovXG4gICAgZ2V0Qm9va21hcmtzKCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgdGhhdC5nZXRCb29rbWFya0ZvbGRlcigpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNocm9tZS5ib29rbWFya3MuZ2V0Q2hpbGRyZW4ocmVzdWx0LmlkLCBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0Qm9va21hcmtzLmdldEJvb2ttYXJrRm9sZGVyLnJlamVjdFwiKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7kuabnrb5pZOiOt+WPluS5puetvuWGheWuuVxuICAgICAqIEBwYXJhbSBib29rbWFya0lkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Qm9va21hcmtUcmVlTm9kZT59XG4gICAgICovXG4gICAgZ2V0Qm9va21hcmsoYm9va21hcmtJZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGNocm9tZS5ib29rbWFya3MuZ2V0KGJvb2ttYXJrSWQudG9TdHJpbmcoKSwgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cyAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKDpmaTkuabnrb5cbiAgICAgKiBAcGFyYW0gYm9va21hcmtJZFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIGRlbGV0ZUJvb2ttYXJrKGJvb2ttYXJrSWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNocm9tZS5ib29rbWFya3MucmVtb3ZlKGJvb2ttYXJrSWQudG9TdHJpbmcoKSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS4u+S5puetvuaWh+S7tuWkuVxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIGFkZE1haW5Cb29rbWFya0ZvbGRlcihjYWxsYmFjaykge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ2V0Qm9va21hcmtGb2xkZXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy/lpoLmnpzliJvlu7rml7bkuI3mjIflrppwYXJlbnRJZO+8jOWImeaJgOWIm+W7uueahOS5puetvuS8mum7mOiupOWKoOWFpeWIsOWFtuS7luS5puetvuS4rVxuICAgICAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5jcmVhdGUoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhhdC5tYWluQm9va21hcmtGb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuabnrb7mlofku7blpLlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCb29rbWFya1RyZWVOb2RlPn1cbiAgICAgKi9cbiAgICBnZXRCb29rbWFya0ZvbGRlcigpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5zZWFyY2godGhhdC5tYWluQm9va21hcmtGb2xkZXIsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0c1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS5puetvlxuICAgICAqIEBwYXJhbSBvYmplY3QgQm9va21hcmtDcmVhdGVBcmdcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBhZGRCb29rbWFyayhvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNocm9tZS5ib29rbWFya3MuY3JlYXRlKG9iamVjdCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldEJhZGdlVGV4dFxuICAgICAqL1xuICAgIHNldEJhZGdlVGV4dCgpIHtcbiAgICAgICAgdGhpcy5nZXRCb29rbWFya3MoKS50aGVuKGZ1bmN0aW9uIChib29rbWFya3MpIHtcbiAgICAgICAgICAgIGlmIChib29rbWFya3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBib29rbWFya3MubGVuZ3RoLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvb2ttYXJrcy5sZW5ndGggPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmMDAwMFwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5Lmm562+XG4gICAgICogQHBhcmFtIGJvb2ttYXJrSWQgLSBib29rbWFyayBpZFxuICAgICAqIEBwYXJhbSB0YWIgLSBCb29rbWFya0NoYW5nZXNBcmdcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBmdW5jdGlvblxuICAgICAqL1xuICAgIHVwZGF0ZUJvb2ttYXJrKGJvb2ttYXJrSWQsIHRhYiwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB7fTtcbiAgICAgICAgaWYgKHRhYi50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnRpdGxlID0gdGFiLnRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWIudXJsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoYW5nZXMudXJsID0gdGFiLnVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNocm9tZS5ib29rbWFya3MudXBkYXRlKGJvb2ttYXJrSWQudG9TdHJpbmcoKSwgY2hhbmdlcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOenu+WKqOS5puetvlxuICAgICAqIEBwYXJhbSBib29rbWFya0lkXG4gICAgICogQHBhcmFtIHRvSW5kZXhcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBtb3ZlQm9va21hcmsoYm9va21hcmtJZCwgdG9JbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5tb3ZlKGJvb2ttYXJrSWQudG9TdHJpbmcoKSwge1xuICAgICAgICAgICAgaW5kZXg6IHRvSW5kZXhcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuLyoqXG4gKiDlrZjlgqhcbiAqL1xuLy8gY2xhc3MgU3RvcmUge1xuLy8gICAgIC8qKlxuLy8gICAgICAqIOS/neWtmOaVsOaNrlxuLy8gICAgICAqIEBwYXJhbSBrZXlcbi8vICAgICAgKiBAcGFyYW0gdmFsdWVcbi8vICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbi8vICAgICAgKi9cbi8vICAgICBzZXRTeW5jRGF0YShrZXksIHZhbHVlLCBjYWxsYmFjaykge1xuLy8gICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7W2tleV06IEpTT04uc3RyaW5naWZ5KHZhbHVlKX0sIGNhbGxiYWNrKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIOivu+WPluaVsOaNrlxuLy8gICAgICAqIEBwYXJhbSBrZXlcbi8vICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fVxuLy8gICAgICAqL1xuLy8gICAgIGdldFN5bmNEYXRhKGtleSkge1xuLy8gICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbi8vICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KGtleSwgZnVuY3Rpb24gKG9iamVjdCkge1xuLy8gICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShvYmplY3Rba2V5XSkpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vIH1cblxuLyoqXG4gKiDmoIfnrb7pobVcbiAqL1xuY2xhc3MgVGFiIHtcbiAgICAvKipcbiAgICAgKiDliJvlu7p0YWJcbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICogQHJldHVybnMge1Byb21pc2U8b2JqZWN0Pn1cbiAgICAgKi9cbiAgICBjcmVhdGUodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGFiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm5HlkKx0YWLmm7TmlrBcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBvblVwZGF0ZWQoY2FsbGJhY2spIHtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiBjaGFuZ2VJbmZvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGFiSWQsIGNoYW5nZUluZm8sIHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebkeWQrHRhYuenu+mZpFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIG9uUmVtb3ZlZChjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBib29rbWFyayA9IG5ldyBCb29rbWFyayhjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLm5hbWUpO1xuZXhwb3J0IHZhciB0YWJzID0gbmV3IFRhYigpO1xuXG4vKipcbiAqIOWPkemAgea2iOaBr1xuICogQHBhcmFtIG1zZyDmtojmga9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1zZykge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG1zZyk7XG59XG5cbi8qKlxuICog55uR5ZCs5raI5oGvXG4gKiBAcGFyYW0gcmVxdWVzdENhbGxiYWNrIOa2iOaBr+Wbnuiwg1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuTWVzc2FnZShyZXF1ZXN0Q2FsbGJhY2spIHtcbiAgICBjb25zdCBpc0Rldk1vZGUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXQgdGhlIG1lc3NhZ2VbcmVxdWVzdF1cIiwgcmVxdWVzdClcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldCB0aGUgbWVzc2FnZVtzZW5kZXJdXCIsIHNlbmRlcilcbiAgICAgICAgaWYgKCFpc0Rldk1vZGUgJiYgc2VuZGVyLmlkICE9PSBcInBibm5oZWliYWNwYW1mYWVuZGltb2diZWFlY2lnbHBvXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0Q2FsbGJhY2socmVxdWVzdCk7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7bXNnOiBcIm9rXCJ9KTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiDliJ3lp4vljJZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRCYWNrZ3JvdW5kKCkge1xuICAgIGJvb2ttYXJrLmFkZE1haW5Cb29rbWFya0ZvbGRlcigpO1xuICAgIGJvb2ttYXJrLnNldEJhZGdlVGV4dCgpO1xufVxuIiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHtcbiAgcmV0dXJuIChyID0gdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7XG4gICAgdmFsdWU6IHQsXG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITBcbiAgfSkgOiBlW3JdID0gdCwgZTtcbn1cbmV4cG9ydCB7IF9kZWZpbmVQcm9wZXJ0eSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxuZXhwb3J0IHsgdG9QcmltaXRpdmUgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5mdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSB0b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjtcbn1cbmV4cG9ydCB7IHRvUHJvcGVydHlLZXkgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5leHBvcnQgeyBfdHlwZW9mIGFzIGRlZmF1bHQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3RhYnMsIGJvb2ttYXJrLCBsaXN0ZW5NZXNzYWdlLCBpbml0QmFja2dyb3VuZH0gZnJvbSAnLi9oZWxwZXIuanMnO1xuXG4vL+WFqOWxgOeahOS5puetvi3moIfnrb7nmoTlhbPogZTlj5jph49cbmNvbnN0IGJvb2ttYXJrVGFicyA9IHt9O1xuXG4vL+WIneWni+WMllxuaW5pdEJhY2tncm91bmQoKTtcblxuLyoqXG4gKiDliJvlu7p0YWIgdXBkYXRl55uR5ZCs5ZmoXG4gKi9cbnRhYnMub25VcGRhdGVkKGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG4gICAgbGV0IGJvb2ttYXJrSWRCeVRhYiA9IGJvb2ttYXJrVGFic1t0YWJJZF07XG4gICAgLy9ib29rbWFya1RhYnMuaGFzT3duUHJvcGVydHkodGFiSWQpXG4gICAgaWYgKGJvb2ttYXJrSWRCeVRhYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJvb2ttYXJrLmdldEJvb2ttYXJrKGJvb2ttYXJrSWRCeVRhYikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib29rbWFyay51cGRhdGVCb29rbWFyayhib29rbWFya0lkQnlUYWIsIHRhYik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuLyoqXG4gKiDliJvlu7p0YWIgcmVtb3Zl55uR5ZCs5ZmoXG4gKi9cbnRhYnMub25SZW1vdmVkKGZ1bmN0aW9uICh0YWJJZCkge1xuICAgIGxldCBib29rbWFya0lkQnlUYWIgPSBib29rbWFya1RhYnNbdGFiSWRdO1xuICAgIC8vYm9va21hcmtUYWJzLmhhc093blByb3BlcnR5KHRhYklkKVxuICAgIGlmIChib29rbWFya0lkQnlUYWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgYm9va21hcmtUYWJzW3RhYklkXTtcbiAgICB9XG59KTtcblxuLy/liJvlu7rnm5HlkKxcbmxpc3Rlbk1lc3NhZ2UoKHJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBib29rbWFya0lkID0gcmVxdWVzdC5ib29rbWFya19pZDtcbiAgICBjb25zdCB0YWJJZCA9IHJlcXVlc3QudGFiX2lkO1xuICAgIGlmICh0YWJJZCA9PSBudWxsKSB7XG4gICAgICAgIGJvb2ttYXJrLmdldEJvb2ttYXJrKGJvb2ttYXJrSWQpLnRoZW4oZnVuY3Rpb24gKGJvb2ttYXJrKSB7XG4gICAgICAgICAgICB0YWJzLmNyZWF0ZShib29rbWFyay51cmwpLnRoZW4oZnVuY3Rpb24gKHRhYikge1xuICAgICAgICAgICAgICAgIGJvb2ttYXJrVGFic1t0YWIuaWRdID0gYm9va21hcmtJZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBib29rbWFya1RhYnNbdGFiSWRdID0gYm9va21hcmtJZDtcbiAgICB9XG4gICAgc3RhcnRXYWl0KCk7XG59KTtcblxuLy/mnInmtLvliqjmnJ/pl7TvvIzkv53mtLtcbi8vQHNlZSBodHRwczovL2Jsb2cuY3Nkbi5uZXQvcXFfMzU2MDY0MDAvYXJ0aWNsZS9kZXRhaWxzLzEzNjMyNzY5OFxubGV0IGtlZXBBbGl2ZSA9IG51bGw7XG5cbmZ1bmN0aW9uIHN0YXJ0V2FpdCgpIHtcbiAgICBpZiAoa2VlcEFsaXZlID09PSBudWxsKSB7XG4gICAgICAgIGtlZXBBbGl2ZSA9IHNldEludGVydmFsKHdhaXRVbnRpbCwgNSAqIDEwMDApO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZSBrZWVwQWxpdmVcIik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3YWl0VW50aWwoKSB7XG4gICAgY29uc29sZS5sb2coXCJsaXZpbmdcIik7XG4gICAgY2hyb21lLnJ1bnRpbWUuZ2V0UGxhdGZvcm1JbmZvKCkudGhlbigoKSA9PiB7XG4gICAgfSk7XG4gICAgbGV0IGJvb2ttYXJrVGFiU2l6ZSA9IE9iamVjdC5rZXlzKGJvb2ttYXJrVGFicykubGVuZ3RoO1xuICAgIC8vY29uc29sZS5sb2coXCJib29rbWFya1RhYlNpemVcIiwgYm9va21hcmtUYWJTaXplKVxuICAgIGlmIChib29rbWFya1RhYlNpemUgPT09IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChrZWVwQWxpdmUpO1xuICAgICAgICBrZWVwQWxpdmUgPSBudWxsO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJCb29rbWFyayIsImNvbnN0cnVjdG9yIiwibWFpbkJvb2ttYXJrRm9sZGVyIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0Qm9va21hcmtzIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0Qm9va21hcmtGb2xkZXIiLCJ0aGVuIiwicmVzdWx0IiwiY2hyb21lIiwiYm9va21hcmtzIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsInJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZ2V0Qm9va21hcmsiLCJib29rbWFya0lkIiwiZ2V0IiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJkZWxldGVCb29rbWFyayIsImNhbGxiYWNrIiwicmVtb3ZlIiwiYWRkTWFpbkJvb2ttYXJrRm9sZGVyIiwiY3JlYXRlIiwidGl0bGUiLCJ1cmwiLCJyZWplY3QiLCJzZWFyY2giLCJhZGRCb29rbWFyayIsIm9iamVjdCIsInNldEJhZGdlVGV4dCIsImFjdGlvbiIsInRleHQiLCJzZXRCYWRnZUJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidXBkYXRlQm9va21hcmsiLCJ0YWIiLCJjaGFuZ2VzIiwidXBkYXRlIiwibW92ZUJvb2ttYXJrIiwidG9JbmRleCIsIm1vdmUiLCJpbmRleCIsIlRhYiIsInRhYnMiLCJvblVwZGF0ZWQiLCJhZGRMaXN0ZW5lciIsInRhYklkIiwiY2hhbmdlSW5mbyIsInN0YXR1cyIsIm9uUmVtb3ZlZCIsImJvb2ttYXJrIiwicnVudGltZSIsImdldE1hbmlmZXN0IiwibmFtZSIsInNlbmRNZXNzYWdlIiwibXNnIiwibGlzdGVuTWVzc2FnZSIsInJlcXVlc3RDYWxsYmFjayIsImlzRGV2TW9kZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm9uTWVzc2FnZSIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJpbml0QmFja2dyb3VuZCIsInRvUHJvcGVydHlLZXkiLCJlIiwiciIsInQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmYXVsdCIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN5bWJvbCIsImkiLCJjYWxsIiwiVHlwZUVycm9yIiwiU3RyaW5nIiwiTnVtYmVyIiwibyIsIml0ZXJhdG9yIiwicHJvdG90eXBlIiwiYm9va21hcmtUYWJzIiwiYm9va21hcmtJZEJ5VGFiIiwiYm9va21hcmtfaWQiLCJ0YWJfaWQiLCJzdGFydFdhaXQiLCJrZWVwQWxpdmUiLCJzZXRJbnRlcnZhbCIsIndhaXRVbnRpbCIsImdldFBsYXRmb3JtSW5mbyIsImJvb2ttYXJrVGFiU2l6ZSIsImtleXMiLCJjbGVhckludGVydmFsIl0sInNvdXJjZVJvb3QiOiIifQ==