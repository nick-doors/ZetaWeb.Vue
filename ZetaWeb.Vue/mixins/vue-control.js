import Vue from 'vue';

const inject = ["settings"];

const props = {
    templateId: String
};

const render = function () {
    const str = this.templateFunc();
    return str;
};

const computed = {
    templateFunc: function () {
        let templateText = "<div class=\"error\">Rendering error</div>";
        try {
            const tid= "_" + this.templateId.toLowerCase();
            const templateTextNode = document.getElementById(tid);
            if (templateTextNode) {
                templateText = templateTextNode.innerHTML;
            }
        }
        catch (e) {
            templateText = "<div class=\"error\">Rendering error." + e.description + "</div>";
        }
        const t = Vue.compile(templateText).render;
        return t;
    }
};

export default {
    inject,
    props,
    computed,
    render 
}
