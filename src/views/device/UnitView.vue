<template>
  <div class="breadcrumb">
    <el-icon><CaretRight /></el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>运行单元</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="header">
    <span>站点:</span>
    <el-select
      v-model="value"
      class="sel"
      clearable
      placeholder="Select"
      size="large"
    >
      <el-option
        v-for="item in areas"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <span>单元名称:</span>
    <el-input v-model="searchName" style="width: 200px" />
    <el-button class="btn" type="primary" @click="search">查询</el-button>
    <el-button class="btn" type="primary" @click="create">新增</el-button>
  </div>
  <el-divider border-style="dashed" />

  <div class="main">
    <el-table
      :data="units"
      height="400px"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="siteName" label="所属站点" width="180" />
      <el-table-column prop="unitName" label="单元名称" width="180" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currPage"
      @current-change="pageChange"
      background
      :page-size="20"
      layout="prev, pager, next"
      :total="totalCount"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="单元编辑"
    width="30%"
    :before-close="handleClose"
  >
    <span>
      <el-row>
        <el-col :span="5">
          <div>所属地区：</div>
        </el-col>
        <el-col :span="10">
          <el-cascader
            v-model="editSelCounty"
            :options="areas"
            @change="handleChangeCounty"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>所属站点:</div>
        </el-col>
        <el-col :span="10">
          <el-select v-model="edtSelSite" class="m-2" placeholder="选择站点">
            <el-option
              v-for="item in edtSites"
              :key="item.recordID"
              :label="item.siteName"
              :value="item.recordID"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>单元名称：</div>
        </el-col>
        <el-col :span="10">
          <el-input v-model="selUnit.unitName" />
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
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import { el, tr } from "element-plus/lib/locale";
import { stringifyQuery } from "vue-router";
import { AreaModel } from "@/models/area/areaModel";
import { SiteModel } from "@/models/devices/siteModel";
import { UnitModel } from "@/models/devices/unitModel";

export default defineComponent({
  name: "UnitView",
  data() {
    return {
      dialogVisible: false,
      selUnit: {} as UnitModel,
      currPage: 1,
      totalCount: 20,
      edtSelCounty: {} as AreaModel,
      edtSites: [{} as SiteModel],
      edtSelSite: {} as SiteModel,
      areas: [{} as AreaModel],
      units: [],
    };
  },
  methods: {
    search() {
      let req = {
        pageIndex: 1,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("unit/search", req).then((res) => {
        this.units = res.data.data;
        this.totalCount = 21;
      });
    },

    handleEdit(row) {
      this.selUnit = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;

      this.axios.get("county/area").then((res) => {
        this.areas = res.data.data;
      });
    },

    handleChangeCounty(areaIDs) {
      let req = {
        pageIndex: 1,
        PageSize: 20,
        Param: [areaIDs[0], areaIDs[1], areaIDs[2]],
      };
      this.axios.post("site/search", req).then((res) => {
        this.edtSites = res.data.data;
      });
    },

    handSure() {
      if (this.selUnit.recordID == "") {
        this.axios
          .get("unit/create", {
            params: {
              name: this.selUnit.unitName,
              siteID: this.edtSelSite,
            },
          })
          .then((res) => {
            if (res.data.code == 0) {
              ElMessage.success("创建成功");
              this.search();
            } else ElMessage.error("创建失败");

            this.dialogVisible = false;
          });
      } else {
        this.axios
          .get("unit/update", {
            params: {
              name: this.selUnit.unitName,
              siteID: this.edtSelSite,
              recordID: this.selUnit.recordID,
            },
          })
          .then((res) => {
            if (res.data.code == 0) {
              ElMessage.success("更新成功");
              this.search();
            } else ElMessage.error("更新失败");

            this.dialogVisible = false;
          });
      }
    },

    handleDelete(row) {
      ElMessage.success(row.deviceID);
    },

    pageChange(val) {
      this.currPage = val;
      let req = {
        pageIndex: val,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("unit/search", req).then((res) => {
        this.units = res.data.data;
      });
    },

    handleSelectionChange(val) {
      debugger;
      console.info(val);
    },

    create() {
      this.selUnit = {} as UnitModel;
      this.selUnit.recordID = "";
      this.dialogVisible = true;

      this.axios.get("county/area").then((res) => {
        this.areas = res.data.data;
      });
    },
  },
});
</script>

<style lang="scss">
.breadcrumb {
  display: flex;
  height: 40px;
}
</style>