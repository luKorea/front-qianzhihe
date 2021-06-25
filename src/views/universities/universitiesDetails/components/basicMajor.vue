<template>
  <div>
    <el-divider/>
    <div class="flex">
      <div class="left">
        <span class="tip-info"></span>
        <span class="tip-title">历年录取专业(广东地区)</span>
      </div>
      <div class="right">
        <template v-if="info.chineseCalendarVintage && info.chineseCalendarVintage.length > 0">
          <el-select v-model="params.vintage"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px; margin-right: 10px">
            <el-option v-for="(item, index) in info.chineseCalendarVintage" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
        <template v-if="info.chineseCalendarAdmissionToTheBatch && info.chineseCalendarAdmissionToTheBatch.length > 0">
          <el-select v-model="params.batch"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px; margin-right: 10px">
            <el-option v-for="(item, index) in info.chineseCalendarAdmissionToTheBatch" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
        <template v-if="info.chineseCalendarArtsSciences && info.chineseCalendarArtsSciences.length > 0">
          <el-select v-model="params.artsSciences"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px;">
            <el-option v-for="(item, index) in info.chineseCalendarArtsSciences" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
      </div>
    </div>

    <div class="major-container">
      <div class="major-wrap">
        <template v-if="list && list.length > 0">
          <div class="major-list" v-for="item in list" :key="item.professionalId">
            <div class="major-info">
              <template v-if="item.isProfessional">
                <div class="major-title blue" @click="goMajor(item.professionalId)">{{item.name}}</div>
              </template>
              <template v-else>
                <div class="major-title">{{item.name}}</div>
              </template>
              <div class="major-scope">最低分/位次：{{item.lowestMark}}/{{item.theMinimumNumber}}</div>
            </div>
            <div class="major-progress">
              <el-progress style="margin-bottom: 20px" :percentage="item.averageScore / 10" :show-text="false" stroke-width="20"/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {getYearMajorList} from "../../../../api/universities";

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
        batch: '',
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
        this.params.vintage = this.info.chineseCalendarVintage ? this.info.chineseCalendarVintage[0] : '';
        this.params.batch = this.info.chineseCalendarAdmissionToTheBatch ? this.info.chineseCalendarAdmissionToTheBatch[0] : '';
        this.params.artsSciences = this.info.chineseCalendarArtsSciences ? this.info.chineseCalendarArtsSciences[0] : '';
        this.params.academyName = this.name;
        resolve();
      })
    },
    getList(params) {
      getYearMajorList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.list = res.data;
              console.log(this.list, '111212');
            }
          })
    },
    goMajor(id) {
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scope {
  border-top: 1px solid #E6E7EC;
}
.blue {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4D97FF !important;
  cursor: pointer;
  text-decoration: underline;
}

.major-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .major-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .major-list {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 40%;
      .major-info {
        display: flex;
        justify-content: space-between;
        margin: 0 20px 20px 0;
        .major-title {
          //height: 22px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #475B75;
          //line-height: 22px;
        }
        .major-scope {
          //height: 22px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #737373;
          //line-height: 22px;
        }
      }
    }
  }
}


</style>