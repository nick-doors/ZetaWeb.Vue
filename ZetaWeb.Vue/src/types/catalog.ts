export class CatalogGroup {
    public Id: string;
    public Name: string;
    public Loaded: boolean;
    public IdOrUrl: string;
    public Image: string;
    public ChildrenCount: number;
    public Children: CatalogGroup[];
    public Locked: boolean;

    constructor() {
        this.Id = '';
        this.Name = '';
        this.Loaded = false;
        this.IdOrUrl = '';
        this.Image = '';
        this.ChildrenCount = 1;
        this.Children = [];
        this.Locked = false;
    }
};

export interface IExpandedNodesListPayload {
    expanded: CatalogGroup[]
}

export interface IDefaultNodeIdPayload {
    defaultNodeId: string
}

export interface INodePayload {
    node: CatalogGroup
}

export interface INodeLockStatusPayload extends INodePayload {
    locked: boolean
}

export interface ILoadedNodePayload extends INodePayload {
    loadedNode: CatalogGroup
}

