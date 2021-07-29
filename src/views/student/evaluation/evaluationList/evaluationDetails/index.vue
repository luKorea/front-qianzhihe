<template>
  <div>
    <holland-detail :major-list="majorList"
                    :type-list="typeList"
                    :random-info="randomInfo" v-if="params.type === 'holland'"/>
    <mbit-detail v-else
                 :mbit-info="mbitInfo"
                 :major-list="majorList"/>
  </div>
</template>
<script>
import {getEvaluationDetails, getEvaluationMajor} from "../../../../../api/student/evaluation";
import {getHollandOccupation} from "../../../../../api/student/evaluation";
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
    if (hollandId) {
      this.getData(this.params);
    } else {
      let hollandData = JSON.parse(localStorage.getItem('holland'));
      console.log(hollandData);
      // this.mbitInfo = hollandData.personality;
      this.randomInfo = hollandData.spiderDiagram;
      this.typeList = hollandData.hollandResults;
    }
    this.getMajor();
  },
  methods: {
    getData(params) {
      getEvaluationDetails(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data.user;
              this.mbitInfo = res.data.personality;
              this.randomInfo = res.data.hollandType;
              this.typeList = res.data.result;
            }
          })
    },
    getMajor() {
      getHollandOccupation()
          .then(res => {
            if (res.errorCode === 200) {
              this.majorList = res.data;
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