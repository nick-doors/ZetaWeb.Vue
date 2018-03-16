var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '../mixins/vue-control';
import * as CatalogTypes from '../types/catalog';
import * as Mutations from '../store/mutation-types';
import * as Actions from '../store/actions-types';
import * as UrlHelper from 'url';
let ControlTreeNodeComponent = class ControlTreeNodeComponent extends BaseComponent {
    constructor() {
        super(...arguments);
        this.Id = this.node.Id;
        this.Name = this.node.Name;
        this.Loaded = this.node.Loaded;
        this.IdOrUrl = this.node.IdOrUrl;
        this.Image = this.node.Image;
        this.ChildrenCount = this.node.ChildrenCount;
        this.Children = this.node.Children;
    }
    get Folder() {
        return this.ChildrenCount > 0;
    }
    ;
    get Href() {
        const idOrUrl = this.IdOrUrl;
        const href = UrlHelper.format({
            pathname: this.settings.searchPage,
            query: {
                search_cataloggroup: idOrUrl
            }
        });
        const result = href.toString();
        return result;
    }
    ;
    get Active() {
        return this.Href === this.$store.state.currentRoute;
    }
    ;
    get Expanded() {
        return this.$store.state.catalog.expanded.indexOf(this.Id) > -1;
    }
    ;
    load() {
        if (!this.Loaded) {
            const nodePayLoad = {
                node: this.node
            };
            this.$store.dispatch(Actions.CATALOG_LOAD_NODE, nodePayLoad);
        }
    }
    ;
    created() {
        if (this.Expanded && this.Folder) {
            this.load();
        }
    }
    ;
    toggle() {
        if (this.Folder) {
            this.load();
            var expandedPayload = {
                expanded: [this.node]
            };
            if (this.Expanded) {
                this.$store.commit(Mutations.CATALOG_SET_NODE_COLLAPSED, expandedPayload);
            }
            else {
                this.$store.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload);
            }
        }
        ;
    }
    ;
    search(event) {
        const uri1 = UrlHelper.parse(this.$store.state.currentRoute);
        const uri2 = UrlHelper.parse(this.Href);
        if (uri1.pathname !== uri2.pathname) {
            return;
        }
        event.preventDefault();
        this.$store.commit('changeRoute', this.Href);
        window.history.pushState(null, '', this.Href);
    }
    ;
    imageSrc(width, height, imageScale, defaultIdOrUrl) {
        const query = {};
        if (width) {
            query['imgw'] = width.toString();
        }
        if (height) {
            query['imgh'] = height.toString();
        }
        if (imageScale) {
            query['imageScale'] = imageScale.toString();
        }
        const src = UrlHelper.format({
            pathname: '/i/' + (this.Image || defaultIdOrUrl),
            query: query
        });
        const result = src.toString();
        return result;
    }
    ;
};
__decorate([
    Prop({
        default: function () {
            return new CatalogTypes.CatalogGroup();
        }
    })
], ControlTreeNodeComponent.prototype, "node", void 0);
ControlTreeNodeComponent = __decorate([
    Component
], ControlTreeNodeComponent);
export default ControlTreeNodeComponent;
;
