import Vue from 'vue'
import Vuex from 'vuex'
import dataFile from './data/mapa_dane.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    points: dataFile,
    tagsSelected: [],
    researchTypes: []
  },
  mutations: {
    selectTag(state, tag) {
      let idx = state.tagsSelected.findIndex(k => k === tag)
      if (idx === -1) state.tagsSelected.push(tag)
      else state.tagsSelected.splice(idx, 1)
    },
    selectResearchType(state, researchType) {
      let idx = state.researchTypes.findIndex(k => k === researchType)

      if (idx === -1) state.researchTypes.push(researchType)
      else state.researchTypes.splice(idx, 1)
    }
  },
  actions: {}
})
