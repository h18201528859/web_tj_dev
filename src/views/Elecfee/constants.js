import { provinceCode } from "../../const/constant";
const provity = [];
provinceCode.filter((item, index) => {
    if (index < 10) {
        return provity.push(item.name.slice(0, 2));
    }
});
export const HeadCardItems = [
    {
        headTitle: "稽核报账单",
        type: "amount",
        icon: require("./icon/1.png"),
        allText: "总量/亿单",
        monthText: "当月/亿单",
    },
    {
        headTitle: "稽核金额",
        type: "number",
        icon: require("./icon/2.png"),
        allText: "总金额/万元",
        monthText: "当月/元",
    },
];
const colorSet = {
    mainSet: ["rgba(91, 143, 249, 0.85)"],
    mainPieSet: ["#5B8FF9", "#5AD8A6", "#E8684A", "#F6BD16"],
};

export const linechartOptions = {
    height: 240,
    color: colorSet.mainSet,
    tooltip: {
        trigger: "item",
        borderWidth: "0",
        formatter: function(name) {
            const cityFilterData = linechartOptions.series[0].cityFilterData;
            let total = 0;
            let target = 0;
            let toolpitArr = "";
            let pointColor = "";
            let ninetoten = 0;
            let eightto9 = 0;
            let sixto8 = 0;
            let zerotosix = 0;
            let percent = 0;
            Object.keys(cityFilterData).forEach((item, index) => {
                if (item == name.name) {
                    target = cityFilterData[item].value;
                    total = cityFilterData[item].total;
                    ninetoten = cityFilterData[item].ninetoten;
                    eightto9 = cityFilterData[item].eightto9;
                    sixto8 = cityFilterData[item].sixto8;
                    zerotosix = cityFilterData[item].zerotosix;
                    percent = ((target / total) * 100).toFixed(1);
                    pointColor = colorSet.mainSet[index];
                } else {
                    pointColor = colorSet.mainSet[0];
                }
            });
            toolpitArr = `<div style="font-size:12px;">
          <div>0-6分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${zerotosix}元</span><span style="margin-left:10px">${percent}%</span></div>
          <div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span style="margin-left:10px">${percent}%</span></div> 
          <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span style="margin-left:10px">${percent}%</span></div>
          <div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div>
             <hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/>
             <div style="display:flex;align-items:center">
             <div style="width:6px;height:6px;background:${pointColor};margin-right:5px"></div>
             <div>${name.name}省 稽核条数/占比</div></div> </div>`;
            return toolpitArr;
        },
    },
    xAxis: {
        type: "category",
        data: provity, //["北京", "上海", "广州","深圳","河北","河南","湖南","江苏","湖北","广西"],
        toolpit: { show: true },
        axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
        },
    },
    yAxis: {
        type: "value",
    },

    series: [
        {
            data: [],
            // cityData: [],
            cityFilterData: {},
            type: "bar",
            barWidth: "30",
            barCategoryGap: "18",
            // color:colorSet.mainSet,
            itemStyle: {
                color: function(name) {
                    return name.color;
                },
            },
        },
    ],
};

export const piechartOptions = {
    tooltip: {
        trigger: "item",
        borderWidth: "0",
        formatter: function(name) {
            const pieData = piechartOptions.series[0].data;
            let toolpitColor = "";
            let target = 0;
            let total = 0;
            let fraction = "";
            for (let i = 0; i < pieData.length; i++) {
                total += pieData[i].value;
                if (pieData[i].name === name.name) {
                    toolpitColor = colorSet.mainPieSet[i];
                    target = name.value;
                    fraction = pieData[i].fraction;
                }
            }
            const percent = ((target / total) * 100).toFixed(1);
            let toolpitStr = `<div style='border:none;padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国电费缴纳单 ${fraction}分 </div></div>`;
            return toolpitStr;
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
            let fraction = "";
            for (let i = 0; i < pieData.length; i++) {
                total += pieData[i].value;
                if (pieData[i].name === name) {
                    target = pieData[i].value;
                    fraction = pieData[i].fraction;
                }
            }
            let percent = ((target / total) * 100).toFixed(1);
            legendArr.push(`${fraction}分   ${target}条  ${percent}%`);
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
            color: colorSet.mainPieSet,
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
            barwidth: 20,
        },
    ],
};

export const checkdetailColumns = [
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
        scopedSlots: { customRender: "prv_name" },
        // ellipsis: true,
    },
    {
        title: "9-10分",
        dataIndex: "ninetoten",
        key: "ninetoten",
        scopedSlots: { customRender: "ninetoten" },
        // defaultSortOrder: "descend",
    },
    {
        title: "8-9分",
        dataIndex: "eighttonine",
        key: "eighttonine",
        scopedSlots: { customRender: "eighttonine" },
    },
    {
        title: "6-8分",
        dataIndex: "sixtoeight",
        key: "sixtoeight",
        scopedSlots: { customRender: "sixtoeight" },
    },
    {
        title: "0-6分",
        dataIndex: "zerotosix",
        key: "zerotosix",
        scopedSlots: { customRender: "zerotosix" },
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
export const elecfeeImgCoulmns = [
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
export const efecfeeTabColumns = [
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
        width: 120,
        scopedSlots: { customRender: "type" },

        // ellipsis: true,
    },
    {
        title: "省份",
        dataIndex: "prv_name",
        key: "prv_name",
        // ellipsis: true,
    },
    {
        title: "9-10分",
        dataIndex: "ninetoten",
        key: "ninetoten",
        // defaultSortOrder: "descend",
        sorter: (a, b) => a.ninetoten - b.ninetoten,
        ellipsis: true,
    },
    {
        title: "8-9分",
        dataIndex: "eighttonine",
        key: "eighttonine",
        sorter: (a, b) => a.eighttonine - b.eighttonine,
        ellipsis: true,
    },
    {
        title: "6-8分",
        dataIndex: "sixtoeight",
        key: "sixtoeight",
        sorter: (a, b) => a.sixtoeight - b.sixtoeight,
        ellipsis: true,
    },
    {
        title: "0-6分",
        dataIndex: "zerotosix",
        key: "zerotosix",
        sorter: (a, b) => a.zerotosix - b.zerotosix,
        ellipsis: true,
    },
    {
        title: "总量",
        dataIndex: "total_number",
        key: "total_number",
        sorter: (a, b) => a.total_number - b.total_number,
    },
    {
        title: "通过数",
        dataIndex: "pass_number",
        key: "pass_number",
        sorter: (a, b) => a.pass_number - b.pass_number,
    },
    {
        title: "未通过数",
        dataIndex: "notpass_number",
        key: "notpass_number",
        width: 120,
        sorter: (a, b) => a.notpass_number - b.notpass_number,
        scopedSlots: { customRender: "notpass" },
    },
    {
        title: "未通过率",
        dataIndex: "notpassper",
        key: "notpassper",
        width: 120,
        sorter: (a, b) => a.notpassper - b.notpassper,
        scopedSlots: { customRender: "notpassper" },
    },
];
export const cityArr = [
    { name: "全国", id: 0 },
    { name: "北京", id: 1 },
    { name: "上海", id: 2 },
    { name: "广州", id: 3 },
    { name: "深圳", id: 4 },
    { name: "河北", id: 5 },
    { name: "河南", id: 6 },
    { name: "湖南", id: 7 },
    { name: "江苏", id: 8 },
    { name: "湖北", id: 9 },
    { name: "广西", id: 10 },
    { name: "广东", id: 11 },
    { name: "四川", id: 12 },
    { name: "云南", id: 13 },
    { name: "西藏", id: 14 },
    { name: "新疆", id: 15 },
    { name: "甘肃", id: 16 },
    { name: "海南", id: 17 },
    { name: "山东", id: 18 },
    { name: "福建", id: 19 },
    { name: "合肥", id: 20 },
    { name: "浙江", id: 21 },
    { name: "黑龙江", id: 22 },
    { name: "辽宁", id: 23 },
    { name: "内蒙古", id: 24 },
    { name: "山西", id: 25 },
];
