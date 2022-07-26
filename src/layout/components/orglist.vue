<template>
    <div class="orglist">
        <div class="mr-10 flex-c-c mt-5 hand" @click="drawer = true">
            <span class="mr-10">{{deptInfo.deptName}}</span>
            <el-icon>
                <el-icon-arrow-right />
            </el-icon>
        </div>
        <el-drawer 
            v-model='drawer' 
            title='组织架构选择' 
            size='500px' 
            :append-to-body="true"
            :modal-append-to-body="false"
            :direction="direction"
            :before-close="handleClose">
            <el-form :inline="true" class="pf50">
                <el-form-item label="机构名称">
                    <el-input v-model="deptName" placeholder="请输入机构名称" style="width:180px" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDeptList">查询</el-button>
                    <el-button type="info" @click="deptName='';getDeptList()">重置</el-button>
                </el-form-item>
            </el-form>
             <el-tree 
                :data="dataSource" 
                node-key="id" 
                class="trres z-10"  
                :expand-on-click-node="false"
                ref="treeRef" 
                :filter-node-method="filterNode" 
                style="font-size: 14px; overflow-y: auto"
                @node-click="handleNodeClick">
                <template #default="{ data }">
                    <span class="custom-tree-node">
                        <span>{{ data.deptName }}</span>
                    </span>
                </template>
             </el-tree>
        </el-drawer>
    </div>
</template>
<script lang='ts' setup>
import { Tree } from 'element-plus/es/components/tree-v2/src/types'
import { reactive, ref } from 'vue'
import { queryDeptList } from '/@/api/layout/index'
import { IRenderTableList } from '/@/type/views/Components/TableSearchTest'
import { useLayoutStore } from '/@/store/modules/layout'

const { changeDeptInfo,getDeptInfo } = useLayoutStore()

let dataSource:Tree = ref()
const deptName = ref('')
const deptInfo = ref(getDeptInfo)
const drawer = ref(false)
const getDeptList  = () => {
    queryDeptList({ deptName:deptName.value }).then((res) => {
        dataSource.value = res
    });
}
const handleNodeClick = (data: any) => {
    drawer.value = false
    changeDeptInfo(data.id,data.deptName)
};
getDeptList()
</script>
<style scoped>
.pf50{
    position: fixed;
    top: 3.75rem; 
    height: 3.125rem;
    z-index: 100;
}
</style>