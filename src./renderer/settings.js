// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/settings';

Vue.config.productionTip = false;

/* eslint-disable no-new */
import "./assets/style/common.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
