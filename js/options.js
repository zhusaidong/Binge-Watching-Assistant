import {siteRegularParser,getSiteRegularSet} from "./SiteRegularParser.js";

new Vue({
    el: "#content",
    data: {
        backgroundPage: chrome.extension.getBackgroundPage(),
        siteRegular: {
            defaultSiteRegulars: [],
            customSiteRegulars: [],
        },
        editSite: {
            isEdit: false,
            editIndex: null,
            currentSiteRegular: {}
        },
    },
    created: function () {
        //this.backgroundPage.store.clearAllData();
        //console.log("created");
        let that = this;
        getSiteRegularSet().then(set => {
            console.log(set);
            that.siteRegular.customSiteRegulars = set.getRules();
            that.siteRegular.defaultSiteRegulars = set.getDefaultRules();
        });

        this.backgroundPage.options.getOption("option").then(options => {
            for (let name in options) {
                if (options.hasOwnProperty(name)) {
                    $(".formOptions")
                        .find("input[name=" + name + "][value=" + options[name] + "]")
                        .attr("checked", true);
                }
            }
        });
    },
    mounted: function () {
        //console.log("mounted");
    },
    methods: {
        /**
         * 成功提示
         * @param t
         */
        showSuccess: function (t) {
            $("#alert").remove();
            let e = '<div class="alert alert-success" id="alert" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">×</span></button>' + t + "</div>";
            $(e).insertBefore($("#tab-nav"), null).addClass("in");
            setTimeout(() => {
                $("#alert").remove();
            }, 1000);
        },
        /**
         * 保存选项
         */
        saveOption: function () {
            console.log("saveOption func clicked!");
            let option = {};
            $('.formOptions').serializeArray()
                .forEach(obj => {
                    option[obj.name] = obj.value;
                });
            this.backgroundPage.options.saveOption("option", option);
            this.showSuccess("保存成功");
        },
        /**
         * 保存规则
         */
        saveSiteRegular: function () {
            let isAdd = this.editSite.editIndex == null;
            if (isAdd) {
                this.siteRegular.customSiteRegulars.push(this.editSite.currentSiteRegular);
            } else {
                this.siteRegular.customSiteRegulars[this.editSite.editIndex] = this.editSite.currentSiteRegular;
            }
            this.editSite.currentSiteRegular = {};
            this.editSite.isEdit = false;
            this.editSite.editIndex = null;

            this.backgroundPage.options.saveOption("siteRegulars", this.siteRegular.customSiteRegulars);

            this.showSuccess("保存成功");
        },
        addSiteRegular: function () {
            this.editSite.isEdit = true;
            this.editSite.currentSiteRegular = {};
        },
        editSiteRegular: function (index, row) {
            this.editSite.isEdit = true;
            this.editSite.editIndex = index;
            this.editSite.currentSiteRegular = Object.assign({}, row);
        },
        cancelSiteRegular: function () {
            this.editSite.currentSiteRegular = {};
            this.editSite.isEdit = false;
            this.editSite.editIndex = null;
        }
    }
});
