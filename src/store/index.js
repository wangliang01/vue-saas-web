import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'
// import { findIndex } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: storage.get('tags') || [],
    tenantId: '4'
  },
  mutations: {
    /**
     *
     * @param {Object} state Vuex中的state
     * @param {Object} tag Vue-Router中的route对象
     */
    ADD_TAG(state, { tag, old }) {
      const tags = state.tags
      if (tag) {
        const index = tags.findIndex(im => im.path === tag.path)
        if (index === -1) {
          const cIndex = tags.findIndex(im => im.path === old?.path)
          cIndex > -1 ? tags.splice(cIndex + 1, 0, tag) : tags.push(tag)
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
      const tags = state.tags
      if (tag) {
        let index = tags.findIndex(im => im.name === tag.name)
        if (index === -1) index = tags.findIndex(im => im.name === tag.name)
        if (index !== -1) {
          tags.splice(index, 1)
          // 同时存放在localStorage中
          storage.set('tags', tags)
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
        // 同时存放在localStorage中
        storage.set('tags', state.tags)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
