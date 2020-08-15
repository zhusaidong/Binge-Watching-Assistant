let backgroundPage = chrome.extension.getBackgroundPage();

$(function ()
{
	backgroundPage.options.getOption('updateMode').then(function (option)
	{
		$('.updateMode[value=' + (option || 'auto') + ']').attr('checked' , 'checked');
	});
});

$(document).on('click' , 'input[name=titleRegMode]' , function ()
{
	if ($(this).val() === 'open')
	{
		$('.titleReg').show();
	}
	else
	{
		$('.titleReg').hide();
	}
});

$(document).on('click' , '.save-option' , function ()
{
	console.log($('.formOptions').serializeArray());
	$('.formOptions').serializeArray().forEach(function (obj)
	{
		console.log(obj);
	})
	//backgroundPage.options.saveOption('updateMode' , $('.updateMode:checked').val());
});

function showSuccess(t)
{
	var e = '<div class="alert alert-success fade" id="alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' + t + "</div>";
	$(e).insertBefore("#tab-nav").addClass("in")
}

$(function ()
{
	$("#tab-nav a:first").tab("show")
});
