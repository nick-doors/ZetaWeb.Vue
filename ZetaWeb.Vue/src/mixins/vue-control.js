var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import { Component, Prop, Inject } from 'vue-property-decorator';
let ZwControlMixin = class ZwControlMixin extends Vue {
    get templateFunc() {
        const tid = '_' + this.templateId.toLowerCase();
        const templateTextNode = document.getElementById(tid);
        if (templateTextNode == null) {
            throw Error(`Template not found (${tid})`);
        }
        const templateText = templateTextNode.innerHTML;
        const t = Vue.compile(templateText).render;
        return t;
    }
    ;
    render(createElement) {
        const str = this.templateFunc(createElement);
        return str;
    }
    ;
    renderError(createElement, err) {
        return createElement('pre', { style: { color: 'red' } }, err.stack);
    }
};
__decorate([
    Inject()
], ZwControlMixin.prototype, "settings", void 0);
__decorate([
    Prop()
], ZwControlMixin.prototype, "templateId", void 0);
ZwControlMixin = __decorate([
    Component
], ZwControlMixin);
export default ZwControlMixin;
;
