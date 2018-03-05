"use strict";

import VueControl from "../mixins/vue-control";

const mixins = [VueControl];

const node = function() {
    return this.$store.state.catalog.nodes[this.settings.defaultNodeId];    
};

var computed = {
    node
};

const created = function() {    
    this.$store.dispatch("catalog/getParents");
    this.$store.commit("catalog/setDefaultNodeId", { defaultNodeId: this.settings.defaultNodeId });
    this.$store.commit("catalog/setExpanded", { expanded: [this.settings.defaultNodeId] });    
};

export default {
    mixins,
    computed,
    created
};