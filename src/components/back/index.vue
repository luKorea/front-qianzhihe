<template>
  <div class="basic-container-back">
    <el-card>
      <div @click="goBack" style="display: flex;justify-content: flex-end">
        <el-tooltip class="item" effect="dark" content="关闭" placement="top-start">
          <i class="el-icon-close" style="color: #CCCCCC; cursor: pointer "></i>
        </el-tooltip>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainerBack",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  border-radius: 4px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>