<template>
  <div class="jump-wrap">
    <div class="header-section">
      <HeadCardItem
        v-for="(i, k) in HeadCardItems"
        :key="k"
        :headTitle="i.headTitle"
        :icon="i.icon"
        :allText="i.allText"
        :monthText="i.monthText"
        :currentData="headData || {}"
        :type="i.type"
      />
    </div>
    <div class="overview-section">
      <div class="overview-head">
        <p>电费稽核概况</p>
        <div class="radio-box">
          <a-radio-group defaultValue="0" @change="handleStatistic">
            <a-radio-button value="0"> 数额统计 </a-radio-button>
            <a-radio-button value="1"> 金额统计 </a-radio-button>
          </a-radio-group>
          <a-radio-group
            defaultValue="all"
            class="amount-box"
            @change="handleChartRange"
          >
            <a-radio-button value="all"> 全部 </a-radio-button>
            <a-radio-button value="year"> 近一年 </a-radio-button>
            <a-radio-button value="three"> 近三月 </a-radio-button>
            <a-radio-button value="six"> 近半年 </a-radio-button>
          </a-radio-group>
          <a-button icon="filter" @click="jumpToDetail"> 筛选 </a-button>
        </div>
      </div>
      <div class="tabs-box">
        <a-tabs
          :default-active-key="currentType"
          :activeKey="currentType"
          @change="handleTabChange"
        >
          <a-tab-pane key="1" tab="缴费单">
            <div class="overview-chart">
              <div class="line-chart">
                <div class="title">
                  <div class="title-front"></div>
                  <p>{{ chartTitle }}</p>
                </div>
                <div id="linechart" style="height: 100%; width: 100%"></div>
              </div>
              <div class="pie-chart">
                <div class="title">
                  <div class="title-front"></div>
                  <p>各评分区间占比</p>
                </div>
                <div class="pieCenter">
                  <p class="pieCenter-title">
                    {{
                      `稽核量${alldataTable.total_amount ? "（亿）" : "（万）"}`
                    }}
                  </p>
                  <p class="pieCenter-number">
                    {{
                      alldataTable && alldataTable.total_amount
                        ? (alldataTable.total_amount / 100000000).toFixed(2)
                        : (alldataTable.total_number / 10000).toFixed(2)
                    }}
                  </p>
                </div>
                <div id="piechart" style="height: 100%; width: 100%"></div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="电表图" forceRender>
            <div class="overview-chart">
              <div class="line-chart">
                <div class="title">
                  <div class="title-front"></div>
                  <p>{{ chartTitle }}</p>
                </div>
                <div id="linechart1" style="height: 100%; width: 100%"></div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>

      <a-tabs
        type="card"
        default-active-key="1"
        @change="getChangeCity"
        class="cityTab"
      >
        <a-tab-pane
          class="citybut"
          v-for="i in provinceCode"
          :key="i.name"
          :tab="`${i.name}`"
        >
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="detail-section">
      <div class="header">
        <div class="header_p">
          <div class="title-front"></div>
          {{ tableTitle }}
        </div>
        <div class="operations">
          <a-button class="button" @click="jumpToDetail" type="primary"
            >查看更多
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="checkdetailTableColumns"
          :data-source="elecfeeTable"
          :rowKey="(record, index) => index"
          :pagination="false"
          :customRow="rowHandle"
          :loading="detailTableLoading"
        >
          <template slot="rank" slot-scope="text, all, i">
            <span>{{ i + 1 }}</span>
          </template>
          <template slot="prv_name" slot-scope="text, all">
            <span>{{ text ? text : all.preg_name }}</span>
          </template>
          <template slot="ninetoten" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(text / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="eighttonine" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(text / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="sixtoeight" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(text / 100000000).toFixed(2)}亿`
            }}</span>
          </template>

          <template slot="zerotosix" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(text / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="total_number" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(all.total_amount / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="pass_number" slot-scope="text, all">
            <span>{{
              all.pass_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(all.pass_amount / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="notpass_number" slot-scope="text, all">
            <span class="red">{{
              text || `${(all.notpass_amount / 10000).toFixed(2)}万`
            }}</span>
          </template>
        </a-table>
        <div class="pagination">
          <div class="left-pagination">
            <span>共{{ totalPage }}条记录</span>
            <div style="margin-left: 16px">
              <span>每页显示</span>
              <a-select
                default-value="10"
                style="min-width: 50px; margin: 0 5px"
                @change="handleDetailPagesize"
              >
                <a-select-option value="5"> 5</a-select-option>
                <a-select-option value="10"> 10 </a-select-option>
                <a-select-option value="15"> 15 </a-select-option>
                <a-select-option value="20"> 20 </a-select-option>
              </a-select>
              <span>条</span>
            </div>
          </div>
          <a-pagination
            show-quick-jumper
            :default-current="1"
            :total="totalPage"
            :current="detailPage"
            :pageSize="detailPagesize"
            @change="handlePaginationChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import HeadCardItem from "./HeadCardItem";
import {
  HeadCardItems,
  linechartOptions,
  piechartOptions,
  checkdetailColumns,
  elecfeeImgCoulmns,
} from "./constants";
import { provinceCode } from "../../const/constant";
import { mapActions, mapState, mapMutations } from "vuex";
import util from "../../utils/utils";

export default {
  components: {
    HeadCardItem,
  },
  mounted() {
    this.handleInitData();
  },

  computed: {
    ...mapState({
      headData: (state) => state.elecfee.headData,
      elecfeeTable: (state) => state.elecfee.elecfeeTable,
      EchartsEleTable: (state) => state.elecfee.EchartsEleTable,
      toptenTable: (state) => state.elecfee.toptenTable,
      checkallParams: (state) => state.elecfee.checkallParams,
      checkImgParams: (state) => state.elecfee.checkImgParams,
      alldataTable: (state) => state.elecfee.alldataTable,
      checkEchartsPrvParams: (state) => state.elecfee.checkEchartsPrvParams,
      cityTitle: (state) => state.elecfee.cityTitle,
      cityId: (state) => state.elecfee.cityId,
      detailTotal: (state) => state.elecfee.detailTotal,
      detailPage: (state) => state.elecfee.detailPage,
      detailPagesize: (state) => state.elecfee.detailPagesize,
      detailTableLoading: (state) => state.elecfee.detailTableLoading,
      currentType: (state) => state.elecfee.currentType,
    }),
  },
  data() {
    return {
      HeadCardItems,
      provinceCode,
      lineData: [],
      echartsTwoData: [],
      staticsType: "1",
      tableTitle: "各省缴费单数量统计TOP10",
      chartTitle: "各省缴费单数量统计TOP10",
      pieData: [
        {
          value: 0,
          name: "9-10",
          fraction: "9-10",
          code: "ninetoten",
          itemStyle: { normal: { color: "#5B8FF9" } },
        },
        {
          value: 0,
          name: "8-9",
          fraction: "8-9",
          code: "eighttonine",
          itemStyle: { normal: { color: "#5AD8A6" } },
        },
        {
          value: 0,
          name: "6-8",
          fraction: "6-8",
          code: "sixtoeight",
          itemStyle: { normal: { color: "#E8684A" } },
        },
        {
          value: 0,
          name: "0-6",
          fraction: "0-6",
          code: "zerotosix",
          itemStyle: { normal: { color: "#F6BD16" } },
        },
      ],
      cityFilterData: {},
      cityTwoFilterData: {},
      cityTwoFilterName: [],
      cityOneFilterName: [],
      linechartOptions,
      piechartOptions,
      checkallPieNumber: 0,
      checkdetailTableColumns: checkdetailColumns,
      elecfeeImgCoulmns,
      totalPage: 0,
      mode: "top",
      randerTotalParam: {},
      initParams: util.getAllTimeRange("all"),
    };
  },

  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
    toptenTable(data) {
      this.handleChartData("ten", data);
      this.drawLines("line");
    },
    alldataTable(data) {
      this.handleChartData("pie", data);
      this.drawLines("pie");
    },
    EchartsEleTable(data) {
      this.handleChartData("all", data);
      this.drawLines("line1");
    },
  },

  methods: {
    ...mapMutations("elecfee", ["updateCityId", "updateType"]),
    ...mapActions("elecfee", [
      "getHeadData",
      "getElecfeeTableData",
      "getElecImgTableData",
    ]),
    handleInitData() {
      this.getHeadData({});
      this.handleTableData(this.initParams);
      this.updateType("1"); //更新this.currentType的
      this.initChart();
      this.handleTabsChange("1");
    },
    initChart() {
      this.handleChartData("ten", this.toptenTable);
      this.handleChartData("pie", this.alldataTable);
      this.handleChartData("all", this.EchartsEleTable);
      this.drawLines("line");
      this.drawLines("pie");
      this.drawLines("line1");
    },
    handleTabChange(key) {
      this.updateType(key);
      if (+key === 1) {
        this.checkdetailTableColumns = checkdetailColumns;
        this.tableTitle = "各省缴费单金额统计TOP10";
        this.chartTitle = this.tableTitle;
        this.getElecfeeTableData({ page: 1, page_size: 10, scope: "0" });
      } else {
        this.tableTitle = "各省电表图稽核数量统计";
        this.chartTitle = this.tableTitle;
        this.checkdetailTableColumns = this.elecfeeImgCoulmns;
        this.getElecImgTableData(
          Object.assign(this.checkImgParams, this.initParams, {
            page: 1,
            page_size: 10,
          })
        );
        this.getElecImgTableData({ page: 1, page_size: 31, scope: "1" });

        this.handleChartData("all", this.EchartsEleTable);
        this.drawLines("line1");
      }
    },
    tooltipsFormat(id, cityFilterData, colorSet) {
      this[id].tooltip.formatter = (name) => {
        let total = 0;
        let target = 0;
        let toolpitArr = "";
        let pointColor = colorSet;
        let ninetoten = 0;
        let eightto9 = 0;
        let sixto8 = 0;
        let zerotosix = 0;
        let percent = 0;
        let pass_number = 0;
        let notpass_number_percent = 0;
        Object.keys(cityFilterData).forEach((item) => {
          if (id == "linechartOptionsOne") {
            total = Number(cityFilterData[item].total);
            pass_number =
              (cityFilterData[item].pass_number / 10000).toFixed(2) ||
              (cityFilterData[item].pass_amount / 10000).toFixed(2);
            notpass_number_percent = cityFilterData[item].notpass_amount
              ? Number(cityFilterData[item].notpass_amount) / Number(total)
              : Number(cityFilterData[item].notpass_number) / Number(total);
          } else {
            target = cityFilterData[item].value;
            total = cityFilterData[item].total;
            ninetoten = cityFilterData[item].ninetoten;
            eightto9 = cityFilterData[item].eightto9;
            sixto8 = cityFilterData[item].sixto8;
            zerotosix = cityFilterData[item].zerotosix;
            percent = ((target / total) * 100).toFixed(2);
          }
        });
        if (id == "linechartOptionsOne") {
          toolpitArr = `<div style="font-size:12px;">
                <div><span style="margin-right:16px;">通过数: ${pass_number}万</span><span>未通过率: ${
            notpass_number_percent + "%"
          }</span></div>              
                </div>`;
        } else {
          toolpitArr = `<div style="font-size:12px;"><div>0-6分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${zerotosix}元</span><span style="margin-left:10px">${percent}%</span></div><div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span style="margin-left:10px">${percent}%</span></div> <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span style="margin-left:10px">${percent}%</span></div><div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div><hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${pointColor};margin-right:5px"></div><div>${name.name}省 稽核条数/占比</div></div> </div>`;
        }
        return toolpitArr;
      };
    },

    handleChartData(type, data) {
      if (type === "ten") {
        let desciplineData = [],
          param = {},
          name;
        this.cityOneFilterName = [];
        data.forEach((item) => {
          name =
            item.prv_name.length >= 3
              ? item.prv_name.slice(0, 2)
              : item.prv_name;
          param[name] = {
            value: item.total_number || item.total_amount,
            ninetoten: item.ninetoten,
            eightto9: item.eighttonine,
            sixto8: item.sixtoeight,
            zerotosix: item.zerotosix,
            total: item.total_number || item.total_amount,
            pass_number: item.pass_number || item.pass_amount,
            notpass_number: item.notpass_number || item.notpass_amount, //item.notpass_number
          };

          this.cityOneFilterName.push(name);
          desciplineData.push(item.total_number || item.total_amount);
        });
        this.lineData = desciplineData;
        this.cityFilterData = param;
        desciplineData = [];
        param = {};
      } else if (type === "pie") {
        for (let i = 0; i < this.pieData.length; i++) {
          let item = this.pieData[i];
          for (let j in data) {
            if (item.code == j) {
              item.value = data[j];
            }
          }
        }
      } else {
        this.cityTwoFilterName = [];

        let desciplineData = [],
          param = {},
          name;
        data.forEach((item) => {
          name =
            item.prv_name.length >= 3
              ? item.prv_name.slice(0, 2)
              : item.prv_name;
          param[name] = {
            value: item.total_number || item.total_amount,
            total: item.total_number || item.total_amount,
            pass_number: item.pass_number || item.pass_amount,
            notpass_number: item.notpass_number || item.notpass_amount,
          };

          this.cityTwoFilterName.push(name);
          desciplineData.push(item.total_number || item.total_amount);
        });
        this.echartsTwoData = desciplineData;
        this.cityTwoFilterData = param;
      }
    },
    drawLines(type) {
      this.checkallPieNumber = 0;
      this.checkallPieNumber = util.transferNum(this.checkallPieNumber);

      const lineColor =
        +this.currentType === 2
          ? "rgba(71, 199, 253, 0.85)"
          : "rgba(91, 143, 249, 0.85)";

      if (type === "line") {
        const lineChart = this.$echarts.init(
          document.getElementById("linechart")
        );
        this.linechartOptions.series[0].data = this.lineData;
        this.linechartOptions.series[0].cityFilterData = this.cityFilterData;
        this.linechartOptions.series[0].itemStyle.color = lineColor;
        this.linechartOptions.xAxis.data = this.cityOneFilterName;
        lineChart.setOption(this.linechartOptions);
      } else if (type === "pie") {
        const piechart = this.$echarts.init(
          document.getElementById("piechart")
        );

        this.piechartOptions.series[0].data = this.pieData;
        piechart.setOption(this.piechartOptions);
      } else {
        const lineChart1 = this.$echarts.init(
          document.getElementById("linechart1")
        );
        this.linechartOptionsOne = JSON.parse(
          JSON.stringify(this.linechartOptions)
        );

        let cityTwoFilterData = JSON.parse(
          JSON.stringify(this.cityTwoFilterData)
        );
        this.linechartOptionsOne = JSON.parse(
          JSON.stringify(this.linechartOptions)
        );

        this.tooltipsFormat(
          "linechartOptionsOne",
          cityTwoFilterData,
          lineColor
        );
        this.linechartOptionsOne.series[0].itemStyle.color = lineColor;
        this.linechartOptionsOne.series[0].barWidth = "20";
        this.linechartOptionsOne.xAxis.data = this.cityTwoFilterName;
        this.linechartOptionsOne.series[0].data = this.echartsTwoData;
        lineChart1.setOption(this.linechartOptionsOne);
      }
    },

    rowHandle(record) {
      return {
        on: {
          click: () => {
            this.getChangeCity(record.prv_name);
          },
        },
      };
    },

    getChangeCity(name) {
      const nowName = name.length >= 3 ? name.slice(0, 2) : name;
      const getCodeName = util.getCodeName(nowName);
      this.updateCityId(name);
      this.$store.commit("setProvince", true);
      this.$store.commit("updateBreadcrumb", [
        {
          path: "provincefee",
          breadcrumbName: `${name}电费稽核`,
        },
      ]);

      this.$router.push({
        path: `/provincefee`,
        query: {
          cityId: getCodeName,
          cityName: name,
        },
      });
      util.jumpTop();
    },
    jumpToDetail() {
      this.$store.commit("updateBreadcrumb", [
        {
          path: "/checkdetail",
          breadcrumbName: "稽核详情",
        },
      ]);
      this.$router.push({
        path: "/checkdetail",
      });
      util.jumpTop();
    },
    handleChartRange(e) {
      const timeRange = e.target.value;
      const timeParams = util.getAllTimeRange(timeRange);
      if (+this.currentType === 1) {
        this.getElecfeeTableData(
          Object.assign(timeParams, { page: 1, page_size: 10, scope: "0" })
        );
      } else {
        this.getElecImgTableData(
          Object.assign(timeParams, { page: 1, page_size: 10, scope: "1" })
        );
        this.getElecImgTableData(
          Object.assign(timeParams, { page_size: 31, scope: "1" })
        );
      }
    },
    handleStatistic(e) {
      this.staticsType = e.target.value;
      if (+this.currentType === 1) {
        this.tableTitle =
          this.staticsType === "0"
            ? "各省缴费单数额统计TOP10"
            : "各省缴费单金额统计TOP10";
        this.chartTitle = this.tableTitle;
        this.getElecfeeTableData(
          Object.assign({ object: e.target.value }, { page: 1 })
        );
      } else {
        this.tableTitle =
          this.staticsType === "0"
            ? "各省电表图稽核数量统计"
            : "各省电表图稽核金额统计";
        this.chartTitle = this.tableTitle;
        this.getElecImgTableData(
          Object.assign({ object: e.target.value }, { page: 1, scope: "1" })
        );
        this.getElecImgTableData({ page_size: 31, scope: "1" });
      }
    },
    handleTableData(params) {
      const paramObj = Object.assign(this.checkallParams, params);
      this.getElecfeeTableData(paramObj);
      this.totalPage = this.detailTotal;
    },
    handleDetailPagesize(pageSize) {
      if (+this.currentType === 1) {
        this.getElecfeeTableData({ page: 1, page_size: +pageSize, scope: "0" });
      } else {
        this.getElecImgTableData({ page: 1, page_size: +pageSize });
      }
    },
    handlePaginationChange(page, pageSize) {
      if (+this.currentType === 1) {
        this.getElecfeeTableData({
          page: +page,
          page_size: +pageSize,
          scope: "0",
        });
      } else {
        this.getElecImgTableData({
          page: +page,
          page_size: +pageSize,
          scope: "1",
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.jump-wrap {
  .header-section {
    display: flex;
    justify-content: space-between;
  }
  .overview-section {
    min-height: 550px;
    margin-top: 24px;
    padding: 37px 24px;
    background: #ffffff;

    .overview-head {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: bold;
        color: #343642;
      }
      .amount-box {
        margin: 0 16px;
      }
    }
    .tabs-box {
      width: 100%;
      text-align: left;
    }
    .overview-chart {
      margin-top: 24px;
      display: flex;
      .line-chart {
        min-height: 360px;
        flex: 1;
        .title {
          display: flex;

          p {
            text-align: left;
            color: #343642;
            font-size: 14px;
            font-weight: 400;
            font-family: PingFangSC-Regular, PingFang SC;
          }
        }
      }

      .pie-chart {
        position: relative;
        flex: 1;
        .title {
          display: flex;

          p {
            text-align: left;
          }
        }
        .pieCenter {
          position: absolute;
          top: 47%;
          left: 94px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .pieCenter-title {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            text-align: center;
            color: #7f828f;
          }
          .pieCenter-number {
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            text-align: center;
            color: #585a69;
          }
        }
      }
    }
    .overview-table {
      .title {
        display: flex;
        margin-bottom: 16px;

        p {
          text-align: left;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #343642;
        }
      }
    }
  }
  .detail-section {
    min-height: 280px;
    margin: 24px 0;
    padding: 37px 24px;
    background: #ffffff;
    text-align: left;
    .header {
      display: flex;
      justify-content: space-between;
      .header_p {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #343642;
        display: flex;
      }
      .select {
        margin-left: 8px;
      }
      .button {
        margin-left: 24px;
        width: 80px;
        height: 32px;
        background: #0068ff;
        border-radius: 2px;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .table {
      margin-top: 15px;
      .red {
        color: #f24444;
      }
      .pagination {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        .left-pagination {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.hide {
  display: none;
}
.title-front {
  width: 4px;
  height: 14px;
  background: #0068ff;
  margin: 4px 8px 4px;
}
</style>
<style lang="less">
.cityTab .ant-tabs-bar {
  border-bottom: none;
}
.jump-wrap
  .cityTab.ant-tabs.ant-tabs-card
  .ant-tabs-card-bar
  .ant-tabs-tab-active {
  border-bottom: 1px solid #e8e8e8;
  background: #e6f4ff;
  border: 1px solid #52a3ff;
}
.cityTab.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  margin-right: 8px;
  border-radius: 0;
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  margin-top: 5px;
}
.cityTab .ant-tabs-tab-next-icon,
.cityTab .ant-tabs-tab-prev-icon {
  width: 16px;
  height: 32px;
  line-height: 32px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
}
.jump-wrap .head-item:hover {
  box-shadow: none;
}
.legend-name {
  margin-right: 16px;
}
</style>