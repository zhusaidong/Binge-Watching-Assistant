<template>
  <div class="main_app">

    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="标签管理" name="tags">
        <el-button @click="addTag()">添加标签</el-button>
        <el-tag
            v-for="item in tagList"
            :key="item.label"
            :type="item.type"
            effect="plain">
          {{ item.label }}({{ item.count }})
        </el-tag>
      </el-tab-pane>

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
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {store} from "@/script/helper";

const tagList = ref([]);
const titleRegList = ref([]);
const titleReg = ref({});
const activeTab = ref("tags");

const addTag = () => {

};

function getTagList() {
  store.getSyncData("tag.list").then(list => {
    console.log("list=", list)
    tagList.value = list === null ? [] : list;
  })
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
</style>
