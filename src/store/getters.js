const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uuid: state => state.user.uuid,
  roles: state => state.user.roles,
  init: state => state.user.init,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  asyncRouterMap: state => state.permission.asyncRouterMap,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
