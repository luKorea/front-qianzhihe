<template>
  <div>
    <template v-if="info.professional_concept">
      <span class="tip-info"></span>
      <span class="tip-title" id="desc">专业介绍</span>
      <div class="desc">{{ info.professional_concept }}</div>
    </template>
    <el-divider/>
    <template v-if="info.main_course">
      <span class="tip-info"></span>
      <span class="tip-title" id="studyList">学习课程</span>
      <div class="desc">{{ info.main_course }}</div>
    </template>
    <el-divider/>
    <template v-if="info.profession_introduction">
      <span class="tip-info"></span>
      <span class="tip-title" id="mubiao">培养目标</span>
      <div class="desc">{{ info.profession_introduction }}</div>
    </template>
    <el-divider/>
    <template v-if="info.skills_profile">
      <span class="tip-info"></span>
      <span class="tip-title" id="yaoqiu">培养要求</span>
      <div class="desc">{{ info.skills_profile }}</div>
    </template>
    <el-divider/>
  </div>
</template>

<script>
export default {
  name: "basicDesc",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style scoped>

</style>