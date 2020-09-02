let backgroundPage = chrome.extension.getBackgroundPage();

/**
 * 列表模式
 * @param bookmarks
 * @param updateMode
 * @returns {string}
 */
let listBookmark = function (bookmarks, updateMode) {
    let list = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let url = bookmarks[i].url;
        let title = bookmarks[i].title;
        let id = bookmarks[i].id;

        list += `
            <tr class="draggable-element" data-id="${id}">
                <td style="width:5%" class="id">
                    ${(i + 1)}.
                </td>
                <td>
                    <div id="icon" class="website-icon" style="background-image: -webkit-image-set(
                        url(&quot;chrome://favicon/size/16@1x/${url}&quot;) 1x,
                        url(&quot;chrome://favicon/size/16@2x/${url}&quot;) 2x);"></div>
                </td>
                <td style="width:55%">
                    <a target="_blank" class="link" data-id="${id}" href="javascript:void(0);">
                        <span class="bookmark-a" title="${url}">${title}</span>
                    </a>
                    <input type="text" class="form-control text-change" style="width:100%" value="${title}"/>
                </td>
                <td>
                    ${actionButtons(id, updateMode)}
                </td>
            </tr>`;
    }
    return `<table class="table"><tbody class="draggable-range">${list}</tbody></table>`;
}

/**
 * 卡片模式
 * @see https://v4.bootcss.com/docs/getting-started/introduction/
 * @param bookmarks
 * @param updateMode
 * @returns {string}
 */
let cardBookmark = function (bookmarks, updateMode) {
    let list = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let url = bookmarks[i].url;
        let title = bookmarks[i].title;
        let id = bookmarks[i].id;

        list += `
			<div class="card border-1 mb-sm-n1 mt-sm-n1 draggable-element" data-id="${id}">
			    <div class="card-body border d-flex justify-content-start">
			        <div style="width:5%" class="v-align">
			            ${(i + 1)}.
					</div>
			        <div style="width:5%" class="v-align">
			            <div id="icon" class="website-icon" style="background-image: -webkit-image-set(
                            url(&quot;chrome://favicon/size/16@1x/${url}&quot;) 1x,
                            url(&quot;chrome://favicon/size/16@2x/${url}&quot;) 2x);"></div>
					</div>
			        <div class="align-self-center" style="width:70%">
						<a target="_blank" class="link" data-id="${id}" href="javascript:void(0);">
							<span class="bookmark-a card-link" title="${url}">${title}</span>
						</a>
			            <input type="text" class="text-change" style="width:100%" value="${title}">
			        </div>
			    </div>
			    <div class="card-footer">
			        <div class="ml-auto">
						${actionButtons(id, updateMode)}
			        </div>
			    </div>
			</div>`;
    }
    return `<div class="draggable-range">${list}</div>`;
}

/**
 * 操作按钮组
 * @param bookmarkId
 * @param updateMode
 * @returns {string}
 */
let actionButtons = function (bookmarkId, updateMode) {
    let updateButton = '';
    if (updateMode === "manual") {
        updateButton += `<button type="button" class="btn btn-success change-btn btn-sm" data-id="${bookmarkId}">更新</button>`;
    }
    return `${updateButton}
        <button type="button" class="btn btn-success change-btn btn-sm">编辑</button>
        <button type="button" class="btn btn-success save-btn btn-sm" data-id="${bookmarkId}">保存</button>
        <button type="button" class="btn btn-danger cancel-btn btn-sm">取消</button>
        <button type="button" class="btn btn-danger delete-btn btn-sm" data-id="${bookmarkId}">删除</button>`;
}

/**
 * 刷新书签
 */
let refreshBookmark = function () {
    Promise.all([
        backgroundPage.options.getOption("updateMode"),
        backgroundPage.options.getOption("uiMode"),
        backgroundPage.helper.getBookmarks()
    ]).then(function (values) {
        let updateMode = values[0];
        let uiMode = values[1];
        let bookmarks = values[2];

        //console.log("refreshBookmark",bookmarks);
        backgroundPage.helper.setBadgeText();

        let html = `<span>追剧书签:</span><button type="button" class="btn btn-primary add-btn btn-sm">添加追剧</button><br><br>`;
        if (bookmarks.length > 0) {
            if (uiMode === "card") {
                html += cardBookmark(bookmarks, updateMode);
            } else {
                html += listBookmark(bookmarks, updateMode);
            }
        } else {
            html += '<hr>';
        }
        $('.bookmark-list').html(html);

        /**
         * 拖拽功能
         *      draggable-range: 可拖拽的范围
         *      draggable-element: 可拖拽的元素
         * @see https://www.runoob.com/jqueryui/api-sortable.html
         */
        $(".draggable-range").sortable({
            revert: true,
            cursor: "move",
            forcePlaceholderSize: true,
            opacity: 0.8,
            placeholder: ".draggable-element",
            update: function (e, ui) {
                let books = $('.draggable-element');
                for (let i = 0; i <= books.index(ui.item); i++) {
                    backgroundPage.helper.moveBookmark(books.eq(i).data('id'), i);
                }
                refreshBookmark();
            },
        }).disableSelection();
    })
};
refreshBookmark();

/**
 * 添加按钮
 */
$(document).on('click', '.add-btn', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {

        Promise.all([
            backgroundPage.options.getOption("updateMode"),
            backgroundPage.helper.getBookmarkFolder()
        ]).then(function (values) {
            let updateMode = values[0];
            let bookmarkFolder = values[1];

            backgroundPage.helper.addBookmark({
                parentId: bookmarkFolder.id,
                index: bookmarkFolder.children !== undefined ? bookmarkFolder.children.length : 0,
                title: tab[0].title,
                url: tab[0].url,
            }, function (result) {
                refreshBookmark();
                //自动更新模式下，添加完立即监听
                if (updateMode === "auto") {
                    backgroundPage.tab.listeningTab(tab[0], result.id);
                }
            });
        });
    });
});

/**
 * 更新按钮
 */
$(document).on('click', '.replace-btn', function () {
    let id = $(this).data('id');
    chrome.tabs.query({active: true}, function (tab) {
        backgroundPage.helper.updateBookmark(id.toString(),
            {
                title: tab[0].title, url: tab[0].url
            }, function () {
                refreshBookmark();
            });
    });
});

/**
 * 删除按钮
 */
$(document).on('click', '.delete-btn', function () {
    if (confirm('确认删除？')) {
        backgroundPage.helper.deleteBookmark($(this).data('id'), function () {
            backgroundPage.bookmark.setBadgeText();
        });
        refreshBookmark();
    }
});

/**
 * 保存按钮
 */
$(document).on('click', '.save-btn', function () {
    let id = $(this).data('id');
    let title = $(this).parent().parent().find('.text-change').val();

    backgroundPage.helper.updateBookmark(id, {title: title}, function () {
        refreshBookmark();
    });

    $(this).hide();
    $(this).parent().parent().find('.cancel-btn').hide();
    $(this).parent().parent().find('.text-change').hide();

    $(this).parent().parent().find('.change-btn').show();
    $(this).parent().parent().find('.link').show();
    $(this).parent().parent().find('.delete-btn').show();
});

/**
 * 修改按钮
 */
$(document).on('click', '.change-btn', function () {
    $(this).hide();
    $(this).parent().parent().find('.link').hide();
    $(this).parent().parent().find('.delete-btn').hide();

    $(this).parent().parent().find('.save-btn').show();
    $(this).parent().parent().find('.cancel-btn').show();
    $(this).parent().parent().find('.text-change').show();
});

/**
 * 取消按钮
 */
$(document).on('click', '.cancel-btn', function () {
    $(this).hide();
    $(this).parent().parent().find('.save-btn').hide();
    $(this).parent().parent().find('.text-change').hide();

    $(this).parent().parent().find('.link').show();
    $(this).parent().parent().find('.change-btn').show();
    $(this).parent().parent().find('.delete-btn').show();

    refreshBookmark();
});

/**
 * 点击链接
 */
$(document).on('click', '.link', function (e) {
    backgroundPage.tabs.createAndListen($(this).data('id'));
    e.preventDefault();
    return false;
});
