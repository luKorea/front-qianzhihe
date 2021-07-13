<template>
  <div>
    <el-divider/>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-subject">双一流学科</span>
      <div class="table-content">
        <div class="table-info">
          <template v-if="info.courseList && info.courseList.length > 0">
            <span style="height: 54px; line-height: 54px; padding: 0" v-for="item in info.courseList"
                  :key="item._id">{{ item.subject }}</span>
          </template>
          <basic-nothing v-else></basic-nothing>
        </div>
      </div>
    </template>
    <el-divider/>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-pre">学科评估</span>
      <div class="tableClass" style="margin-bottom: 20px">
        <el-table stripe :data="info.subjectList" style="width: 100%; margin-top: 20px" border>
          <el-table-column prop="name" label="学科" align="center"/>
          <el-table-column prop="type" label="评级" align="center"/>
        </el-table>
      </div>
    </template>
    <el-divider />
    <template>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-major">特色专业</span>
      <div class="table-content">
        <div class="table-info">
          <template v-if="info.characteristicSpecialtyList && info.characteristicSpecialtyList.length > 0">
            <span v-for="item in info.characteristicSpecialtyList" :key="item._id">{{ item.profession_name }}</span>
          </template>
          <basic-nothing v-else></basic-nothing>
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


<style>
.tableClass .el-table thead {
  background-color: #E6E7EC !important;
}

.tableClass .el-table th {
  background-color: #E6E7EC !important;
}
</style>
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
      padding: 20px 0;
      //height: 54px;
      //line-height: 54px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #475B75;
      border-right: 1px solid #E6E7EC;
      border-bottom: 1px solid #E6E7EC;
      border-left: none;
    }
  }
}
</style>