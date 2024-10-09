<template>
  <div class="main_app">

    <!-- 按钮部分 -->
    <el-button @click="addBookmark()">添加追剧</el-button>
    <el-button @click="openSeparatorDialog=true;separatorName='';">添加文件夹</el-button>
    <!--添加分隔的弹窗-->
    <el-dialog v-model="openSeparatorDialog" title="添加文件夹" :close-on-click-modal="true">
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
    <el-divider content-position="left">搜索</el-divider>

    <el-form>
      <el-input v-model="searchKey" @input="refreshBookmark()" clearable placeholder="输入搜索内容"/>
    </el-form>

    <!-- 书签部分 -->
    <el-divider content-position="left">追剧书签</el-divider>

    <el-tree
        :data="bookmarkList"
        node-key="id"
        default-expand-all
        @node-drop="onDraggableEnd"
        :draggable="editStatusNumber === 0"
        empty-text="暂无数据"
        :props="{children: 'children',label: 'title'}"
        :allow-drop="allowDrop"
        :indent="30"
    >
      <template #default="{ data }">
        <el-table :data="[data]" row-key="id" :show-header="false" :tree-props="{children:'children1'}">
          <!--          <el-table-column label="序号" width="40px">-->
          <!--            <template #default="scope">-->
          <!--              {{ scope.row.$treeNodeId }}.-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column prop="url" label="图标" width="30px">
            <template #default="scope">
              <div v-if="!scope.row.isFolder" id="icon" class="website-icon"
                   :style="{backgroundImage :'url('+faviconURL(scope.row.url)+')'}"></div>
            </template>
          </el-table-column>
          <el-table-column prop="link" label="标题">
            <template #default="scope">
              <div v-if="scope.row.isEditing">
                <el-input type="text" v-model="scope.row.title"/>
              </div>
              <div v-else>
                <div v-if="scope.row.isFolder">
                  <el-divider content-position="center">{{ scope.row.title }}</el-divider>
                </div>
                <div v-else>
                  <el-tooltip :content="scope.row.url" placement="bottom" :show-after="500">
                    <el-link :underline="false" @click="openBookmark(scope.row.id)">
                      {{ scope.row.title }}
                    </el-link>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
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
                    link
                    v-if="!scope.row.isFolder || scope.row.children === undefined || scope.row.children.length === 0"
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
import {bookmark, sendMessage} from "@/script/helper";
import {ref, onMounted} from 'vue'
import {ElMessageBox} from "element-plus";

const searchKey = ref("");
const bookmarkList = ref([]);
const openSeparatorDialog = ref(false);
const separatorName = ref("");
//处于编辑状态的数量，编辑时不能拖拽
const editStatusNumber = ref(0)

onMounted(() => {
  refreshBookmark();
})

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
  bookmark.getBookmarks().then(function (bookmarks) {
    //console.log("bookmarks", bookmarks)
    bookmark.setBadgeText();
    for (let i = 0; i < bookmarks.length; i++) {
      bookmarks[i].isFolder = bookmarks[i].url === undefined
      bookmarks[i].isEditing = false;

      //搜索
      if (searchKey.value !== "") {
        //如果是文件夹
        if (bookmarks[i].isFolder) {
          //如果匹配到了文件夹名称，直接显示整个文件夹；匹配不到，再判断子节点的内容
          if (!bookmarks[i].title.includes(searchKey.value)) {
            //匹配子节点：子节点匹配不到，直接删除整个文件夹；匹配到了，将匹配到的替换子节点（只显示匹配到的）
            let filter = bookmarks[i].children.filter(b => b.title.includes(searchKey.value));
            if (filter.length === 0) {
              bookmarks.splice(i, 1);
              i--;
            } else {
              bookmarks[i].children = filter;
            }
          }
        } else {
          //如果不是文件夹，直接匹配书签标题即可
          if (!bookmarks[i].title.includes(searchKey.value)) {
            bookmarks.splice(i, 1);
            i--;
          }
        }
      }
    }
    bookmarkList.value = bookmarks;
  });
}

/**
 * 添加书签
 */
const addBookmark = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
    bookmark.addBookmarkV2(
        {
          title: tab[0].title,
          url: tab[0].url,
        }, function (bookmark) {
          refreshBookmark();
          //添加新页面时立即开启监听
          sendMessage({bookmark_id: bookmark.id, tab_id: tab[0].id});
        });
  });
}

/**
 * 取消编辑
 * @param row
 */
const cancelEditBookmark = (row) => {
  row.isEditing = false;
  editStatusNumber.value--;
}

/**
 * 编辑书签
 * @param row
 */
const editBookmark = (row) => {
  row.isEditing = true;
  editStatusNumber.value++;
  event.preventDefault();
}

/**
 * 保存书签
 * @param row
 */
const saveBookmark = (row) => {
  bookmark.updateBookmark(row.id, {title: row.title}, function () {
    refreshBookmark();
  });
}

/**
 *删除书签
 * @param id
 */
const deleteBookmark = (id) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    bookmark.deleteBookmark(id, function () {
      bookmark.setBadgeText();
    });
    refreshBookmark();
  }).catch(() => {
  });
}

/**
 * 打开书签
 * @param id
 */
const openBookmark = (id) => {
  sendMessage({bookmark_id: id, tab_id: null});
}

/**
 * 网页小图标
 * @param u
 * @returns {string}
 */
const faviconURL = (u) => {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
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

</style>
