module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        //加载antd的时候，引入的是css而不是less；按需引入
        // [
        //     "import",
        //     {
        //         libraryName: "ant-design-vue",
        //         libraryDirectory: "es",
        //         style: true,
        //     },
        //     "ant-design-vue",
        // ],
    ],
};
