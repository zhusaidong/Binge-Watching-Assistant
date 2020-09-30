new Vue({
    el: "#content",
    data: {
        backgroundPage: chrome.extension.getBackgroundPage(),
        siteRegular: {
            defaultSiteRegulars: [],
            customSiteRegulars: [],
        }
    },
    created: function () {
        //console.log("created");
        this.siteRegular.defaultSiteRegulars = this.backgroundPage.siteRegularSet.getDefaultRules();
        let that = this;
        this.backgroundPage.options.getOptions().then(function (options) {
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
            this.backgroundPage.options.saveOptions({siteRegulars: this.siteRegulars});
        }
    }
});
