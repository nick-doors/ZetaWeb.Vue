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
    getCatalogNode(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Axios.get('/api/catalogtree/get/', {
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
    download(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                }
                else {
                    var error = new Error(this.status.toString() + '. ' + this.statusText);
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            xhr.send();
        });
    }
};
