<template>
  <div>
  </div>
</template>

<script>
import {ruleUserType} from "../../../utils/rules";

export default {
  name: 'DashboardAdmin',
  mounted() {
    // TODO 根据不同角色，跳转到不同的页面
    let {user_type} = this.$store.state.user;
    this.$router.push({
      path: ruleUserType(user_type)
    })
  }
}
</script>
