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
        this.siteRegular.defaultSiteRegulars = this.backgroundPage.siteRegularSet.getDefaultRules();
        let that = this;
        this.backgroundPage.options.getOptions().then(function (options) {
            console.log('getOptions', options);
            for (let name in options) {
                if (options.hasOwnProperty(name)) {
                    if (name === 'siteRegulars') {
                        that.siteRegular.customSiteRegulars = options[name];
                        that.backgroundPage.siteRegularSet.setRules(options[name]);
                    } else {
                        $(".formOptions").find("input[name=" + name + "][value=" + options[name] + "]").attr("checked", true);
                    }
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
            let e = '<div class="alert alert-success" id="alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' + t + "</div>";
            $(e).insertBefore($("#tab-nav"), null).addClass("in");
            setTimeout(function () {
                $("#alert").remove();
            }, 1000);
        },
        /**
         * 保存选项
         */
        saveOption: function () {
            console.log("saveOption func clicked!");
            let option = {};
            $('.formOptions').serializeArray().forEach(function (obj) {
                option[obj.name] = obj.value;
            })
            this.backgroundPage.options.saveOptions(option);
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

            this.backgroundPage.options.saveOptions({siteRegulars: this.siteRegular.customSiteRegulars});

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
