<template>
  <div>
    <el-divider/>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title">双一流学科</span>
      <div class="table-content">
          <div class="table-info">
            <template v-if="info.courseList && info.courseList.length > 0">
              <span v-for="item in info.courseList" :key="item._id">{{ item.subject }}</span>
            </template>
          </div>
      </div>
    </template>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title">学科评估</span>
      <div class="table-wrap">
        <div class="table-title">
          <span style="width: 50%">学科</span>
          <span style="width: 50%;">评级</span>
        </div>
        <div class="table-info">
          <template v-if="info.subjectList && info.subjectList.length > 0">
            <template v-for="item in info.subjectList">
              <span style="width: 50%;border-top: 1px solid #E6E7EC" :key="item._id">{{item.name}}</span>
              <span style="width: 50%;border-top: 1px solid #E6E7EC" :key="item._id">{{item.type}}</span>
            </template>
          </template>
        </div>
      </div>
    </template>
    <template>
    <span class="tip-info"></span>
    <span class="tip-title">特色专业</span>
    <div class="table-content">
      <div class="table-info">
        <template v-if="info.characteristicSpecialtyList && info.characteristicSpecialtyList.length > 0">
          <span v-for="item in info.characteristicSpecialtyList" :key="item._id">{{ item.profession_name }}</span>
        </template>
      </div>
    </div>
  </template>

  </div>
</template>

<script>
export default {
  name: "basicSubject",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style scoped lang="scss">

.table-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  border: 1px solid #E6E7EC;
  border-radius: 4px;
  margin: 20px 0;
  .table-info {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    background-color: #FFFFFF;
    span {
      width: 33.33%;
      height: 54px;
      line-height: 54px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #475B75;
      border: 1px solid #E6E7EC;
      border-left: none;
    }
  }
}
</style>