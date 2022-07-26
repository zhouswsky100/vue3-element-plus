<template>
  <div class="">
    <div class="form">
      <el-form :inline="true" :model="query">
        <el-form-item label="养殖场">
          <el-select-v2
            v-model="query.farm"
            filterable
            :options="farmList"
            placeholder="请选择养殖场"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="组织路径">
          <el-select-v2
            v-model="query.group"
            filterable
            :options="groupList"
            placeholder="请选择组织"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="养殖场类型">
          <el-select-v2
            v-model="query.group"
            filterable
            :options="typeList"
            placeholder="请选择养殖场类型"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="责任人手机号">
          <el-input v-model="query.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Supertable :tableData="tableData" @handleClick="handleClick" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Supertable from '/@/layout/components/supertable.vue'

const tableData = reactive({
  tableList: [
    {
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      projName: '001',
    },
  ],
  tabList: [
    {
      key: 'date',
      value: '养殖场',
      id:1,
      hideen:false
    },
    {
      key: 'date',
      value: '栏舍',
      id:2,
      hideen:false
    },
    {
      key: 'date',
      value: '养殖类型',
      id:3,
      hideen:false
    },
    {
      key: 'date',
      value: '负责人',
      id:4,
      hideen:false
    },
    {
      key: 'date',
      value: '负责人手机号',
      id:5,
      hideen:false,
      sort:true
    },
    {
      key: 'date',
      value: '技术员',
      id:6,
      hideen:false
    },
    {
      key: 'date',
      value: '技术员手机号',
      id:7,
      hideen:false
    },
    {
      key: 'date',
      value: '数据来源',
      id:8,
      hideen:false
    },
    {
      key: 'date',
      value: '修改人',
      id:9,
      hideen:false
    },
    {
      key: 'date',
      value: '修改时间',
      id:10,
      hideen:false
    },
  ],
})
const farmList = ref([])
const groupList = ref([])
const typeList = ref([])
const query = reactive({
  farm: '',
  group: '',
})
//1详情2编辑3删除
const handleClick = (row: any) => {
  const { id, type } = row
  console.log(`查询id${id}查询类型${type}`)
}
const onSubmit = () => {
  console.log('开始查询了')
}
</script>
<style scoped>
.form {
  margin-top: 1.125rem;
}
.danger {
  color: #f56c6c;
}
</style>