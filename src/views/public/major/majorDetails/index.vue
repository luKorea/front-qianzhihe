<template>
  <div id="major-container">
    <basic-skeleton :loading="loading" show-avatar="true" :number="20"></basic-skeleton>
    <template v-if="!loading">
      <basic-info :info="info"/>
      <basic-container>
        <basic-desc :info="descInfo"/>
        <basic-proposal :info="proposalInfo" @changeMajor="getProposalFromComponents"/>
        <basic-employment :info="employmentInfo"/>
      </basic-container>
    </template>
    <i
        class="flex-right-icon"
        :class="showBackInfo ? 'el-icon-right' : 'el-icon-back'"
        @click="showBackInfo = !showBackInfo"></i>
    <div class="flex-right" v-if="showBackInfo">
      <div class="item"
           @click="changeIndex(index, item.id, nameList)"
           :class="selectIndex === index ? 'select' : ''"
           v-for="(item, index) in nameList" :key="index">
        {{ item.name }}
      </div>
    </div>
    <template v-else>
      <el-tooltip :content="'您已经浏览了' + processData + '的页面啦'" placement="top">
        <div class="flex-right-progress">
          <div class="loadbar" style="height: 340px">
            <strong class="bar" :style="{height: processData}"></strong>
          </div>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import basicInfo from "./components/basicInfo";
import basicDesc from "./components/basicDesc";
import basicProposal from "./components/basicProposal";
import basicEmployment from "./components/basicEmployment";
import {getBasicInfo, getBasicDesc, getBasicProposal, getBasicEmployment} from '../../../../api/common/major';
import {scrollElement, scrollToProgress} from "../../../../utils";
import {setUserHistory} from "../../../../api/common/search";

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
      loading: true,
      showBackInfo: true,
      processData: 0,
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
      selectIndex: -1,
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
    let _this = this;
    //监听屏幕滚动
    if (_this.showBackInfo) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      this.processData = scrollToProgress();
      let _this = this;
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
    },
    setInfo(params) {
      setUserHistory(params)
      .then(res => console.log(res))
    },
    filterData(name) {
      this.nameList = this.nameList.filter(item => item.id !== name);
    },
    changeIndex(index, selector, all) {
      scrollElement(selector);
      if (selector === this.nameList[this.nameList.length - 1].id) {
        this.$notify({
          title: '专业详情',
          message: '人家也是有底线的啦',
          duration: 2000
        });
      }
    },
    switchData(_id, name) {
      if (this.$store.state.user.user_type === '学生账号') {
        this.setInfo({
          historyId: _id,
          type: 'Profession'
        })
        this.$store.dispatch('point/pointData', {
          activityName: `浏览专业 -【${name}】`,
          activityType: '专业',
          params: this.$route.query
        }).then(res => {
          console.log(res, 'data');
        })
      }
      this.loading = true;
      Promise.all([this.getEmployment(_id), this.getData(_id), this.getDesc(_id), this.getProposal(_id)])
          .then(res => {
            this.loading = false;
            console.log(res);
          })
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
      return new Promise((resolve, reject) => {
        getBasicEmployment(id)
            .then(res => {
              if (res.errorCode === 200) {
                this.employmentInfo = res.data;
                console.log(this.employmentInfo, 'employmentInfo');
                if (!res.data.exam_direction) this.filterData('majorDo')
                if (!res.data.occupationVos) this.filterData('zhiye')
                if (!res.data.industry) this.filterData('hangye')
                if (!res.data.region) this.filterData('address')
                resolve(res)
              } else reject(res.msg)
            })
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
