/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*****************************!*\
  !*** ./src/entry/helper.js ***!
  \*****************************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0MsSUFBSSxDQUFDTSxTQUFTLENBQUNKLFdBQVcsQ0FBQzFCLFFBQVEsQ0FBQztFQUMvQztBQUNKO0FBRU8sSUFBSStCLFFBQVEsR0FBRyxJQUFJdEQsUUFBUSxDQUFDUyxNQUFNLENBQUM4QyxPQUFPLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQztBQUM5RCxJQUFJVixJQUFJLEdBQUcsSUFBSUQsR0FBRyxDQUFDLENBQUM7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU1ksV0FBV0EsQ0FBQ0MsR0FBRyxFQUFFO0VBQzdCbEQsTUFBTSxDQUFDOEMsT0FBTyxDQUFDRyxXQUFXLENBQUNDLEdBQUcsQ0FBQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNDLGFBQWFBLENBQUNDLGVBQWUsRUFBRTtFQUMzQyxNQUFNQyxTQUFTLEdBQUdDLGFBQW9CLEtBQUssYUFBYTtFQUN4RHRELE1BQU0sQ0FBQzhDLE9BQU8sQ0FBQ1csU0FBUyxDQUFDakIsV0FBVyxDQUFDLENBQUNrQixPQUFPLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxLQUFLO0lBQ3BFO0lBQ0E7SUFDQSxJQUFJLENBQUNQLFNBQVMsSUFBSU0sTUFBTSxDQUFDeEQsRUFBRSxLQUFLLGtDQUFrQyxFQUFFO01BQ2hFO0lBQ0o7SUFDQWlELGVBQWUsQ0FBQ00sT0FBTyxDQUFDO0lBQ3hCRSxZQUFZLENBQUM7TUFBQ1YsR0FBRyxFQUFFO0lBQUksQ0FBQyxDQUFDO0VBQzdCLENBQUMsQ0FBQztBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNPLFNBQVNXLGNBQWNBLENBQUEsRUFBRztFQUM3QmhCLFFBQVEsQ0FBQzdCLHFCQUFxQixDQUFDLENBQUM7RUFDaEM2QixRQUFRLENBQUNyQixZQUFZLENBQUMsQ0FBQztBQUMzQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYndhLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2J3YS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9id2EvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9id2EvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL2J3YS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9id2Evd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J3YS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J3YS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J3YS8uL3NyYy9lbnRyeS9oZWxwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHtcbiAgcmV0dXJuIChyID0gdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7XG4gICAgdmFsdWU6IHQsXG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITBcbiAgfSkgOiBlW3JdID0gdCwgZTtcbn1cbmV4cG9ydCB7IF9kZWZpbmVQcm9wZXJ0eSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxuZXhwb3J0IHsgdG9QcmltaXRpdmUgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5mdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSB0b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjtcbn1cbmV4cG9ydCB7IHRvUHJvcGVydHlLZXkgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5leHBvcnQgeyBfdHlwZW9mIGFzIGRlZmF1bHQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIOS5puetvlxuICovXG5jbGFzcyBCb29rbWFyayB7XG4gICAgLyoqXG4gICAgICog5Li755uu5b2VXG4gICAgICovXG4gICAgbWFpbkJvb2ttYXJrRm9sZGVyO1xuXG4gICAgY29uc3RydWN0b3IobWFpbkJvb2ttYXJrRm9sZGVyKSB7XG4gICAgICAgIHRoaXMubWFpbkJvb2ttYXJrRm9sZGVyID0gbWFpbkJvb2ttYXJrRm9sZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAq6I635Y+W6L+95Ymn5Yqp5omL5Lmm562+5YiX6KGoXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Qm9va21hcmtUcmVlTm9kZVtdPn1cbiAgICAgKi9cbiAgICBnZXRCb29rbWFya3MoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICB0aGF0LmdldEJvb2ttYXJrRm9sZGVyKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5nZXRDaGlsZHJlbihyZXN1bHQuaWQsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRCb29rbWFya3MuZ2V0Qm9va21hcmtGb2xkZXIucmVqZWN0XCIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruS5puetvmlk6I635Y+W5Lmm562+5YaF5a65XG4gICAgICogQHBhcmFtIGJvb2ttYXJrSWRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCb29rbWFya1RyZWVOb2RlPn1cbiAgICAgKi9cbiAgICBnZXRCb29rbWFyayhib29rbWFya0lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5nZXQoYm9va21hcmtJZC50b1N0cmluZygpLCBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0c1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOS5puetvlxuICAgICAqIEBwYXJhbSBib29rbWFya0lkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgZGVsZXRlQm9va21hcmsoYm9va21hcmtJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5yZW1vdmUoYm9va21hcmtJZC50b1N0cmluZygpLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5Li75Lmm562+5paH5Lu25aS5XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgYWRkTWFpbkJvb2ttYXJrRm9sZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5nZXRCb29rbWFya0ZvbGRlcigpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL+WmguaenOWIm+W7uuaXtuS4jeaMh+WumnBhcmVudElk77yM5YiZ5omA5Yib5bu655qE5Lmm562+5Lya6buY6K6k5Yqg5YWl5Yiw5YW25LuW5Lmm562+5LitXG4gICAgICAgICAgICBjaHJvbWUuYm9va21hcmtzLmNyZWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGF0Lm1haW5Cb29rbWFya0ZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluS5puetvuaWh+S7tuWkuVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2ttYXJrVHJlZU5vZGU+fVxuICAgICAqL1xuICAgIGdldEJvb2ttYXJrRm9sZGVyKCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBjaHJvbWUuYm9va21hcmtzLnNlYXJjaCh0aGF0Lm1haW5Cb29rbWFya0ZvbGRlciwgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5Lmm562+XG4gICAgICogQHBhcmFtIG9iamVjdCBCb29rbWFya0NyZWF0ZUFyZ1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqL1xuICAgIGFkZEJvb2ttYXJrKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hyb21lLmJvb2ttYXJrcy5jcmVhdGUob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0QmFkZ2VUZXh0XG4gICAgICovXG4gICAgc2V0QmFkZ2VUZXh0KCkge1xuICAgICAgICB0aGlzLmdldEJvb2ttYXJrcygpLnRoZW4oZnVuY3Rpb24gKGJvb2ttYXJrcykge1xuICAgICAgICAgICAgaWYgKGJvb2ttYXJrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGJvb2ttYXJrcy5sZW5ndGgudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYm9va21hcmtzLmxlbmd0aCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmYwMDAwXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDkuabnrb5cbiAgICAgKiBAcGFyYW0gYm9va21hcmtJZCAtIGJvb2ttYXJrIGlkXG4gICAgICogQHBhcmFtIHRhYiAtIEJvb2ttYXJrQ2hhbmdlc0FyZ1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIGZ1bmN0aW9uXG4gICAgICovXG4gICAgdXBkYXRlQm9va21hcmsoYm9va21hcmtJZCwgdGFiLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgY2hhbmdlcyA9IHt9O1xuICAgICAgICBpZiAodGFiLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoYW5nZXMudGl0bGUgPSB0YWIudGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhYi51cmwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlcy51cmwgPSB0YWIudXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hyb21lLmJvb2ttYXJrcy51cGRhdGUoYm9va21hcmtJZC50b1N0cmluZygpLCBjaGFuZ2VzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo5Lmm562+XG4gICAgICogQHBhcmFtIGJvb2ttYXJrSWRcbiAgICAgKiBAcGFyYW0gdG9JbmRleFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIG1vdmVCb29rbWFyayhib29rbWFya0lkLCB0b0luZGV4LCBjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUuYm9va21hcmtzLm1vdmUoYm9va21hcmtJZC50b1N0cmluZygpLCB7XG4gICAgICAgICAgICBpbmRleDogdG9JbmRleFxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG4vKipcbiAqIOWtmOWCqFxuICovXG4vLyBjbGFzcyBTdG9yZSB7XG4vLyAgICAgLyoqXG4vLyAgICAgICog5L+d5a2Y5pWw5o2uXG4vLyAgICAgICogQHBhcmFtIGtleVxuLy8gICAgICAqIEBwYXJhbSB2YWx1ZVxuLy8gICAgICAqIEBwYXJhbSBjYWxsYmFja1xuLy8gICAgICAqL1xuLy8gICAgIHNldFN5bmNEYXRhKGtleSwgdmFsdWUsIGNhbGxiYWNrKSB7XG4vLyAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtba2V5XTogSlNPTi5zdHJpbmdpZnkodmFsdWUpfSwgY2FsbGJhY2spO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICog6K+75Y+W5pWw5o2uXG4vLyAgICAgICogQHBhcmFtIGtleVxuLy8gICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG9iamVjdD59XG4vLyAgICAgICovXG4vLyAgICAgZ2V0U3luY0RhdGEoa2V5KSB7XG4vLyAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuLy8gICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoa2V5LCBmdW5jdGlvbiAob2JqZWN0KSB7XG4vLyAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKG9iamVjdFtrZXldKSk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gfVxuXG4vKipcbiAqIOagh+etvumhtVxuICovXG5jbGFzcyBUYWIge1xuICAgIC8qKlxuICAgICAqIOWIm+W7unRhYlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fVxuICAgICAqL1xuICAgIGNyZWF0ZSh1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0YWIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebkeWQrHRhYuabtOaWsFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIG9uVXBkYXRlZChjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIGNoYW5nZUluZm8uc3RhdHVzID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55uR5ZCsdGFi56e76ZmkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgb25SZW1vdmVkKGNhbGxiYWNrKSB7XG4gICAgICAgIGNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIGJvb2ttYXJrID0gbmV3IEJvb2ttYXJrKGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XG5leHBvcnQgdmFyIHRhYnMgPSBuZXcgVGFiKCk7XG5cbi8qKlxuICog5Y+R6YCB5raI5oGvXG4gKiBAcGFyYW0gbXNnIOa2iOaBr1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobXNnKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobXNnKTtcbn1cblxuLyoqXG4gKiDnm5HlkKzmtojmga9cbiAqIEBwYXJhbSByZXF1ZXN0Q2FsbGJhY2sg5raI5oGv5Zue6LCDXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5NZXNzYWdlKHJlcXVlc3RDYWxsYmFjaykge1xuICAgIGNvbnN0IGlzRGV2TW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldCB0aGUgbWVzc2FnZVtyZXF1ZXN0XVwiLCByZXF1ZXN0KVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0IHRoZSBtZXNzYWdlW3NlbmRlcl1cIiwgc2VuZGVyKVxuICAgICAgICBpZiAoIWlzRGV2TW9kZSAmJiBzZW5kZXIuaWQgIT09IFwicGJubmhlaWJhY3BhbWZhZW5kaW1vZ2JlYWVjaWdscG9cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RDYWxsYmFjayhyZXF1ZXN0KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHttc2c6IFwib2tcIn0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIOWIneWni+WMllxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdEJhY2tncm91bmQoKSB7XG4gICAgYm9va21hcmsuYWRkTWFpbkJvb2ttYXJrRm9sZGVyKCk7XG4gICAgYm9va21hcmsuc2V0QmFkZ2VUZXh0KCk7XG59XG4iXSwibmFtZXMiOlsidG9Qcm9wZXJ0eUtleSIsIl9kZWZpbmVQcm9wZXJ0eSIsImUiLCJyIiwidCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZhdWx0IiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3ltYm9sIiwiaSIsImNhbGwiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJOdW1iZXIiLCJvIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIkJvb2ttYXJrIiwibWFpbkJvb2ttYXJrRm9sZGVyIiwiZ2V0Qm9va21hcmtzIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0Qm9va21hcmtGb2xkZXIiLCJ0aGVuIiwicmVzdWx0IiwiY2hyb21lIiwiYm9va21hcmtzIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsInJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZ2V0Qm9va21hcmsiLCJib29rbWFya0lkIiwiZ2V0IiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJkZWxldGVCb29rbWFyayIsImNhbGxiYWNrIiwicmVtb3ZlIiwiYWRkTWFpbkJvb2ttYXJrRm9sZGVyIiwiY3JlYXRlIiwidGl0bGUiLCJ1cmwiLCJyZWplY3QiLCJzZWFyY2giLCJhZGRCb29rbWFyayIsIm9iamVjdCIsInNldEJhZGdlVGV4dCIsImFjdGlvbiIsInRleHQiLCJzZXRCYWRnZUJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidXBkYXRlQm9va21hcmsiLCJ0YWIiLCJjaGFuZ2VzIiwidXBkYXRlIiwibW92ZUJvb2ttYXJrIiwidG9JbmRleCIsIm1vdmUiLCJpbmRleCIsIlRhYiIsInRhYnMiLCJvblVwZGF0ZWQiLCJhZGRMaXN0ZW5lciIsInRhYklkIiwiY2hhbmdlSW5mbyIsInN0YXR1cyIsIm9uUmVtb3ZlZCIsImJvb2ttYXJrIiwicnVudGltZSIsImdldE1hbmlmZXN0IiwibmFtZSIsInNlbmRNZXNzYWdlIiwibXNnIiwibGlzdGVuTWVzc2FnZSIsInJlcXVlc3RDYWxsYmFjayIsImlzRGV2TW9kZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm9uTWVzc2FnZSIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJpbml0QmFja2dyb3VuZCJdLCJzb3VyY2VSb290IjoiIn0=