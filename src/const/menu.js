export default {
    menuItems: [
        {
            auth: ["admin", "customer"],
            name: "网络费用稽核",
            key: "",
            iconType: "dashboard",
            isChildren: true,
            children: [
                {
                    auth: ["admin", "customer"],
                    name: "稽核总览",
                    key: "checkall",
                    iconType: "",
                },
                {
                    auth: ["admin", "customer"],
                    name: "电费稽核",
                    key: "elecfee",
                    iconType: "",
                },
                // {
                //     auth: ["admin", "customer"],
                //     name: "稽核详情",
                //     key: "elecfeeDetail",
                //     iconType: "",
                // },
                // {
                //     auth: ["admin", "customer"],
                //     name: "铁塔服务费稽核",
                //     key: "ironcheck",
                //     iconType: "",
                // },
                // {
                //     auth: ["admin"],
                //     name: "租费稽核",
                //     key: "rentfeecheck",
                //     iconType: "",
                // },
            ],
        },
    ],
};
