import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.css'

new Vue({
    vuetify,
    el: '#app',
    render:h => h(App)
})
