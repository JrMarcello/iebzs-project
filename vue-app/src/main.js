
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';
import 'normalize.css';
import 'vue-material/dist/vue-material.css';
import '../static/material-icons/material-icons.css';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

Vue.use(VueResource);
Vue.use(VueMask);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'indigo',
      hue: 800,
      textColor: 'white',
    },
    secondary: {
      color: 'grey',
      hue: 500,
      textColor: 'black',
    },
    accent: {
      color: 'grey',
      hue: 800,
    },
    warn: 'pink',
    background: {
      color: 'grey',
      hue: 50,
    },
  },
});
