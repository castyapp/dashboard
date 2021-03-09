module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: "8000",
  },
  publicPath: "/",
  configureWebpack: config => {
    config.performance = {
      hints: "warning",
    };
  },
  outputDir: './dist',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
};
