<template>
  <div class="mian">
    <div class="ly">
      <el-row>
        <el-col :span="15">
          <el-cascader
            style="width: 200px; margin: 0px 20px"
            v-model="searchPro"
            :options="provinces"
            @change="handleChange"
          />
        </el-col>
        <el-col :span="5">
          <el-button
            style="width: 120px; margin: 0px 20px"
            class="btn"
            type="primary"
            @click="search"
            >查询
          </el-button>
        </el-col>
      </el-row>

      <div class="city">
        <el-table :data="citys" style="width: 100%">
          <el-table-column label="省份" prop="province" width="80" />
          <el-table-column label="城市" prop="name" width="auto" />
          <el-table-column align="right" width="140">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button
        style="width: 120px; margin: 0px 20px"
        class="btn"
        type="primary"
        @click="handCreate"
        >新增</el-button
      >
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="城市编辑" width="30%">
    <span>
      <el-row>
        <el-col :span="4">
          <div>省份</div>
        </el-col>
        <el-col :span="15">
          <el-select
            style="width: 200px"
            v-model="editPro"
            placeholder="Select"
          >
            <el-option
              v-for="item in provinces"
              :key="item.recordID"
              :label="item.name"
              :value="item.recordID"
            />
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <div>城市</div>
        </el-col>
        <el-col :span="15">
          <el-input style="width: 200px" v-model="selCity.name" />
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
import { da, el, fa } from "element-plus/lib/locale";
import { defineComponent } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { AreaModel } from "../../models/area/areaModel";

export default defineComponent({
  name: "CityCom",
  data() {
    return {
      dialogVisible: false,
      provinces: [{} as AreaModel],
      citys: [{} as AreaModel],
      selCity: {} as AreaModel,
      editPro: {} as AreaModel,
    };
  },

  methods: {
    handCreate() {
      this.dialogVisible = true;
      this.selCity.recordID = "";
      this.selCity.name = "";

      this.axios
        .post("province/search", { pageIndex: 1, pageSize: 1000 })
        .then((res) => {
          debugger;
          this.provinces = res.data.data;
        });
    },

    handleEdit(data) {
      this.dialogVisible = true;
      this.selCity = JSON.parse(JSON.stringify(data));

      this.axios
        .post("province/search", { pageIndex: 1, pageSize: 1000 })
        .then((res) => {
          this.provinces = res.data.data;
          var val = this.provinces.find((q) => q.recordID == data.parent);
          debugger;
        });
    },

    handleDelete(data) {
      ElMessageBox.confirm("确认删除城市：" + data.name + "?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("city/delete?recordid=" + data.recordID)
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

    search() {
      var req = {
        pageIndex: 1,
        PageSize: 20,
        Param: [],
      };
      this.axios.post("city/search", req).then((res) => {
        this.citys = res.data.data;
        this.dialogVisible = false;
      });
    },

    handSure() {
      if (this.selCity.recordID == "") {
        this.axios
          .get("city/create", {
            params: {
              name: this.selCity.name,
              proRecID: this.editPro,
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
          .get("city/update", {
            params: {
              name: this.selCity.name,
              proRecID: this.editPro,
              recordID: this.selCity.recordID,
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
  },
});
</script>

<style lang="scss">
.mian {
  display: flex;

  .ly {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pr {
    width: 300px;
    height: 500px;
    margin: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;

    el-table {
      margin: 10px;
      height: 450px;
    }

    el-button {
      display: flex;
    }
  }

  .city {
    width: 380px;
    height: 500px;
    margin: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;
  }

  .county {
    width: 450px;
    height: 500px;
    margin: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;
  }
}
</style>