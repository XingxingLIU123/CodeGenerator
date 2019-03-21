import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/choose-folder',
      name: 'choose-folder',
      component: (resolve) => require(['@/components/Steps/ChooseFolder.vue'], resolve),
    },
    {
      path: '/model-setting',
      name: 'model-setting',
      component: (resolve) => require(['@/components/Steps/ModelSetting/index.vue'], resolve),
    },
    {
      path: '/produce-code',
      name: 'produce-code',
      component: (resolve) => require(['@/components/Steps/ProduceCode.vue'], resolve),
    },
    {
      path: '*',
      redirect: '/choose-folder'
    }
  ]
})
