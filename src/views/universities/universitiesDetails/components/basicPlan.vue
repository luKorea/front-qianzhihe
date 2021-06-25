<template>
  <div>
    <el-divider/>
    <div class="flex">
      <div class="left">
        <span class="tip-info"></span>
        <span class="tip-title">招生计划(广东地区)</span>
      </div>
      <div class="right">
        <template v-if="info.professionalAdmissionsVintage && info.professionalAdmissionsVintage.length > 0">
          <el-select v-model="params.vintage"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px; margin-right: 10px">
            <el-option v-for="(item, index) in info.professionalAdmissionsVintage" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
        <template v-if="info.professionalAdmissionsBatch && info.professionalAdmissionsBatch.length > 0">
          <el-select v-model="params.batch"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px; margin-right: 10px">
            <el-option v-for="(item, index) in info.professionalAdmissionsBatch" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
        <template v-if="info.professionalAdmissionsArtsSciences && info.professionalAdmissionsArtsSciences.length > 0">
          <el-select v-model="params.artsSciences"
                     @change="getList(params)"
                     placeholder="请选择" style="width: 100px;">
            <el-option v-for="(item, index) in info.professionalAdmissionsArtsSciences" :key="index" :label="item"
                       :value="item"/>
          </el-select>
        </template>
      </div>
    </div>
    <div class="table-wrap">
      <div class="table-title">
        <span style="width: 60%">专业名称</span>
        <span style="width: 20%;">学制</span>
        <span style="width: 20%;">招生人数</span>
      </div>
      <div class="table-info" style="width: 100%;">
        <template v-if="list && list.length > 0">
          <template v-for="(item, index) in list">
            <template v-if="item.isProfessional">
              <span style="width: 60%" class="scope blue" :key="index" @click="goMajor(item.professionalId)">{{item.name}}</span>
            </template>
            <template v-else><span style="width: 60%" class="scope" :key="index">{{item.name}}</span></template>
            <span style="width: 20%" class="scope" :key="index">{{ item.schoolSystem }}</span>
            <span style="width: 20%" class="scope" :key="index">{{ item.admissions }}</span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {getYearPlanList} from "../../../../api/universities";

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
        this.params.vintage = this.info.professionalAdmissionsVintage ? this.info.professionalAdmissionsVintage[0] : '';
        this.params.batch = this.info.professionalAdmissionsBatch ? this.info.professionalAdmissionsBatch[0] : '';
        this.params.artsSciences = this.info.professionalAdmissionsArtsSciences ? this.info.professionalAdmissionsArtsSciences[0] : '';
        this.params.academyName = this.name;
        resolve();
      })
    },
    getList(params) {
      getYearPlanList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.list = res.data;
              console.log(this.list);
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
</style>