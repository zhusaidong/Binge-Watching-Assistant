import {bookmark, options, sendMessage, tabs} from "./helper.js";
import {getSiteRegularSet, siteRegularParser} from "./SiteRegularParser.js";

/**
 * vue
 */
new Vue({
    el: ".bookmark-list",
    data: {
        bookmarks: [],
        regulateBookmarks: {},
        uiMode: ""
    },
    created: function () {
        this.refreshBookmark();
    },
    methods: {
        /**
         * 刷新书签
         */
        refreshBookmark: function (draggableFlag) {
            let that = this;
            Promise.all([
                options.getOption("option"),
                bookmark.getBookmarks()
            ]).then(([option, bookmarks]) => {
                that.uiMode = (option !== null && option["uiMode"]) || "list";
                that.bookmarks = bookmarks;

                let regulateBookmarks = {};
                for (let i = 0; i < bookmarks.length; i++) {
                    let id = bookmarks[i].id;
                    regulateBookmarks[id] = bookmarks[i];
                    regulateBookmarks[id]['edit'] = false;
                }
                that.regulateBookmarks = regulateBookmarks;
                //console.log("refreshBookmark", that.bookmarks, that.regulateBookmarks);

                bookmark.setBadgeText();
                if (draggableFlag || true) {
                    setTimeout(() => {
                        that.draggableBookmark();
                    }, 1);
                }
            })
        },

        /**
         * 拖拽功能
         *      draggable-range: 可拖拽的范围
         *      draggable-element: 可拖拽的元素
         * @see https://www.runoob.com/jqueryui/api-sortable.html
         */
        draggableBookmark: function () {
            let that = this;
            $('.draggable-range').sortable({
                revert: true,
                cursor: "move",
                forcePlaceholderSize: true,
                opacity: 0.8,
                placeholder: ".draggable-element",
                update: (e, ui) => {
                    let books = $('.draggable-element');
                    for (let i = 0; i <= books.index(ui.item); i++) {
                        bookmark.moveBookmark(books.eq(i).data('id'), i);
                    }
                    setTimeout(() => {
                        that.refreshBookmark(false)
                    }, 1);
                },
            }).disableSelection();
        },

        /**
         * 添加按钮
         */
        addBtn: function () {
            let that = this;
            chrome.tabs.query({active: true, currentWindow: true}, tab => {
                Promise.all([
                    bookmark.getBookmarkFolder(),
                    getSiteRegularSet()
                ]).then(([bookmarkFolder, siteRegularSet]) => {
                    //添加时解析标题
                    siteRegularParser.setRegularSet(siteRegularSet);
                    let parseTitle = siteRegularParser.parse(tab[0].url, tab[0].title);

                    bookmark.addBookmark({
                        parentId: bookmarkFolder.id,
                        index: bookmarkFolder.children !== undefined ? bookmarkFolder.children.length : 0,
                        title: parseTitle || tab[0].title,
                        url: tab[0].url,
                    }, result => {
                        that.refreshBookmark();
                        //自动更新模式下，添加完立即监听
                        tabs.listeningTab(tab[0], result.id);
                    });
                });
            });
        },

        /**
         * 点击链接
         */
        linkBtn: function (e) {
            let target = e.target;
            let bookmark = $(target).parents('.bookmark');

            sendMessage({bookmark_id: bookmark.data('id')})
            e.preventDefault();

            return false;
        },

        /**
         * 更新按钮
         */
        replaceBtn: function (e) {
            let target = e.target;
            let card = $(target).parents('.draggable-element');

            let that = this;
            let id = card.data('id');
            chrome.tabs.query({active: true}, tab => {
                bookmark.updateBookmark(
                    id.toString(),
                    {
                        title: tab[0].title,
                        url: tab[0].url
                    }, () => {
                        that.refreshBookmark();
                    });
            });
        },

        /**
         * 删除按钮
         */
        deleteBtn: function (e) {
            let target = e.target;
            let card = $(target).parents('.draggable-element');
            console.log(target, card);

            let that = this;
            if (confirm('确认删除？')) {
                bookmark.deleteBookmark(card.data('id'), () => {
                    bookmark.setBadgeText();
                });
                this.refreshBookmark();
            }
        },

        /**
         * 保存按钮
         */
        saveBtn: function (e) {
            let target = e.target;
            let card = $(target).parents('.draggable-element');

            let that = this;
            let id = card.data('id');
            let title = card.find('.text-change').val();

            bookmark.updateBookmark(id, {title: title}, () => {
                that.refreshBookmark();
            });

            $(target).hide();
            card.find('.cancel-btn').hide();
            card.find('.text-change').hide();

            card.find('.change-btn').show();
            card.find('.link').show();
            card.find('.delete-btn').show();
        },

        /**
         * 修改按钮
         */
        changeBtn: function (e) {
            let target = e.target;
            let card = $(target).parents('.draggable-element');

            $(target).hide();
            card.find('.link').hide();
            card.find('.delete-btn').hide();

            card.find('.save-btn').show();
            card.find('.cancel-btn').show();
            card.find('.text-change').show();
        },

        /**
         * 取消按钮
         */
        cancelBtn: function (e) {
            let target = e.target;
            let card = $(target).parents('.draggable-element');

            $(target).hide();
            card.find('.save-btn').hide();
            card.find('.text-change').hide();

            card.find('.link').show();
            card.find('.change-btn').show();
            card.find('.delete-btn').show();

            this.refreshBookmark();
        },

        /**
         * 添加分隔线
         */
        addSeparator: function () {
            const name = prompt("输入分隔线的名称");
            if (name != null) {
                const separatorLine = ''.padEnd(25, '-');
                const that = this;
                bookmark.getBookmarkFolder().then(bookmarkFolder => {
                    let index = bookmarkFolder.children !== undefined ? bookmarkFolder.children.length : 0;
                    bookmark.addBookmark({
                        parentId: bookmarkFolder.id,
                        index: index,
                        title: separatorLine + name + separatorLine,
                        url: "chrome://bookmarks/",
                    }, () => {
                        that.refreshBookmark();
                    });
                });
            }
        }
    }
});
