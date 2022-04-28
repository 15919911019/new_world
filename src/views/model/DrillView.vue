<template>
  <el-input class="cc" style="width: 200px" />
  <el-table :data="tableData" style="width: 100%" height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column label="City" width="120">
      <template #default="scope">
        <el-input class="cc" v-model="scope.row.city" />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="Address" width="120" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column
      v-for="(item, index) in titles"
      :prop="item.Value"
      :label="item.Lable"
      :key="index"
    />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DrillView",
  data() {
    return {
      titles: [
        { Value: "1", Lable: "A", index: 1 },
        { Value: "2", Lable: "B", index: 2 },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
      ],
    };
  },

  methods: {
    handleClick() {
      debugger;
      this.titles.push({ Value: "3", Lable: "C", index: 3 });
    },
  },
});
</script>

<style lang="scss">
.cc >>> .el-input__inner {
  background-color: #fff;
  background-image: none;
  border: 0px;
  width: 100%;
  outline: 0;
}
</style>