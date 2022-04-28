<template>
  <div class="header">
    <span class="tilte">地区:</span>
    <el-cascader :options="areas" clearable />

    <span class="tilte">站点名称:</span>
    <el-input v-model="searchName" class="w-50 m-2" style="width: 200px" />
    <el-button class="btn" type="primary" @click="search">查询</el-button>
    <el-button class="btn" type="primary" @click="create">新增</el-button>
  </div>
  <el-divider border-style="dashed" />

  <div class="main">
    <el-table
      :data="sites"
      height="400px"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="provinceName" label="省份" width="180" />
      <el-table-column prop="cityName" label="城市" width="180" />
      <el-table-column prop="countyName" label="县/区" width="180" />
      <el-table-column prop="siteName" label="站点名称" width="180" />
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
    title="站点编辑"
    width="30%"
    :before-close="handleClose"
  >
    <span class="dlg">
      <el-row>
        <el-col :span="8">
          <div>所属地区：</div>
        </el-col>
        <el-col :span="12">
          <el-cascader
            v-model="editCounty"
            :options="areas"
            @change="handleChange"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>站点名称：</div>
        </el-col>
        <el-col :span="14">
          <el-input v-model="selSite.siteName" style="width: 200px" />
        </el-col>
        <el-col :span="6" />
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
import { ElMessage, ElMessageBox } from "element-plus";
import { el, tr } from "element-plus/lib/locale";
import { stringifyQuery } from "vue-router";
import { SiteModel } from "../../models/devices/siteModel";

export default defineComponent({
  name: "SiteView",
  data() {
    return {
      dialogVisible: false,
      selSite: {} as SiteModel,
      currPage: 1,
      totalCount: 20,
      editCounty: "",
      areas: [],
      sites: [{} as SiteModel],
    };
  },
  methods: {
    create() {
      this.selSite = {} as SiteModel;
      this.selSite.recordID = "";
      this.dialogVisible = true;

      this.axios.get("county/area").then((res) => {
        this.areas = res.data.data;
      });
    },
    search() {
      let req = {
        pageIndex: 1,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("site/search", req).then((res) => {
        debugger;
        this.sites = res.data.data;
        this.totalCount = 21;
      });
    },

    handleEdit(row) {
      this.selSite = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;

      this.axios.get("county/area").then((res) => {
        this.areas = res.data.data;
      });
    },

    handSure() {
      debugger;
      if (this.selSite.recordID == "") {
        this.axios
          .get("site/create", {
            params: {
              name: this.selSite.siteName,
              countyID: this.editCounty[2],
            },
          })
          .then((res) => {
            if (res.data.code == 0) {
              ElMessage.success("创建成功");
              this.search();
            } else ElMessage.error("创建站点失败");
            this.dialogVisible = false;
          });
      } else {
        this.axios
          .get("site/update", {
            params: {
              name: this.selSite.siteName,
              countyID: this.editCounty[2],
              recordID: this.selSite.recordID,
            },
          })
          .then((res) => {
            if (res.data.code == 0) {
              ElMessage.success("更新站点成功");
              this.search();
            } else ElMessage.error("更新站点失败");
            this.dialogVisible = false;
          });
      }
    },

    handleDelete(data) {
      ElMessageBox.confirm("确认删除站点：" + data.siteName + "?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("site/delete?recordid=" + data.recordID)
            .then((res) => {
              debugger;
              if (res.data.code == 0) {
                ElMessage.success("删除成功");
                this.search();
              } else ElMessage.error("删除失败");
            });
        })
        .catch(() => {
          ElMessage.error("删除失败");
        });
    },

    pageChange(val) {
      this.currPage = val;
      let req = {
        pageIndex: val,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("device/search", req).then((res) => {
        this.sites = res.data.data;
      });
    },

    handleSelectionChange(val) {
      debugger;
      console.info(val);
    },
  },
});
</script>

<style lang="scss">
.header {
  .tilte {
    margin: 0px 0px 0px 30px;
  }

  .dlg {
    el-row {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>