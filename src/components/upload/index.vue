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
    <div class="process" v-if="showProcess">
      <el-progress :percentage="percentage" status="success"></el-progress>
    </div>
    <div slot="footer" class="dialog-footer">
<!--      <el-button @click="closeFile()">取 消</el-button>-->
      <el-button type="primary" @click="postFile()" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {importData} from "../../api/admin/students";
import {getToken} from "../../utils/auth";

export default {
  name: "index",
  props: {
    uploadDialog: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showProcess: false,
      percentage: 0,
      loading: false,
      url: process.env.VUE_APP_PATH_REWRITE
    }
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
      console.log(item);
    },
    postFile() {
      this.showProcess = true;
      this.loading = true;
      const fileObj = this.file;
      let fileData = new FormData();
      fileData.append("file", fileObj);
      console.log(fileObj);
      let that = this;
      $.ajax({
        type: "post",
        timeout: 120000, //超时时间设置，单位毫秒
        url: that.url + '/biz/student/importStudent',
        data: fileData,
        contentType: false,
        // 告诉jQuery不要去设置Content-Type请求头
        processData: false,
        // 告诉jQuery不要去处理发送的数据
        headers: {
          Authorization: getToken() || ''
        },
        xhr() {
          let myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) { //检查上传的文件是否存在
            myXhr.upload.addEventListener('progress', (e) => {
              console.log(e.loaded, e.total);
              let loaded = e.loaded; //已经上传大小情况
              let total = e.total; //附件总大小
              let percent = Math.floor(100 * loaded / total); //已经上传的百分比
              that.percentage = percent;
            }, false); // for handling the progress of the upload
          }
          return myXhr;
        },
        success(res) {
          console.log(res);
          if (res.errorCode === 200) {
            that.$refs.upload.clearFiles(); //上传成功之后清除历史记录
            that.$message.success("上传时间大概需要1-3分钟后上传完毕，您可以先关闭页面，等上传完毕之后再查看上传的内容");
            that.closeFile();
            that.loading = false;
            that.$emit('getData');
          } else if (res.success === false) {
            that.$message.error('文件格式有误');
            that.loading = false;
            return false;
          }
        },
        error(err) {
          this.$message.error(err.statusText);
          this.loading = false;
        },
      });

      // this.progressPercent = Math.floor((uploadInfo.progress * 100).toFixed(2))
      // importData(fileData)
      // .then(res => {
      //   if(res.errorCode === 200) {
      //     this.$refs.upload.clearFiles(); //上传成功之后清除历史记录
      //     this.$message.success("读取成功");
      //     this.closeFile();
      //     this.loading = false;
      //     this.$emit('getData');
      //   } else if (res.success === false) {
      //     this.$message.error('文件格式有误');
      //     this.loading = false;
      //     return false;
      //   }
      // });
    },
    closeFile() {
      this.$emit('closeFile')
    },

  }
}
</script>

<style scoped lang="scss">
.process {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .el-progress {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
