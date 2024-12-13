<template>
  <div class="main_app">
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-tabs v-model="activeTab" style="width: 600px;" type="border-card">
        <!--设置-->
        <el-tab-pane label="设置" name="settings">
          <el-form v-model="settings">
            <el-form-item label="书签文件夹默认展开">
              <el-switch v-model="settings.defaultExpand" @change="changeSwitch('defaultExpand')"/>
            </el-form-item>
            <el-form-item label="开启标签功能">
              <el-switch v-model="settings.tag" @change="changeSwitch('tag')"/>
            </el-form-item>
            <el-form-item label="开启删除二次确认功能">
              <el-switch v-model="settings.deleteDoubleConfirmation"
                         @change="changeSwitch('deleteDoubleConfirmation')"/>
            </el-form-item>
            <el-form-item label="开启右键菜单功能">
              <el-switch v-model="settings.enableContextMenu" @change="changeSwitch('enableContextMenu')"/>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!--标签管理-->
        <el-tab-pane v-if="settings.tag" label="标签统计" name="tags">
          <el-tag
              v-for="item in tagList"
              :key="item.label"
              effect="plain"
              size="large">
            {{ item.label }}({{ item.count }})
          </el-tag>
        </el-tab-pane>

        <!--标题美化-->
        <el-tab-pane label="标题美化" name="titleRegs">
          删除书签中指定视频网站的标题上的固定多余文字，让书签的标题更简洁明了

          <el-form ref="titleRegForm" :model="titleReg" :rules="titleRegRule" label-width="100px" style="width: 500px">
            <el-form-item label="域名" prop="domain">
              <el-input v-model="titleReg.domain" placeholder="网站的域名：如“v.qq.com”"/>
            </el-form-item>
            <el-form-item label="删除文字" prop="removeTitle">
              <el-input v-model="titleReg.removeTitle"
                        placeholder="需要去除的文字：如“高清完整版视频在线观看_腾讯视频”"/>
            </el-form-item>
            <el-button @click="addTitleReg()">添加</el-button>
          </el-form>

          <el-table :data="settings.titleRegList" row-key="domain" style="width: 590px">
            <el-table-column label="域名" prop="domain" width="190"/>
            <el-table-column label="删除文字" prop="removeTitle" width="290"/>
            <el-table-column label="操作" width="70">
              <template #default="scope">
                <el-button type="danger" @click="deleteTitleReg(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {
  CONFIG_BOOKMARK_MENU_KEY,
  CONFIG_STORE_TAG_KEY, message,
  settingsStore,
  store
} from "@/script/helper";

const tagList = ref([]);
const titleReg = ref({
  domain: '',
  removeTitle: ''
});
const activeTab = ref("settings");
const settings = ref({
  defaultExpand: true,
  tag: false,
  titleRegList: [],
  deleteDoubleConfirmation: true,
  enableContextMenu: false
});
const titleRegRule = {
  domain: [
    {required: true, message: '请输入域名', trigger: 'blur'},
  ],
  removeTitle: [
    {required: true, message: '请输入需要删除的文字', trigger: 'blur'}
  ],
};
const titleRegForm = ref();

/**
 * 获取标签
 */
function getTagList() {
  store.getSyncData(CONFIG_STORE_TAG_KEY).then(tagData => {
    // console.log("list=", tagData)

    //标签合并
    let tagArr = [];
    for (let tag in tagData) {
      tagArr = tagArr.concat([...tagData[tag]]);
    }

    //标签分组，统计标签数
    const groupByCategory = tagArr.reduce((group, category) => {
      group[category] = group[category] ?? 0;
      group[category]++;
      return group;
    }, {});

    //生成标签数据结构数组
    let tagObj = [];
    for (let tag in groupByCategory) {
      tagObj.push({label: tag, count: groupByCategory[tag]})
    }

    tagList.value = tagObj;
  })
}

/**
 * 开关调用
 * @param type
 */
const changeSwitch = (type) => {
  //保存数据
  let valueElement = settings.value[type];
  settingsStore.set(type, valueElement)
  if (type === 'enableContextMenu') {
    if (valueElement === true) {
      message.sendMessageByType("createContextMenu", {})
    } else {
      message.sendMessageByType("removeContextMenu", CONFIG_BOOKMARK_MENU_KEY)
    }
  }
}

/**
 * 添加标题规则
 */
const addTitleReg = () => {
  titleRegForm.value.validate().then(() => {
    settings.value.titleRegList.push(titleReg.value);
    titleReg.value = {};
    settingsStore.set('titleRegList', settings.value.titleRegList)
  });
};

/**
 * 删除标题规则
 * @param index
 */
const deleteTitleReg = (index) => {
  settings.value.titleRegList.splice(index, 1);
  settingsStore.set('titleRegList', settings.value.titleRegList)
};

onMounted(() => {
  settingsStore.get().then(settingsStore => {
    settings.value.defaultExpand = settingsStore["defaultExpand"] !== undefined ? settingsStore["defaultExpand"] : true;
    settings.value.tag = settingsStore["tag"] !== undefined ? settingsStore["tag"] : true;
    settings.value.titleRegList = settingsStore["titleRegList"] !== undefined ? settingsStore["titleRegList"] : [];
    settings.value.deleteDoubleConfirmation = settingsStore["deleteDoubleConfirmation"] !== undefined ? settingsStore["deleteDoubleConfirmation"] : true;
    settings.value.enableContextMenu = settingsStore["enableContextMenu"] !== undefined ? settingsStore["enableContextMenu"] : false;
    if (settings.value.tag === true) {
      getTagList();
    }
  });
})
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-tag {
  margin-right: 5px;
  height: 37px;
  line-height: 34px;
  font-size: 16px;
}
</style>
