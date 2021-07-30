<template>
  <div>
    <basic-skeleton :loading="loading" :number="3"></basic-skeleton>
    <template v-if="!loading">
      <visit-component v-if="showEdit" :info="info"/>
      <edit-component v-else :info="info" @changeShowEdit="showEdit = !showEdit" />
      <div class="footer-btn" v-if="showEdit">
        <el-button style="color: #475B75" v-if="!showEdit" @click="showEdit = !showEdit">取消</el-button>
        <el-button type="primary" @click="goEdit">编辑</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import {getInfo} from "../../../api/student/archives";
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
      loading: true,
      showEdit: true,
      info: {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getInfo()
      .then(res => {
        if (res.errorCode === 200) {
          this.info = res.data;
          this.loading = false;
        }
      })
    },
    goEdit() {
      this.showEdit = false;
    }
  }
}
</script>
