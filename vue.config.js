module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: "8000",
    },
    configureWebpack: config => {
        config.performance = {
            hints: false,
        };
    }
};