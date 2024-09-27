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
        filename: `${fileName}.html`
    }
})

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: true,
    pages,
    filenameHashing: false,
    chainWebpack: (config) => {
        config.plugin('copy').use(require('copy-webpack-plugin'), [
            {
                patterns: [
                    {
                        from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
                        to: `${path.resolve('dist')}/manifest.json`
                    },
                    {
                        from: path.resolve(`public/`),
                        to: `${path.resolve('dist')}/`
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
            filename: `[name].js`,
            chunkFilename: `[name].js`
        },
        devtool: isDevMode ? 'inline-source-map' : false
    },
    css: {
        extract: false // Make sure the css is the same
    }
})
