<template>
  <div>
    <basic-container>
      <div style="display: flex">
        <span class="tip-info"></span>
        <div>
          <span class="one">选科查询</span>
          <span class="two">（根据选科组合查询可填报专业）</span>
        </div>
      </div>
      <el-divider/>
      <div class="m-top">
        <div>
          <span class="one">首选科目</span>
          <span class="two">（2选1）</span>
        </div>
        <div class="item-wrap">
          <div class="item"
               :class="selectOneIndex === index ? 'select' : ''"
               v-for="(item, index) in firstData"
               @click="clickOne(index, item.name)"
               :key="index">
            <div class="img"><img :src="item.image" alt=""></div>
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="m-top">
        <div>
          <span class="one">再选科目</span>
          <span class="two">（4选2）</span>
        </div>
        <div class="item-wrap">
          <div class="item"
               v-for="(item, index) in twoData"
               @click="clickTwo(index, item.name)"
               :class="{'select': chooseTwo.indexOf(item.name) > -1}"
               :key="index">
            <div class="img"><img :src="item.image" alt=""></div>
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
        <div class="error-tip" v-if="showTip">*不可选择大于2个科目</div>
      </div>
      <div class="m-top select-type">
        <span class="title">学科门类筛选：</span>
        <el-select v-model="params.study_categor" placeholder="请选择" clearable filterable>
          <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="m-top">
        <el-button type="primary" :loading="loading" @click="confirmData">确认</el-button>
        <el-button @click="reset" plain>重置</el-button>
      </div>
    </basic-container>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">推荐专业</span>
      <div v-if="showList">
        <template v-if="list && list.length > 0">
          <div class="flex-container">
            <div class="flex-wrap" v-for="item in list" :key="item._id">
              <div class="top" @click="goMajor(item._id)">
                <div class="img-wrap">
                  <img :src="item.image" alt="">
                  <span class="img-tip">{{ item.name && item.name.slice(0, 2) }}</span>
                </div>
                <div class="info">
                  <div class="title">
                    <span class="title-info">{{ item.name }}</span>
                    <span class="title-orange">{{ item.profession_type }}</span>
                  </div>
                  <div class="type">专业门类：{{ item.subject_category }}</div>
                </div>
              </div>
              <div class="bottom">
                <template v-if="item.courseSelectVos && item.courseSelectVos.length > 0">
                  <div v-for="(type, i) in item.courseSelectVos" :key="i"
                       style="display: flex; justify-content: space-between;align-items: center">
                    <template v-if="i === 0">
                      <div class="left">
                        <span style="margin-right: 20px">首选：{{ type.first_choice }}</span>
                        <span>再选：{{ type.re_choice }}</span>
                      </div>
                      <div class="right">
                        <el-popover trigger="click" width="350">
                          <template>
                            <el-table :data="item.courseSelectVos" border style="border-radius: 4px">
                              <el-table-column property="first_choice" align="center" label="首选"></el-table-column>
                              <el-table-column property="re_choice" align="center" label="再选"></el-table-column>
                              <el-table-column property="proportion" align="center" label="覆盖学校">
                                <template slot-scope="scope">
                                  <span style="font-size: 13px;font-weight: 500;color: #FC9131;">{{ (scope.row.proportion * 100).toFixed(0) + '%' }}</span>
                                </template>
                              </el-table-column>
                            </el-table>
                          </template>
                          <div slot="reference">
                                      <span style="margin-right: 5px">
                        覆盖院校: <span style="font-size: 13px;font-weight: 500;color: #FC9131;"> {{
                                          type.proportion | percentNumber
                                        }}</span>
                      </span>
                            <i class="el-icon-caret-bottom" style="margin-right: 20px; font-size: 16px"></i>
                          </div>
                        </el-popover>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <basic-pagination
              :page="params.page + 1"
              :total="params.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
          />
        </template>
        <basic-nothing v-else title="没有查到内容呢，要不换个学科门类试试？"></basic-nothing>
      </div>
      <basic-nothing v-else title="您还没有点击科目查询哦"></basic-nothing>
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList} from "../../../api/common/search";
import {getData} from "../../../api/common/newExam";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      showList: false,
      showOther: false, // 显示其他文字
      firstData: [
        {
          name: '物理',
          image: require('../../../assets/icon-img/wuli.png')
        },
        {
          name: '历史',
          image: require('../../../assets/icon-img/lishi.png')
        }
      ],
      selectOneIndex: -1,
      twoData: [
        {
          name: '化学',
          image: require('../../../assets/icon-img/huaxue.png')
        },
        {
          name: '生物',
          image: require('../../../assets/icon-img/shengwu.png')
        },
        {
          name: '政治',
          image: require('../../../assets/icon-img/zhengzhi.png')
        },
        {
          name: '地理',
          image: require('../../../assets/icon-img/dili.png')
        }
      ],
      showTip: false,
      typeList: [],
      chooseTwo: [],
      params: {
        study_categor: '',
        first_choice: '',
        size: 10,
        page: 0,
        total: 0
      },
      list: []
    }
  },
  mounted() {
    this.getType();
  },
  methods: {
    confirmData() {
      let title = '';
      if (
          this.params.first_choice !== '' &&
          this.chooseTwo.length === 2 &&
          this.$store.state.user.user_type === '学生账号'
      ) {
        title = [
          ...this.chooseTwo,
          this.params.first_choice
        ].splice(',').join('+');
        this.$store.dispatch('point/pointData', {
          url: `选科查询 -【${title}】`,
          date: new Date().toLocaleDateString()
        }).then(res => {
          console.log(res, 'data');
        })
      }
      this.params.page = 0;
      this.getDataList(this.params);
    },
    getDataList(params) {
      if (this.params.first_choice === '') {
        this.$message.error('首选科目必须选中');
        return;
      }
      if (this.chooseTwo.length < 2) {
        this.$message.error('再选科目需要选择两科');
        return;
      }
      params['Re_choice'] = this.chooseTwo.toString();
      this.loading = true;
      getData(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.recomProVos;
              this.loading = false;
              this.showList = true;
              this.params.total = data.recomProVosPage.total || 0;
            }
          })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getDataList(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getDataList(this.params);
    },
    goMajor(id) {
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id
        }
      });
    },
    clickOne(index, value) {
      this.selectOneIndex = index;
      this.params.first_choice = value;
    },
    clickTwo(index, value) {
      let arrIndex = this.chooseTwo.indexOf(value);
      if (this.chooseTwo.length === 2) {
        this.showTip = true;
        if (arrIndex > -1) {   // 已选中,点击取消
          this.chooseTwo.splice(arrIndex, 1);
          this.showTip = false;
        }
      } else {
        this.showTip = false;
        if (arrIndex > -1) {   // 已选中,点击取消
          this.chooseTwo.splice(arrIndex, 1);
        } else {  // 未选中,点击选中
          this.chooseTwo.push(value);
        }
      }
    },
    reset() {
      this.selectOneIndex = -1;
      this.params.study_categor = '';
      this.params.first_choice = '';
      this.params.page = 0;
      this.params.size = 10;
      this.chooseTwo = [];
    },
    getType() {
      selectTypeList('courseSelectionComboBox')
          .then(res => {
            if (res.errorCode === 200) {
              this.typeList = res.data;
            }
          })
    }
  }
}
</script>

<style scoped lang="scss">
.item-wrap {
  width: 100%;
  display: flex;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 169px;
    height: 77px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #DEE0E6;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
    box-sizing: border-box;

    .img {
      width: 77px;
      height: 77px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .select {
    border: 2px solid #4D97FF;
  }
}

.error-tip {
  margin-top: 10px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FF0000;
  line-height: 17px;
}

.one {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2E415B;
  line-height: 22px;
}

.two {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #8489A4;
  line-height: 22px;
}

.select-type {
  display: flex;
  align-items: center;

  .title {
    height: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #475B75;
    line-height: 24px;
    margin-right: 10px;
  }
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-around;
  width: 100%;
  margin-top: 20px;


  .subject-wrap {
    display: flex;
    justify-content: space-between;
    border-left: 4px solid #4D97FF;
    padding: 0 10px;
    align-items: center;
    width: 351px;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(170, 177, 192, 0.3);
    border-radius: 6px;
    margin-right: 20px;
    margin-bottom: 20px;

    .title {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #333333;

      span:first-child {
        margin-bottom: 10px;
      }
    }

    .info {
      font-size: 14px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #4D97FF;
    }
  }

  .school-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    width: 350px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(170, 177, 192, 0.3);
    border-radius: 8px;
    flex-wrap: wrap;
    margin-right: 20px;
    margin-bottom: 20px;

    .tip {
      position: absolute;
      left: 0;
      top: -10px;
      height: 20px;
      line-height: 20px;
      width: 38px;
      text-align: center;
      border-radius: 4px 4px 4px 0px;
      font-size: 12px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #FFFFFF;
    }

    .orange {
      background: #FF7E59;
    }

    .gray-orange {
      background-color: #FDBD83;
    }

    .blue {
      background-color: #83CFFD;
    }

    .img-content {
      display: flex;
      width: 170px;
      flex-wrap: wrap;
      justify-content: space-between;
      cursor: pointer;

      .info {
        display: flex;
        align-items: center;

        .img-wrap {
          width: 40px;
          height: 40px;
          margin: 15px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          height: 12px;
          font-size: 12px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #666666;
          line-height: 18px;
        }
      }
    }
  }

  .flex-wrap {
    display: flex;
    flex-direction: column;
    width: 48%;
    background: #FFFFFF;
    box-shadow: 0 4px 16px 0 rgba(127, 137, 156, 0.3);
    border-radius: 6px;
    margin-bottom: 20px;
    margin-right: 20px;
    cursor: pointer;

    .top {
      display: flex;
      align-items: center;
      padding: 10px;

      .img-wrap {
        width: 48px;
        height: 48px;
        margin-right: 10px;
        position: relative;

        .img-tip {
          width: 48px;
          position: absolute;
          top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 11px;
          font-family: SourceHanSansSC-Bold, SourceHanSansSC;
          font-weight: bold;
          color: #FFFFFF;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        .title-info {
          height: 24px;
          font-size: 16px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 500;
          color: #333333;
          line-height: 24px;
          margin-right: 10px;
        }

        .title-orange {
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FC9131;
          background-color: #FFF0E7;
        }
      }

      .type {
        height: 19px;
        font-size: 13px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: #666666;
        line-height: 19px;
      }
    }

    .bottom {
      position: relative;
      width: 100%;
      height: 34px;
      line-height: 34px;
      padding-left: 20px;
      background: #ECEFF0;
      font-size: 12px;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #666666;

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 37px; //给小三角定位，更具实际需求调整
        top: -12px; //给小三角定位，更具实际需求调整
        border-width: 6px;
        border-style: dashed solid dashed dashed; //四个参数分别代表向下，左，上右的小三角(对应方向的小三角设置为solid，其他的为dashed。我这里演示向左的小三角，所以设置第二个）
        border-color: transparent transparent #ECEFF0 transparent;
      }
    }
  }
}
</style>
