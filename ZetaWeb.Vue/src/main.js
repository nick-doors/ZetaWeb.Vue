import Vue from 'vue';
import RootStore from './store';
window.VueExt = {
    Vue: Vue,
    Store: RootStore
};
import VueCatalogTree from './components/catalog-tree';
Vue.component('vue-catalog-tree', VueCatalogTree);
import VueCatalogTreeNode from './components/catalog-tree-node';
Vue.component('vue-catalog-tree-node', VueCatalogTreeNode);
