<template>
  <div id="major-container">
    <basic-info :info="info"/>
    <basic-container>
      <basic-desc :info="descInfo"/>
      <basic-proposal :info="proposalInfo" @changeMajor="getProposalFromComponents"/>
      <basic-employment :info="employmentInfo"/>
    </basic-container>
    <el-tooltip :content="showBackInfo ? '关闭' : '打开'" placement="top-start">
      <i
          class="flex-right-icon"
          :class="showBackInfo ? 'el-icon-right' : 'el-icon-back'"
          @click="showBackInfo = !showBackInfo"></i>
    </el-tooltip>
    <div class="flex-right" v-if="showBackInfo">
      <div class="item"
           @click="changeIndex(index, item.id, nameList)"
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
import basicProposal from "./components/basicProposal";
import basicEmployment from "./components/basicEmployment";
import {getBasicInfo, getBasicDesc, getBasicProposal, getBasicEmployment} from '../../../../api/common/major';
import {scrollElement} from "../../../../utils";

export default {
  name: "index",
  components: {
    basicInfo,
    basicDesc,
    basicProposal,
    basicEmployment
  },
  data() {
    return {
      showBackInfo: true,
      nameList: [
        {
          name: '专业介绍',
          id: 'desc',
        },
        {
          name: '学习课程',
          id: 'studyList',
        },
        {
          name: '培养目标',
          id: 'mubiao',
        },
        {
          name: '培养要求',
          id: 'yaoqiu',
        },
        {
          name: '3+1+2选科推荐',
          id: 'tuijian',
        },
        {
          name: '推荐院校',
          id: 'school',
        },
        {
          name: '相近专业',
          id: 'major',
        },
        {
          name: '专业做什么',
          id: 'majorDo',
        },
        {
          name: '推荐职业',
          id: 'zhiye',
        },
        {
          name: '就业行业分布',
          id: 'hangye',
        },
        {
          name: '就业地区分布',
          id: 'address',
        },
      ],
      selectIndex: 0,
      info: {},
      descInfo: {},
      proposalInfo: {},
      employmentInfo: {},
      _id: '',
      name: ''
    }
  },
  watch: {
    $route(to, from) {
      this._id = to.query._id;
      this.name = to.query.name;
      console.log(to, 'name');
      return this.switchData(this._id, this.name);
    },
  },
  mounted() {
    let {_id, name} = this.$route.query;
    this._id = _id;
    this.name = name;
    this.switchData(this._id, this.name);
    // this.$nextTick(() => {
    //   window.addEventListener('scroll', e => {
    //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     this.nameList.forEach((item, index) => {
    //       if (scrollTop + 100 == document.getElementById(item.id).offsetTop) {
    //         this.selectIndex = index
    //       }
    //     })
    //   })
    // })
  },
  methods: {
    filterData(name) {
      this.nameList = this.nameList.filter(item => item.id !== name);
    },
    changeIndex(index, selector, all) {
      this.selectIndex = index;
      scrollElement(selector, all);
    },
    switchData(_id, name) {
      if (this.$store.state.user.user_type === '学生账号') {
        this.$store.dispatch('point/pointData', {
          url: `浏览专业 -【${name}】`,
          date: new Date().toLocaleDateString()
        }).then(res => {
          console.log(res, 'data');
        })
      }
      this.getData(_id);
      this.getDesc(_id);
      this.getProposal(_id);
      this.getEmployment(_id);
    },
    getData(id) {
      getBasicInfo(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
              if (!res.data) this.filterData('hangye')
            }
          })
    },
    getDesc(id) {
      getBasicDesc(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.descInfo = res.data;
              if (!res.data.professional_concept) this.filterData('desc')
              if (!res.data.main_course) this.filterData('studyList')
              if (!res.data.profession_introduction) this.filterData('mubiao')
              if (!res.data.skills_profile) this.filterData('yaoqiu')
            }
          })
    },
    getProposal(id) {
      getBasicProposal(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.proposalInfo = res.data;
              if (!res.data.courseSelectionVos) this.filterData('tuijian')
              if (!res.data.subjectA) this.filterData('school')
              if (!res.data.recommendProVos) this.filterData('major')
            }
          })
    },
    getEmployment(id) {
      getBasicEmployment(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.employmentInfo = res.data;
              if (!res.data.exam_direction) this.filterData('majorDo')
              if (!res.data.occupationVos) this.filterData('zhiye')
              if (!res.data.industry) this.filterData('hangye')
              if (!res.data.region) this.filterData('address')
            }
          })
    },
    getProposalFromComponents(id, name) {
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id,
          name: name
        }
      });
      this.nameList = [
        {
          name: '专业介绍',
          id: 'desc',
        },
        {
          name: '学习课程',
          id: 'studyList',
        },
        {
          name: '培养目标',
          id: 'mubiao',
        },
        {
          name: '培养要求',
          id: 'yaoqiu',
        },
        {
          name: '3+1+2选科推荐',
          id: 'tuijian',
        },
        {
          name: '推荐院校',
          id: 'school',
        },
        {
          name: '相近专业',
          id: 'major',
        },
        {
          name: '专业做什么',
          id: 'majorDo',
        },
        {
          name: '推荐职业',
          id: 'zhiye',
        },
        {
          name: '就业行业分布',
          id: 'hangye',
        },
        {
          name: '就业地区分布',
          id: 'address',
        },
      ];
      this.switchData(id, name);
    }
  }
}
</script>

<style scoped lang="scss">

</style>