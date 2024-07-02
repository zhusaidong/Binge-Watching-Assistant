import {bookmark, sendMessage} from './helper.js';

function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "16");
    return url.toString();
}

let refreshBookmark = function () {
    bookmark.getBookmarks().then(function (bookmarks) {
        //console.log("refreshBookmark",bookmarks);
        bookmark.setBadgeText();

        let html = '<span>追剧书签:</span><br>';
        html += '<button type="button" class="btn btn-primary add-btn btn-sm">添加追剧</button><br><br>';
        if (bookmarks.length > 0) {
            html += '<table class="table"><tbody class="tbody">';
            for (let i = 0; i < bookmarks.length; i++) {
                let url = bookmarks[i].url;
                let title = bookmarks[i].title;
                let id = bookmarks[i].id;
                html +=
                    '<tr class="bookmark" data-id="' + id + '">\
							<td style="width:5%" class="id">' + (i + 1) + '.</td>\
							<td>\
								<div id="icon" class="website-icon" style="background-image:url(' + faviconURL(url) + ');"></div>\
							</td>\
							<td style="width:70%">\
								<a target="_blank" class="link" data-id="' + id + '" href="javascript:void(0);">\
									<span class="bookmark-a" title="' + url + '">' + title + '</span>\
								</a>\
								<input type="text" class="form-control text-change" style="width:100%" value="' + title + '"/>\
							</td>\
							<td>\
								<button type="button" class="btn btn-success change-btn btn-sm">编辑</button>\
								<button type="button" class="btn btn-success save-btn btn-sm" data-id="' + id + '">保存</button>\
								<button type="button" class="btn btn-danger cancel-btn btn-sm">取消</button>\
								<button type="button" class="btn btn-danger delete-btn btn-sm" data-id="' + id + '">删除</button>\
							</td>\
						</tr>';
            }
            html += '</tbody></table>';
        } else {
            html += '<hr>';
        }
        $('.bookmark-list').html(html);

        //拖拽
        $(".tbody").sortable({
            revert: true,
            placeholder: "tr",
            stop: function (e, ui) {
                let book = $('.bookmark');
                for (let i = 0; i <= book.index(ui.item); i++) {
                    bookmark.moveBookmark(book.eq(i).data('id'), i);
                }
                refreshBookmark();
            },
        }).disableSelection();

    });
};
refreshBookmark();

$(document).on('click', '.add-btn', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        bookmark.getBookmarkFolder().then(function (results) {
            bookmark.addBookmark(
                {
                    parentId: results.id,
                    index: results.children !== undefined ? results.children.length : 0,
                    title: tab[0].title,
                    url: tab[0].url,
                }, function (bookmark) {
                    refreshBookmark();
                    //添加新页面时立即开启监听
                    sendMessage({bookmark_id: bookmark.id, tab_id: tab[0].id});
                });
        });
    });
});
$(document).on('click', '.replace-btn', function () {
    let id = $(this).data('id');
    chrome.tabs.query({active: true}, function (tab) {
        bookmark.updateBookmark(id.toString(),
            {
                title: tab[0].title, url: tab[0].url
            }, function () {
                refreshBookmark();
            });
    });
});
$(document).on('click', '.delete-btn', function () {
    if (confirm('确认删除？')) {
        bookmark.deleteBookmark($(this).data('id'), function () {
            bookmark.setBadgeText();
        });
        refreshBookmark();
    }
});
$(document).on('click', '.save-btn', function () {
    let id = $(this).data('id');
    let title = $(this).parent().parent().find('.text-change').val();
    //let url = $(this).parent().parent().find('.link').attr('href');

    bookmark.updateBookmark(id, {title: title}, function () {
        refreshBookmark();
    });

    $(this).hide();
    $(this).parent().parent().find('.cancel-btn').hide();
    $(this).parent().parent().find('.text-change').hide();

    $(this).parent().parent().find('.change-btn').show();
    $(this).parent().parent().find('.link').show();
    $(this).parent().parent().find('.delete-btn').show();
});
$(document).on('click', '.change-btn', function () {
    $(this).hide();
    $(this).parent().parent().find('.link').hide();
    $(this).parent().parent().find('.delete-btn').hide();

    $(this).parent().parent().find('.save-btn').show();
    $(this).parent().parent().find('.cancel-btn').show();
    $(this).parent().parent().find('.text-change').show();

});
$(document).on('click', '.cancel-btn', function () {
    $(this).hide();
    $(this).parent().parent().find('.save-btn').hide();
    $(this).parent().parent().find('.text-change').hide();

    $(this).parent().parent().find('.link').show();
    $(this).parent().parent().find('.change-btn').show();
    $(this).parent().parent().find('.delete-btn').show();

    refreshBookmark();
});
$(document).on('click', '.link', function (e) {
    sendMessage({bookmark_id: $(this).data('id'), tab_id: null});
    e.preventDefault();
    return false;
});
