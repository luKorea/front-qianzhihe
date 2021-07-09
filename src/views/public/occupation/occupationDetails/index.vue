<template>
  <div>
    <basic-container-back>
      <video-list :video-list="info.videoList"></video-list>
    </basic-container-back>
    <basic-info :info="info"/>
    <basic-container>
      <basic-desc :info="info"/>
      <basic-ability :info="info"/>
      <basic-study :info="info"/>
      <basic-person :info="info"/>
      <basic-tip :info="info"/>
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
import videoList from "./components/videoList";
import basicInfo from './components/basicInfo';
import basicDesc from "./components/basicDesc";
import basicAbility from "./components/basicAbility";
import basicStudy from "./components/basicStudy";
import basicPerson from "./components/basicPerson";
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
    basicPerson,
    basicTip
  },
  data() {
    return {
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
      selectIndex: 0,
      occupationId: '',
      info: {}
    }
  },
  mounted() {
    let {occupationId} = this.$route.query;
    this.occupationId = occupationId;
    this.getDetailData(this.occupationId);
  },
  methods: {
    changeIndex(index, selector) {
      this.selectIndex = index;
      scrollElement(selector);
    },
    getDetailData(occupationId) {
      getDetail(occupationId)
      .then(res => {
        if (res.errorCode === 200) {
          this.info = res.data;
          console.log(this.info);
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>