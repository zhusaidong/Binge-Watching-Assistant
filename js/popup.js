/**
 * vue
 */
new Vue({
    el: ".bookmark-list",
    data: {
        backgroundPage: chrome.extension.getBackgroundPage(),
        bookmarks: [],
        regulateBookmarks: {},
        uiMode: "",
    },
    created: function () {
        this.refreshBookmark();
    },
    methods: {
        /**
         * 刷新书签
         */
        refreshBookmark: function () {
            let that = this;
            Promise.all([
                this.backgroundPage.options.getOption("option"),
                this.backgroundPage.helper.getBookmarks()
            ]).then(function ([option, bookmarks]) {
                that.uiMode = option["uiMode"] || "list";
                that.bookmarks = bookmarks;

                let regulateBookmarks = {};
                for (let i = 0; i < bookmarks.length; i++) {
                    regulateBookmarks[bookmarks[i].id] = bookmarks[i];
                    regulateBookmarks[bookmarks[i].id]['edit'] = false;
                }
                that.regulateBookmarks = regulateBookmarks;
                //console.log("refreshBookmark", that.bookmarks, that.regulateBookmarks);

                that.backgroundPage.helper.setBadgeText();
                setTimeout(function () {
                    that.draggableBookmark()
                }, 1);
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
            $(".draggable-range").sortable({
                revert: true,
                cursor: "move",
                forcePlaceholderSize: true,
                opacity: 0.8,
                placeholder: ".draggable-element",
                update: function (e, ui) {
                    let books = $('.draggable-element');
                    for (let i = 0; i <= books.index(ui.item); i++) {
                        that.backgroundPage.helper.moveBookmark(books.eq(i).data('id'), i);
                    }
                    setTimeout(function () {
                        that.refreshBookmark()
                    }, 1);
                },
            }).disableSelection();
        },

        /**
         * 添加按钮
         */
        addBtn: function () {
            let that = this;
            chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
                Promise.all([
                    that.backgroundPage.helper.getBookmarkFolder(),
                    that.backgroundPage.getSiteRegularSet()
                ]).then(function ([bookmarkFolder, siteRegularSet]) {
                    //添加时解析标题
                    let siteRegularParser = that.backgroundPage.siteRegularParser;
                    siteRegularParser.setRegularSet(siteRegularSet);
                    let parseTitle = siteRegularParser.parse(tab[0].url, tab[0].title);

                    that.backgroundPage.helper.addBookmark({
                        parentId: bookmarkFolder.id,
                        index: bookmarkFolder.children !== undefined ? bookmarkFolder.children.length : 0,
                        title: parseTitle || tab[0].title,
                        url: tab[0].url,
                    }, function (result) {
                        that.refreshBookmark();
                        //自动更新模式下，添加完立即监听
                        that.backgroundPage.tab.listeningTab(tab[0], result.id);
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

            this.backgroundPage.tab.createAndListen(bookmark.data('id'));
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
            chrome.tabs.query({active: true}, function (tab) {
                that.backgroundPage.helper.updateBookmark(id.toString(),
                    {
                        title: tab[0].title, url: tab[0].url
                    }, function () {
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
                this.backgroundPage.helper.deleteBookmark(card.data('id'), function () {
                    that.backgroundPage.bookmark.setBadgeText();
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

            this.backgroundPage.helper.updateBookmark(id, {title: title}, function () {
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
                const that = this;
                this.backgroundPage.helper.getBookmarkFolder().then(function (bookmarkFolder) {
                    that.backgroundPage.helper.addBookmark({
                        parentId: bookmarkFolder.id,
                        index: bookmarkFolder.children !== undefined ? bookmarkFolder.children.length : 0,
                        title: "--------------------------" + name + "---------------------------",
                        url: "chrome://bookmarks/",
                    }, function () {
                        that.refreshBookmark();
                    });
                });
            }
        }
    }
});
