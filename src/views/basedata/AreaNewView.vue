<template>
  <div class="mian">
    <Province />
    <City />
    <County />
  </div>
</template>

<script lang="ts">
import { el, fa } from "element-plus/lib/locale";
import { defineComponent } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import Province from "../../components/area/Province.vue";
import City from "../../components/area/City.vue";
import County from "../../components/area/County.vue";

export default defineComponent({
  name: "AreaView",
  components: {
    Province,
    City,
    County,
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