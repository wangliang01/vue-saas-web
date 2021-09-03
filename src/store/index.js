import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'
import { findIndex } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: storage.get('tags') || []
  },
  mutations: {
    /**
     *
     * @param {Object} state Vuex中的state
     * @param {Object} tag Vue-Router中的route对象
     */
    ADD_TAG(state, tag) {
      if (tag) {
        const index = findIndex(state.tags, tag)
        if (index === -1) {
          state.tags.push(tag)
        }
        // 同时存放在localStorage中
        storage.set('tags', state.tags)
      }
    },
    /**
     *
     * @param {Object} state Vuex中的state
     * @param {Object} tag Vue-Router中的route对象
     */
    REMOVE_TAG(state, tag) {
      if (tag) {
        const index = findIndex(state.tags, tag)
        if (index > -1) {
          // 删除该tag
          state.tags.splice(index, 1)
          // 同时存放在localStorage中
          storage.set('tags', state.tags)
        }
      }
    },
    /**
     *
     * @param {Object} state Vuex中的state
     * @param {Object} tags
     */
    SET_TAG(state, tags) {
      if (tags && tags.length) {
        state.tags = tags
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
