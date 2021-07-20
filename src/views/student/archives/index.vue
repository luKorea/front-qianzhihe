<template>
  <div>
    <visit-component v-if="showEdit" :info="info"/>
    <edit-component v-else :info="info" @changeShowEdit="showEdit = !showEdit" />
    <div class="footer-btn" v-if="showEdit">
      <el-button style="color: #475B75" v-if="!showEdit" @click="showEdit = !showEdit">取消</el-button>
      <el-button type="primary" @click="goEdit">编辑</el-button>
    </div>
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
      showEdit: true,
      info: {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getInfo()
      .then(res => {
        if (res.errorCode === 200) {
          this.info = res.data;
        }
      })
    },
    goEdit() {
      this.showEdit = false;
    }
  }
}
</script>