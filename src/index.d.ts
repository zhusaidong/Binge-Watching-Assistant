/**
 * 书签节点
 */
export interface BookmarkTreeNode {
    /**
     * 是文件夹的标识
     */
    isFolder: boolean;
    /**
     * 编辑状态的标识
     */
    isEditing: boolean;
    /**
     * 索引
     */
    $index: number;
    /**
     * 标签数组
     */
    tags: string[];
    /**
     * 标签输入框可见的标识(编辑模式)
     */
    tagVisible: boolean;
    /**
     * 标签内容
     */
    tagValue: boolean;
    /**
     * 子节点
     */
    children: Index[];
}

/**
 * 新特性提醒
 */
export interface FeatureTips {
    /**
     * 设置
     */
    settings: {};
    /**
     * 新特性组
     */
    features: FeatureTip[]
}

/**
 * 新特性属性
 */
export interface FeatureTip {
    /**
     * 版本号
     */
    version: string;
    /**
     * 新特性key
     */
    key: string;
    /**
     * 新特性消息
     */
    message: string;
    /**
     * 消息是否是html模式
     */
    isHtml: boolean;
}
