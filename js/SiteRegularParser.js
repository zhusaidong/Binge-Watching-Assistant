/**
 * 站点标题规则
 */
class SiteRegular {
    siteReg;
    titleReg;
    newTitleReg;

    constructor(siteReg, titleReg, newTitleReg) {
        this.siteReg = siteReg;
        this.titleReg = titleReg;
        this.newTitleReg = newTitleReg;
    }

    getSiteReg() {
        return this.siteReg;
    }

    getTitleReg() {
        return this.titleReg;
    }

    getNewTitleReg() {
        return this.newTitleReg;
    }
}

/**
 * 站点标题规则集合
 */
class SiteRegularSet {
    defaultRules = [
        new SiteRegular(/https:\/\/www.bilibili.com\/video\/*/,
            /(.*)_哔哩哔哩 \(゜-゜\)つロ 干杯~-bilibili/,
            "$1")
    ];

    rules = [];

    setRule(siteReg, titleReg, newTitleReg) {
        if (siteReg instanceof SiteRegular) {
            this.rules.push(siteReg);
        } else {
            this.rules.push(new SiteRegular(siteReg, titleReg, newTitleReg));
        }
        return this;
    }

    setRules(rules) {
        this.rules = this.rules.concat(rules);
        return this;
    }

    getRules() {
        return this.rules;
    }

    getDefaultRules() {
        return this.defaultRules;
    }

    getAllRules() {
        return this.defaultRules.concat(this.rules);
    }
}

/**
 * 站点标题规则解析器
 */
class SiteRegularParser {
    siteRegularSet;

    setRegularSet(siteRegularSet) {
        this.siteRegularSet = siteRegularSet;
        return this;
    }

    parse(url, title) {
        if (!this.siteRegularSet instanceof SiteRegularSet) {
            return title;
        }

        let rules = this.siteRegularSet.getAllRules();
        for (let index in rules) {
            if (rules.hasOwnProperty(index)) {
                let siteRegular = rules[index];
                console.log(siteRegular);
                if (new RegExp(siteRegular.getSiteReg()).test(url)) {
                    title = title.replace(new RegExp(siteRegular.getTitleReg()), siteRegular.getNewTitleReg());
                }
            }
        }

        return title;
    }
}

var siteRegularSet = new SiteRegularSet();
var siteRegularParser = new SiteRegularParser();
