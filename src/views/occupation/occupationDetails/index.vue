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
import {getDetail} from '../../../api/occupation';
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