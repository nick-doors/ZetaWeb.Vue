import Vue from 'vue';
import Vuex from 'vuex';
import CatalogModule from './modules/catalog';
Vue.use(Vuex);
const state = {
    currentRoute: window.location.pathname + window.location.search
};
const mutations = {
    changeRoute: (state, newRoute) => {
        state.currentRoute = newRoute;
    }
};
const modules = {
    catalog: CatalogModule
};
export default new Vuex.Store({
    state,
    modules,
    mutations
});
