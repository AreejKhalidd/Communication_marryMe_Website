import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = require('pusher-js');
Pusher.logToConsole = true;
window.Echo = new Echo({
    broadcaster: 'pusher',
    //authEndpoint:process.env.ECHO_AUTH_ENDPOINT,
    //authEndpoint : 'http://localhost:8000/broadcasting/auth',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    cluster: process.env.VUE_PUSHER_APP_CLUSTER,
    wsHost: process.env.VUE_APP_Host,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    encrypted: true
});

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
