require('./bootstrap');

window.Vue = require('vue');

import Paginate from 'vuejs-paginate';
Vue.component('Paginate', Paginate);

import Datepicker from 'vuejs-datepicker';
Vue.component('Datepicker', Datepicker);

// vue-loading-overlay
import VueLoading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(VueLoading, {
    // Pass props by their camelCased names
    color: '#38bb28',
    loader: 'dots',
    width: 64,
    height: 64,
    backgroundColor: '#ffff',
    opacity: 0.5,
    zIndex: 999
});
Vue.component('Loading', VueLoading);
// end vue-loading-overlay

Vue.component('user-index', require('./components/users/UserIndex.vue').default);
Vue.component('user-create', require('./components/users/UserCreate.vue').default);
Vue.component('user-edit', require('./components/users/UserEdit.vue').default);
Vue.component('user-list-test', require('./components/users/UserListTest.vue').default);


const app = new Vue({
    el: '#app'
});
