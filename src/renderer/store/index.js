import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStep: 0,
    steps: [
      { title: '选择项目文件夹' },
      { title: '模块配置' },
      { title: '生成代码' }
    ],
    folder: '',
    json: [
      // {
      //   title: '项目管理',
      //   name: 'Project',
      //   modelList: [
      //     {
      //       active: true,
      //       code: 'budget',
      //       displayName: '预算管理',
      //       model: {
      //         fn: ['query', 'create', 'update', 'delete', 'batch_delete'],
      //         views: ['table', 'dialog'],
      //         forms: [
      //           {
      //             FK_Dict: '',
      //             FK_Model: '',
      //             dataType: 'String',
      //             displayName: '单位',
      //             length: '5',
      //             name: 'unit',
      //             type: 'input',
      //             validateOptions: '',
      //             validateType: 'not_null'
      //           },
      //           {
      //             FK_Dict: '',
      //             FK_Model: '',
      //             dataType: 'Float',
      //             displayName: '预算',
      //             length: '5',
      //             name: 'budget',
      //             type: 'input',
      //             validateOptions: '',
      //             validateType: 'bigthan_zero'
      //           }
      //         ]
      //       }
      //     }
      //   ]
      // }
    ],
  },
  actions: {
    updateJson (store, json) {
      console.log(json)
      store.commit('UPDATE_JSON', json)
    },
    folderClear (store) {
      store.commit('FOLDER_CLEAR')
    },
    folderAdd (store, file) {
      store.commit('FOLDER_ADD', file)
    },
    toNext (store) {
      store.commit('TO_NEXT')
    },
    toPrevious (store) {
      store.commit('TO_PREVIOUS')
    },
    reset (store) {
      store.commit('RESET')
    }
  },
  mutations: {
    UPDATE_JSON (state, json) {
      state.json = json
    },
    RESET (state) {
      state.json = []
      
      state.currentStep = 0
      state.folder = []
    },
    FOLDER_CLEAR (state) {
      state.folder = []
    },
    FOLDER_ADD (state, file) {
      state.folder = file
    },
    TO_NEXT (state) {
      state.currentStep ++
    },
    TO_PREVIOUS (state) {
      state.currentStep --
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
