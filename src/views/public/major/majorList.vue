<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">专业筛选</span>
      <div class="search-wrap m-top">
        <el-input v-model="params.keywords"
                  @keyup.enter.native="goSearch('major', params.keywords)"
                  placeholder="请输入专业名称" clearable="true"/>
        <el-button type="primary" @click="goSearch('major', params.keywords)">搜索</el-button>
      </div>
      <div class="type-list">
        <span class="type-title">专业分类:</span>
        <div class="tip-wrap">
          <template v-if="menuList.length > 0">
          <span v-for="(item, index) in menuList" :key="index"
                @click="searchTip(item, index)"
                :class="selectId === index ? 'select_tip tip' : 'tip'">{{ item }}</span>
          </template>
        </div>
      </div>
    </basic-container>

    <basic-container>
      <template v-if="list && list.length > 0">
        <div class="major-wrap">
          <div v-for="item in list" :key="item._id" class="major-content">
            <div class="m-bottom">
              <span class="tip-info"></span>
              <span class="tip-title">{{ item.study_category }}</span>
            </div>
            <template v-if="item.professionalVo1s && item.professionalVo1s.length > 0">
              <div v-for="one in item.professionalVo1s" :key="one._id" class="major-content">
                <div class="m-bottom">
                  <span class="tip-title">{{ one.subject_category }}</span>
                  <template v-if="one.professionalVo2s && one.professionalVo2s.length > 0">
                    <div class="major-list">
                      <div class="major-item" v-for="two in one.professionalVo2s" :key="two._id">
                        <span class="item" @click="goDetails(two._id)">{{ two.name }}</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
      <basic-nothing v-else></basic-nothing>
    </basic-container>
  </div>
</template>

<script>
import {getList} from '../../../api/common/major';
import {majorList} from "../../../utils/basicData";

export default {
  name: "occupationList",
  data() {
    return {

      params: {
        keywords: '',
        study_category: '',
        size: 10,
        page: 0,
        total: 0
      },
      list: [],
      selectId: 0,
      menuList: majorList
    }
  },
  mounted() {
    this.getListData(this.params);
  },
  methods: {
    goSearch(url, keywords) {
      if (keywords === '') {
        this.resetParams();
        this.getListData(this.params);
        return;
      }
      this.$router.push({
        path: '/search/searchList',
        query: {
          url,
          keywords
        }
      })
    },
    getListData(params) {
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.oneLevels;
              // this.params.total = data.pageResult.total || 0;
            }
          })
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getListData(this.params);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getListData(this.params);
    },
    searchTip(name, index) {
      this.selectId = index;
      this.params.study_category = name === '不限' ? '' : name;
      this.resetParams();
      this.getListData(this.params);
    },
    resetParams() {
      this.params.size = 10;
      this.params.page = 0;
    },
    goDetails(id) {
      // const {href} = this.$router.resolve({
      //   path: '/major/majorDetails',
      //   query: {
      //     _id: id
      //   }
      // });
      // window.open(href, '_blank')
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.major-wrap {

  .major-list {
    margin: 20px;
    display: flex;
    //justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .major-item {
      width: 25%;
      margin-bottom: 20px;

      .item {
        //margin: 0 10px 10px 0;
        color: #4D97FF;
        cursor: pointer;
      }
    }
  }
}
</style>