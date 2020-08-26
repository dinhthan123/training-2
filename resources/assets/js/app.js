require('./bootstrap');

window.Vue = require('vue');

import Paginate from 'vuejs-paginate';
Vue.component('Paginate', Paginate);

Vue.component('user-index', require('./components/users/UserIndex.vue').default);
Vue.component('user-list', require('./components/users/UserList.vue').default);
Vue.component('user-search', require('./components/users/UserSearch.vue').default);
Vue.component('user-create', require('./components/users/UserCreate.vue').default);
Vue.component('user-edit', require('./components/users/UserEdit.vue').default);


const app = new Vue({
    el: '#app'
});
