let backgroundPage = chrome.extension.getBackgroundPage();

let nestable = () => {
    $('.bookmarkFolder').nestable({
        maxDepth: 1,
        listNodeName: 'tbody',      // 创建树结构的的HTML标签（默认'ol'）
        itemNodeName: 'tr',         // 创建树结构节点的HTML标签（默认'li'）
        rootClass: 'bookmarkFolder',//根节点的class属性名称（默认'dd'）
        listClass: 'bookmarkList',  // 所有节点的class属性名称（默认'dd-list'）
        itemClass: 'bookmark',      // 树结构叶子节点class名称（默认'dd-item'）
    }).on('change', function (e) {
        if (e.isTrigger !== undefined && e.isTrigger === true) {
            let target = $($(e.target).get(0));
            let folderId = target.data('folderId');
            let serializeBookmarkId = $(e.target).nestable('serialize');
            for (var index in serializeBookmarkId) {
                if (serializeBookmarkId.hasOwnProperty(index)) {
                    let bookmarkId = serializeBookmarkId[index]['bookmarkId'];
                    backgroundPage.bookmark.moveBookmark(bookmarkId, index, folderId);
                }
            }
            refreshBookmark();
        }
    });
};
/**
 * is folder
 *
 * @param bookmark object
 *
 * @returns {boolean}
 */
let isFolder = (bookmark) => {
    return bookmark.url === undefined && bookmark.hasOwnProperty('dateGroupModified') && bookmark.dateGroupModified !== undefined;
};
let bookmarkFolder = (bookmarkFolder) => {
    return new Promise(function (resolve) {
        chrome.bookmarks.getChildren(bookmarkFolder.id, function (bookmarks) {
            let bookmarkFolderTemplate = new SimpleTemplate('.bookmarkFolderTemplate');
            let bookmarkListTemplate = new SimpleTemplate('.bookmarkListTemplate');

            if (bookmarks.length > 0) {
                let list = "";
                for (let i = 0; i < bookmarks.length; i++) {
                    let bookmark = bookmarks[i];
                    if (!isFolder(bookmark)) {
                        bookmarkListTemplate
                            .setVars(bookmarks[i])
                            .setVar('number', (i + 1));
                        list += bookmarkListTemplate.toString();
                        bookmarkListTemplate.clear();
                    }
                }
                resolve(bookmarkFolderTemplate
                    .setVar('bookmarkFolderName', bookmarkFolder.title)
                    .setVar('bookmarkList', list)
                    .toString());
            }
        });
    });
};

let refreshBookmark = function () {
    backgroundPage.helper.getBookmarks().then(function ([bookmarks, bookmarkFolderObj]) {
        //console.log("refreshBookmark",bookmarks);
        backgroundPage.helper.setBadgeText();
        let html = "";
        let bookmarkFolderTemplate = new SimpleTemplate('.bookmarkFolderTemplate');
        let bookmarkListTemplate = new SimpleTemplate('.bookmarkListTemplate');
        if (bookmarks.length > 0) {
            for (let i = 0; i < bookmarks.length; i++) {
                let bookmark = bookmarks[i];
                if (isFolder(bookmark)) {
                    html += '<table class="bookmarkFolder" data-folder-id="' + bookmark.id + '"></table>';
                    bookmarkFolder(bookmark).then(function (bookmarkFolderHtml) {
                        $('.bookmarkFolder[data-folder-id="' + bookmark.id + '"]').html(bookmarkFolderHtml);
                    });
                } else {
                    bookmarkListTemplate
                        .setVars(bookmark)
                        .setVar('number', (i + 1));
                    html += bookmarkListTemplate.toString();
                    bookmarkListTemplate.clear();
                }
            }

            bookmarkFolderTemplate
                .setVar('folderId', bookmarkFolderObj.id)
                .setVar('bookmarkFolderName', "")
                .setVar('bookmarkList', html)
                .toHtml('.bookmarkFolderList');

            nestable();
        }
    });
};
refreshBookmark();

$(document).on('click', '.add-btn', function () {
    chrome.tabs.query({active: true}, function (tab) {
        backgroundPage.helper.getBookmarkFolder().then(function (results) {
            backgroundPage.helper.addBookmark(
                {
                    parentId: results.id,
                    index: results.children !== undefined ? results.children.length : 0,
                    title: tab[0].title,
                    url: tab[0].url,
                }, function () {
                    refreshBookmark();
                });
        });
    });
});
$(document).on('click', '.bookmarkOperationDelete', function () {
    let parent = $(this).parent().parent();
    let id = parent.data('bookmarkId');
    if (confirm('确认删除？')) {
        backgroundPage.helper.deleteBookmark(id, function () {
            backgroundPage.bookmark.setBadgeText();
        });
        refreshBookmark();
    }
});
$(document).on('click', '.bookmarkOperationSave', function () {
    let parent = $(this).parent().parent();

    let id = parent.data('bookmarkId');
    let title = parent.find('.bookmarkTextEdit').val();

    backgroundPage.helper.updateBookmark(id, {title: title}, function () {
        refreshBookmark();
    });

    $(this).hide();
    parent.find('.bookmarkOperationCancel').hide();
    parent.find('.bookmarkTextEdit').hide();

    parent.find('.bookmarkOperationEdit').show();
    parent.find('.bookmarkTextShow').show();
    parent.find('.bookmarkOperationDelete').show();
});
$(document).on('click', '.bookmarkOperationEdit', function () {
    $(this).hide();
    $(this).parent().parent().find('.bookmarkTextShow').hide();
    $(this).parent().parent().find('.bookmarkOperationDelete').hide();

    $(this).parent().parent().find('.bookmarkOperationSave').show();
    $(this).parent().parent().find('.bookmarkOperationCancel').show();
    $(this).parent().parent().find('.bookmarkTextEdit').show();

});
$(document).on('click', '.bookmarkOperationCancel', function () {
    $(this).hide();
    $(this).parent().parent().find('.bookmarkOperationSave').hide();
    $(this).parent().parent().find('.bookmarkTextEdit').hide();

    $(this).parent().parent().find('.bookmarkTextShow').show();
    $(this).parent().parent().find('.bookmarkOperationEdit').show();
    $(this).parent().parent().find('.bookmarkOperationDelete').show();
});
$(document).on('click', '.bookmarkTextShow', function (e) {
    backgroundPage.tabs.createAndListen($(this).data('id'));
    e.preventDefault();
    return false;
});
