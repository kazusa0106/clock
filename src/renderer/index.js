// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/index';

Vue.config.productionTip = false;

/* eslint-disable no-new */
import "./assets/style/common.scss";

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
