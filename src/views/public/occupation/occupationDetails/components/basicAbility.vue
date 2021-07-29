<template>
  <div v-if="info.organisation_and_execution_skills">
    <span class="tip-info"></span>
    <span class="tip-title" id="occ-yaoqiu">能力要求</span>
    <div id="ability-charts" style="height: 300px; width: 500px"></div>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: "basicAbility",
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    info: {
      deep: true,
      handler(val) {
        if (document.getElementById('ability-charts')) {
          this.draw()
        }
      }
    }
  },
  mounted() {
    console.log(document.getElementById('ability-charts'));
    this.$nextTick(() => {
      setTimeout(() => {
        this.draw();
      }, 2000)
    })
  },
  data() {
    return {
      charts: '',
      showCharts: true
    }
  },
  methods: {
    draw() {
      this.charts = this.$echarts.init(document.getElementById('ability-charts'));
      let option = {
        radar: {
          indicator: [
            { name: '组织和执行能力', max: 5},
            { name: '社交能力', max: 5},
            { name: '认知能力', max: 5},
            { name: '理解表达', max: 5},
            { name: '技术技能', max: 5},
            { name: '体能', max: 5},
            { name: '管理技能', max: 5},
            { name: '解决问题的能力', max: 5},
          ]
        },
        series: [{
          type: 'radar',
          itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
            color: '#75EEEB',
            borderColor: '#75EEEB',
          },
          areaStyle: {
            color: '#75EEEB',
          },
          data: [
            {
              value: [
                  this.info.organisation_and_execution_skills,
                  this.info.social_skills,
                  this.info.cognitive_abilities,
                  this.info.comprehension_expression,
                  this.info.technology_skills,
                  this.info.physical_abilities,
                  this.info.managementskills,
                  this.info.problem_solving_skills,
              ]
            }
          ]
        }]
      };
      this.charts && this.charts.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>