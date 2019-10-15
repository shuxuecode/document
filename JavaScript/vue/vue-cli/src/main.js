// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import GithubDB from 'github-db'
// import GithubDB from 'github'

// Vue.use(GithubDB)

const nodeExternals = require('webpack-node-externals')

const config = function(){
  return {
    externals: [
      nodeExternals()
    ]
  }
}

module.exports = config

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
