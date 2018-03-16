import Vue from 'vue';
import { Store } from 'vuex';
import RootStore from './store';
import { RootState } from './types/states';
import { VueConstructor } from 'vue'

interface VueExt {
    Vue: VueConstructor,
    Store: Store<RootState>
}

declare global {
    interface Window { VueExt: VueExt; }
}

window.VueExt = {
    Vue: Vue,
    Store: RootStore
};

import VueCatalogTree from './components/catalog-tree';
Vue.component('vue-catalog-tree', VueCatalogTree);

import VueCatalogTreeNode from './components/catalog-tree-node';
Vue.component('vue-catalog-tree-node', VueCatalogTreeNode);