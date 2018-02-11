// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/settings';
import router from './router/settings.js';
import './assets/style/theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
import "./assets/style/common.scss";

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
