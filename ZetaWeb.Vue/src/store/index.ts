import Vue from 'vue';
import Vuex from 'vuex';
import { ActionTree, MutationTree, ModuleTree } from 'vuex';
import CatalogModule from './modules/catalog';
import { RootState } from '../types/states';

Vue.use(Vuex);

const state: RootState = {
    currentRoute: window.location.pathname + window.location.search
}

const mutations: MutationTree<RootState> = {
    changeRoute: (state, newRoute: string): void => {
        state.currentRoute = newRoute;
    }
}

const modules: ModuleTree<RootState> = {
    catalog: CatalogModule
}

export default new Vuex.Store<RootState>({
    state,
    modules,
    mutations
});