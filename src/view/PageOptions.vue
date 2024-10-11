<template>
  <div class="main_app">

    <el-tabs type="border-card" v-model="activeTab">
      <!--标签管理-->
      <el-tab-pane label="标签管理" name="tags">
        <el-tag
            v-for="item in tagList"
            :key="item.label"
            effect="plain">
          {{ item.label }}({{ item.count }})
        </el-tag>
      </el-tab-pane>
      <!--标题正则-->
      <el-tab-pane label="标题正则" name="titleRegs">
        <el-form v-model="titleReg">
          <el-form-item>
            <el-input v-model="titleReg.title"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="titleReg.domain"/>
          </el-form-item>
        </el-form>

        <el-divider>列表</el-divider>

        <el-table :data="titleRegList">
          <el-table-column prop="title" label="标题"/>
          <el-table-column prop="domain" label="域名"/>
        </el-table>
      </el-tab-pane>
      <!--设置-->
      <el-tab-pane label="设置" name="settings">
        <el-form v-model="settings">
          <el-form-item label="书签文件夹默认展开">
            <el-switch v-model="settings.defaultExpand" @change="changeSwitch()"/>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {CONFIG_STORE_TAG_KEY, store} from "@/script/helper";

const tagList = ref([]);
const titleRegList = ref([]);
const titleReg = ref({});
const activeTab = ref("tags");
const settings = ref({
  defaultExpand: true
});

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

const changeSwitch = () => {
  console.log("settings.value.defaultExpand=", settings.value.defaultExpand)
}

onMounted(() => {
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
