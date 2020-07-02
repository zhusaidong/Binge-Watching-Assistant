let backgroundPage = chrome.extension.getBackgroundPage();

let refreshBookmark = function () {
    backgroundPage.helper.getBookmarks().then(function (bookmarks) {
        //console.log("refreshBookmark",bookmarks);
        backgroundPage.helper.setBadgeText();

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
								<div id="icon" class="website-icon" style="background-image: -webkit-image-set(\
								url(&quot;chrome://favicon/size/16@1x/' + url + '&quot;) 1x,\
								url(&quot;chrome://favicon/size/16@2x/' + url + '&quot;) 2x);"></div>\
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
                    backgroundPage.helper.moveBookmark(book.eq(i).data('id'), i);
                }
                refreshBookmark();
            },
        }).disableSelection();

    });
};
refreshBookmark();

$(document).on('click', '.add-btn', function () {
    chrome.tabs.query({active: true,currentWindow: true}, function (tab) {
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
$(document).on('click', '.delete-btn', function () {
    if (confirm('确认删除？')) {
        backgroundPage.helper.deleteBookmark($(this).data('id'), function () {
            backgroundPage.bookmark.setBadgeText();
        });
        refreshBookmark();
    }
});
$(document).on('click', '.save-btn', function () {
    let id = $(this).data('id');
    let title = $(this).parent().parent().find('.text-change').val();
    //let url = $(this).parent().parent().find('.link').attr('href');

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
    backgroundPage.tabs.createAndListen($(this).data('id'));
    e.preventDefault();
    return false;
});
