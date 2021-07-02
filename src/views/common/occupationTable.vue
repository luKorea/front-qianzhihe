<template>
  <basic-container>
    <template v-if="list.length > 0">
      <div class="list-container" v-for="item in list" :key="item._id" @click="goDetails(item._id)">
        <div class="list-wrap">
          <div class="list-img">
            <el-image
                style="width: 240px; height: 135px"
                :src="item.image"
                fit="fit"/>
          </div>
          <div class="list-info">
            <div class="list-message">
              <div class="list-left">
                <div class="list-tip">
                  <span class="list-title">{{ item.title }}</span>
                  <template v-if="item.tags && item.tags.length > 0">
                    <span class="list-tag" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span>
                  </template>
                </div>
                <div class="list-money">
                  <span style="margin-right: 80px">行业：{{ item.business }}</span>
                  <span>平均薪资: {{ item.compensation }}</span>
                </div>
              </div>
              <el-tooltip class="item" effect="dark" content="点击查看更多" placement="top-start">
                <div class="list-right" @click="goDetails(item._id)">查看详情</div>
              </el-tooltip>
            </div>
            <div class="list-desc">{{ item.des }}</div>
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

<style scoped>

</style>