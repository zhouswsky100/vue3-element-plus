<template>
  <div>
    <el-select v-model="fontsize" style="width: 60px" @change="sentFont">
      <el-option v-for="(item, index) in fontList" :key="index" :value="item">{{
        item
      }}</el-option>
    </el-select>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'

const { changeFontSize,getFontSetting } = useLayoutStore()

const fontsize = ref(getFontSetting.size)
const fontList = ref(['12', '13', '14', '15', '16', '17', '18', '19', '20'])

const sentFont = () => {
  changeFontSize(fontsize.value)
}
</script>