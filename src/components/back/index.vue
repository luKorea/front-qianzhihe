<template>
  <div class="basic-container-back">
    <el-card>
      <div @click="goBack" class="back-btn" style="display: flex;justify-content: flex-end">
        <el-tooltip class="item" effect="dark" content="关闭" placement="top-start">
          <i class="el-icon-circle-close" style="cursor: pointer; font-size: 24px; color: #a8aaaf"></i>
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
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.basic-container-back {
  padding: 10px 6px;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
  .back-btn {
    position: absolute;
    right: 5px;
    top: -10px;
    background-color: #FFFFFF;
    border-radius: 50%;
  }
}
</style>