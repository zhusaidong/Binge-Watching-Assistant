<template>
  <div class="main_app">
    <el-tabs type="border-card" v-model="activeTab">
      <!--设置-->
      <el-tab-pane label="设置" name="settings">
        <el-form v-model="settings">
          <el-form-item label="书签文件夹默认展开">
            <el-switch v-model="settings.defaultExpand" @change="changeSwitch('defaultExpand')"/>
          </el-form-item>
          <el-form-item label="开启标签功能">
            <el-switch v-model="settings.tag" @change="changeSwitch('tag')"/>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!--标签管理-->
      <el-tab-pane label="标签管理" name="tags" v-if="settings.tag">
        <el-tag
            v-for="item in tagList"
            :key="item.label"
            effect="plain">
          {{ item.label }}({{ item.count }})
        </el-tag>
      </el-tab-pane>

      <!--todo 标题正则-->
      <el-tab-pane label="标题正则" name="titleRegs">
        <el-form v-model="titleReg">
          <el-form-item prop="title" label="标题">
            <el-input v-model="titleReg.title"/>
          </el-form-item>
          <el-form-item prop="domain" label="域名">
            <el-input v-model="titleReg.domain"/>
          </el-form-item>
          <el-button>添加</el-button>
        </el-form>

        <el-divider>列表</el-divider>

        <el-table :data="titleRegList">
          <el-table-column prop="title" label="标题"/>
          <el-table-column prop="domain" label="域名"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {CONFIG_STORE_SETTINGS_KEY, CONFIG_STORE_TAG_KEY, store} from "@/script/helper";

const tagList = ref([]);
const titleRegList = ref([]);
const titleReg = ref({});
const activeTab = ref("settings");
const settings = ref({
  defaultExpand: true,
  tag: false,
});

//获取标签
function getTagList() {
  store.getSyncData(CONFIG_STORE_TAG_KEY).then(tagData => {
    console.log("list=", tagData)

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

//开关调用
const changeSwitch = (type) => {
  console.log("settings." + type + "=", settings.value[type])
  //保存数据
  store.getSyncData(CONFIG_STORE_SETTINGS_KEY).then(settingsStore => {
    settingsStore[type] = settings.value[type];
    store.setSyncData(CONFIG_STORE_SETTINGS_KEY, settingsStore);
  });
}

/**
 * 获取设置的配置
 * @returns {Promise<unknown>}
 */
const getSettings = () => {
  return new Promise(function (resolve) {
    store.getSyncData(CONFIG_STORE_SETTINGS_KEY).then(settings => {
      console.log("settings", settings)
      resolve(settings);
    });
  });
};

onMounted(() => {
  getSettings().then(settingsStore => {
    settings.value.defaultExpand = settingsStore["defaultExpand"] !== undefined ? settingsStore["defaultExpand"] : true;
    settings.value.tag = settingsStore["tag"] !== undefined ? settingsStore["tag"] : true;
  });
  getTagList();
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
  padding: 0 10px;
}
</style>
