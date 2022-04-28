<template>
  <div>Price Info</div>
  <el-button @click="dialogVisible = true" />

  <el-dialog
    v-model="dialogVisible"
    title="单元编辑"
    width="50%"
    :before-close="handleClose"
  >
    <span>
      <el-row>
        <el-col :span="4">
          <div>单元名称：</div>
        </el-col>
        <el-col :span="5">
          <el-input v-model="selUnit.unitName" />
        </el-col>
        <el-col :span="6" />
        <el-col :span="4">
          <div>所属站点:</div>
        </el-col>
        <el-col :span="5">
          <div>{{ selUnit.siteID }}</div>
        </el-col>
      </el-row>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handSure">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { fa } from "element-plus/lib/locale";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PriceView",
  data() {
    return {
      dialogVisible: false,
      selUnit: { recordID: "", unitName: "", siteRecordID: "" },
      currPage: 1,
      totalCount: 20,
      value: "",
      areas: [
        {
          value: "1",
          label: "昆明",
        },
        {
          value: "2",
          label: "曲靖",
        },
      ],
      devices: [],
    };
  },
});
</script>

<style lang="scss">
</style>