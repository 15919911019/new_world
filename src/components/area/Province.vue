<template>
  <div class="mian">
    <div class="ly">
      <el-button
        style="width: 120px; margin: 0px 20px"
        class="btn"
        type="primary"
        @click="search"
        >查询
      </el-button>
      <div class="pr">
        <el-table :data="provinces" style="width: 100%">
          <el-table-column label="省份" prop="name" />
          <el-table-column align="right">
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
        >新增
      </el-button>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="省份编辑" width="30%">
    <span>
      <el-row>
        <el-col :span="4">
          <div>省份</div>
        </el-col>
        <el-col :span="15">
          <el-input v-model="selPro.name" />
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
import { el, fa } from "element-plus/lib/locale";
import { defineComponent } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "ProvinceCom",
  data() {
    return {
      dialogVisible: false,
      provinces: [],
      selPro: { recordID: "", name: "" },
    };
  },

  methods: {
    handCreate() {
      this.dialogVisible = true;
      this.selPro.recordID = "";
      this.selPro.name = "";
    },

    handleEdit(data) {
      this.dialogVisible = true;
      this.selPro = JSON.parse(JSON.stringify(data));
    },

    handleDelete(data) {
      ElMessageBox.confirm("确认删除省份：" + data.name + "?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .get("province/delete?recordid=" + data.recordID)
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
      this.axios.post("province/search", req).then((res) => {
        this.provinces = res.data.data;
        this.dialogVisible = false;
      });
    },

    handSure() {
      if (this.selPro.recordID == "") {
        this.axios
          .get("province/create?name=" + this.selPro.name)
          .then((res) => {
            if (res.data.code == 0) {
              this.search();
              ElMessage.success("创建成功");
            } else ElMessage.error("创建失败");
            this.dialogVisible = false;
          });
      } else {
        this.axios
          .get(
            "province/update?name=" +
              this.selPro.name +
              "&id=" +
              this.selPro.recordID
          )
          .then((res) => {
            if (res.data.code == 0) {
              this.search();
              ElMessage.success("更新成功");
            } else ElMessage.error("更新失败");
            this.dialogVisible = false;
            this.search();
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