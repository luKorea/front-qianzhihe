<template>
  <div class="basic-container-back">
    <el-card>
      <div @click="goBack"
           class="back-btn" style="display: flex;justify-content: flex-end">
        <i class="el-icon-circle-close" style="cursor: pointer; font-size: 24px; color: #a8aaaf"></i>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicStudentBack",
  methods: {
    goBack() {
      this.$emit('goBack')
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