import Vue from 'vue';
import { Component, Prop, Inject } from 'vue-property-decorator'
import { VNode } from 'vue/types/vnode';

@Component export default class ZwControlMixin extends Vue {

    @Inject()
    public settings: any;

    @Prop()
    public templateId: string;

    public get templateFunc(): (createElement: () => VNode) => VNode {
        const tid = '_' + this.templateId.toLowerCase();
        const templateTextNode = document.getElementById(tid);
        if (templateTextNode == null) {
            throw Error(`Template not found (${tid})`);
        }
        const templateText = templateTextNode.innerHTML;
        const t = Vue.compile(templateText).render;
        return t;
    };

    public render(createElement: typeof Vue.prototype.$createElement): VNode {
        const str = this.templateFunc(createElement);
        return str;
    };

    public renderError(createElement: typeof Vue.prototype.$createElement, err: Error): VNode {
        return createElement('pre', { style: { color: 'red' } }, err.stack);
    }
};