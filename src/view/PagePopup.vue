<template>
  <div class="main_app">

    <!-- 按钮部分 -->
    <el-button type="primary" @click="addBookmark()">{{ i18n.message("popup.addBookmark") }}</el-button>
    <el-button @click="openSeparatorDialog=true;separatorName='';">{{ i18n.message("popup.addSeparator") }}</el-button>
    <!--添加分隔的弹窗-->
    <el-dialog v-model="openSeparatorDialog" :close-on-click-modal="true" :title="i18n.message('popup.addSeparator')">
      <el-form>
        <el-form-item>
          <el-input v-model="separatorName" clearable placeholder="输入文件夹名称"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="addSeparator();openSeparatorDialog=false">提交</el-button>
        <el-button @click="openSeparatorDialog=false">取消</el-button>
      </template>
    </el-dialog>

    <!-- 搜索部分 -->
    <el-divider content-position="left">{{ i18n.message("popup.searchText") }}</el-divider>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchKey"
            :input-style="settings.tag ? 'width:200px' : 'width:400px'"
            clearable
            placeholder="输入搜索内容"
            @input="refreshBookmark()"/>
      </el-form-item>
      <el-form-item>
        <el-select
            v-if="settings.tag"
            v-model="searchTag"
            filterable
            multiple
            placeholder="请选择标签"
            style="width:200px"
            @change="refreshBookmark()">
          <el-option
              v-for="item in tagList"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 书签部分 -->
    <el-divider content-position="left">{{ i18n.message("popup.bookmarkListText") }}</el-divider>
    <el-tree
        v-if="settings.refreshTable"
        v-loading="loading"
        :allow-drop="allowDrop"
        :data="bookmarkList"
        :default-expand-all="settings.defaultExpand"
        :draggable="editStatusNumber === 0"
        :indent="30"
        :props="{children: 'children',label: 'title'}"
        empty-text="暂无数据"
        node-key="id"
        @node-drop="onDraggableEnd"
    >
      <template #default="{ data }">
        <el-table :data="[data]" :show-header="false" :tree-props="{children:'children1'}" row-key="id">
          <!--序号-->
          <el-table-column label="序号" width="45px">
            <template #default="scope">
              {{ scope.row.$index }}.
            </template>
          </el-table-column>
          <!--图标-->
          <el-table-column label="图标" prop="url" width="30px">
            <template #default="scope">
              <el-image v-if="!scope.row.isFolder"
                        :src="faviconURL(scope.row.url)"
                        class="website-icon"
                        lazy
                        scroll-container=".el-tree"
              />
            </template>
          </el-table-column>
          <!--标题-->
          <el-table-column label="标题" prop="link">
            <template #default="scope">
              <div v-if="scope.row.isEditing">
                <el-input v-model="scope.row.title" type="text"/>
              </div>
              <div v-else>
                <div v-if="scope.row.isFolder">
                  <el-divider content-position="center">{{ scope.row.title }}</el-divider>
                </div>
                <div v-else>
                  <el-tooltip :content="scope.row.url" :show-after="500" placement="bottom">
                    <el-link :underline="false" @click="openBookmark(scope.row.id)">
                      {{ scope.row.title }}
                    </el-link>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
          <!--标签-->
          <el-table-column v-if="settings.tag" label="标签" width="90px">
            <template #default="scope">
              <div v-if="!scope.row.isFolder">
                <el-tag
                    v-for="tag in scope.row.tags"
                    :key="tag"
                    closable
                    size="small"
                    @close="tagRemove(scope.row,tag)">
                  {{ tag }}
                </el-tag>
                <!--添加标签-->
                <div v-if="scope.row.tags.length < 2">
                  <el-input
                      v-if="scope.row.tagVisible"
                      v-model="scope.row.tagValue"
                      class="input-new-tag"
                      maxlength="3"
                      size="small"
                      @blur="handleInputConfirm(scope.row)"
                      @keyup.enter="handleInputConfirm(scope.row)"
                      @keyup.esc="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click.stop="scope.row.tagVisible = true;scope.row.tagValue = '';">+
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <!--操作-->
          <el-table-column label="操作" width="105px">
            <template #default="scope">
              <div v-if="scope.row.isEditing">
                <el-button
                    link
                    type="primary"
                    @click.stop="saveBookmark(scope.row)"
                >保存
                </el-button>
                <el-button
                    link
                    type="danger"
                    @click.stop="cancelEditBookmark(scope.row)"
                >取消
                </el-button>
              </div>
              <div v-else>
                <el-button
                    link
                    type="primary"
                    @click.stop="editBookmark(scope.row)"
                >编辑
                </el-button>
                <!--文件夹为空时可以删除-->
                <el-button
                    v-if="!scope.row.isFolder || scope.row.children === undefined || scope.row.children.length === 0"
                    link
                    type="danger"
                    @click.stop="deleteBookmark(scope.row.id)"
                >删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tree>
  </div>
</template>

<script setup>
import {
  bookmark,
  i18n, notice, runtime,
  message,
  settingsStore,
  store, tabs
} from "@/script/helper";
import {ref, onMounted, nextTick} from 'vue'
import {ElMessageBox} from "element-plus";
import {CONFIG, MESSAGE_TYPE} from "@/script/constant";

const loading = ref(false);
const searchKey = ref("");
const bookmarkList = ref([]);

const searchTag = ref([]);
const tagList = ref([]);

const openSeparatorDialog = ref(false);
const separatorName = ref("");

//处于编辑状态的数量，编辑时不能拖拽
const editStatusNumber = ref(0)
const settings = ref(CONFIG.SETTINGS_ITEMS);

/**
 * 标签输入
 * @param row
 */
const handleInputConfirm = row => {
  if (row.tagValue) {
    let tag = row.tagValue;
    row.tags.push(tag);
    //保存数据
    store.getSyncData(CONFIG.STORE_TAG_KEY).then(tagData => {
      tagData[row.id] = (tagData[row.id] || []).concat(tag);
      store.setSyncData(CONFIG.STORE_TAG_KEY, tagData);
    });

    //去重
    tagList.value.push(tag);
    tagList.value = [...new Set(tagList.value)];
  }
  row.tagVisible = false;
  row.tagValue = '';

};

/**
 * 标签移除
 * @param row
 * @param tag
 */
const tagRemove = (row, tag) => {
  row.tags.splice(row.tags.indexOf(tag), 1);
  //移除数据
  store.getSyncData(CONFIG.STORE_TAG_KEY).then(tagData => {
    tagData[row.id] = row.tags;
    //数组为空时，清除整个对象，来压缩存储
    if (tagData[row.id].length === 0) {
      delete tagData[row.id];
    }
    store.setSyncData(CONFIG.STORE_TAG_KEY, tagData);
  });
};

/**
 * 删除书签对应的标签
 * @param bookmarkId 书签id
 */
const removeTag = (bookmarkId) => {
  store.getSyncData(CONFIG.STORE_TAG_KEY).then(tagData => {
    delete tagData[bookmarkId];
    store.setSyncData(CONFIG.STORE_TAG_KEY, tagData);
  });
}

/**
 * 获取标签数据
 * @returns {Promise<{}>}
 */
const getTagData = () => {
  return new Promise(function (resolve) {
    // 如果关闭了标签功能，则无需调用获取标签的方法
    if (!settings.value.tag) {
      resolve({});
    } else {
      store.getSyncData(CONFIG.STORE_TAG_KEY).then(tagData => {
        resolve(tagData);
      });
    }
  });
};

/**
 * 允许拖放范围：文件夹可以拖放，非文件夹不能嵌套
 * @param draggingNode
 * @param dropNode
 * @param type
 * @returns {boolean}
 */
const allowDrop = (draggingNode, dropNode, type) => {
  //如果拖拽对象是个文件夹，释放对象只能是文件夹，切不能内嵌
  if (draggingNode.data.isFolder) {
    return dropNode.level === draggingNode.level && type !== 'inner';
  } else {
    //如果拖拽对象是个书签，可以放到文件夹中内嵌但不能内嵌到书签中（释放对象可以是文件夹，不能是书签）
    return dropNode.data.isFolder || type !== 'inner';
  }
}

/**
 * 拖拽结束事件
 * @param currentNode 被拖拽节点对应的 Node
 * @param targetNode 结束拖拽时最后进入的节点
 * @param position 被拖拽节点的放置位置（before、after、inner）
 */
const onDraggableEnd = (currentNode, targetNode, position) => {
  //console.log("onDraggableEnd", currentNode, targetNode, position)
  if (position === 'inner') {
    //console.log("移到内部")
    bookmark.moveBookmarkToFolder(currentNode.data.id, targetNode.data.id);
  } else {
    if (currentNode.data.parentId === targetNode.data.parentId) {
      //console.log("同文件夹移动")
      if (position === 'before') {
        bookmark.moveBookmark(currentNode.data.id, targetNode.data.index);
      } else {
        bookmark.moveBookmark(currentNode.data.id, targetNode.data.index + 1);
      }
    } else {
      //console.log("移到外面/其他文件夹")
      if (position === 'before') {
        bookmark.moveBookmarkToFolder(currentNode.data.id, targetNode.data.parentId, targetNode.data.index);
      } else {
        bookmark.moveBookmarkToFolder(currentNode.data.id, targetNode.data.parentId, targetNode.data.index + 1);
      }
    }
  }

  //拖拽结束时需要对变动的区域的书签进行重新排序
  // const start = Math.min(e.oldIndex, e.newIndex)
  // const end = Math.max(e.oldIndex, e.newIndex)
  // for (let i = start; i < end; i++) {
  //   bookmark.moveBookmark(bookmarkList.value[i].id, i)
  // }
}

/**
 * 读取书签记录
 */
const refreshBookmark = () => {
  loading.value = true;
  getTagData().then(tagData => {
    //fixme: 多设备同步的书签标签关系会对不上??
    console.log("tagData", tagData)
    bookmark.getBookmarks().then(function (bookmarks) {
      bookmark.setBadgeText();
      let index = 1;
      for (let i = 0; i < bookmarks.length; i++) {
        let bookmark = bookmarks[i];

        bookmarks[i].isFolder = bookmark.url === undefined
        bookmarks[i].isEditing = false;
        bookmarks[i].$index = index++;

        bookmarks[i].tagVisible = false;
        bookmarks[i].tagValue = false;

        //标签处理
        if (!bookmarks[i].isFolder) {
          let tags = tagData[bookmark.id] || [];
          bookmarks[i].tags = tags;
          //去重
          tagList.value = [...new Set(tagList.value.concat(tags))];
        } else {
          //文件夹内部
          for (let j = 0; j < bookmark.children.length; j++) {
            let bookmarkTreeNode = bookmark.children[j];
            let tags = tagData[bookmarkTreeNode.id] || [];
            bookmarks[i].children[j].tags = tags;
            bookmarks[i].children[j].$index = index++;
            //去重
            tagList.value = [...new Set(tagList.value.concat(tags))];
          }
        }

        //搜索
        if (searchKey.value !== "") {
          //如果是文件夹
          if (bookmarks[i].isFolder) {
            //匹配子节点：子节点匹配不到，直接删除整个文件夹；匹配到了，将匹配到的替换子节点（只显示匹配到的）
            let filter = bookmark.children.filter(b => b.title.includes(searchKey.value));
            if (filter.length === 0) {
              bookmarks.splice(i, 1);
              i--;
            } else {
              bookmarks[i].children = filter;
            }
          } else {
            //如果不是文件夹，直接匹配书签标题即可
            if (!bookmark.title.includes(searchKey.value)) {
              bookmarks.splice(i, 1);
              i--;
            }
          }
        }

        //筛选标签
        if (searchTag.value.length !== 0) {
          console.log("searchTag", searchTag.value)
          //如果是文件夹
          if (bookmarks[i].isFolder) {
            //匹配子节点：子节点匹配不到，直接删除整个文件夹；匹配到了，将匹配到的替换子节点（只显示匹配到的）
            let filter = bookmark.children.filter(b => b.tags.filter(tag => searchTag.value.includes(tag)).length > 0);
            if (filter.length === 0) {
              bookmarks.splice(i, 1);
              i--;
            } else {
              bookmarks[i].children = filter;
            }
          } else {
            //如果不是文件夹，直接匹配书签标题即可
            if (!bookmarks[i].tags.filter(tag => searchTag.value.includes(tag)).length > 0) {
              bookmarks.splice(i, 1);
              i--;
            }
          }
        }
      }

      loading.value = false;
      bookmarkList.value = bookmarks;
    });
  })
}

/**
 * 添加书签
 */
const addBookmark = () => {
  tabs.getCurrentTab().then(tab => {
    //根据标题规则，匹配标题的内容
    let titleReg = settings.value.titleRegList.find(titleReg => tab.url.includes(titleReg.domain));
    let newTitle = titleReg !== undefined ? tab.title.replace(titleReg.removeTitle, "") : tab.title;

    bookmark.addBookmarkV2(
        {
          title: newTitle,
          url: tab.url,
        }, function (bookmark) {
          refreshBookmark();
          //添加新页面时立即开启监听
          message.sendMessageByType(MESSAGE_TYPE.BOOKMARK, {bookmark_id: bookmark.id, tab_id: tab.id});
        });
  });
}

/**
 * 取消编辑
 * @param row
 */
const cancelEditBookmark = row => {
  row.isEditing = false;
  editStatusNumber.value--;
}

/**
 * 编辑书签
 * @param row
 */
const editBookmark = row => {
  row.isEditing = true;
  editStatusNumber.value++;
}

/**
 * 保存书签
 * @param row
 */
const saveBookmark = row => {
  bookmark.updateBookmark(row.id, {title: row.title}, function () {
    refreshBookmark();
  });
}

/**
 *删除书签
 * @param id
 */
const deleteBookmark = id => {
  if (settings.value.deleteDoubleConfirmation) {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteBookmarkConfirmation(id)
    }).catch(() => {
    });
  } else {
    deleteBookmarkConfirmation(id)
  }
}

/**
 * 确认删除书签
 * @param id
 */
const deleteBookmarkConfirmation = id => {
  bookmark.deleteBookmark(id, function () {
    bookmark.setBadgeText();
    //删除对应标签数据
    removeTag(id);
  });
  refreshBookmark();
}

/**
 * 打开书签
 * @param id
 */
const openBookmark = id => {
  message.sendMessageByType(MESSAGE_TYPE.BOOKMARK, {bookmark_id: id, tab_id: null});
}

/**
 * 网页小图标
 * @param u
 * @returns {string}
 */
const faviconURL = u => {
  const url = runtime.getFaviconUrl();
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "16");
  return url.toString();
};

/**
 * 添加书签分隔
 */
const addSeparator = () => {
  const title = separatorName.value;//prompt("输入分隔的名称：");
  if (title != null) {
    separatorName.value = "";
    bookmark.createBookmarkFolder(
        title, function () {
          refreshBookmark();
        });
  }
};

/**
 * 获取设置的配置
 */
const getSettings = () => {
  return new Promise(resolve => {
    settingsStore.get().then(settingsStore => {
      Object.keys(CONFIG.SETTINGS_ITEMS).forEach(key => {
        settings.value[key] = settingsStore[key] ?? CONFIG.SETTINGS_ITEMS[key];
      })
      
      settings.value.refreshTable = false;
      nextTick(() => {
        settings.value.refreshTable = true;
      })
      resolve();
    });
  })
};

/**
 * 从文件里获取新特征，从而进行提示
 */
const noticeFeatureTip = () => {
  /**
   * @type FeatureTips
   */
  const featureTips = require("@/FeatureTips.json");
  let settings = featureTips.settings || {};
  if (settings.debug) {
    store.clearLocal();
  }

  let features = featureTips.features || [];
  if (features.length === 0) {
    return;
  }
  /**
   * @type FeatureTip
   */
  let featureTip = features[features.length - 1];

  if (featureTip.version !== runtime.getManifest().version) {
    return;
  }

  //展示新功能的提示
  notice.once("feature_" + featureTip.version, () => {
    ElMessageBox.alert(featureTip.message, "系统提示", {
      dangerouslyUseHTMLString: featureTip.isHtml || false
    });
  });
}

noticeFeatureTip();

onMounted(() => {
  //getSettings通过网络，偏慢。故需要同步执行。
  getSettings().then(() => {
    refreshBookmark();
  })
})
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 600px;
}

.website-icon {
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
}

.el-tree .el-tree-node__content {
  height: auto;
  background-color: #f5f7fa;
}

.el-tree {
  /*扩展的popup页面，最大高度为600，非列表区域占200，故列表页只能400*/
  height: 400px;
  overflow: scroll;
}
</style>
