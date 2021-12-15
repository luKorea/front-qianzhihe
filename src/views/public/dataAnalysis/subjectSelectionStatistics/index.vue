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
      <template v-show="list && list.length > 0">
        <div id="charts" style="width: 100%; height: 500px"></div>

        <div class="color-list">
          <template v-if="colorNameList && colorNameList.length > 0">
            <div class="item" v-for="(item, index) in colorNameList" :key="index">
              <span :style="{backgroundColor: item.color}" class="color-item"></span>
              <span class="color-title">{{ item.title }}</span>
            </div>
          </template>
        </div>
      </template>
    </basic-container>
  </div>
</template>

<script>
import { selectTypeList, selectClassList } from "../../../../api/common/search";
import { getList } from "../../../../api/common/dataAnalysis/subjectSelectionStatistics";

export default {
  name: "subjectSelectionStatistics",
  data () {
    return {
      loading: false,
      params: {
        grade: '高一',
        graduate: '',
      },
      classList: [],
      gradeList: [],
      charts: document.getElementById('charts'),
      list: [],
      colorNameList: [],
    }
  },
  watch: {
    list: {
      deep: true,
      handler (val) {
        if (this.charts !== '') this.setOptions(val)
      },
    },
  },
  beforeDestroy () {
    if (!this.charts) {
      return
    }
    this.charts.dispose();
    this.charts = null;
  },
  mounted () {
    this.getData(this.params);
    this.getGrade();
    this.getClassData();
    this.$nextTick(() => {
      this.initCharts()
    })
    // window.addEventListener("resize", () => {
    //   this.charts.resize();
    // });
  },
  methods: {
    searchData () {
      this.params.page = 0;
      this.getData(this.params);
    },
    getGrade () {
      selectTypeList('grade').then(res => {
        if (res.errorCode === 200) {
          this.gradeList = res.data;
        }
      })
    },
    getClassData (grade) {
      selectClassList(grade).then(res => {
        if (res.errorCode === 200) {
          this.classList = res.data;
        }
      })
    },
    getData (params) {
      this.loading = true;
      this.colorNameList = [];
      this.list = [];
      getList(params).then(res => {
        if (res.errorCode === 200) {
          this.loading = false;
          if (res.data.length === 0) {
            this.$message.info('暂时没有查到对应的数据哦')
          } else {
            this.list = res.data;
            let colorList = [
              '#FF8026', '#FFDD67', '#67E383', '#3ABCF8', '#27CABD', '#6E96FF',
              '#FF6077', '#578CFF', '#E957FF', '#57F1FF', '#FF6A53', '#EEA287',
              '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
            ];
            res.data.forEach((item, index) => {
              this.colorNameList.push({
                title: item.content.substr(0, item.content.length - 1),
                color: colorList[index],
              });
            });
          }
        }
      })
    },
    initCharts () {
      this.charts = this.echarts.init(document.getElementById('charts'));
      this.setOptions(this.list);
    },
    setOptions (data = []) {
      console.log(data, 'data');
      let nameList = [],
          valueList = [];
      data.forEach(item => {
        nameList.push(item.content.substr(0, item.content.length - 1));
        valueList.push({
          value: item.proportion,
          label: item.count,
        })
      })
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: params => {
            return `${params[0].name}<br/>${params[0].marker}查询占比：${params[0].value}%<br/>${params[0].marker}查询次数：${params[0].data.label}次`
          },
        },
        xAxis: {
          type: 'category',
          data: nameList,
          axisLabel: {
            interval: 0,//横轴信息全部显示
            rotate: 15,// 倾斜角度
            show: true,
            textStyle: {
              color: '#999999',  //更改坐标轴文字颜色
              fontSize: 12,   //更改坐标轴文字大小
              top: 10,
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%',
          },
        },
        series: [
          {
            data: valueList,
            type: 'bar',
            barMaxWidth: '30px',
            itemStyle: {
              normal: {
                color (params) {
                  const colorlist = [
                    '#FF8026', '#FFDD67', '#67E383', '#3ABCF8', '#27CABD', '#6E96FF',
                    '#FF6077', '#578CFF', '#E957FF', '#57F1FF', '#FF6A53', '#EEA287',
                    '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                  ];
                  return colorlist[params.dataIndex];
                },
                label: {
                  show: true,		//开启显示
                  position: 'top',	//在上方显示
                  formatter: (params) => {
                    return params.data.label + '次'
                  },
                  textStyle: {	    //数值样式
                    color: '#2E415B',
                    fontSize: 12,
                  },
                },
              },
            },
          }],
      })
    },
  },
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
  position: relative;

  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    position: absolute;
    background-color: #fff;
    //background-color: #0a6fe8;
  }

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

.color-list {
  display: flex;
  width: 100%;
  margin: auto;
  //justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 40px;

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    margin: 0 60px 24px 80px;

    .color-item {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      margin-right: 4px;
    }

    .color-title {
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #6C7293;
      line-height: 20px;
    }
  }
}
</style>
