var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from 'vue-property-decorator';
import BaseComponent from '../mixins/vue-control';
import * as Mutations from '../store/mutation-types';
import * as Actions from '../store/actions-types';
let ControlTreeComponent = class ControlTreeComponent extends BaseComponent {
    get catalogState() {
        return this.$store.state.catalog;
    }
    get node() {
        return this.catalogState.nodes[this.settings.defaultNodeId];
    }
    ;
    created() {
        const defaultNodeIdPayload = {
            defaultNodeId: this.settings.defaultNodeId
        };
        this.$store.commit(Mutations.CATALOG_SET_DEFAULT_NODE, defaultNodeIdPayload);
        const expandedPayload = {
            expanded: [this.node]
        };
        this.$store.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload);
        this.$store.dispatch(Actions.CATALOG_LOAD_EXPANDED_NODES_FROM_URL);
    }
    ;
};
ControlTreeComponent = __decorate([
    Component
], ControlTreeComponent);
export default ControlTreeComponent;
