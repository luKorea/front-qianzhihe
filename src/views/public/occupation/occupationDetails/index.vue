<template>
  <div>
    <basic-skeleton :loading="loading" show-avatar="true" :number="20"></basic-skeleton>
    <basic-container-back v-if="info.videoList && info.videoList.length > 0">
      <video-list :video-list="info.videoList"></video-list>
    </basic-container-back>
    <basic-info :info="info"/>
    <basic-container>
      <basic-desc :info="info"/>
      <basic-ability :info="info"/>
      <basic-study :info="info"/>
      <basic-person-desc :info="info"/>
      <basic-tip :info="info"/>
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
import videoList from "./components/videoList";
import basicInfo from './components/basicInfo';
import basicDesc from "./components/basicDesc";
import basicAbility from "./components/basicAbility";
import basicStudy from "./components/basicStudy";
import basicPersonDesc from "./components/basicPerson";
import basicTip from "./components/basicTip";
import {getDetail} from '../../../../api/common/occupation';
import {scrollElement} from "../../../../utils";
export default {
  name: "index",
  components: {
    videoList,
    basicInfo,
    basicDesc,
    basicAbility,
    basicStudy,
    basicPersonDesc,
    basicTip
  },
  data() {
    return {
      loading: true,
      showBackInfo: true,
      nameList: [
        {
          name: '职业介绍',
          id: 'occ-desc'
        },
        {
          name: '推荐专业',
          id: 'occ-major'
        },
        {
          name: '能力要求',
          id: 'occ-yaoqiu'
        },
        {
          name: '知识储备',
          id: 'occ-zhishi'
        },
        {
          name: '相关证书',
          id: 'occ-zhengshu'
        },
        {
          name: '代表人物',
          id: 'occ-person'
        },
        {
          name: '兴趣测试',
          id: 'occ-ceshi'
        },
        {
          name: '特质',
          id: 'occ-tezhi'
        },
        {
          name: '小提示',
          id: 'occ-tip'
        }
      ],
      selectIndex: -1,
      occupationId: '',
      info: {}
    }
  },
  mounted() {
    let {occupationId, name} = this.$route.query;
    this.occupationId = occupationId;
    if (this.$store.state.user.user_type === '学生账号') {
      this.$store.dispatch('point/pointData', {
        url: `浏览职业 -【${name}】`,
        date: new Date().toLocaleDateString()
      }).then(res => {
        console.log(res, 'data');
      })
    }
    this.getDetailData(this.occupationId);
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
      scrollElement(selector);
      if (selector === this.nameList[this.nameList.length - 1].id) {
        this.$notify({
          title: '职业详情',
          message: '人家也是有底线的啦',
          duration: 2000
        });
      }
    },
    getDetailData(occupationId) {
      this.loading = true;
      getDetail(occupationId)
      .then(res => {
        if (res.errorCode === 200) {
          let data = res.data;
          this.info = data;
          this.loading = false;
          if (!data.description) this.filterData('occ-desc')
          if (!data.professionalArrayList || data.professionalArrayList.length === 0) this.filterData('occ-major')
          if (!data.description) this.filterData('occ-yaoqiu')
          if (!data.jobKnowledgeVoList) this.filterData('occ-zhishi')
          if (!data.certificateVoList || data.certificateVoList.length === 0) this.filterData('occ-zhengshu')
          if (!data.personalityVoList) this.filterData('occ-person')
          if (!data.hollands1) this.filterData('occ-ceshi')
          if (!data.characteristics) this.filterData('occ-tezhi')
          if (!data.tips) this.filterData('occ-tip')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
