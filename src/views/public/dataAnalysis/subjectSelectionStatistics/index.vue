<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">选科查询统计筛选</span>
      <div class="search-wrap m-top">
        <div>
          <span class="tip">年级:</span>
          <el-select v-model="params.grade"
                     @change="(e) => {
                       params.graduate = ''
                       getClassData(e)
                     }"
                     placeholder="请选择" clearable filterable>
            <template v-if="gradeList && gradeList.length > 0">
              <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">班级:</span>
          <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
            <template v-if="classList && classList.length > 0">
              <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">选科查询数据统计</span>
      <el-divider/>
      <div class="charts-flex">
        <div id="charts" class="charts"></div>
        <div class="tip">
          <div class="tip-number">
            <div class="title">查询次数</div>
            <div class="number-wrap">
              <span v-for="(item, index) in list" :key="index">{{ item.count }}次</span>
            </div>
          </div>
          <div class="tip-number">
            <div class="title">查询占比</div>
            <div class="number-wrap">
              <span v-for="(item, index) in list" :key="index">{{ item.contentProportion }}</span>
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {getList} from "../../../../api/common/dataAnalysis/subjectSelectionStatistics";

export default {
  name: "subjectSelectionStatistics",
  data() {
    return {
      loading: false,
      params: {
        grade: '',
        graduate: ''
      },
      classList: [],
      gradeList: [],
      charts: null,
      list: [],
    }
  },
  watch: {
    list: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  beforeDestroy() {
    if (!this.charts) {
      return
    }
    this.charts.dispose();
    this.charts = null;
  },
  mounted() {
    this.getData(this.params);
    this.getGrade();
    this.getClassData();
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    searchData() {
      this.params.page = 0;
      this.getData(this.params);
    },
    getGrade() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
            }
          })
    },
    getClassData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    getData(params) {
      this.loading = true;
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res, 'data');
              this.loading = false;
              this.list = res.data;
            }
          })
    },
    initCharts() {
      this.charts = this.$echarts.init(document.getElementById('charts'));
      this.setOptions(this.list);
    },
    setOptions(data = []) {
      console.log(data, 'data');
      let nameList = [],
          valueList = [];
      data && data.length > 0 && data.forEach(item => {
        nameList.push(item.content);
        valueList.push({
          value: item.proportion,
          name: item.content
        })
      })
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 10,
          top: 30,
          bottom: 20,
          orient: 'vertical',
          data: nameList
        },
        series: [
          {
            name: '选科统计',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '40%'],
            data: valueList,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tip {
  margin-right: 10px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
}

.charts-flex {
  display: flex;
  width: 100%;
  height: 400px;

  .charts {
    width: 70%;
    height: 100%;
  }

  .tip {
    display: flex;
    width: 20%;

    .tip-number {
      margin-right: 40px;

      .title {
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #B8C3D6;
      }
    }

    .number-wrap {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      span {
        margin-bottom: 2px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #6C7293;
      }
    }

    //justify-content: space-between;
  }
}
</style>
