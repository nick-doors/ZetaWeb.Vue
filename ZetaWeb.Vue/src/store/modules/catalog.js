var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Api from '../../api/zetaweb-api';
import * as Types from '../../types/catalog';
import * as Mutations from '../mutation-types';
import * as Actions from '../actions-types';
import * as UrlHelper from 'url';
import * as QueryHelper from 'querystring';
const state = {
    nodes: {},
    expanded: []
};
const mutations = {
    [Mutations.CATALOG_SET_NODE_EXPANDED]: (state, payload) => {
        payload.expanded.forEach(item => {
            if (state.expanded.indexOf(item.Id) === -1) {
                state.expanded.push(item.Id);
            }
        });
    },
    [Mutations.CATALOG_SET_DEFAULT_NODE]: (state, payload) => {
        if (!state.nodes[payload.defaultNodeId]) {
            const node = new Types.CatalogGroup();
            node.Id = payload.defaultNodeId;
            state.nodes[payload.defaultNodeId] = node;
        }
    },
    [Mutations.CATALOG_SET_NODE_COLLAPSED]: (state, payload) => {
        payload.expanded.forEach(item => {
            const index = state.expanded.indexOf(item.Id);
            if (index !== -1) {
                state.expanded.splice(index, 1);
            }
        });
    },
    [Mutations.CATALOG_SET_NODE_LOCK_STATUS]: (state, payload) => {
        payload.node.Locked = payload.locked;
    },
    [Mutations.CATALOG_SET_NODE_VALUE]: (state, payload) => {
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
const actions = {
    [Actions.CATALOG_LOAD_EXPANDED_NODES_FROM_URL]: (context) => __awaiter(this, void 0, void 0, function* () {
        const currentUri = UrlHelper.parse(context.rootState.currentRoute);
        if (currentUri.query) {
            const currentQuery = QueryHelper.parse(currentUri.query);
            const idOrUrl = currentQuery.search_cataloggroup;
            if (idOrUrl) {
                try {
                    const parentNodes = yield Api.catalogGroups.getParents(idOrUrl);
                    const expandedPayload = {
                        expanded: parentNodes
                    };
                    context.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload);
                }
                catch (error) {
                    alert('Rejected: ' + error);
                }
            }
        }
    }),
    [Actions.CATALOG_LOAD_NODE]: (context, payload) => __awaiter(this, void 0, void 0, function* () {
        const node = payload.node;
        if (node.Loaded) {
            return;
        }
        if (node.Locked) {
            return;
        }
        const lockPayload = {
            node: node,
            locked: true
        };
        context.commit(Mutations.CATALOG_SET_NODE_LOCK_STATUS, lockPayload);
        try {
            const loadedNode = yield Api.catalogGroups.get(node.Id);
            const nodePayload = {
                node: node,
                loadedNode: loadedNode
            };
            context.commit(Mutations.CATALOG_SET_NODE_VALUE, nodePayload);
        }
        catch (error) {
            context.commit(Mutations.CATALOG_SET_NODE_LOCK_STATUS, { node: node, locked: false });
            alert('Rejected: ' + error);
        }
    })
};
const catalogModule = {
    state,
    mutations,
    actions
};
export default catalogModule;
