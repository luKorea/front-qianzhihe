<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">职业筛选</span>
      <div class="search-wrap m-top">
        <el-input v-model="params.keywords" placeholder="请输入职业名称" clearable="true"/>
        <el-button type="primary" @click="goSearch('occupation', params.keywords)">搜索</el-button>
      </div>
      <div class="type-list">
        <span class="type-title">职业分类:</span>
        <div class='tip-wrap'>
          <template v-if="menuList.length > 0">
          <span v-for="item in menuList" :key="item._id"
                @click="searchTip(item._id)"
                :class="selectId === item._id ? 'select_tip tip' : 'tip'">{{ item.name }}</span>
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
import {getMenu, getList} from '../../../api/common/occupation';
import ListTable from '../../common/occupationTable';

export default {
  name: "occupationList",
  components: {
    ListTable
  },
  data() {
    return {
      params: {
        keywords: '',
        _id: '',
        size: 10,
        page: 0,
        total: 0
      },
      list: [],
      selectId: '',
      menuList: [{
        _id: '',
        name: '不限'
      }]
    }
  },
  mounted() {
    this.getMenuList();
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
              console.log(res);
              this.params.total = data.pageResult.total;
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
    searchTip(id) {
      this.selectId = id;
      this.params._id = id;
      this.resetParams();
      this.getListData(this.params);
    },
    resetParams() {
      this.params.size = 10;
      this.params.page = 0;
    },
    goDetails(occupationId) {
      this.$router.push({
        path: '/occupation/occupationDetails',
        query: {
          occupationId: occupationId
        }
      })
    }
  }
}
</script>