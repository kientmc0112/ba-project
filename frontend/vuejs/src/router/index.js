import Vue from "vue";
// import Meta from "vue-meta";
import Router from "vue-router";
import routes from "./router";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]
  
  if (!nextMiddleware) {
    return context.next
  }
  
  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1
    )
    nextMiddleware({ ...context, next: nextPipeline })
  }
}
  
export default router
