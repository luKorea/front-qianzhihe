<template>
  <div>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <template v-if="!loading">
      <holland-detail :major-list="majorList"
                      :type-list="typeList"
                      :random-info="randomInfo" v-if="params.type === 'holland'"/>
      <mbit-detail v-else
                   :mbit-info="mbitInfo"
                   :major-list="majorList"/>
    </template>
  </div>
</template>
<script>
import {getEvaluationDetails, getEvaluationMajor} from "../../../../../api/student/evaluation";
import {getHollandOccupation, getMbtiOccupation} from "../../../../../api/student/evaluation";
import hollandDetail from "./hollandDetail";
import mbitDetail from "./mbitDetail";

export default {
  name: "index",
  components: {
    hollandDetail,
    mbitDetail
  },
  data() {
    return {
      loading: true,
      params: {
        type: '',
        hollandId: ''
      },
      info: {},
      mbitInfo: {},
      majorList: [],
      randomInfo: {},
      typeList: []
    }
  },
  mounted() {
    let {type, hollandId} = this.$route.query;
    this.params.type = type;
    this.params.hollandId = hollandId;
    console.log(type, hollandId);
    if (hollandId) {
      this.getData(this.params);
      this.getMajor(this.params);
    } else if (type === 'holland') {
      let hollandData = JSON.parse(localStorage.getItem('holland'));
      console.log(hollandData);
      this.randomInfo = hollandData.spiderDiagram;
      this.typeList = hollandData.hollandResults;
      this.getHollandMajor();
    } else if (type === 'mbit') {
      let mbitData = JSON.parse(localStorage.getItem('mbit'));
      this.mbitInfo = mbitData;
      this.getMbtiMajor();
    }
  },
  methods: {
    getData(params) {
      this.loading = true;
      getEvaluationDetails(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data.user;
              this.loading = false;
              this.mbitInfo = res.data.personality;
              this.randomInfo = res.data.hollandType;
              this.typeList = res.data.result;
            }
          })
    },
    getHollandMajor() {
      this.loading = true;
      getHollandOccupation()
          .then(res => {
            if (res.errorCode === 200) {
              this.majorList = res.data;
              this.loading = false;
            }
          })
    },
    getMbtiMajor() {
      this.loading = true;
      getMbtiOccupation()
          .then(res => {
            if (res.errorCode === 200) {
              this.majorList = res.data;
              this.loading = false;
            }
          })
    },
    getMajor(params) {
      getEvaluationMajor(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.majorList = res.data.occupationEvaluationVoList;
            }
          })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
