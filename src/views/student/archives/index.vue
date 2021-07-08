<template>
  <div>
    <visit-component v-if="showEdit" :info="info"/>
    <edit-component v-else :info="info" @changeShowEdit="showEdit = !showEdit" />
    <div class="footer-btn-no-fixed">
      <el-button style="color: #475B75" v-if="!showEdit" @click="showEdit = !showEdit">取消</el-button>
      <el-button type="primary" @click="goEdit">编辑</el-button>
    </div>
  </div>
</template>

<script>
import visitComponent from "./components/visit";
import editComponent from "./components/edit";
export default {
  name: "index",
  components: {
    visitComponent,
    editComponent
  },
  data() {
    return {
      showEdit: true,
      info: {}
    }
  },
  methods: {
    goEdit() {
      this.showEdit = false;
    }
  }
}
</script>