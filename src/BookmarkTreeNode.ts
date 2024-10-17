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
    children: BookmarkTreeNode[];
}

export interface FeatureTips {
    settings: {};
    features: FeatureTip[]
}

export interface FeatureTip {
    version: string;
    key: string;
    message: string;
    isHtml: boolean;
}
