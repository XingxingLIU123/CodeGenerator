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
    folder: []
  },
  actions: {
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
    RESET (state) {
      state.currentStep = 0
      state.folder = []
    },
    FOLDER_CLEAR (state) {
      state.folder = []
    },
    FOLDER_ADD (state, file) {
      state.folder = [file]
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
