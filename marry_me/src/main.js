import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';


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
