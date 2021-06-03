export const HeadCardItems = [
  {
      headTitle: "稽核报账单",
      icon: require("./icon/1.png"),
      allText:'总量/单',
      monthText:'当月/单'
  },
  {
      headTitle: "稽核金额",
      icon: require("./icon/2.png"),
      allText:'总金额/元',
      monthText:'当月/元'
  }
];
const colorSet = {
    mainSet: [
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
          "rgba(119,114,241,0.85)",
      ],
  mainPieSet: [
    "#5B8FF9",
    "#5AD8A6",
    "#E8684A",
    "#F6BD16"
   ]
};

export const linechartOptions = {
  height: 240,
  tooltip: {
      trigger: "item",
      formatter: function(name) {
        const lineData = linechartOptions.series[0].data;
        const nameSet = linechartOptions.xAxis.data;
        let total = 0;
        let target = 0;
        let toolpitArr = "";
        let pointColor = "";
        for (let i = 0; i < lineData.length; i++) {
            total += lineData[i];
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
      data: ["北京", "上海", "广州","深圳","河北","河南","湖南","江苏","湖北","广西"],
      toolpit: { show: true },
  },
  yAxis: {
      type: "value",
  },
  series: [
      {
          data: [],
          type: "bar",
          barWidth: "30",
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
        formatter: function(name) {
            const pieData = piechartOptions.series[0].data;
            let toolpitColor = "";
            let target = 0;
            let total = 0;
            for (let i = 0; i < pieData.length; i++) {
                total += pieData[i].value;
                if (pieData[i].name === name.name) {
                    toolpitColor = colorSet.mainPieSet[i];
                    target = name.value;
                }
            }
            const percent = ((target / total) * 100).toFixed(1);
            let toolpitStr = `<div style='padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:10px;height:10px;border-radius:50%;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国${name.name}缴纳单</div></div>`;
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
          let fraction = ''
          for (let i = 0; i < pieData.length; i++) {
              total += pieData[i].value;
              if (pieData[i].name === name) {
                  target = pieData[i].value;
                  fraction = pieData[i].fraction
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
          barwidth:20
      },
  ],
};

export const checkallColumns = [
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
      scopedSlots: { customRender: "type" },
  },
  {
      title: "9-10分",
      dataIndex: "ninetoten",
      key: "ninetoten",
      //ellipsis: true,
  },
  {
      title: "8-9分",
      dataIndex: "eightto9",
      key: "eightto9",
     // ellipsis: true,
  },
  {
      title: "6-8分",
      dataIndex: "sixto8",
      key: "sixto8",
    //  ellipsis: true,
  },
  {
      title: "0-6分",
      dataIndex: "zerotosix",
      key: "zerotosix",
     // ellipsis: true,
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
    //   scopedSlots: { customRender: "notpassper" },
  },
];

export const checkdetailColumns = [
  {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
  },
//   {
//       title: "稽核类型",
//       dataIndex: "type",
//       key: "type",
//       width: 150,
//     //   filters: [
//     //       {
//     //           text: "电费",
//     //           value: "电费",
//     //       },
//     //       {
//     //           text: "铁塔服务费",
//     //           value: "铁塔服务费",
//     //       },
//     //       {
//     //           text: "租费",
//     //           value: "租费",
//     //       },
//     //   ],
//     //   onFilter: (value, record) => record.type.indexOf(value) === 0,
//       // ellipsis: true,
//   },
  {
      title: "省份",
      dataIndex: "type",
      key: "province",
      // ellipsis: true,
  },
  {
      title: "9-10分",
      dataIndex: "ninetoten",
      key: "ninetoten",
      // defaultSortOrder: "descend",
     // sorter: (a, b) => a.ninetoten - b.ninetoten,
     // ellipsis: true,
  },
  {
      title: "8-9分",
      dataIndex: "eightto9",
      key: "eightto9",
      //sorter: (a, b) => a.eightto9 - b.eightto9,
     // ellipsis: true,
  },
  {
      title: "6-8分",
      dataIndex: "sixto8",
      key: "sixto8",
    //   sorter: (a, b) => a.sixto8 - b.sixto8,
    //   ellipsis: true,
  },
  {
      title: "0-6分",
      dataIndex: "zerotosix",
      key: "zerotosix",
    //   sorter: (a, b) => a.zerotosix - b.zerotosix,
    //   ellipsis: true,
  },
  {
      title: "总量",
      dataIndex: "total",
      key: "total",
      //sorter: (a, b) => a.total - b.total,
  },
  {
      title: "通过数",
      dataIndex: "passtotal",
      key: "passtotal",
     // sorter: (a, b) => a.passtotal - b.passtotal,
  },
  {
      title: "未通过数",
      dataIndex: "notpass",
      key: "notpass",
    //   sorter: (a, b) => a.notpass - b.notpass,
    //   scopedSlots: { customRender: "notpass" },
  },
  {
      title: "未通过率",
      dataIndex: "notpassper",
      key: "notpassper",
    //   sorter: (a, b) => a.notpassper - b.notpassper,
    //   scopedSlots: { customRender: "notpassper" },
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