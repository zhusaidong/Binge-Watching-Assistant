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
            //开启会导致background.js无法运行
            // splitChunks: {
            //     minSize: 20000,
            //     chunks: 'all',
            // },
            //开发环境不启用压缩，使编译速度加快
            minimize: !isDevMode, // 确保启用了压缩
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,   //用来匹配需要压缩的文件
                    include: /\/includes/,   //匹配参与压缩的文件。
                    exclude: /\/excludes/,   //匹配不需要压缩的文件
                    cache: true,//降版本后添加
                    sourceMap: false,//降版本后添加
                    parallel: true,//使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 。
                    extractComments: false, //是否将注释剥离到单独的文件中,默认值： true
                    terserOptions: {
                        ecma: 2015,
                        module: true,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'], // 移除console
                        },
                        format: {
                            // 最紧凑的输出
                            beautify: false,
                            // 删除所有的注释
                            comments: false,
                            ecma: 2015,
                        },
                    },
                }),
            ],
        },
    },
    css: {
        extract: false // Make sure the css is the same
    }
})
