import { Component } from 'vue-property-decorator'
import BaseComponent from '../mixins/vue-control';
import { CatalogState } from '../types/states';
import * as Mutations from '../store/mutation-types';
import * as Actions from '../store/actions-types';
import * as CatalogTypes from '../types/catalog';

@Component export default class ControlTreeComponent extends BaseComponent {
    public get catalogState(): CatalogState {
        return this.$store.state.catalog;
    }

    public get node(): CatalogTypes.CatalogGroup {
        return this.catalogState.nodes[this.settings.defaultNodeId];
    };

    public created(): void {
        const defaultNodeIdPayload: CatalogTypes.IDefaultNodeIdPayload = {
            defaultNodeId: this.settings.defaultNodeId
        };
        this.$store.commit(Mutations.CATALOG_SET_DEFAULT_NODE, defaultNodeIdPayload);
        const expandedPayload: CatalogTypes.IExpandedNodesListPayload = {
            expanded: [this.node]
        };
        this.$store.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload);
        this.$store.dispatch(Actions.CATALOG_LOAD_EXPANDED_NODES_FROM_URL);
    };
}