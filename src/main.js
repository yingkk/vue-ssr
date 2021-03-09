// tip:避免状态单例
// 当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。
// 当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。
// 如基本示例所示，我们为每个请求创建一个新的根 Vue 实例。这与每个用户在自己的浏览器中使用新应用程序的实例类似。
// 如果我们在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染 (cross-request state pollution)。
// 因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例。

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync'

// 导出一个工厂函数，用于创建新的应用程序、router 和 store 实例
export function createApp () {
  //创建router和store实例
  const router = createRouter()
  const store = createStore()

  //同步路由状态（router state）到 store
  sync(store, router)

  //注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  //暴露
  return { app, router, store }
}



// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')