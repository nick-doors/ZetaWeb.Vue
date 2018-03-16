var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Axios from 'axios';
export default {
    catalogGroups: {
        get(nodeId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield Axios.get('/api/catalogGroups/get/', {
                        params: {
                            id: nodeId
                        }
                    });
                    const loadedNode = result.data;
                    return loadedNode;
                }
                catch (e) {
                    throw e;
                }
            });
        },
        getParents(idOrUrl) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield Axios.get('/api/catalogGroups/getParents/', {
                        params: {
                            idOrUrl: idOrUrl
                        }
                    });
                    const loadedNodes = result.data;
                    return loadedNodes;
                }
                catch (e) {
                    throw e;
                }
            });
        }
    }
};
