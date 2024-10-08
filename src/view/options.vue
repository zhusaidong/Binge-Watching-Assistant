<template>
  <div class="main_app">
    <h1>Hello {{ msg }}</h1>

    <el-tabs>
      <el-tab-pane title="标签管理">

        <el-button @click="addTag()">添加标签</el-button>

        <el-descriptions v-model="tagList">
          <el-descriptions-item #default="slot">
            {{ slot.name }} ({{ slot.count }})
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      
      <el-tab-pane title="标题正则">
        <el-form v-model="titleReg">
          <el-form-item>
            <el-input v-model="titleReg.title"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="titleReg.domain"/>
          </el-form-item>

          <template #footer="slot">

          </template>
        </el-form>

        <el-divider>列表</el-divider>

        <el-table data="titleRegList">
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

const addTag = () => {

};

function getTagList() {
  store.getSyncData("tag.list").then(list => {
    tagList.value = list;
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
