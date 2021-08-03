<template>
  <div>
    <template v-if="info.depict">
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-desc">院校介绍</span>
      <div class="desc">{{ info.depict }}</div>
      <el-divider/>
    </template>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-info">招生办信息</span>
      <div style="margin-top: 10px; display: flex">
        <template v-if="info.recruit_phone && info.recruit_phone.length > 0">
          <div class="desc-tip" style="margin-right: 100px">
            招生办电话: <span style="margin-right: 10px" v-for="(item, index) in info.recruit_phone"
                         :key="index">{{ item }}</span>
          </div>
        </template>
        <span class="desc-tip">
          招生办网址:
          <el-tooltip content="点击跳转到学校官网" placement="top">
             <span style="cursor: pointer" @click="goUrlPage(info.recruit_url)">{{ info.recruit_url }}</span>
          </el-tooltip>
        </span>
      </div>
    </template>
    <template v-if="info.man_ratio !== 0 || info.girl_ratio !== 0">
      <el-divider/>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-gender">男女比例</span>
      <div id="sex-charts" style="width: 200px; height: 200px"></div>
    </template>
    <template v-if="info.images">
      <el-divider />
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-photo">院校风光</span>
      <div class="img-wrap">
        <div v-for="(item, index) in info.images" :key="index">
          <el-image
              style="width: 262px; height: 148px; border-radius: 8px; margin-bottom: 20px; margin-right: 20px"
              :src="item"
              :preview-src-list="info.images"
              fit="fit">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>
      <el-divider/>
    </template>
  </div>
</template>

<script>
export default {
  name: "basicInfo",
  props: {
    info: {
      type: {
        type: Object,
        default: () => {
        }
      }
    }
  },
  data() {
    return {
      charts: ''
    }
  },
  watch: {
    info: {
      deep: true,
      handler() {
        // this.draw()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (document.getElementById('sex-charts')) {
        setTimeout(() => {
          this.draw();
        }, 2000)
      }
    })
  },

  methods: {
    goUrlPage(url) {
      window.open(url);
    },
    draw() {
      this.charts = this.$echarts.init(document.getElementById('sex-charts'));
      let options = {
        legend: {
          top: 'center',
          right: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {show: false},
            label: {show: false},
            data: [
              {
                value: this.info.man_ratio,
                name: `男生${this.info.man_ratio}%`,
                itemStyle: {color: '#4D97FF'}
              },
              {
                value: this.info.girl_ratio,
                name: `女生${this.info.girl_ratio}%`,
                itemStyle: {color: '#FC9131'}
              }
            ]
          }
        ]
      };
      this.charts && this.charts.setOption(options);
    }
  }
}
</script>

<style scoped lang="scss">

.img-wrap {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
}
</style>
