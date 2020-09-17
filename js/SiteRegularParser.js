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
        this.rules.concat(this.rules);
        return this;
    }

    getRules() {
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
        if (!siteRegularSet instanceof SiteRegularSet) {
            return title;
        }

        let rules = this.siteRegularSet.getRules();
        for (let index in rules) {
            if (rules.hasOwnProperty(index)) {
                let siteRegular = rules[index];
                if (new RegExp(siteRegular.getSiteReg()).test(url)) {
                    title = title.replace(new RegExp(siteRegular.getTitleReg()), siteRegular.getNewTitleReg());
                }
            }
        }

        return title;
    }
}

/*
let siteRegularSet = new SiteRegularSet();
siteRegularSet.setRule(new SiteRegular(/https:\/\/v.qq.com\/x\/cover\/mzc00200jox8n4y\/(.*).html/,
    /经典传奇(.*)/, "经典传奇-$1"))
siteRegularSet.setRule(new SiteRegular(/https:\/\/www.bilibili.com\/video\/BV1KJ411s7QJ\/(.*)/,
    /【高清-中字-公开课】(.*)/, "$1"))

let siteRegularParser = new SiteRegularParser();
siteRegularParser.setRegularSet(siteRegularSet);

console.log(siteRegularParser.parse("https://www.bilibili.com/video/BV1KJ411s7QJ/?p=6",
    "【高清-中字-公开课】依据基本原理构建现代计算机：从与非门到俄罗斯方块_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"));
console.log(siteRegularParser.parse("https://v.qq.com/x/cover/mzc00200jox8n4y/q00340xt74z.html",
    "经典传奇秘境探寻·夜郎古国福地之谜"));
*/
