const path = require("path");
const fs = require("fs");
const devProxy = ["/api"]; // proxy route
let proEnv = require("./config/pro.env");
// let devEnv = require("./config/dev.env");
const env = process.env.NODE_ENV;
const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
    fs.readFileSync(path.join(__dirname, "./src/theme.less"), "utf8")
);

// generate proxy object
let proxyObj = {};
if (env === "development") {
    devProxy.forEach((value) => {
        proxyObj[value] = {
            target: "http://localhost:3004",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/",
                [`^${value}`]: "",
            },
        };
    });
} else if (env === "production") {
    proxyObj = proEnv.hosturl;
}

module.exports = {
    publicPath: "./",
    lintOnSave: true,
    outputDir: "dist",
    //配置代理
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        disableHostCheck: true,
        https: false,
        hotOnly: false,
        proxy: proxyObj,
    },
    //webpack配置
    css: {
        loaderOptions: {
            less: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: themeVariables,
                javascriptEnabled: true,
            },
        },
    },
};
