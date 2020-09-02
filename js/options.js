let backgroundPage = chrome.extension.getBackgroundPage();

/**
 * 保存提交
 */
$(document).on('click', '.save-option', function () {
    let option = {};
    $('.formOptions').serializeArray().forEach(function (obj) {
        option[obj.name] = obj.value;
    })
    backgroundPage.options.saveOptions(option);

    showSuccess("保存成功");
});

/**
 * 成功提示
 * @param t
 */
function showSuccess(t) {
    $("#alert").remove();
    let e = '<div class="alert alert-success" id="alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' + t + "</div>";
    $(e).insertBefore($("#tab-nav"), null).addClass("in");
    setTimeout(function () {
        $("#alert").remove();
    }, 1000);
}

/**
 * 页面初始化
 */
$(function () {
    backgroundPage.options.getOptions().then(function (options) {
        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                $(".formOptions").find("input[name=" + name + "][value=" + options[name] + "]").attr("checked", true);
            }
        }
    });
});
