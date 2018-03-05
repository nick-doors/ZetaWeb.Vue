"use strict";
import VueControl from "../mixins/vue-control";
import Shop from "../api/shop";
import URI from 'urijs';

const mixins = [VueControl];

const props = {
    node: {
        type: Object,
        default: function () {
            return {
                Id: undefined,
                Name: null,
                Loaded: false,
                IdOrUrl: null,
                Image: null,                
                ChildrenCount: 0,
                Children: []
            };
        }
    }
};

const data = function () {
    return this.node;
};

const computed = {
    Folder: function () {
        return this.ChildrenCount > 0;
    },
    Href: function () {
        const idOrUrl = this.IdOrUrl;
        const params = {
            search_cataloggroup: idOrUrl
        };
        const href = URI(this.settings.searchPage).setSearch(params).toString();
        return href;
    },
    Active: function () {
        return this.Href === this.$store.state.currentRoute;
    },
    Expanded: function() {
        return this.$store.state.catalog.expanded.indexOf(this.Id) > -1;
    }
};

const load = function() {
    if (!this.Loaded) {
        this.$store.dispatch("catalog/getNode", { node: this.node });        
    }
};

const created = function () {   
    if (this.Expanded) {
        this.load();
    }
};

const toggle = function() {
    this.load();    
    if (this.Expanded) {
        this.$store.commit("catalog/setCollapsed", { collapsed: [this.Id] });        
    }
    else {
        this.$store.commit("catalog/setExpanded", { expanded: [this.Id] });        
    }    
};

const methods = {
    load,
    toggle,
    search: function (obj) {
        if (WebSetting2.isLinkToAnotherPath(this.Href)) {
            return;
        }
        obj.preventDefault();
        this.$store.commit('changeRoute', this.Href);
        window.history.pushState(null, null, this.Href);
    },
    imageSrc: function (width, height, imageScale, defaultIdOrUrl) {
        var params = { imgw: width, imgh: height, imageScale: imageScale };
        var query = URI.buildQuery(params);
        var path = "/i/" + (this.Image || defaultIdOrUrl);
        var parts = { path: path, query: query };
        var src = URI.build(parts);
        return src;
    }
};

export default {
    mixins,
    props,
    data,
    computed,
    created,
    methods
};
