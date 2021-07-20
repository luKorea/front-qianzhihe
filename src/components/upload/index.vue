<template>
  <el-dialog title="上传文件"
             :close-on-click-modal="false"
             :visible.sync="uploadDialog" class="eldialog" width="30%">
    <el-form ref="addForm" class="eldialogForm" id="addForm">
      <el-form-item label>
        <el-upload
            class="upload-demo"
            style="display: flex; justify-content: center;align-items: center; flex-direction: column"
            drag
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :limit="1"
            :http-request="uploadFile"
            multiple
            ref="upload"
            action
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeFile()">取 消</el-button>
      <el-button type="primary" @click="postFile()" :disabled="uploading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  props: {
    uploadDialog: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    //上传excel表格
    beforeUpload(file) {
      if (file.type === "" || file.type === null || file.type === undefined) {
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        if (
            FileExt === "xls" ||
            FileExt === "xlsx" ||
            FileExt === "XLS" ||
            FileExt === "XLSX"
        ) {
          return true;
        } else {
          this.$message.error("上传文件必须是Excel格式!");
          return false;
        }
      }
      return true;
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    postFile() {
      const fileObj = this.file;
      let fileData = new FormData();
      fileData.append("file", fileObj);
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      this.uploading = true;
      this.$ajax({
        method: "post",
        url: "http://localhost:6002/api/pageCont/importDateToEs",    //填写上传的接口
        headers: headers,
        data: fileData
      }).then(res => {
        if (res == 200) {
          this.$message.success("读取成功");
          this.closeFile();
        } else {
          this.$message.error("错误！请检查上传文件内容");
        }
      });
      setTimeout(function () {
        this.closeFile();
      }, 1500);
    },
    closeFile() {
      this.$emit('closeFile')
    },

  }
}
</script>

<style scoped>

</style>