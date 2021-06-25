<template>
    <div class="uploadCutImg" id="imgup">
        <el-upload :disabled="disabled" class="upload-demo" action="/" :on-preview="handlePreview" :before-remove="beforeRemove" :on-remove="handleRemove" :file-list="fileList"
            list-type="picture-card" :auto-upload="false">
        </el-upload>
        <div id="previewImg">
            <el-image :preview-src-list="[dialogImageUrl]" :src="dialogImageUrl">
            </el-image>
        </div>
        <div>
            <div class="upload_btn" v-if="!disabled">
                <el-button type="primary" icon="el-icon-upload" size='mini' @click="handleExceed()" class="btn_main">{{title}}
                </el-button>
                <br>
                <span style="margin-top: 13px;display: inline-block;color: #7f8c8d;">温馨提醒：图片建议尺寸为：{{width}}*{{height}}</span>
            </div>
            <imageC :width="width" :height="height" @close='close' @crop-upload-success="cropSuccess" :key="imagecropperKey" v-show="cropperShow"></imageC>
        </div>
    </div>
</template>
<script>
import imageC from './ImageCropper/ImageCropper.vue'
import { req } from '@/utils/req.js'
import { Message } from 'element-ui'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 0.5
    },
    width: {//裁剪宽度
      type: Number,
      default: 300,
    },
    height: {//裁剪高度
      type: Number,
      default: 300,
    },
    compress: {  //压缩图片
      type: Boolean,
      default: true
    },
    heightAuto: {   //自适应高度
      type: Boolean,
      default: false
    },


    limit: {//图片数量
      type: Number,
      default: 1,
    },
    preFix: {
      type: String,
      default: '',//图片前缀
    },
   
    title: {
      type: String,
      default: '上传图片',
    },
    value: {},
    valueType: {
      type: String,
      default: 'String',
    },

  },

  name: 'uploadCutImg',
  components: {
    imageC,
  },
  watch: {
    value(v1, v2) {
      this.getValue();
    }
  },
  data() {
    return {
      imagecropperKey: 0,//上传图片的key，区分图片
      imagesdata: [],
      imgUploadPath: '',
      cropperShow: false,
      preFix: '',
      fileList: [],
      dialogImageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACvElEQVRYR+2WT2gTQRTGvzeLWJBQ8VbwYEFPgiKitKJQL/4pRVSwFxW02Z0JWLGghyKFFKGegvSkmZkkFXsSRIUiWPFgUUQ9iYIeFEX8U1A8eDCedp4sJLBNk7ZpU1uhe5153/vN9968HcISf7TE+bECsOLA8nNAStnMzHsAnG/0DSGiW2EYjufz+fdl7WkOBEFwmYh2AniyCABtzPzHGHOkJoCUcpKIpNZ6rNEAqVRqg3PuIxFt1lq/ifSnOSClZOfc3lwu96jRAJFepf7/ByClHGLmXWEYHi8UCt/qdWlBDkgpNYBtAFqI6K3Wel81ACnlIBG90lrfrlyfF0BfX9/aYrGYB7BaCNHLzC3M/BTAiDGmp5xESrmKma8R0Q4Am5j5oLV2Ig5RN4BSKhIqAHgHoNcYU4wEgyDoJqKbRHRJa532fb9VCGEArPE873QYhgrAMQCdxpjXMcgpTT5jEyql2pn5OjPfsdb2V7EzGlYZZs4Q0VEAH4QQp7LZ7NdSx98AsMU515XL5b7UdQs8z0sw82jphFdqNZtSapiZzxHRM2Y+YIz5Fd+rlLoHoCmRSBzKZDK/51SC0onOMnNgrR2drdODIHhARFuZeb+19mVFzaPRHq1/MsZ0zxXgB4CT1trx2ZLHavuCiAQRdWaz2e/xuGQyudHzvEjrYTSL4oNuSg8kk8l1nuf9ZGZprbVzTR6DmGTm59baw5Wxvu+3CSHuA2iuCVCtSeqB8H1/vRDiMzNftdaeqYxNpVJdzrmxRQMoHWA3gMcABowxQw0ZRPW4EO1VSp0o3aAerfXIggZRvcnL+4MgGCCiNDN3lZu5/DuesQRKqRFmbnXODc43eTlOCHEBwHbn3EUA0TsgLYRo0lq3l/dMm4S+73cIIToApBcKUCV+GMCEMeZuTYBFSDqj5PJ7Fa848K8d+At49OYwOhcRAwAAAABJRU5ErkJggg=='
    }
  },
  created() {
    this.getValue();
  },
  methods: {
    setValue() {

      if (this.valueType == 'object') {
        let val = this.fileList.map((v) => {
          return v.address
        })
        this.$emit('input', val);
      }
      else if (typeof this.value == 'string') {
        let val = this.fileList.map((v) => {
          return v.address
        }).join('|')
        this.$emit('input', val);
      }
    },
    getValue() {

      let that = this;
      this.fileList = [];
      if (this.value) {
        let arr = [];

        if (this.valueType == 'object') {
          arr = this.value;
        }
        else if (typeof this.value == 'string') {
          arr = this.value.split('|');
        }
        arr.forEach((v, i) => {
          if (v) {
            that.fileList.push({ name: '图片' + (i + 1), url: that.preFix + v, preFix: that.preFix, address: v })
          }
        })
      }
    },
    //显示裁剪框，判断数量
    handleExceed() {
      if (this.limit == 1) {
      } else {
        if (this.fileList.length >= this.limit) {
          Message({
            message: ("最多上传" + this.limit + "张图片"),
          });
          return;
        }
      }
      this.cropperShow = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {

      this.fileList = fileList
      this.setValue();
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      $('#previewImg img').click()
      this.$nextTick(() => {
        $('#previewImg img').click()
      })

    },

    setfileList(data) {
      if (this.limit == 1) {
        this.fileList = [];
      } else {
        if (this.fileList.length >= this.limit) {
          Message({
            message: ("最多上传" + this.limit + "张图片"),
          });
          return;
        }
      }
      if (!this.preFix) {
        this.preFix = data.preFix
      }


      this.fileList.push({
        name: '图片' + (this.fileList.length + 1),
        url: data.preFix + data.address, preFix: data.preFix, address: data.address,
      })

      this.setValue();
      Message({
        message: "图片上传成功",
        type: "success"
      });
    },
    //将base64转换为文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    //返回图片
    cropSuccess(createImgUrl) {

      if (this.limit == 1) {
        this.imagesdata = [];
      }
      this.cropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1;
      var form = new FormData();
      var file = this.dataURLtoFile(createImgUrl, "test.png");

      form.append("file", file);
      let vm = this;
      req("/goods/uploadMediaImg", form, "upload").then(function (res) {
        vm.setfileList(res.data);
      }).catch(function (err) { });
    },
    //关闭
    close() {
      this.cropperShow = false
    },
  },

}
</script>

<style>
.upload_btn {
  display: inline-block;
  padding-bottom: 12px;
}
.upload_btn button {
  float: left;
}
.upload-demo .el-upload {
  display: none;
}
/* {
  display: none;
} */
#previewImg .el-image {
  position: relative;
  display: block;
  overflow: hidden;
  height: 0;
}
</style>

