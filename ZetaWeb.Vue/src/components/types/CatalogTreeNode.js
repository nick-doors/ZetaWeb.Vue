"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatalogTreeNode {
    constructor() {
        this.Id = "";
        this.Name = "";
        this.Loaded = false;
        this.IdOrUrl = "";
        this.Image = "";
        this.ChildrenCount = 0;
        this.Children = [];
    }
}
exports.default = CatalogTreeNode;
;
