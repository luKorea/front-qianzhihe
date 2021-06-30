<template>
  <div>
    <div class="flex">
      <div class="left">
        <span class="tip-info"></span>
        <span class="tip-title">录取分数线(广东地区)</span>
      </div>
      <div class="right">
        <template v-if="info.calendarYearScoresVintage && info.calendarYearScoresVintage.length > 0">
          <el-select v-model="params.vintage"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px; margin-right: 10px">
            <el-option v-for="(item, index) in info.calendarYearScoresVintage" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
        <template v-if="info.calendarYearScoresArtsSciences && info.calendarYearScoresArtsSciences.length > 0">
          <el-select v-model="params.artsSciences"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px;">
            <el-option v-for="(item, index) in info.calendarYearScoresArtsSciences" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
      </div>
    </div>
    <div class="table-wrap">
      <div class="table-title">
        <span>批次</span>
        <span>招生类型</span>
        <span>最低分数</span>
        <span>最低位次</span>
      </div>
      <div class="table-info">
        <template v-if="list && list.length > 0">
          <template v-for="(item, index) in list">
            <span class="scope" :key="index">{{item.admission}}</span>
            <span class="scope" :key="index">{{item.admissionsNote}}</span>
            <span class="scope" :key="index">{{item.castArchivesPoints}}</span>
            <span class="scope" :key="index">{{item.theLowestRanking}}</span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {getYearScopeLIst} from "../../../../../api/common/universities";

export default {
  name: "basicScope",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      params: {
        vintage: '',
        artsSciences: '',
        academyName: ''
      },
      list: []
    }
  },
  watch: {
    info: {
      deep: true,
      handler() {
        this.setParams().then(res => {
          console.log(res);
          this.getList(this.params)
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setParams().then(res => {
        console.log(res);
        this.getList(this.params)
      })
    })
  },
  methods: {
    setParams() {
      return new Promise((resolve, reject) => {
        this.params.vintage = this.info.calendarYearScoresVintage ? this.info.calendarYearScoresVintage[0] : '';
        this.params.artsSciences = this.info.calendarYearScoresArtsSciences ? this.info.calendarYearScoresArtsSciences[0] : '';
        this.params.academyName = this.name;
        resolve();
      })
    },
    getList(params) {
      getYearScopeLIst(params)
      .then(res => {
        if (res.errorCode === 200) {
          this.list = res.data;
          console.log(this.list);
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.scope {
  width: 25% !important;
  border-top: 1px solid #E6E7EC;
}
</style>