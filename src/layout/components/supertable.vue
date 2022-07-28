<template>
  <div>
    <el-button type="text" @click=";(colsFlag = true), (colsType = 1)">
      筛选列
    </el-button>
    <el-button type="text" @click=";(colsFlag = true), (colsType = 2)">
      排序列
    </el-button>
    <slot />
    <el-table :data="tableList" border style="width: 100%">
      <template v-for="(item, index) in tabList" :key="index">
        <el-table-column
          v-if="!item.hideen"
          :prop="item.key"
          :label="item.value"
          :show-overflow-tooltip="true"
          :sortable="item.sort"
        />
      </template>
      <el-table-column fixed="right" label="操作" width="130" v-if="needFun">
        <template #default="scope" >
          <el-button
            type="text"
            size="small"
            @click="handleClick({ id: scope.row.id, type: 1 })"
          >
            详情
          </el-button>
          <el-button
            type="text"
            v-if="needEdit"
            size="small"
            @click="handleClick({ id: scope.row.id, type: 2 })"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            v-if="needDel"
            class="danger"
            size="small"
            @click="handleClick({ id: scope.row.id, type: 3 })"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="colsType == 1 ? '筛选列' : '排序列'"
      v-model="colsFlag"
      width="30%"
      :before-close="handleClose"
    >
      <el-checkbox-group v-model="checkList" v-show="colsType == 1">
        <el-checkbox
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.value"
        />
      </el-checkbox-group>
      <el-tree
        v-show="colsType == 2"
        :data="treeData"
        node-key="id"
        default-expand-all
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
        <template #default="{ data }">
          <span class="span__">
            <span class="tree-node-span">{{ data.id }}. {{ data.value }}</span>
          </span>
        </template>
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="colsFlag = false" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="colsState"
            >保存</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
import { computed, ref } from 'vue'

const emit = defineEmits()
const colsFlag = ref(false)
const colsType = ref(1)
const checkList = ref([])
const treeData = ref([])
const props = defineProps({
  tableData: Object,
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  needFun: {
    type: Boolean,
    default: true,
  },
  needEdit: {
    type: Boolean,
    default: true,
  },
  needDel: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
})
const tableList: Array = computed(() => {
  return props.tableData.tableList
})
const tabList: Array = computed(() => {
  return props.tableData.tabList
})
tabList.value.forEach((item) => {
  checkList.value.push(item.value)
})
const handleClick = (row: Array) => {
  emit('handleClick', row)
}
const tempList = JSON.stringify(tabList.value)
treeData.value = JSON.parse(tempList)
const colsState = (state) => {
  if (colsType.value == 1) {
    tabList.value.forEach((item) => {
      item.hideen = true
    })
    checkList.value.forEach((item) => {
      tabList.value.forEach((items) => {
        if (item == items.value) {
          items.hideen = false
        }
      })
    })
  } else {
    tabList.value.forEach((item, index) => {
      item.id = treeData.value[index].id
      item.key = treeData.value[index].key
      item.value = treeData.value[index].value
      item.sort = treeData.value[index].sort
    })
  }
  colsFlag.value = false
}
const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
  if (draggingNode.level === dropNode.level) {
    if (draggingNode.parent.id === dropNode.parent.id) {
      return type === 'prev' || type === 'next'
    }
  } else {
    return false
  }
}
const allowDrag = (draggingNode: any) => {
  return -1
}
const handleCurrentChange = (val) => {
  emit('handleCurrentChange', val)
}
const handleSizeChange = (val) => {
  emit('handleSizeChange', val)
}
</script>
<style scoped>
.pagination {
  margin: 20px 0;
}
</style>