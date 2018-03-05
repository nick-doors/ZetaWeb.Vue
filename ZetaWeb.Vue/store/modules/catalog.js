"user strict";

import Shop from "../../api/shop";
import URI from "urijs";

const state = {
    nodes: {},
    parents: [],
    expanded: []
};

const getExpandedFromUri = function (context) 
{        
    const currentUri = new URI(this.state.currentRoute);
    const query = currentUri.search(true);    
    if (query.search_cataloggroup) {        
        const url = new URI("/api/catalogtree/getparents/").search({ id: query.search_cataloggroup });
        Shop.get(url.toString())
            .then(
                result => {
                    const parents = JSON.parse(result);    
                    context.commit('setEpanded', { expanded: parents });
                }, 
                error => {
                    alert("Rejected: " + error);
                });        
    }    
};

const getNode = function (context, payload) {
    const node = payload.node;            
    if (node.Loaded) {
        return;
    }
    if (node.Locked) {
        return;
    }
    context.commit('setNodeLockStatus', { node: node, locked: true });                
    const url = new URI("/api/catalogtree/get/").search({ id: node.Id });
    Shop.get(url.toString())
        .then(
            result => {
                const loadedNode = JSON.parse(result);        
                context.commit('setNode', { node: node, loadedNode: loadedNode });                
            },
            error => {
                context.commit('setNodeLockStatus', { node: node, locked: false });        
                alert("Rejected: " + error);
            });            
};

const actions = {
    getExpandedFromUri,
    getNode    
};

const setExpanded = function (state, payload) {
    payload.expanded.forEach(item => {
        if (state.expanded.indexOf(item) === -1) {
            state.expanded.push(item);
        }
    });    
};

const setCollapsed = function (state, payload) {
    payload.collapsed.forEach(item => {
        const index = state.expanded.indexOf(item);
        if (index !== -1) {
            state.expanded.splice(index, 1);
        }
    });    
};

const setDefaultNodeId = function (state, payload) {
    if (!state.nodes[payload.defaultNodeId]) {        
        state.nodes[payload.defaultNodeId] = {
            Id: payload.defaultNodeId,
            Loaded: false,
            Children: [],
            ChildrenCount: 1,
            Locked: false            
        };        
    }
};

const setNodeLockStatus = function(state, payload) {
    payload.node.Locked = payload.locked;
}

const setNode = function(state, payload) {
    const node = payload.node;
    const loadedNode = payload.loadedNode;
    loadedNode.Children.forEach(function (item) {
        node.Children.push(item);
    });
    node.Loaded = true;
    node.ChildrenCount = node.Children.length;
    node.Locked = false;
}

const mutations = {
    setExpanded,
    setCollapsed,
    setDefaultNodeId,
    setNodeLockStatus,
    setNode
};

export default {
namespaced: true,
state,
actions,
mutations
};
