<template>
  <basic-container>
    <template v-if="list.length > 0">
      <div class="list-container" v-for="item in list" :key="item._id" @click="goDetails(item.name)">
        <div class="list-wrap">
          <el-tooltip :content="item.name" placement="top">
            <div class="list-img">
              <el-image
                  style="width: 78px; height: 78px; margin-top: 10px"
                  :src="item.image"
                  fit="fit"/>
            </div>
          </el-tooltip>
          <div class="list-info">
            <div class="list-message" style="margin-top: 14px">
              <div class="list-left">
                <div class="list-tip">
                  <span class="list-title">{{ item.name }}</span>
                  <template v-if="item.level && item.level.length > 0">
                    <span class="list-tag" v-for="(tag, index) in item.level" :key="index">{{ tag }}</span>
                  </template>
                </div>
                <div class="list-money">
                  <span class="m-right">高校层次：{{item.education_level}}</span>
                  <span class="m-right">高校类型：{{item.type}}</span>
                  <span class="m-right">办学性质：{{item.school_type}}</span>
                  <span class="m-right">所属地区：{{item.location}}</span>
                  <span class="m-right">主管部门：{{item.competent_department}}</span>
                </div>
              </div>
              <el-tooltip class="item" effect="dark" content="点击查看更多" placement="top-start">
                <div class="list-right" @click="goDetails(item.name)">查看详情</div>
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