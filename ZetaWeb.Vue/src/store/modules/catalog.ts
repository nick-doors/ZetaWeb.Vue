import Vuex from 'vuex';
import { ActionTree, MutationTree, Module } from 'vuex';
import Api from '../../api/zetaweb-api';
import * as Types from '../../types/catalog';
import { RootState, CatalogState } from '../../types/states';
import * as Mutations from '../mutation-types';
import * as Actions from '../actions-types';
import * as UrlHelper from 'url';
import * as QueryHelper from 'querystring';
import Axios from 'axios';

const state: CatalogState = {
    nodes: {},
    expanded: []
}

const mutations: MutationTree<CatalogState> = {
    [Mutations.CATALOG_SET_NODE_EXPANDED]: (state, payload: Types.IExpandedNodesListPayload): void => {
        payload.expanded.forEach(item => {
            if (state.expanded.indexOf(item.Id) === -1) {
                state.expanded.push(item.Id);
            }
        });
    },
    [Mutations.CATALOG_SET_DEFAULT_NODE]: (state, payload: Types.IDefaultNodeIdPayload): void => {
        if (!state.nodes[payload.defaultNodeId]) {
            const node = new Types.CatalogGroup();
            node.Id = payload.defaultNodeId;
            state.nodes[payload.defaultNodeId] = node;
        }
    },
    [Mutations.CATALOG_SET_NODE_COLLAPSED]: (state, payload: Types.IExpandedNodesListPayload): void => {
        payload.expanded.forEach(item => {
            const index = state.expanded.indexOf(item.Id);
            if (index !== -1) {
                state.expanded.splice(index, 1);
            }
        });
    },
    [Mutations.CATALOG_SET_NODE_LOCK_STATUS]: (state, payload: Types.INodeLockStatusPayload): void => {
        payload.node.Locked = payload.locked;
    },
    [Mutations.CATALOG_SET_NODE_VALUE]: (state, payload: Types.ILoadedNodePayload): void => {
        const node = payload.node;
        const loadedNode = payload.loadedNode;
        loadedNode.Children.forEach(function (item) {
            node.Children.push(item);
        });
        node.Loaded = true;
        node.ChildrenCount = node.Children.length;
        node.Locked = false;
    }
};

const actions: ActionTree<CatalogState, RootState> = {
    [Actions.CATALOG_LOAD_EXPANDED_NODES_FROM_URL]: async (context) => {
        const currentUri = UrlHelper.parse(context.rootState.currentRoute);
        if (currentUri.query) {
            const currentQuery = QueryHelper.parse(currentUri.query);
            const idOrUrl = currentQuery.search_cataloggroup;
            if (idOrUrl) {
                try {
                    const parentNodes = await Api.catalogGroups.getParents(idOrUrl);
                    const expandedPayload: Types.IExpandedNodesListPayload = {
                        expanded: parentNodes
                    };
                    context.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload)
                }
                catch (error) {
                    alert('Rejected: ' + error);
                }
            }
        }
    },
    [Actions.CATALOG_LOAD_NODE]: async (context, payload: Types.INodePayload) => {
        const node = payload.node;
        if (node.Loaded) {
            return;
        }
        if (node.Locked) {
            return;
        }
        const lockPayload: Types.INodeLockStatusPayload = {
            node: node,
            locked: true
        };
        context.commit(Mutations.CATALOG_SET_NODE_LOCK_STATUS, lockPayload);
        try {
            const loadedNode = await Api.catalogGroups.get(node.Id);
            const nodePayload: Types.ILoadedNodePayload = {
                node: node,
                loadedNode: loadedNode
            };
            context.commit(Mutations.CATALOG_SET_NODE_VALUE, nodePayload);
        }
        catch (error) {
            context.commit(Mutations.CATALOG_SET_NODE_LOCK_STATUS, { node: node, locked: false });
            alert('Rejected: ' + error);
        }
    }
};

const catalogModule: Module<CatalogState, RootState> = {
    state,
    mutations,
    actions
}

export default catalogModule;
