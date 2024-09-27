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
class Store {
  /**
   * 保存数据
   * @param key
   * @param value
   * @param callback
   */
  setSyncData(key, value, callback) {
    chrome.storage.sync.set({
      [key]: JSON.stringify(value)
    }, callback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLEtBQUs7SUFDcEU7SUFDQTtJQUNBLElBQUksQ0FBQ1AsU0FBUyxJQUFJTSxNQUFNLENBQUNsRSxFQUFFLEtBQUssa0NBQWtDLEVBQUU7TUFDaEU7SUFDSjtJQUNBMkQsZUFBZSxDQUFDTSxPQUFPLENBQUM7SUFDeEJFLFlBQVksQ0FBQztNQUFDVixHQUFHLEVBQUU7SUFBSSxDQUFDLENBQUM7RUFDN0IsQ0FBQyxDQUFDO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ08sU0FBU1csY0FBY0EsQ0FBQSxFQUFHO0VBQzdCaEIsUUFBUSxDQUFDdkMscUJBQXFCLENBQUMsQ0FBQztFQUNoQ3VDLFFBQVEsQ0FBQy9CLFlBQVksQ0FBQyxDQUFDO0FBQzNCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9id2EvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYndhLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2J3YS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2J3YS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J3YS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYndhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYndhLy4vc3JjL2VudHJ5L2hlbHBlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkoZSwgciwgdCkge1xuICByZXR1cm4gKHIgPSB0b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHtcbiAgICB2YWx1ZTogdCxcbiAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICBjb25maWd1cmFibGU6ICEwLFxuICAgIHdyaXRhYmxlOiAhMFxuICB9KSA6IGVbcl0gPSB0LCBlO1xufVxuZXhwb3J0IHsgX2RlZmluZVByb3BlcnR5IGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmZ1bmN0aW9uIHRvUHJpbWl0aXZlKHQsIHIpIHtcbiAgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZih0KSB8fCAhdCkgcmV0dXJuIHQ7XG4gIHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gX3R5cGVvZihpKSkgcmV0dXJuIGk7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7XG59XG5leHBvcnQgeyB0b1ByaW1pdGl2ZSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmZ1bmN0aW9uIHRvUHJvcGVydHlLZXkodCkge1xuICB2YXIgaSA9IHRvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiO1xufVxuZXhwb3J0IHsgdG9Qcm9wZXJ0eUtleSBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn1cbmV4cG9ydCB7IF90eXBlb2YgYXMgZGVmYXVsdCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICog5Lmm562+XG4gKi9cbmNsYXNzIEJvb2ttYXJrIHtcbiAgICAvKipcbiAgICAgKiDkuLvnm67lvZVcbiAgICAgKi9cbiAgICBtYWluQm9va21hcmtGb2xkZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluQm9va21hcmtGb2xkZXIpIHtcbiAgICAgICAgdGhpcy5tYWluQm9va21hcmtGb2xkZXIgPSBtYWluQm9va21hcmtGb2xkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICrojrflj5bov73liafliqnmiYvkuabnrb7liJfooahcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCb29rbWFya1RyZWVOb2RlW10+fVxuICAgICAqL1xuICAgIGdldEJvb2ttYXJrcygpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0Qm9va21hcmtGb2xkZXIoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUuYm9va21hcmtzLmdldENoaWxkcmVuKHJlc3VsdC5pZCwgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldEJvb2ttYXJrcy5nZXRCb29rbWFya0ZvbGRlci5yZWplY3RcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC55o2u5Lmm562+aWTojrflj5bkuabnrb7lhoXlrrlcbiAgICAgKiBAcGFyYW0gYm9va21hcmtJZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2ttYXJrVHJlZU5vZGU+fVxuICAgICAqL1xuICAgIGdldEJvb2ttYXJrKGJvb2ttYXJrSWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBjaHJvbWUuYm9va21hcmtzLmdldChib29rbWFya0lkLnRvU3RyaW5nKCksIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMgIT09IHVuZGVmaW5lZCAmJiByZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yig6Zmk5Lmm562+XG4gICAgICogQHBhcmFtIGJvb2ttYXJrSWRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBkZWxldGVCb29rbWFyayhib29rbWFya0lkLCBjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUuYm9va21hcmtzLnJlbW92ZShib29rbWFya0lkLnRvU3RyaW5nKCksIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDkuLvkuabnrb7mlofku7blpLlcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBhZGRNYWluQm9va21hcmtGb2xkZXIoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmdldEJvb2ttYXJrRm9sZGVyKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8v5aaC5p6c5Yib5bu65pe25LiN5oyH5a6acGFyZW50SWTvvIzliJnmiYDliJvlu7rnmoTkuabnrb7kvJrpu5jorqTliqDlhaXliLDlhbbku5bkuabnrb7kuK1cbiAgICAgICAgICAgIGNocm9tZS5ib29rbWFya3MuY3JlYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoYXQubWFpbkJvb2ttYXJrRm9sZGVyLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Lmm562+5paH5Lu25aS5XG4gICAgICogQHJldHVybnMge1Byb21pc2U8Qm9va21hcmtUcmVlTm9kZT59XG4gICAgICovXG4gICAgZ2V0Qm9va21hcmtGb2xkZXIoKSB7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGNocm9tZS5ib29rbWFya3Muc2VhcmNoKHRoYXQubWFpbkJvb2ttYXJrRm9sZGVyLCBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHNbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDkuabnrb5cbiAgICAgKiBAcGFyYW0gb2JqZWN0IEJvb2ttYXJrQ3JlYXRlQXJnXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICovXG4gICAgYWRkQm9va21hcmsob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUuYm9va21hcmtzLmNyZWF0ZShvYmplY3QsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRCYWRnZVRleHRcbiAgICAgKi9cbiAgICBzZXRCYWRnZVRleHQoKSB7XG4gICAgICAgIHRoaXMuZ2V0Qm9va21hcmtzKCkudGhlbihmdW5jdGlvbiAoYm9va21hcmtzKSB7XG4gICAgICAgICAgICBpZiAoYm9va21hcmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYm9va21hcmtzLmxlbmd0aC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChib29rbWFya3MubGVuZ3RoID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmZjAwMDBcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOS5puetvlxuICAgICAqIEBwYXJhbSBib29rbWFya0lkIC0gYm9va21hcmsgaWRcbiAgICAgKiBAcGFyYW0gdGFiIC0gQm9va21hcmtDaGFuZ2VzQXJnXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gZnVuY3Rpb25cbiAgICAgKi9cbiAgICB1cGRhdGVCb29rbWFyayhib29rbWFya0lkLCB0YWIsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0ge307XG4gICAgICAgIGlmICh0YWIudGl0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlcy50aXRsZSA9IHRhYi50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFiLnVybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnVybCA9IHRhYi51cmw7XG4gICAgICAgIH1cblxuICAgICAgICBjaHJvbWUuYm9va21hcmtzLnVwZGF0ZShib29rbWFya0lkLnRvU3RyaW5nKCksIGNoYW5nZXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vliqjkuabnrb5cbiAgICAgKiBAcGFyYW0gYm9va21hcmtJZFxuICAgICAqIEBwYXJhbSB0b0luZGV4XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgbW92ZUJvb2ttYXJrKGJvb2ttYXJrSWQsIHRvSW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNocm9tZS5ib29rbWFya3MubW92ZShib29rbWFya0lkLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICAgIGluZGV4OiB0b0luZGV4XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbi8qKlxuICog5a2Y5YKoXG4gKi9cbmNsYXNzIFN0b3JlIHtcbiAgICAvKipcbiAgICAgKiDkv53lrZjmlbDmja5cbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgc2V0U3luY0RhdGEoa2V5LCB2YWx1ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1trZXldOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSl9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+75Y+W5pWw5o2uXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG9iamVjdD59XG4gICAgICovXG4gICAgZ2V0U3luY0RhdGEoa2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoa2V5LCBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKG9iamVjdFtrZXldKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIOagh+etvumhtVxuICovXG5jbGFzcyBUYWIge1xuICAgIC8qKlxuICAgICAqIOWIm+W7unRhYlxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvYmplY3Q+fVxuICAgICAqL1xuICAgIGNyZWF0ZSh1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0YWIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebkeWQrHRhYuabtOaWsFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIG9uVXBkYXRlZChjYWxsYmFjaykge1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIGNoYW5nZUluZm8uc3RhdHVzID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55uR5ZCsdGFi56e76ZmkXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgb25SZW1vdmVkKGNhbGxiYWNrKSB7XG4gICAgICAgIGNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIGJvb2ttYXJrID0gbmV3IEJvb2ttYXJrKGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XG5leHBvcnQgdmFyIHRhYnMgPSBuZXcgVGFiKCk7XG5cbi8qKlxuICog5Y+R6YCB5raI5oGvXG4gKiBAcGFyYW0gbXNnIOa2iOaBr1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobXNnKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobXNnKTtcbn1cblxuLyoqXG4gKiDnm5HlkKzmtojmga9cbiAqIEBwYXJhbSByZXF1ZXN0Q2FsbGJhY2sg5raI5oGv5Zue6LCDXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5NZXNzYWdlKHJlcXVlc3RDYWxsYmFjaykge1xuICAgIGNvbnN0IGlzRGV2TW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldCB0aGUgbWVzc2FnZVtyZXF1ZXN0XVwiLCByZXF1ZXN0KVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0IHRoZSBtZXNzYWdlW3NlbmRlcl1cIiwgc2VuZGVyKVxuICAgICAgICBpZiAoIWlzRGV2TW9kZSAmJiBzZW5kZXIuaWQgIT09IFwicGJubmhlaWJhY3BhbWZhZW5kaW1vZ2JlYWVjaWdscG9cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RDYWxsYmFjayhyZXF1ZXN0KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHttc2c6IFwib2tcIn0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIOWIneWni+WMllxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdEJhY2tncm91bmQoKSB7XG4gICAgYm9va21hcmsuYWRkTWFpbkJvb2ttYXJrRm9sZGVyKCk7XG4gICAgYm9va21hcmsuc2V0QmFkZ2VUZXh0KCk7XG59XG4iXSwibmFtZXMiOlsidG9Qcm9wZXJ0eUtleSIsIl9kZWZpbmVQcm9wZXJ0eSIsImUiLCJyIiwidCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZhdWx0IiwiX3R5cGVvZiIsInRvUHJpbWl0aXZlIiwiU3ltYm9sIiwiaSIsImNhbGwiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJOdW1iZXIiLCJvIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIkJvb2ttYXJrIiwibWFpbkJvb2ttYXJrRm9sZGVyIiwiZ2V0Qm9va21hcmtzIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZ2V0Qm9va21hcmtGb2xkZXIiLCJ0aGVuIiwicmVzdWx0IiwiY2hyb21lIiwiYm9va21hcmtzIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsInJlc3VsdHMiLCJjb25zb2xlIiwibG9nIiwiZ2V0Qm9va21hcmsiLCJib29rbWFya0lkIiwiZ2V0IiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJkZWxldGVCb29rbWFyayIsImNhbGxiYWNrIiwicmVtb3ZlIiwiYWRkTWFpbkJvb2ttYXJrRm9sZGVyIiwiY3JlYXRlIiwidGl0bGUiLCJ1cmwiLCJyZWplY3QiLCJzZWFyY2giLCJhZGRCb29rbWFyayIsIm9iamVjdCIsInNldEJhZGdlVGV4dCIsImFjdGlvbiIsInRleHQiLCJzZXRCYWRnZUJhY2tncm91bmRDb2xvciIsImNvbG9yIiwidXBkYXRlQm9va21hcmsiLCJ0YWIiLCJjaGFuZ2VzIiwidXBkYXRlIiwibW92ZUJvb2ttYXJrIiwidG9JbmRleCIsIm1vdmUiLCJpbmRleCIsIlN0b3JlIiwic2V0U3luY0RhdGEiLCJrZXkiLCJzdG9yYWdlIiwic3luYyIsInNldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRTeW5jRGF0YSIsInBhcnNlIiwiVGFiIiwidGFicyIsIm9uVXBkYXRlZCIsImFkZExpc3RlbmVyIiwidGFiSWQiLCJjaGFuZ2VJbmZvIiwic3RhdHVzIiwib25SZW1vdmVkIiwiYm9va21hcmsiLCJydW50aW1lIiwiZ2V0TWFuaWZlc3QiLCJuYW1lIiwic2VuZE1lc3NhZ2UiLCJtc2ciLCJsaXN0ZW5NZXNzYWdlIiwicmVxdWVzdENhbGxiYWNrIiwiaXNEZXZNb2RlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwib25NZXNzYWdlIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsImluaXRCYWNrZ3JvdW5kIl0sInNvdXJjZVJvb3QiOiIifQ==