import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueRouter);
const routes=[
  {path:"/listChats" , component:require('./components/listChats.vue').default},
    {path:"/Chat/:id/:name" , component:require('./components/Chat.vue').default},
    {path:"/Chat2/:id/:name" , component:require('./components/Chat2.vue').default},
]
const router = new VueRouter({
    routes:routes,
    mode:"history"
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
