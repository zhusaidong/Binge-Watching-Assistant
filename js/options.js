let backgroundPage = chrome.extension.getBackgroundPage();

$(function () {
    getOption().then(function (option) {
        $('.uninstall_delete_bookmarks').prop('checked', option.uninstall_delete_bookmarks);
    });
});
$(document).on('click', '.save-option', function () {
    saveOption(
        {
            uninstall_delete_bookmarks: $('.uninstall_delete_bookmarks').prop('checked'),
        });
});
let saveOption = function (option) {
    backgroundPage.store.setSyncData('option', option);
};
let getOption = function () {
    return backgroundPage.store.getSyncData('option');
};