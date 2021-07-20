<template>
  <div>
    <basic-container-back>
      <span class="tip-info"></span>
      <span class="tip-title">搜索筛选</span>
      <div class="search-wrap m-top">
        <el-input v-model="params.keywords"
                  @keyup.enter.native="switchData"
                  placeholder="" clearable="true"/>
        <el-button type="primary" @click="switchData">搜索</el-button>
      </div>
    </basic-container-back>
    <div class="tabs">
      <el-tabs type="card" v-model="url" :stretch="true" @tab-click="changeData">
        <el-tab-pane v-for="item in tabList" :key="item.url" :label="item.name" :name="item.url">
          <occupation-table v-if="url === 'occupation'"
                            :list="list" :params="params"
                            @goDetails="goDetails"
                            @handleCurrentChange="handleCurrentChange"
                            @handleSizeChange="handleSizeChange"
          />
          <major-table v-if="url === 'major'"
                            :list="list" :params="params"
                            @goDetails="goDetails"
                            @handleCurrentChange="handleCurrentChange"
                            @handleSizeChange="handleSizeChange"
          />
          <universities-table v-if="url === 'universities'"
                            :list="list" :params="params"
                            @goDetails="goDetails"
                            @handleCurrentChange="handleCurrentChange"
                            @handleSizeChange="handleSizeChange"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import occupationTable from "../../common/occupationTable";
import majorTable from "../../common/majorTable";
import universitiesTable from "../../common/universitiesTable";
import {searchOccupation, searchMajor, searchUniversities} from '../../../api/common/search';

export default {
  name: "searchList",
  components: {
    occupationTable,
    majorTable,
    universitiesTable
  },
  data() {
    return {
      params: {
        keywords: '',
        page: 0,
        size: 10,
        total: 0
      },
      list: [],
      url: 'occupation',
      tabList: [
        {
          name: '专业',
          url: 'major'
        },
        {
          name: '院校',
          url: 'universities'
        },
        {
          name: '职业',
          url: 'occupation'
        }
      ]
    }
  },
  mounted() {
    let {url, keywords} = this.$route.query;
    this.params.keywords = keywords;
    this.url = url;
    this.switchData();
  },
  methods: {
    resetUrl() {
      this.list = [];
      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      // 地址栏的参数值赋值
      newQuery.url = this.url;
      newQuery.keywords = this.params.keywords;
      this.$router.push({ path, query: newQuery });
    },
    changeData(e) {
      this.resetUrl();
      this.params = {
        keywords: this.params.keywords,
        page: 0,
        size: 10,
        total: 0
      }
      if (e.name === 'occupation') {
        this.getOccupation(this.params);
      } else if (e.name === 'major') {
        this.getMajor(this.params);
      } else if (e.name === 'universities') {
        this.getUniversities(this.params);
      }
    },
    switchData() {
      this.resetUrl();
      switch (this.url) {
        case 'occupation':
          this.$route.meta.title = '搜索职业';
          this.getOccupation(this.params);
          break;
        case 'major':
          this.$route.meta.title = '搜索专业';
          this.getMajor(this.params);
          break;
        case 'universities':
          this.$route.meta.title = '搜索院校';
          this.getUniversities(this.params);
          break;
      }
    },
    getOccupation(params) {
      searchOccupation(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.params.total = data.pageResult.total || 0;
            }
          })
    },
    getMajor(params) {
      searchMajor(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.params.total = data.pageResult.total || 0;
            }
          })
    },
    getUniversities(params) {
      searchUniversities(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.params.total = data.pageResult.total || 0;
            }
          })
    },
    goDetails(id) {
      switch (this.url) {
        case 'occupation':
          this.$router.push({
            path: '/occupation/occupationDetails',
            query: {
              occupationId: id
            }
          })
          break;
        case 'major':
          this.$router.push({
            path: '/major/majorDetails',
            query: {
              _id: id
            }
          })
          break;
        case 'universities':
          this.$router.push({
            path: '/universities/universitiesDetails',
            query: {
              academyName: id
            }
          })
          break;
      }
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.switchData();
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.switchData();
    },
    resetParams() {
      this.params.page = 0;
      this.params.size = 10;
      this.params.total = 0;
    }
  }
}
</script>

<style lang="scss">
.tabs {
  margin-top: 10px;

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    color: #93A0B0;
    background-color: #EAEEF4;
    border: none;
  }

  .el-tabs__item.is-active {
    color: #4D97FF;
    background-color: #FFFFFF;
  }

  .el-tabs__content {
    padding-top: 20px;
    background-color: #FFFFFF;
  }
}
</style>