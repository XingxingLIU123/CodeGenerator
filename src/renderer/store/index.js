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
    option: {},
    json: [
      {
        title: '教务管理',
        name: 'edu',
        modelList: [
          {
            active: true,
            code: 'student',
            displayName: '学生管理',
            model: {
              fn: ['query', 'create', 'update', 'delete', 'batch_delete', 'import', 'export', 'batch_export'],
              views: ['table', 'dialog'],
              forms: [
                {
                  FK_Dict: '',
                  FK_Model: '',
                  dataType: 'String',
                  displayName: '姓名',
                  length: '5',
                  name: 'name',
                  type: 'input',
                  validateOptions: '',
                  validateType: 'not_null',
                  isSort: 0,
                  isShowInTable: 1,
                  isSearch: 0,
                  isRequired: 1
                },
                {
                  FK_Dict: '',
                  FK_Model: '',
                  dataType: 'Integer',
                  displayName: '年龄',
                  length: '5',
                  name: 'age',
                  type: 'input',
                  validateOptions: '',
                  validateType: 'bigthan_zero',
                  isSort: 0,
                  isShowInTable: 1,
                  isSearch: 0,
                  isRequired: 1
                },
                {
                  FK_Dict: 'gender',
                  FK_Model: '',
                  dataType: 'FK_Dict',
                  displayName: '性别',
                  length: '5',
                  name: 'gender',
                  type: 'select',
                  validateOptions: '',
                  validateType: 'not_null',
                  isSort: 0,
                  isShowInTable: 1,
                  isSearch: 0,
                  isRequired: 1
                }
              ]
            }
          }
        ]
      }
    ],
  },
  actions: {
    updateOption (store, option) {
      store.commit('UPDATE_OPTION', option)
    },
    updateJson (store, json) {
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
    UPDATE_OPTION (state, option) {
      state.option = option
    },
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
