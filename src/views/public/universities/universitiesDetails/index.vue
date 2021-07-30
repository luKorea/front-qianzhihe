<template>
  <div>
    <basic-skeleton :loading="loading" show-avatar="true" :number="20"></basic-skeleton>
    <basic-info :info="info"></basic-info>
    <basic-container>
      <basic-desc :info="descInfo"/>
      <basic-ranking :info="rankingInfo"/>
      <basic-scope :info="selectInfo" :name="academyName"/>
      <basic-major :info="selectInfo" :name="academyName"/>
      <basic-plan :info="selectInfo" :name="academyName"/>
      <basic-subject :info="rankingInfo"/>
      <basic-further :info="furtherInfo"/>
    </basic-container>
    <el-tooltip :content="showBackInfo ? '关闭' : '打开'" placement="top-start">
      <i
          class="flex-right-icon"
          :class="showBackInfo ? 'el-icon-right' : 'el-icon-back'"
          @click="showBackInfo = !showBackInfo"></i>
    </el-tooltip>
    <div class="flex-right" v-if="showBackInfo">
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
import {
  getBasicInfo,
  getBasicDesc,
  getAcademyTop,
  getFurther,
  getSelectUniversities
} from '../../../../api/common/universities';
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
      loading: true,
      showBackInfo: true,
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
      selectIndex: -1,
      academyName: '',
      info: {},
      descInfo: {},
      rankingInfo: {},
      furtherInfo: {},
      selectInfo: {}
    }
  },
  mounted() {
    let {academyName} = this.$route.query;
    this.academyName = academyName;
    if (this.$store.state.user.user_type === '学生账号') {
      this.$store.dispatch('point/pointData', {
        url: `浏览院校 -【${academyName}】`,
        date: new Date().toLocaleDateString()
      }).then(res => {
        console.log(res, 'data');
      })
    }
    this.getDetailInfo(this.academyName);
    this.getDetailDesc(this.academyName);
    this.getRanking(this.academyName);
    this.getFurtherData(this.academyName);
    this.getSelectData(this.academyName);
    let _this = this;
    //监听屏幕滚动
    window.onscroll = function () {
      //获取当前滚动条的位置
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      //存放当前位置的id；即顺序
      let currentId;
      for (let i = 0; i < _this.nameList.length; i++) {
        let itemTop = document.getElementById(_this.nameList[i].id).offsetTop;
        if (top > itemTop - 125) {
          currentId = i;
        } else {
          break;
        }
      }
      _this.selectIndex = currentId;
    }
  },
  methods: {
    filterData(name) {
      this.nameList = this.nameList.filter(item => item.id !== name);
    },
    changeIndex(index, selector) {
      // this.selectIndex = index;
      scrollElement(selector);
      if (selector === this.nameList[this.nameList.length - 1].id) {
        this.$notify({
          title: '院校详情',
          message: '人家也是有底线的啦',
          duration: 2000
        });
      }
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
              if (!res.data.depict) this.filterData('uni-desc')
              if (!res.data.images || res.data.images.length === 0) this.filterData('uni-photo')
            }
          })
    },
    getRanking(academyName) {
      getAcademyTop(academyName)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.rankingInfo = data;
              if (!data.chineseUniversityTopCount || !data.softSeccoCount || !data.wuShuTopCount) {
                this.filterData('uni-sort')
              } if (!data.subjectList || data.subjectList.length === 0) {
                this.filterData('uni-pre')
              } if (!data.courseList || data.courseList.length === 0) {
                this.filterData('uni-major')
              }
            }
          })
    },
    getFurtherData(academyName) {
      this.loading = true;
      getFurther(academyName)
          .then(res => {
            this.loading = false;
            if (res.errorCode === 200 && res.data) {
              let data = res.data;
              this.furtherInfo = data;
              if (!data.obtainRegionEmploymenList) {
                this.filterData('uni-address')
              }
              if (!data.inland_enrolment_rate) {
                this.filterData('uni-zhong')
              }
              if (!data.foreign_enrolment_rate) {
                this.filterData('uni-wai')
              }
              if (!data.employment_rate) {
                this.filterData('uni-jiu')
              }
              if (!data.obtainIndustryEmploymenList) {
                this.filterData('uni-company')
              }
            } else {
              this.filterData('uni-address')
              this.filterData('uni-zhong')
              this.filterData('uni-wai')
              this.filterData('uni-jiu')
              this.filterData('uni-company')
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
