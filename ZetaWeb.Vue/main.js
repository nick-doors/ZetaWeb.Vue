import Vue from "vue";
import Store from "./store";

// было бы неплохо, если бы было побольше комментарие

global.VueExt = {
    Vue: Vue,
    Store: Store
};

import VueCatalogTree from "./components/catalog-tree";
Vue.component("vue-catalog-tree", VueCatalogTree);

import VueCatalogTreeNode from "./components/catalog-tree-node";
Vue.component("vue-catalog-tree-node", VueCatalogTreeNode);