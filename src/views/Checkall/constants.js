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
        formatter: "{b} : {c}",
    },
    xAxis: {
        type: "category",
        data: ["电费", "铁塔服务费", "租费"],
        toolpit: { show: true },
    },
    yAxis: {
        type: "value",
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
        formatter: "{b} : {c} ({d}%)",
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
                total += pieData[i].value;
                if (pieData[i].name === name) {
                    target = pieData[i].value;
                }
            }
            let percent = ((target / total) * 100).toFixed(1);
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
            hoverAnimation: false,
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

export const checkallCoulmns = [
    {
        title: "排名",
        dataIndex: "rank",
        key: "rank",
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 150,
        // ellipsis: true,
    },
    {
        title: "9-10分",
        dataIndex: "ninetoten",
        key: "ninetoten",
        ellipsis: true,
    },
    {
        title: "8-9分",
        dataIndex: "eightto9",
        key: "eightto9",
        ellipsis: true,
    },
    {
        title: "6-8分",
        dataIndex: "sixto8",
        key: "sixto8",
        ellipsis: true,
    },
    {
        title: "0-6分",
        dataIndex: "zerotosix",
        key: "zerotosix",
        ellipsis: true,
    },
    {
        title: "总量",
        dataIndex: "total",
        key: "total",
    },
    {
        title: "通过数",
        dataIndex: "passtotal",
        key: "passtotal",
    },
    {
        title: "未通过数",
        dataIndex: "notpass",
        key: "notpass",
        scopedSlots: { customRender: "notpass" },
    },
    {
        title: "未通过率",
        dataIndex: "notpassper",
        key: "notpassper",
        scopedSlots: { customRender: "notpassper" },
    },
];
