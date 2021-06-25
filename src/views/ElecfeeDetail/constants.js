export const checkdetailColumns = [
    {
        title: "排名",
        dataIndex: "rank",
        key: "rank",
        scopedSlots: { customRender: "rank" },
    },
    {
        title: "稽核类型",
        dataIndex: "type",
        key: "type",
        // width: 100,
        scopedSlots: { customRender: "type" },
        // filters: [
        //     {
        //         text: "电费",
        //         value: "电费",
        //     },
        //     {
        //         text: "铁塔服务费",
        //         value: "铁塔服务费",
        //     },
        //     {
        //         text: "租费",
        //         value: "租费",
        //     },
        // ],
        // onFilter: (value, record) => record.type.indexOf(value) === 0,
        // ellipsis: true,
    },
    {
        title: "省份",
        dataIndex: "prv_name",
        key: "prv_name",
        // width: 80,
        // ellipsis: true,
    },
    {
        title: "9-10分",
        dataIndex: "ninetoten",
        key: "ninetoten",
        scopedSlots: { customRender: "ninetoten" },
        // defaultSortOrder: "descend",
        sorter: (a, b) => a.ninetoten - b.ninetoten,
        // ellipsis: true,
    },
    {
        title: "8-9分",
        dataIndex: "eighttonine",
        key: "eighttonine",
        scopedSlots: { customRender: "eighttonine" },
        sorter: (a, b) => a.eighttonine - b.eighttonine,
        // ellipsis: true,
    },
    {
        title: "6-8分",
        dataIndex: "sixtoeight",
        key: "sixtoeight",
        scopedSlots: { customRender: "sixtoeight" },
        sorter: (a, b) => a.sixtoeight - b.sixtoeight,
        // ellipsis: true,
    },
    {
        title: "0-6分",
        dataIndex: "zerotosix",
        key: "zerotosix",
        scopedSlots: { customRender: "zerotosix" },
        sorter: (a, b) => a.zerotosix - b.zerotosix,
        // ellipsis: true,
    },
    {
        title: "总量",
        dataIndex: "total_number",
        key: "total_number",
        sorter: (a, b) =>
            a.total_number
                ? a.total_number - b.total_number
                : a.total_amount - b.total_amount,
        scopedSlots: { customRender: "total_number" },
    },
    {
        title: "通过数",
        dataIndex: "pass_number",
        key: "pass_number",
        sorter: (a, b) =>
            a.pass_number
                ? a.pass_number - b.pass_number
                : a.pass_amount - b.pass_amount,
        scopedSlots: { customRender: "pass_number" },
    },
    {
        title: "未通过数",
        dataIndex: "notpass_number",
        key: "notpass_number",
        sorter: (a, b) => a.notpass_number - b.notpass_number,
        scopedSlots: { customRender: "notpass_number" },
    },
    {
        title: "未通过率",
        dataIndex: "notpass_rate",
        // width: 120,
        key: "notpass_rate",
        sorter: (a, b) => a.notpass_rate - b.notpass_rate,
        scopedSlots: { customRender: "notpass_rate" },
    },
];

export const checkdetailImgCoulmns = [
    {
        title: "排名",
        dataIndex: "rank",
        key: "rank",
        scopedSlots: { customRender: "rank" },
    },
    {
        title: "省份",
        dataIndex: "prv_name",
        key: "prv_name",
        // ellipsis: true,
    },
    {
        title: "总量",
        dataIndex: "total_number",
        key: "total_number",
        scopedSlots: { customRender: "total_number" },
    },
    {
        title: "通过数",
        dataIndex: "pass_number",
        key: "pass_number",
        scopedSlots: { customRender: "pass_number" },
    },
    {
        title: "未通过数",
        dataIndex: "notpass_number",
        key: "notpass_number",
        scopedSlots: { customRender: "notpass_number" },
    },
    {
        title: "未通过率",
        dataIndex: "notpass_rate",
        key: "notpass_rate",
        scopedSlots: { customRender: "notpass_rate" },
    },
];
