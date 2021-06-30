export const HeadItems = [
    {
        headTitle: "电费",
        toolpit: "网络设施、设备运转中按周期支出的电力费用",
        icon: require("./icon/1.png"),
    },
    {
        headTitle: "铁塔服务费",
        toolpit: "按照协议向铁塔公司支付的服务费",
        icon: require("./icon/2.png"),
    },
    {
        headTitle: "租费",
        toolpit: "为满足网络建设的场地需求二支出的租赁分页",
        icon: require("./icon/3.png"),
    },
];
const colorSet = {
    mainSet: [
        "rgba(91,143,249,.85)",
        "rgba(90,216,166,0.85)",
        "rgba(119,114,241,0.85)",
    ],
};

export const linechartOptions = {
    height: 240,
    tooltip: {
        trigger: "item",
        borderWidth: 0,
        borderRadius: 2,
        formatter: function(name) {
            const lineData = linechartOptions.series[0].data;
            const nameSet = linechartOptions.xAxis.data;
            let total = 0;
            let target = 0;
            let toolpitArr = "";
            let pointColor = "";
            for (let i = 0; i < lineData.length; i++) {
                total += Number(lineData[i]);
                if (nameSet[i] === name.name) {
                    target = lineData[i];
                    pointColor = colorSet.mainSet[i];
                }
            }
            const percent = ((target / total) * 100).toFixed(1);
            toolpitArr = `<div style="text-align:left;font-size:12px"> <div style='font-size:16px;margin-bottom:8px'>${target}<span style="font-size:12px"> 条</span></div>  <div style="margin-bottom:8px"><span>${percent}%</span>占比</div><hr style='margin:-4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:10px;height:10px;border-radius:50%;background:${pointColor};margin-right:5px"></div><div>全国近一年${name.name}</div></div> </div>`;
            return toolpitArr;
        },
    },
    xAxis: {
        type: "category",
        data: ["电费", "铁塔服务费", "租费"],
        toolpit: { show: true },
    },
    yAxis: {
        type: "value",
        formatter: (name) => {
            console.log(name);
        },
    },
    series: [
        {
            data: [],
            type: "bar",
            barWidth: "40",
            itemStyle: {
                color: function(params) {
                    let colorList = colorSet.mainSet;
                    return colorList[params.dataIndex];
                },
            },
        },
    ],
};

export const piechartOptions = {
    tooltip: {
        trigger: "item",
        borderWidth: 0,
        borderRadius: 2,
        formatter: function(name) {
            const pieData = piechartOptions.series[0].data;
            let toolpitColor = "";
            let target = 0;
            let total = 0;
            for (let i = 0; i < pieData.length; i++) {
                total += Number(pieData[i].value);
                if (pieData[i].name === name.name) {
                    toolpitColor = colorSet.mainSet[i];
                    target = Number(name.value);
                }
            }
            const percent = ((target / total) * 100).toFixed(1);
            return `<div style='padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:10px;height:10px;border-radius:50%;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国${name.name}缴纳单</div></div>`;
        },
    },
    legend: {
        orient: "vertical",
        icon: "circle",
        left: "300px", //图例距离左的距离
        y: "center", //图例上下居中
        // itemHeight:100,//设置图例高度
        itemGap: 30, //设置图例间距
        textStyle: {
            fontSize: 12,
            color: "#666666",
            textAlign: "center",
        },
        formatter: function(name) {
            const pieData = piechartOptions.series[0].data;
            let total = 0;
            let target = 0;
            let legendArr = [];
            for (let i = 0; i < pieData.length; i++) {
                total += Number(pieData[i].value);
                if (pieData[i].name === name) {
                    target = Number(pieData[i].value);
                }
            }
            const percent = ((target / total) * 100).toFixed(1);
            legendArr.push(`${name}    ${target}条  ${percent}%`);
            return legendArr;
        },
    },
    series: [
        {
            name: "访问来源",
            type: "pie",
            center: ["130px", "50%"],
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            label: {
                show: false,
            },
            color: colorSet.mainSet,
            emphasis: {
                label: {
                    show: false,
                },
            },
            labelLine: {
                show: false,
            },
            itemStyle: {},
            data: [],
        },
    ],
};

export const checkallColumns = [
    {
        title: "排名",
        dataIndex: "rank",
        key: "rank",
        scopedSlots: { customRender: "rank" },
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 150,
        scopedSlots: { customRender: "type" },

        // ellipsis: true,
    },
    {
        title: "9-10分",
        dataIndex: "ninetoten",
        key: "ninetoten",
        scopedSlots: { customRender: "ninetoten" },
        // ellipsis: true,
    },
    {
        title: "8-9分",
        dataIndex: "eighttonine",
        key: "eighttonine",
        scopedSlots: { customRender: "eighttonine" },
        // ellipsis: true,
    },
    {
        title: "6-8分",
        dataIndex: "sixtoeight",
        key: "sixtoeight",
        scopedSlots: { customRender: "sixtoeight" },
        // ellipsis: true,
    },
    {
        title: "0-6分",
        dataIndex: "zerotosix",
        key: "zerotosix",
        scopedSlots: { customRender: "zerotosix" },
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
    },
];

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
        sorter: (a, b) =>
            a.notpass_number
                ? a.notpass_number - b.notpass_number
                : a.notpass_amount - b.notpass_amount,

        scopedSlots: { customRender: "notpass_number" },
    },
    {
        title: "未通过率",
        dataIndex: "notpass_rate",
        key: "notpass_rate",
        // sorter: (a, b) => a.notpass_rate - b.notpass_rate,
        scopedSlots: { customRender: "notpass_rate" },
    },
];
