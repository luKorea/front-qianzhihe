<template>
  <basic-container-back>
    <div class="list-container">
      <div class="list-wrap">
        <div class="list-img">
          <img
              style="width: 78px; height: 78px"
              :src="info.image"
             />
        </div>
        <div class="list-info">
          <div class="list-message">
            <div class="list-left">
              <div class="list-tip">
                <span class="list-title">{{ info.name }}</span>
                <template v-if="info.level && info.level.length > 0">
                  <span class="list-tag" v-for="(tag, index) in info.level" :key="index">{{ tag }}</span>
                </template>
              </div>
              <div class="list-money">
                <span class="m-right">高校层次：{{info.education_level}}</span>
                <span class="m-right">高校类型：{{info.type}}</span>
                <span class="m-right">办学性质：{{info.school_type}}</span>
                <span class="m-right">所属地区：{{info.location}}</span>
                <span class="m-right">主管部门：{{info.competent_department}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </basic-container-back>
</template>

<script>
export default {
  name: "basicInfo",
  props: ['info']
}
</script>

<style scoped>

</style>
