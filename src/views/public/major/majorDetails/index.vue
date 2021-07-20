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
          id: 'desc'
        },
        {
          name: '学习课程',
          id: 'studyList'
        },
        {
          name: '培养目标',
          id: 'mubiao'
        },
        {
          name: '培养要求',
          id: 'yaoqiu'
        },
        {
          name: '3+1+2选科推荐',
          id: 'tuijian'
        },
        {
          name: '推荐院校',
          id: 'school'
        },
        {
          name: '相近专业',
          id: 'major'
        },
        {
          name: '专业做什么',
          id: 'majorDo'
        },
        {
          name: '推荐职业',
          id: 'zhiye'
        },
        {
          name: '就业行业分布',
          id: 'hangye'
        },
        {
          name: '就业地区分布',
          id: 'address'
        },
      ],
      selectIndex: 0,
      info: {},
      descInfo: {},
      proposalInfo: {},
      employmentInfo: {},
      _id: ''
    }
  },
  watch: {
    $route(to, from) {
      this._id = to.query._id;
      return this.switchData(this._id);
    }
  },
  mounted() {
    let {_id} = this.$route.query;
    this._id = _id;
    this.switchData(this._id);
  },
  methods: {
    changeIndex(index, selector) {
      this.selectIndex = index;
      scrollElement(selector);
    },
    switchData(_id) {
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
            }
          })
    },
    getDesc(id) {
      getBasicDesc(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.descInfo = res.data;
            }
          })
    },
    getProposal(id) {
      getBasicProposal(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.proposalInfo = res.data;
            }
          })
    },
    getEmployment(id) {
      getBasicEmployment(id)
          .then(res => {
            if (res.errorCode === 200) {
              this.employmentInfo = res.data;
            }
          })
    },
    getProposalFromComponents(id) {
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id
        }
      });
      this.switchData(id);
    }
  }
}
</script>

<style scoped lang="scss">

</style>