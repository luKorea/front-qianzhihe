<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">院校筛选</span>
      <div class="search-wrap m-top">
        <el-input v-model="params.keywords"
                  @keyup.enter.native="goSearch('universities', params.keywords)"
                  placeholder="请输入院校名称" clearable="true"/>
        <el-button type="primary" @click="goSearch('universities', params.keywords)">搜索</el-button>
      </div>
      <div class="type-list">
        <span class="type-title">地区:</span>
        <div class="tip-wrap">
          <template v-if="regionList.length > 0">
          <span v-for="(item, index) in regionList" :key="index"
                @click="searchRegion(item, index)"
                :class="selectRegion === index ? 'select_tip tip' : 'tip'">{{ item }}</span>
          </template>
        </div>
      </div>
      <div class="type-list">
        <span class="type-title">院校类型:</span>
        <div class="tip-wrap">
          <template v-if="schoolList.length > 0">
          <span v-for="(item, index) in schoolList" :key="index"
                @click="searchSchool(item, index)"
                :class="selectSchoolType === index ? 'select_tip tip' : 'tip'">{{ item }}</span>
          </template>
        </div>
      </div>
      <div class="type-list">
        <span class="type-title">院校层级:</span>
        <div class="tip-wrap">
          <template v-if="schoolLevelList.length > 0">
          <span v-for="(item, index) in schoolLevelList" :key="index"
                @click="searchSchoolLevel(item, index)"
                :class="selectSchoolLevel === index ? 'select_tip tip' : 'tip'">{{ item }}</span>
          </template>
        </div>
      </div>
    </basic-container>
    <list-table
        :list="list" :params="params"
        @goDetails="goDetails"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {getMenu, getList} from '../../../api/common/universities';
import ListTable from '../../common/universitiesTable';
import {regionList, schoolLevelList, undergraduateList, specialtyList} from "../../../utils/basicData";

export default {
  name: "universitiesList",
  components: {
    ListTable
  },
  data() {
    return {
      params: {
        keywords: '',
        _id: '',
        region: '', // 地区
        type: '', // 院校类型
        education_level: '本科', // 院校层次
        size: 10,
        page: 0,
        total: 0
      },
      list: [],
      selectRegion: 0,
      regionList: regionList,
      selectSchoolType: 0,
      schoolList: undergraduateList,
      selectSchoolLevel: 0,
      schoolLevelList: schoolLevelList,
    }
  },
  mounted() {
    // this.getMenuList();
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
    getMenuList() {
      getMenu()
          .then(res => {
            if (res.errorCode === 200) {
              this.menuList = [...this.menuList, ...res.data];
            }
          })
    },
    getListData(params) {
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.params.total = data.pageResult.total || 0;
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
    searchRegion(name, index) {
      this.resetParams();
      this.selectRegion = index;
      this.params.region = name === '不限' ? '' : name;
      this.getListData(this.params);
    },
    searchSchool(name, index) {
      this.resetParams();
      this.selectSchoolType = index;
      this.params.type = name === '全部' ? '' : name;
      this.getListData(this.params);
    },
    searchSchoolLevel(name, index) {
      this.resetParams();
      this.selectSchoolLevel = index;
      this.params.education_level = name === '全部' ? '' : name;
      this.getListData(this.params);
    },
    resetParams() {
      this.params.size = 10;
      this.params.page = 0;
    },
    goDetails(academyName) {
      this.$router.push({
        path: '/universities/universitiesDetails',
        query: {
          academyName: academyName
        }
      });
      // const {href} = this.$router.resolve({
      //     path: '/universities/universitiesDetails',
      //     query: {
      //       academyName: academyName
      //     }
      // });
      // console.log(href);
      // window.open(href,'_blank')
    }
  }
}
</script>

<style scoped lang="scss">
</style>