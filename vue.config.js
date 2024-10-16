const path = require('path')
const fs = require('fs')
// Generate pages object
const pages = {}
const chromeName = getEntryFile(path.resolve(`src/entry`))
const isDevMode = process.env.NODE_ENV === 'development'
const {defineConfig} = require('@vue/cli-service')

function getEntryFile(entryPath) {
    return fs.readdirSync(entryPath)
}

function getFileExtension(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}

chromeName.forEach((name) => {
    const fileExtension = getFileExtension(name)
    const fileName = name.replace('.' + fileExtension, '')
    pages[fileName] = {
        entry: `src/entry/${name}`,
        template: 'public/index.html',
        filename: `html/${fileName}.html`
    }
})
const UglifyPlugin = require("terser-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: true,
    pages,
    filenameHashing: false,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin('copy').use(require('copy-webpack-plugin'), [
            {
                patterns: [
                    {
                        from: path.resolve(`src/manifest.json`),
                        to: `${path.resolve('dist')}/manifest.json`
                    },
                    {
                        from: path.resolve(`src/FeatureTips.json`),
                        to: `${path.resolve('dist')}/FeatureTips.json`
                    },
                    {
                        from: path.resolve(`public/`),
                        to: `${path.resolve('dist/static')}/`
                    },
                    {
                        from: path.resolve(`src/script/`),
                        to: `${path.resolve('dist/js')}/`
                    }
                ]
            }
        ])
        config.plugin('define').tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_OPTIONS_API__: 'true',
                __VUE_PROD_DEVTOOLS__: 'false',
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
            })
            return definitions
        })
    },
    configureWebpack: {
        output: {
            filename: `js/[name].js`,
            chunkFilename: `[name].js`
        },
        devtool: isDevMode ? 'inline-source-map' : false,
        optimization: {
            //开发环境不启用压缩，使编译速度加快
            minimize: !isDevMode, // 确保启用了压缩
            minimizer: [
                new TerserPlugin({

                    // uglifyOptions: {
                    //     // 在UglifyJs删除没有用到的代码时不输出警告
                    //     warnings: false,
                    //     compress: {
                    //         // 删除所有的 `console` 语句，可以兼容ie浏览器
                    //         drop_console: true, // console
                    //         drop_debugger: false,
                    //         pure_funcs: ["console.log"], // 移除console
                    //         // 内嵌定义了但是只用到一次的变量
                    //         // collapse_vars: true,
                    //         // 提取出出现多次但是没有定义成变量去引用的静态值
                    //         // reduce_vars: true,
                    //     },
                    //     output: {
                    //         // 最紧凑的输出
                    //         beautify: false,
                    //         // 删除所有的注释
                    //         comments: false,
                    //     },
                    // },
                }),
            ],
        },
    },
    css: {
        extract: false // Make sure the css is the same
    }
})
