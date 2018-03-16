import * as UrlHelper from 'url';
import Axios from 'axios';
import * as CatalogTypes from '../types/catalog';

export default {
    catalogGroups: {
        async get(nodeId: string): Promise<CatalogTypes.CatalogGroup> {
            try {
                const result = await Axios.get('/api/catalogGroups/get/', {
                    params: {
                        id: nodeId
                    }
                });
                const loadedNode: CatalogTypes.CatalogGroup = result.data;
                return loadedNode;
            }
            catch (e) {
                throw e;
            }
        },
        async getParents(idOrUrl: string | string[]): Promise<CatalogTypes.CatalogGroup[]> {
            try {
                const result = await Axios.get('/api/catalogGroups/getParents/', {
                    params: {
                        idOrUrl: idOrUrl
                    }
                });
                const loadedNodes: CatalogTypes.CatalogGroup[] = result.data;
                return loadedNodes;
            }
            catch (e) {
                throw e;
            }
        }
    }
};
