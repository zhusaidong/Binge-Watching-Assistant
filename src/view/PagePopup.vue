<template>
  <div class="main_app">

    <el-button @click="addBookmark()">添加追剧</el-button>
    <el-button @click="addSeparator()">添加书签分隔</el-button>

    <el-divider content-position="left">搜索</el-divider>

    <el-form>
      <el-input v-model="searchKey" width="100px" @input="refreshBookmark()" clearable placeholder="输入搜索内容"/>
    </el-form>

    <el-divider content-position="left">追剧书签</el-divider>

    <VueDraggable v-model="bookmarkList" target="tbody" :onEnd="onDraggableEnd">
      <el-table :data="bookmarkList"
                id="dragTable"
                :stripe="true"
                :show-overflow-tooltip="true"
                :show-header="false"
                row-key="id"
                empty-text="暂无数据"
      >
        <el-table-column label="序号" width="40px">
          <template #default="scope">
            {{ scope.$index + 1 }}.
            <div v-show="false" class="bookmark">{{ scope.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="图标" width="40px">
          <template #default="scope">
            <div v-if="!scope.row.separator" id="icon" class="website-icon"
                 :style="{backgroundImage :'url('+faviconURL(scope.row.url)+')'}"></div>
            <div v-else>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="标题">
          <template #default="scope">
            <div v-if="scope.row.isEditing">
              <el-input type="text" v-model="scope.row.title"/>
            </div>
            <div v-else>
              <div v-if="scope.row.separator">
                <el-divider content-position="center">{{ scope.row.title }}</el-divider>
              </div>
              <div v-else>
                <el-link @click="openBookmark(scope.row.id)">
                  <span class="bookmark-a" :title="scope.row.url">{{ scope.row.title }}</span>
                </el-link>
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

const searchKey = ref("");
const bookmarkList = ref([]);

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
    bookmark.setBadgeText();
    for (let i = 0; i < bookmarks.length; i++) {
      if (searchKey.value !== "" && !bookmarks[i].title.includes(searchKey.value)) {
        bookmarks.splice(i, 1);
        i--;
        continue;
      }
      bookmarks[i].separator = bookmarks[i].url === 'chrome://separator/'
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
    bookmark.getBookmarkFolder().then(function (results) {
      bookmark.addBookmark(
          {
            parentId: results.id,
            index: results.children !== undefined ? results.children.length : 0,
            title: tab[0].title,
            url: tab[0].url,
          }, function (bookmark) {
            refreshBookmark();
            //添加新页面时立即开启监听
            sendMessage({bookmark_id: bookmark.id, tab_id: tab[0].id});
          });
    });
  });
}

/**
 * 取消编辑
 * @param row
 */
const cancelEditBookmark = (row) => {
  row.isEditing = false;
}

/**
 * 编辑书签
 * @param row
 */
const editBookmark = (row) => {
  row.isEditing = true;
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
  if (confirm('确认删除？')) {
    bookmark.deleteBookmark(id, function () {
      bookmark.setBadgeText();
    });
    refreshBookmark();
  }
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
  const title = prompt("输入分隔的名称：");
  if (title != null) {
    bookmark.getBookmarkFolder().then(function (results) {
      bookmark.addBookmark(
          {
            parentId: results.id,
            index: results.children !== undefined ? results.children.length : 0,
            title: title,
            url: "chrome://separator/",
          }, function () {
            refreshBookmark();
          });
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
