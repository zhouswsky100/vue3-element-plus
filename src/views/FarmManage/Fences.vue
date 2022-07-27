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
        <el-form-item label="栏舍类型">
          <el-select-v2
            v-model="query.type"
            filterable
            :options="groupList"
            placeholder="请选择栏舍类型"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="栏舍状态">
          <el-select v-model="query.state">
            <el-option>空栏</el-option>
            <el-option>在养</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="栏舍名称">
          <el-input v-model="query.name" placeholder="请输入栏舍名称" />
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
        class="add"
        :model="form"
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
          <el-select v-model="form.state" clearable>
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
    <div class="detail hand" v-show="detailFLag">
      <div class="m20" @click="detailFLag = false">
        <el-icon>
          <el-icon-arrow-left />
        </el-icon>
        <span> 测试栏舍</span>
      </div>
      <el-tabs tab-position="left">
        <el-tab-pane label="信息总览">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>养殖场信息</span>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }}
            </div>
          </el-card>
          <el-card class="box-card mt-5">
            <template #header>
              <div class="card-header">
                <span>组织信息</span>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }}
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="环境数据">
          待完成
        </el-tab-pane>
        <el-tab-pane label="用电量">
           <el-table :data="logTable" height="250" style="width: 100%">
            <el-table-column prop="date" label="存栏量"  />
            <el-table-column prop="name" label="单只用量"  />
            <el-table-column prop="name" label="单价"  />
            <el-table-column prop="name" label="总价"  />
            <el-table-column prop="name" label="创建时间"  />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="用水量">
          <el-table :data="logTable" height="250" style="width: 100%">
            <el-table-column prop="date" label="存栏量"  />
            <el-table-column prop="name" label="单只用量"  />
            <el-table-column prop="name" label="单价"  />
            <el-table-column prop="name" label="总价"  />
            <el-table-column prop="name" label="创建时间"  />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="栏舍日志">
          <el-table :data="logTable" height="250" style="width: 100%">
            <el-table-column prop="date" label="备注"  />
            <el-table-column prop="name" label="来源"  />
            <el-table-column prop="name" label="操作人"  />
            <el-table-column prop="name" label="时间"  />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="告警事件">
          <Waringnotice/>
        </el-tab-pane>
        <el-tab-pane label="阈值管理">
          待完成
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import Supertable from '/@/layout/components/supertable.vue'
import { fencesCols } from '/@/config/table'
import Waringnotice from '/@/views/FarmManage/components/waringnotice.vue'

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
  tabList: fencesCols
})
const farmList = ref([])
const groupList = ref([])
const typeList = ref([])
const homeFlag = ref(false)
const detailFLag = ref(false)
const query = reactive({
  type: '',
  farm: '',
  name: '',
  state: '',
  device: '',
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
.add /deep/ .el-input__inner {
  width: 20rem;
}
.row /deep/ .el-input__inner {
  width: 10rem;
}
</style>