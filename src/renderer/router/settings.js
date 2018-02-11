import Vue from 'vue';
import Router from 'vue-router';
import setBackground from '../components/settings/setBackground';

Vue.use(Router);
const params = {
    mode: 'history',
    base: '',
    routes: [{
        path: '/backGrounds',
        name: 'backGrounds',
        component: setBackground

    }]
};

const router = new Router(params);


export default router;