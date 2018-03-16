import { Component, Prop, Inject } from 'vue-property-decorator'
import BaseComponent from '../mixins/vue-control';
import * as CatalogTypes from '../types/catalog';
import * as Mutations from '../store/mutation-types';
import * as Actions from '../store/actions-types';
import * as UrlHelper from 'url';

@Component export default class ControlTreeNodeComponent extends BaseComponent {
    @Prop({
        default: function () {
            return new CatalogTypes.CatalogGroup();
        }
    })
    public node: CatalogTypes.CatalogGroup;

    public Id = this.node.Id;
    public Name = this.node.Name;
    public Loaded = this.node.Loaded;
    public IdOrUrl = this.node.IdOrUrl;
    public Image = this.node.Image;
    public ChildrenCount = this.node.ChildrenCount;
    public Children = this.node.Children;

    public get Folder(): boolean {
        return this.ChildrenCount > 0;
    };

    public get Href(): string {
        const idOrUrl = this.IdOrUrl;
        const href = UrlHelper.format({
            pathname: this.settings.searchPage,
            query: {
                search_cataloggroup: idOrUrl
            }
        });
        const result = href.toString();
        return result;
    };

    public get Active(): boolean {
        return this.Href === this.$store.state.currentRoute;
    };

    public get Expanded(): boolean {
        return this.$store.state.catalog.expanded.indexOf(this.Id) > -1;
    };

    public load(): void {
        if (!this.Loaded) {
            const nodePayLoad: CatalogTypes.INodePayload = {
                node: this.node
            };
            this.$store.dispatch(Actions.CATALOG_LOAD_NODE, nodePayLoad);
        }
    };

    public created(): void {
        if (this.Expanded && this.Folder) {
            this.load();
        }
    };

    public toggle(): void {
        if (this.Folder) {
            this.load();
            var expandedPayload: CatalogTypes.IExpandedNodesListPayload = {
                expanded: [this.node]
            };
            if (this.Expanded) {
                this.$store.commit(Mutations.CATALOG_SET_NODE_COLLAPSED, expandedPayload);
            }
            else {
                this.$store.commit(Mutations.CATALOG_SET_NODE_EXPANDED, expandedPayload);
            }
        };
    };

    public search(event: Event): void {
        const uri1 = UrlHelper.parse(this.$store.state.currentRoute);
        const uri2 = UrlHelper.parse(this.Href);
        if (uri1.pathname !== uri2.pathname) {
            return;
        }
        event.preventDefault();
        this.$store.commit('changeRoute', this.Href);
        window.history.pushState(null, '', this.Href);
    };

    public imageSrc(width: number, height: number, imageScale: number, defaultIdOrUrl: string | null): string {
        const query: any = {};
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
    };
};