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
    <div class="flex-right">
      <div class="item"
           @click="changeIndex(index, item.id)"
           :class="selectIndex === index ? 'select' : ''"
           v-for="(item, index) in nameList" :key="index">
        {{ item.name }}
      </div>
    </div>
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
import {scrollElement} from "../../../../utils";

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
      nameList: [
        {
          name: '院校介绍',
          id: 'uni-desc'
        },
        {
          name: '招生办信息',
          id: 'uni-info'
        },
        {
          name: '男女比例',
          id: 'uni-gender'
        },
        {
          name: '院校风光',
          id: 'uni-photo'
        },
        {
          name: '院校排行',
          id: 'uni-sort'
        },
        {
          name: '录取分数线',
          id: 'uni-number'
        },
        {
          name: '历年录取分数线',
          id: 'uni-year-number'
        },
        {
          name: '招生计划',
          id: 'uni-plain'
        },
        {
          name: '双一流学科',
          id: 'uni-subject'
        },
        {
          name: '学科评估',
          id: 'uni-pre'
        },
        {
          name: '特色专业',
          id: 'uni-major'
        },
        {
          name: '国内升学率',
          id: 'uni-zhong'
        },
        {
          name: '国外升学率',
          id: 'uni-wai'
        },
        {
          name: '就业率',
          id: 'uni-jiu'
        },
        {
          name: '就业地区流向',
          id: 'uni-address'
        },
        {
          name: '就业单位性质',
          id: 'uni-company'
        },
      ],
      selectIndex: 0,
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
    changeIndex(index, selector) {
      this.selectIndex = index;
      scrollElement(selector);
    },
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