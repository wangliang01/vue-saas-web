const getTag = function(routes, $route) {
  let { path } = $route
  let tag = null
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  const len = routes.length
  for (let i = 0; i < len; i++) {
    const route = routes[i]
    if (route.path === path) {
      tag = route
      break
    }
    if (route.children) {
      tag = getTag(route.children, $route)
      if (tag) return tag
    }
  }
  return tag
}

export default getTag

