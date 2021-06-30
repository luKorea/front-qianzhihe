<template>
  <div>
    <basic-info :info="info"></basic-info>
    <basic-container>
      <basic-desc :info="descInfo" />
      <basic-ranking :info="rankingInfo"/>
      <basic-scope :info="selectInfo" :name="academyName"/>
      <basic-major :info="selectInfo" :name="academyName"/>
      <basic-plan :info="selectInfo" :name="academyName"/>
      <basic-subject :info="rankingInfo"/>
      <basic-further :info="furtherInfo"/>
    </basic-container>
  </div>
</template>

<script>
import basicInfo from "./components/basicInfo";
import basicDesc from "./components/basicDesc";
import basicRanking from "./components/basicRanking";
import basicScope from "./components/basicScope";
import basicMajor from "./components/basicMajor";
import basicPlan from "./components/basicPlan";
import basicSubject from "./components/basicSubject";
import basicFurther from "./components/basicFurther";
import {getBasicInfo, getBasicDesc, getAcademyTop, getFurther, getSelectUniversities} from '../../../../api/common/universities';

export default {
  name: "index",
  components: {
    basicInfo,
    basicDesc,
    basicRanking,
    basicScope,
    basicMajor,
    basicPlan,
    basicSubject,
    basicFurther
  },
  data() {
    return {
      academyName: '',
      info: {},
      descInfo: {},
      rankingInfo: {},
      furtherInfo: {},
      selectInfo: {}
    }
  },
  created() {
    let {academyName} = this.$route.query;
    this.academyName = academyName;
    this.getDetailInfo(this.academyName);
    this.getDetailDesc(this.academyName);
    this.getRanking(this.academyName);
    this.getFurtherData(this.academyName);
    this.getSelectData(this.academyName);
  },
  methods: {
    getDetailInfo(academyName) {
      getBasicInfo(academyName)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
            }
          });
    },
    getDetailDesc(academyName) {
      getBasicDesc(academyName)
          .then(res => {
            if (res.errorCode === 200) {
              this.descInfo = res.data;
            }
          })
    },
    getRanking(academyName) {
      getAcademyTop(academyName)
          .then(res => {
            if (res.errorCode === 200) {
              this.rankingInfo = res.data;
            }
          })
    },
    getFurtherData(academyName) {
      getFurther(academyName)
          .then(res => {
            if (res.errorCode === 200) {
              this.furtherInfo = res.data;
            }
          })
    },
    getSelectData(academyName) {
      getSelectUniversities(academyName)
      .then(res => {
        if (res.errorCode === 200) {
          this.selectInfo = res.data;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>