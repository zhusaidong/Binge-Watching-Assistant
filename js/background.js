var helper,init,store;

helper =
{
	//获取追剧助手书签列表
	getBookmarks:()=>
	{
		return new Promise(function(resolve, reject)
			{
				helper.getBookmarkFolder().then(function(results)
					{
						chrome.bookmarks.getChildren(results.id,function(results)
							{
								resolve(results);
							});
				});
			});
	},
	//删除书签
	deleteBookmark:(bookmarkId)=>
	{
		chrome.bookmarks.remove(bookmarkId.toString(),function()
			{
				helper.setBadgeText();
			});
	},
	//添加追剧助手书签文件夹
	addMainBookmarkFolder:()=>
	{
		chrome.bookmarks.search("追剧助手",function(results)
			{
				if(!results || results.length == 0)
				{
					//如果创建时不指定parentId，则所创建的书签会默认加入到其他书签中
					chrome.bookmarks.create(
						{
							title:'追剧助手',
							url:'',
						},function(results){});
				}
			});
	},
	getBookmarkFolder:()=>
	{
		return new Promise(function(resolve, reject)
			{
				chrome.bookmarks.search("追剧助手",function(results)
					{
						resolve(results[0]);
					});
			});
	},
	//添加书签
	addBookmark:(object,callback)=>
	{
		chrome.bookmarks.create(object,function(results)
			{
				callback.call();
			});
	},
	//setBadgeText
	setBadgeText:()=>
	{
		helper.getBookmarks().then(function(bookmarks)
			{
				chrome.browserAction.setBadgeText(
					{
						text:bookmarks.length > 0 ? bookmarks.length.toString() : ''
					});
			});
	},
	//更新书签
	updateBookmark:(bookmarkId,tab,callback)=>
	{
		chrome.bookmarks.update(bookmarkId,
			{
				title:tab.title,
				url:tab.url,
			},function(results)
			{
				if(callback != undefined)
				{
					callback.call();
				}
			});
	},
	//移动书签
	moveBookmark:(bookmarkId,toIndex)=>
	{
		chrome.bookmarks.move(Number(bookmarkId).toString(), {
		    index:toIndex
		}, function(bookmark)
		{
		    //console.log(bookmark);
		});
	}
};

store = 
{
	//保存数据
	setLocalData:(key,value)=>
	{
		localStorage.setItem(key, JSON.stringify(value));
	},
	//读取数据
	getLocalData:(key)=>
	{
		return JSON.parse(localStorage.getItem(key));
	},

	//保存数据
	setSyncData:(key,value)=>
	{
		chrome.storage.sync.set({[key]:JSON.stringify(value)}, function(){});
	},
	//读取数据
	getSyncData:(key)=>
	{
		return new Promise(function(resolve, reject)
			{
				chrome.storage.sync.get(key,function(object)
					{
						resolve(JSON.parse(object[key]));
					});
			});
	}
};

init = () =>
{
	helper.addMainBookmarkFolder();
	helper.setBadgeText();
}

init();
