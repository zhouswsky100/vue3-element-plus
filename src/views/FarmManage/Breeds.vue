<template>
  <div class="breeds">
    <div class="form" v-show="!detailFLag">
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
    <Supertable
      v-show="!detailFLag"
      :tableData="tableData"
      @handleClick="handleClick"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      :total="total"
    >
      <el-button type="text" @click="homeFlag = true"> 新增栏舍 </el-button>
    </Supertable>
    <el-dialog
      title="新增栏舍"
      v-model="homeFlag"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        class="add"
        label-position="right"
        label-width="5rem"
        ref="breedForm"
      >
        <el-form-item
          label="栏舍名称"
          prop="name"
          :rules="[
            {
              required: true,
              message: '请输入栏舍名称',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="form.name" placeholder="请输入栏舍名称" />
        </el-form-item>
        <el-form-item
          label="栏舍状态"
          prop="state"
          :rules="[
            {
              required: true,
              message: '请选择栏舍状态',
              trigger: 'blur',
            },
          ]"
        >
          <el-select v-model="form.state">
            <el-option>空栏</el-option>
            <el-option>在养</el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="type"
          label="栏舍类型"
          :rules="[
            {
              required: true,
              message: '请选择栏舍类型',
              trigger: 'blur',
            },
          ]"
        >
          <el-select v-model="form.type">
            <el-option>空栏</el-option>
            <el-option>在养</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栏舍结构">
          <el-select v-model="form.structure">
            <el-option>地养</el-option>
            <el-option>在养</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存栏数量">
          <el-input v-model="form.number" placeholder="请输入存栏数" />
        </el-form-item>
        <el-form-item label="栏舍信息" class="row">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input
                v-model="form.long"
                label="长"
                placeholder="请输入长(m)"
              />
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="form.width"
                label="宽"
                placeholder="请输入宽(m)"
              />
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="form.height"
                label="高"
                placeholder="请输入高(m)"
              />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="homeFlag = false" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="saveFence"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
    <div class="detail hand" v-show="detailFLag" >
      <div class="m20" @click="detailFLag = false">
        <el-icon>
          <el-icon-arrow-left />
        </el-icon>
        <span> 测试栏舍</span>
      </div>
      <el-tabs tab-position="left">
        <el-tab-pane label="信息总览">11</el-tab-pane>
        <el-tab-pane label="环境数据">1</el-tab-pane>
        <el-tab-pane label="用电量">1</el-tab-pane>
        <el-tab-pane label="用水量">1</el-tab-pane>
        <el-tab-pane label="设备列表">1</el-tab-pane>
        <el-tab-pane label="栏舍日志">1</el-tab-pane>
        <el-tab-pane label="告警事件">1</el-tab-pane>
        <el-tab-pane label="阈值管理">1</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import Supertable from '/@/layout/components/supertable.vue'

const breedForm = ref()
const form = reactive({
  name: '',
  state: '',
  fencen: '',
  structure: '',
  number: '',
  width: '',
  height: '',
  long: '',
})
const total = ref(1)
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
      id: 1,
      hideen: false,
    },
    {
      key: 'date',
      value: '栏舍',
      id: 2,
      hideen: false,
    },
    {
      key: 'date',
      value: '养殖类型',
      id: 3,
      hideen: false,
    },
    {
      key: 'date',
      value: '负责人',
      id: 4,
      hideen: false,
    },
    {
      key: 'date',
      value: '负责人手机号',
      id: 5,
      hideen: false,
      sort: true,
    },
    {
      key: 'date',
      value: '技术员',
      id: 6,
      hideen: false,
    },
    {
      key: 'date',
      value: '技术员手机号',
      id: 7,
      hideen: false,
    },
    {
      key: 'date',
      value: '数据来源',
      id: 8,
      hideen: false,
    },
    {
      key: 'date',
      value: '修改人',
      id: 9,
      hideen: false,
    },
    {
      key: 'date',
      value: '修改时间',
      id: 10,
      hideen: false,
    },
  ],
})
const farmList = ref([])
const groupList = ref([])
const typeList = ref([])
const homeFlag = ref(false)
const detailFLag = ref(false)
const query = reactive({
  farm: '',
  group: '',
})
//1详情2编辑3删除
const handleClick = (row: any) => {
  const { id, type } = row
  switch (type) {
    case 1:
      detailRow()
      break
    case 2:
      editRow()
      break
    case 3:
      delRow()
      break
  }
}
const handleCurrentChange = (val) => {
  console.log(val)
}
const handleSizeChange = (val) => {
  console.log(val)
}
const delRow = () => {
  ElNotification({
    title: '删除',
    message: '删除成功',
    type: 'success',
  })
}
const detailRow = () => {
  detailFLag.value = true
}
const editRow = () => {}
const onSubmit = () => {
  console.log('开始查询了')
}
const saveFence = () => {
  breedForm.value.validate((valid) => {
    if (valid) {
      ElNotification({
        title: '新增',
        message: '新增栏舍成功了',
        type: 'success',
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<style scoped>
.form {
  margin-top: 1.125rem;
}
.danger {
  color: #f56c6c;
}
.add /deep/.el-input__inner {
  width: 20rem;
}
.row /deep/ .el-input__inner {
  width: 10rem;
}
</style>