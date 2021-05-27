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
      formatter: function(item){
        const pieData = piechartOptions.series[0].data;
        const name = item.data.name
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
        legendArr.push(`${target}条  ${percent}% <br/> <hr/> ${name} `);
          return legendArr.join('');
      }
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

export const checkdetailColumns = [
  {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
  },
  {
      title: "稽核类型",
      dataIndex: "type",
      key: "type",
      width: 150,
      filters: [
          {
              text: "电费",
              value: "电费",
          },
          {
              text: "铁塔服务费",
              value: "铁塔服务费",
          },
          {
              text: "租费",
              value: "租费",
          },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      // ellipsis: true,
  },
  {
      title: "省份",
      dataIndex: "province",
      key: "province",
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
      dataIndex: "eightto9",
      key: "eightto9",
      sorter: (a, b) => a.eightto9 - b.eightto9,
      ellipsis: true,
  },
  {
      title: "6-8分",
      dataIndex: "sixto8",
      key: "sixto8",
      sorter: (a, b) => a.sixto8 - b.sixto8,
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
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
  },
  {
      title: "通过数",
      dataIndex: "passtotal",
      key: "passtotal",
      sorter: (a, b) => a.passtotal - b.passtotal,
  },
  {
      title: "未通过数",
      dataIndex: "notpass",
      key: "notpass",
      sorter: (a, b) => a.notpass - b.notpass,
      scopedSlots: { customRender: "notpass" },
  },
  {
      title: "未通过率",
      dataIndex: "notpassper",
      key: "notpassper",
      sorter: (a, b) => a.notpassper - b.notpassper,
      scopedSlots: { customRender: "notpassper" },
  },
];
