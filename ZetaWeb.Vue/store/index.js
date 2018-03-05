import Vue from 'vue';
import Vuex from 'vuex';
import CatalogModule from "./modules/catalog";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentRoute: window.location.pathname + window.location.search
    },
    modules: {
        catalog: CatalogModule
    },
    mutations: {
        changeRoute (state, newRoute) {
            state.currentRoute = newRoute;
        }
    }
});