<template>
  <div>
    <div class="study-wrap">
      <div class="study-left">
        <span class="tip-info"></span>
        <span class="tip-title" id="occ-zhishi">知识储备</span>
        <div class="tableClass">
          <el-table stripe :data="tableData" style="width: 100%" border>
            <el-table-column align="center"
                             v-for="(key, index) in headers" :prop="key" :key="index" :label="key"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="study-right">
        <span classz="tip-info"></span>
        <span class="tip-title" id="occ-zhengshu">相关证书</span>
        <template v-if="info.certificateVoList && info.certificateVoList.length > 0">
        <div class="flex-img">
            <template v-for="(item, index) in info.certificateVoList">
              <div class="flex-wrap">
                <div class="img" :key="index"><img :src="item.image" alt=""></div>
                <div class="title">{{ item.name }}</div>
              </div>
            </template>
        </div>
        </template>
        <basic-nothing v-else></basic-nothing>
      </div>
    </div>
    <el-divider/>
  </div>
</template>

<script>
import TeacherList from "../../../../admin/teachers/teacherList";

export default {
  name: "basicStudy",
  components: {TeacherList},
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      headers: [],
      tableData: []
    }
  },
  watch: {
    info: {
      deep: true,
      handler() {
        let fields = [],
            itemmap = {},
            list = [],
            maxlen = 0;
        for (let items of this.info.jobKnowledgeVoList) {
          fields.push(items.knowledge_classification)
          itemmap[items.knowledge_classification] = items.knowledge_names
          maxlen = Math.max(items.knowledge_names.length)
        }
        for (let i = 0; i < maxlen; i++) {
          let item = {}
          for (let k in itemmap) {
            item[k] = itemmap[k][i] || ''
          }
          list.push(item)
        }
        this.headers = fields;
        this.tableData = list;
        console.log('表头', fields)
        console.log('表体', list)
        console.log(this.headers);
      }
    }
  }
}
</script>


<style>
.tableClass .el-table thead {
  background-color: #F1F3F5 !important;
}
.tableClass .el-table th {
  background-color: #F1F3F5 !important;
}
</style>

<style scoped lang="scss">
.study-wrap {
  display: flex;

  .study-left {
    width: 50%;
    margin-right: 20px;
  }

  .study-right {
    width: 50%;
  }
}

.tableClass {
  margin: 20px 0;

  .el-table thead {
  }
}

.flex-img {
  display: flex;
  margin: 20px 0 10px 0;
  width: 100%;

  .flex-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: space-between;
    text-align: center;
    margin-right: 40px;

    .img {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      height: 40px;
      font-size: 14px;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
  }
}
</style>