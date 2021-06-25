<template>
    <div class="upload-container">
        <el-upload :disabled="disabled" action="0" :show-file-list="false" :file-list="fileList" :http-request="uploadSectionFile" class="editor-slide-upload">
            <el-button   :disabled="disabled" :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary">
                上传图片
            </el-button>
        </el-upload>
    </div>
</template>

<script>

import { req } from '@/utils/req.js'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
     disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {

      listObj: {},
      fileList: []
    }
  },
  methods: {
    uploadSectionFile: function (param) { //自定义文件上传
      var fileObj = param.file;

      var form = new FormData();

      form.append("file", fileObj);
      let that = this;
      req("/goods/uploadMediaImg", form, "upload").then(function (res) {

        that.$emit('successCBK', [{ url: res.data.preFix + res.data.address }])
        // console.log(res.data.preFix + res.data.address)

      }).catch(function (err) { });
    }




  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
