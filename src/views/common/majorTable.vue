<template>
  <basic-container>
    <template v-if="list.length > 0">
      <div class="list-container" v-for="item in list" :key="item._id" @click="goDetails(item._id)">
        <div class="list-wrap">
          <div class="list-img">
            <img style="width: 78px; height: 78px" :src="item.image"/>
            <span class="img-tip">{{item.name.slice(0, 2)}}</span>
          </div>
          <div class="list-info">
            <div class="list-message" style="margin-top: 6px">
              <div class="list-left">
                <div class="list-tip">
                  <span class="list-title">{{ item.name }}</span>
                  <template v-if="item.keywords && item.keywords.length > 0">
                    <span class="list-tag" v-for="(tag, index) in item.keywords" :key="index">{{ tag }}</span>
                  </template>
                </div>
                <div class="list-money">
                  <span style="margin-right: 15px">专业代码：{{item.profession_code}}</span>
                  <template v-if="item.education_level && item.education_level.length > 0">
                    <span style="margin-right: 15px" v-for="(tag, index) in item.education_level" :key="index">学位：{{ tag }}</span>
                  </template>
                  <span style="margin-right: 15px">修业年限：{{item.study_duration}}</span>
                  <span style="margin-right: 15px">学科门类：{{item.study_category}}</span>
                  <span style="margin-right: 15px">专业门类：{{item.subject_category	}}</span>
                </div>
              </div>
              <el-tooltip class="item" effect="dark" content="点击查看更多" placement="top-start">
                <div class="list-right" @click="goDetails(item._id)">查看详情</div>
              </el-tooltip>
            </div>
          </div>
        </div>
        <el-divider/>
      </div>
    </template>
    <basic-nothing v-else></basic-nothing>
    <basic-pagination
        :total="params.total"
        :hidden="params.total<=0"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    />
  </basic-container>
</template>

<script>
export default {
  name: "occupationTable",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goDetails(id) {
      this.$emit('goDetails', id)
    },
    handleCurrentChange(val) {
      console.log(val);
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    }
  }
}
</script>

<style scoped lang="scss">
.list-img {
  position: relative;
  width: 78px;
  height: 78px;
  .img-tip {
    width: 78px;
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 17px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #FFFFFF;
  }
}
</style>