<template>
  <div class="header">
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
    <el-button class="btn" type="primary" @click="search">查询</el-button>
  </div>
  <el-divider border-style="dashed" />

  <div class="main">
    <el-table
      :data="devices"
      height="400px"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="siteName" label="站点" width="180" />
      <el-table-column prop="unitName" label="运行单元" width="180" />
      <el-table-column prop="deviceName" label="设备名称" width="180" />
      <el-table-column prop="deviceID" label="设备ID" width="180" />
      <el-table-column prop="deviceID" label="系统版本" width="180" />
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
    title="设备编辑"
    width="30%"
    :before-close="handleClose"
  >
    <span>
      <el-row>
        <el-col :span="8">
          <div>所属地区：</div>
        </el-col>
        <el-col :span="12">
          <el-cascader
            v-model="editSelCounty"
            :options="areas"
            @change="handleChangeCounty"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>所属站点:</div>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="edtSelSite"
            class="m-2"
            placeholder="选择站点"
            @change="handleChangeSite"
          >
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
        <el-col :span="8">
          <div>所属单元:</div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="edtSelUnit" class="m-2" placeholder="选择单元">
            <el-option
              v-for="item in edtUnits"
              :key="item.recordID"
              :label="item.unitName"
              :value="item.recordID"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>设备名称：</div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="selDevice.deviceName" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>设备ID:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ selDevice.deviceID }}</div>
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
import { ElMessage, ElMessageBox } from "element-plus";
import { AreaModel } from "@/models/area/areaModel";
import { SiteModel } from "@/models/devices/siteModel";
import { UnitModel } from "@/models/devices/unitModel";
import { DeviceModel } from "@/models/devices/deviceModel";
import { ja } from "element-plus/lib/locale";

export default defineComponent({
  name: "DeviceView",
  data() {
    return {
      dialogVisible: false,
      currPage: 1,
      totalCount: 20,

      areas: [{} as AreaModel],
      editCounty: {} as AreaModel,

      edtSites: [{} as SiteModel],
      edtSelSite: {} as SiteModel,

      edtUnits: [{} as UnitModel],
      edtSelUnit: {} as UnitModel,

      devices: [{} as DeviceModel],
      selDevice: {} as DeviceModel,
    };
  },
  methods: {
    search() {
      let req = {
        pageIndex: 1,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("device/search", req).then((res) => {
        this.devices = res.data.data;
        this.totalCount = 21;
      });
    },

    handleEdit(row) {
      this.selDevice = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.axios.get("county/area").then((res) => {
        this.areas = res.data.data;
      });
    },

    handSure() {
      //设备信息只能更新，不能在后台创建
      debugger;
      this.axios
        .get("device/update", {
          params: {
            name: this.selDevice.deviceName,
            unitID: this.edtSelUnit,
            recordid: this.selDevice.recordID,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            ElMessage.success("更新成功");
            this.search();
          } else ElMessage.error("更新失败");

          this.dialogVisible = false;
        });
    },

    handleDelete(data) {
      ElMessageBox.confirm("确认删除设备：" + data.siteName + "?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("device/delete?recordid=" + data.recordID)
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
        this.devices = res.data.data;
      });
    },

    handleSelectionChange(val) {
      debugger;
      console.info(val);
    },

    handleChangeCounty(areaIDs) {
      let req = {
        pageIndex: 1,
        PageSize: 100,
        Param: [areaIDs[0], areaIDs[1], areaIDs[2]],
      };
      this.axios.post("site/search", req).then((res) => {
        this.edtSites = res.data.data;
      });
    },

    handleChangeSite(siteID) {
      let req = {
        pageIndex: 1,
        PageSize: 100,
        Param: [siteID],
      };
      this.axios.post("unit/search", req).then((res) => {
        this.edtUnits = res.data.data;
      });
    },
  },
});
</script>

<style lang="scss">
.header {
  height: 40px;
  display: flex;

  .sel {
    margin-left: 30px;
  }

  .btn {
    margin-left: 30px;
  }
}

.el-row {
  margin-bottom: 20px;
}

.el-dialog {
  .el-dialog__header {
    background: #f7f7f7;
    text-align: left;
  }
}

.footer {
  height: 60px;
}
</style>