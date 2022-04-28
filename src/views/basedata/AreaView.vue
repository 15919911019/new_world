<template>
  <div class="mian">
    <div class="ly">
      <el-button
        style="width: 120px; margin: 0px 20px"
        class="btn"
        type="primary"
        @click="searchProvince"
        >新增
      </el-button>
      <div class="pr">
        <el-table :data="provinces" style="width: 100%">
          <el-table-column label="省份" prop="name" />
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="Type to search"
              />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEditPro(scope.row)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDeletePro(scope.row)"
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
        @click="handCreatePro"
        >新增
      </el-button>
    </div>
    <div class="ly">
      <el-cascader
        style="width: 200px; margin: 0px 20px"
        v-model="value"
        :options="searcPro"
        @change="handleChange"
      />
      <div class="city">
        <el-table :data="citys" style="width: 100%">
          <el-table-column label="省份" prop="province" />
          <el-table-column label="城市" prop="city" />
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="Type to search"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
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
        @click="dialogCityVisible = true"
        >新增</el-button
      >
    </div>
    <div class="ly">
      <el-cascader
        v-model="value"
        style="width: 300px; margin: 0px 20px"
        :options="searcProCity"
        @change="handleChange"
      />
      <div class="county">
        <el-table :data="county" style="width: 100%">
          <el-table-column label="省份" prop="province" />
          <el-table-column label="城市" prop="city" />
          <el-table-column label="区/县" prop="county" />
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="Type to search"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                :icon="Edit"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
                @click="handleDelete(scope.$index, scope.row)"
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
        @click="dialogCountyVisible = true"
        >新增</el-button
      >
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="省份编辑" width="50%">
    <span>
      <el-row>
        <el-col :span="4">
          <div>省份</div>
        </el-col>
        <el-col :span="5">
          <el-input v-model="selPro.name" />
        </el-col>
      </el-row>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handProvinceSure">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogCityVisible" title="城市编辑" width="50%">
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

  <el-dialog v-model="dialogCountyVisible" title="县区编辑" width="50%">
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
import { el, fa } from "element-plus/lib/locale";
import { defineComponent } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "AreaView",
  data() {
    return {
      dialogVisible: false,
      dialogCityVisible: false,
      dialogCountyVisible: false,
      provinces: [],
      citys: [],
      county: [],
      selPro: { recordID: "", name: "" },
      selCity: { recordID: "", name: "", parent: "" },
      selCounty: { recordID: "", name: "", parent: "" },
    };
  },

  methods: {
    handCreatePro() {
      this.dialogVisible = true;
      this.selPro.recordID = "";
      this.selPro.name = "";
    },

    handleEditPro(data) {
      this.dialogVisible = true;
      this.selPro = JSON.parse(JSON.stringify(data));
    },

    handleDeletePro(data) {
      this.axios.get("province/delete?recordid=" + data.recordID);
    },

    searchProvince() {
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

    handProvinceSure() {
      if (this.selPro.recordID == "") {
        this.axios
          .get("province/create?name=" + this.selPro.name)
          .then((res) => {
            if (res.data.data.code == 0) ElMessage.success("创建成功");
            else ElMessage.error("创建失败");
            this.dialogVisible = false;
            this.searchProvince();
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
            if (res.data.data.code == 0) ElMessage.success("更新成功");
            else ElMessage.error("更新失败");
            this.dialogVisible = false;
            this.searchProvince();
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