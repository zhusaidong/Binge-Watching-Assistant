/**
 * 消息类型
 */
export const MESSAGE_TYPE = {
    /**
     * 书签类型
     */
    BOOKMARK: "bookmark",
    /**
     * 新建右键菜单
     */
    CREATE_CONTEXT_MENU: "createContextMenu",
    /**
     * 移除右键菜单
     */
    REMOVE_CONTEXT_MENU: "removeContextMenu",
};
/**
 * 设置项
 */
export const SETTING_KEY = {
    /**
     * 右键菜单开关
     */
    ENABLE_CONTEXT_MENU: "enableContextMenu",
    /**
     * 固定标题匹配列表
     */
    TITLE_REG_LIST: "titleRegList",
};

export const CONFIG = {
    BOOKMARK_MENU_KEY: "addWatchBookmark",
    BOOKMARK_MENU_NAME: "添加追剧",
    STORE_TAG_KEY: "tag.list",
    STORE_SETTINGS_KEY: "settings",
    STORE_BOOKMARKTABREF_KEY: "bookmarkTabRef",
    STORE_NOTICE_KEY: "notice",

    //fixme: 关于变量和数组名称的转换
    SETTINGS_ITEMS: {
        defaultExpand: true,
        tag: false,
        titleRegList: [],
        deleteDoubleConfirmation: true,
        enableContextMenu: false
    },
}
