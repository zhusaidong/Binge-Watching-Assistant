<template>
  <div class="main_app">

    <!-- 按钮部分 -->
    <el-button @click="addBookmark()">添加追剧</el-button>
    <el-tooltip content="分隔，起到类似于分类的作用" placement="top">
      <el-button @click="openSeparatorDialog=true;separatorName='';">添加分隔</el-button>
    </el-tooltip>
    <!--添加分隔的弹窗-->
    <el-dialog v-model="openSeparatorDialog" title="添加分隔" :close-on-click-modal="true">
      <el-form>
        <el-form-item>
          <el-input v-model="separatorName" clearable placeholder="输入分隔名称"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addSeparator();openSeparatorDialog=false">提交</el-button>
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

    <!--fixme: 加入文件夹后，拖拽会是个问题，涉及跨文件夹拖拽-->
    <VueDraggable v-model="bookmarkList" target="tbody" :onEnd="onDraggableEnd" :animation="150"
                  :handle="draggableHandle">
      <el-table :data="bookmarkList" :stripe="true" :show-header="false" row-key="id" empty-text="暂无数据"
                default-expand-all>
        <el-table-column label="序号" width="60px">
          <template #default="scope">
            {{ scope.$index + 1 }}.
          </template>
        </el-table-column>
        <el-table-column prop="url" label="图标" width="40px">
          <template #default="scope">
            <div v-if="!scope.row.isFolder" id="icon" class="website-icon"
                 :style="{backgroundImage :'url('+faviconURL(scope.row.url)+')'}"></div>
            <div v-else>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="标题">
          <template #default="scope">
            <div v-if="scope.row.isEditing">
              <!--fixme：在增加了拖拽排序后，编辑时的输入框无法用鼠标做拖动连选文本了-->
              <el-input type="text" v-model="scope.row.title"/>
            </div>
            <div v-else>
              <div v-if="scope.row.isFolder">
                <el-divider content-position="center">{{ scope.row.title }}</el-divider>
              </div>
              <div v-else>
                <el-tooltip :content="scope.row.url" placement="bottom" :show-after="500">
                  <el-link @click="openBookmark(scope.row.id)">
                    {{ scope.row.title }}
                  </el-link>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="scope">
            <div v-if="scope.row.isEditing">
              <el-button
                  link
                  type="primary"
                  @click="saveBookmark(scope.row)"
              >保存
              </el-button>
              <el-button
                  link
                  type="danger"
                  @click="cancelEditBookmark(scope.row)"
              >取消
              </el-button>
            </div>
            <div v-else>
              <el-button
                  link
                  type="primary"
                  @click="editBookmark(scope.row)"
              >编辑
              </el-button>
              <el-button
                  link
                  type="danger"
                  @click="deleteBookmark(scope.row.id)"
              >删除
              </el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </VueDraggable>
  </div>
</template>

<script setup>
import {bookmark, sendMessage} from "@/script/helper";
import {ref, onMounted} from 'vue'
import {VueDraggable} from 'vue-draggable-plus';
import {ElMessageBox} from "element-plus";

const searchKey = ref("");
const bookmarkList = ref([]);
const openSeparatorDialog = ref(false);
const separatorName = ref("");
const draggableHandle = ref(".cell")

onMounted(() => {
  refreshBookmark();
})

/**
 * 拖拽结束事件
 * @param e
 */
const onDraggableEnd = (e) => {
  //拖拽结束时需要对变动的区域的书签进行重新排序
  const start = Math.min(e.oldIndex, e.newIndex)
  const end = Math.max(e.oldIndex, e.newIndex)
  for (let i = start; i < end; i++) {
    bookmark.moveBookmark(bookmarkList.value[i].id, i)
  }
}
/**
 * 读取书签记录
 */
const refreshBookmark = () => {
  bookmark.getBookmarks().then(function (bookmarks) {
    //console.log("bookmarks", bookmarks)
    bookmark.setBadgeText();
    for (let i = 0; i < bookmarks.length; i++) {
      //fixme：添加文件夹模式后，搜索会有问题
      if (searchKey.value !== "" && !bookmarks[i].title.includes(searchKey.value)) {
        bookmarks.splice(i, 1);
        i--;
        continue;
      }
      bookmarks[i].isFolder = bookmarks[i].url === undefined
      bookmarks[i].isEditing = false;
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
  if (!isHaveEdit()) {
    draggableHandle.value = ".cell";
  }
}

const isHaveEdit = () => {
  for (let i = 0; i < bookmarkList.value.length; i++) {
    if (bookmarkList.value[i].isEditing) {
      return true;
    }
  }
  return false;
}

/**
 * 编辑书签
 * @param row
 */
const editBookmark = (row) => {
  row.isEditing = true;
  draggableHandle.value = ".cell1";
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
    // bookmark.addBookmarkV2(
    //     {
    //       title: title,
    //       url: "chrome://separator/",
    //     }, function () {
    //       refreshBookmark();
    //     });
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
</style>
