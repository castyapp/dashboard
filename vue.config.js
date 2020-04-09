module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: "8000",
    },
    publicPath: process.env.TARGET_BUILD === 'electron' ? `${process.cwd()}/dist/` : "/",
    configureWebpack: config => {
        config.performance = {
            hints: false,
        };
    },
    outputDir: process.env.TARGET_BUILD === 'electron' ? './dist/electron' : './dist/web',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
};