<template>
  <div>
    <basic-info :info="info"/>
    <basic-container>
      <basic-desc :info="descInfo"/>
      <basic-proposal :info="proposalInfo" @changeMajor="getProposalFromComponents"/>
      <basic-employment :info="employmentInfo"/>
    </basic-container>
  </div>
</template>

<script>
import basicInfo from "./components/basicInfo";
import basicDesc from "./components/basicDesc";
import basicProposal from "./components/basicProposal";
import basicEmployment from "./components/basicEmployment";
import {getBasicInfo, getBasicDesc, getBasicProposal, getBasicEmployment} from '../../../../api/common/major';
export default {
  name: "index",
  components: {
    basicInfo,
    basicDesc,
    basicProposal,
    basicEmployment
  },
  data() {
    return {
      info: {},
      descInfo: {},
      proposalInfo: {},
      employmentInfo: {},
      _id: ''
    }
  },
  mounted() {
    let {_id} = this.$route.query;
    this._id = _id;
    this.switchData(this._id);
  },
  methods: {
    switchData(_id) {
      this.getData(_id);
      this.getDesc(_id);
      this.getProposal(_id);
      this.getEmployment(_id);
    },
    getData(id) {
      getBasicInfo(id)
      .then(res => {
        if (res.errorCode === 200) {
          console.log(res);
          this.info = res.data;
        }
      })
    },
    getDesc(id) {
      getBasicDesc(id)
      .then(res => {
        if (res.errorCode === 200) {
          console.log(res);
          this.descInfo = res.data;
        }
      })
    },
    getProposal(id) {
      getBasicProposal(id)
      .then(res => {
        if (res.errorCode === 200) {
          this.proposalInfo = res.data;
        }
      })
    },
    getEmployment(id) {
      getBasicEmployment(id)
      .then(res => {
        if (res.errorCode === 200) {
          console.log(res);
          this.employmentInfo = res.data;
        }
      })
    },
    getProposalFromComponents(id) {
      // this.switchData(id);
    }
  }
}
</script>

<style scoped>

</style>