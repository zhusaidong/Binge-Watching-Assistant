/**
 * 简单的模板引擎
 */
class SimpleTemplate {
    #templateHtml;
    #vars = {};

    constructor(templateClass) {
        if (templateClass !== undefined) {
            this.setTemplateClass(templateClass);
        }
    }

    setTemplateClass(templateClass) {
        this.setTemplateContent($(templateClass).html());
    }

    setTemplateContent(templateContent) {
        this.#templateHtml = templateContent;
        return this;
    }

    setVar(key, value) {
        this.#vars[key] = value;
        return this;
    }

    setVars(vars) {
        this.#vars = vars;
        return this;
    }

    clear() {
        this.#vars = {};
        return this;
    }

    toString() {
        let html = this.#templateHtml;
        for (let index in this.#vars) {
            html = html.replace(new RegExp('\\\$\\\(' + index + '\\\)', 'g'), this.#vars[index]);
        }
        return html;
    }

    toHtml(htmlClass) {
        $(htmlClass).html(this.toString());
        return this;
    }

}