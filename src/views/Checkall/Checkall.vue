<template>
  <div class="check-all">
    <div class="header-section">
      <HeadItem
        v-for="(i, k) in headItems"
        :key="k"
        :headTitle="i.headTitle"
        :icon="i.icon"
        :toolpit="i.toolpit"
        :currentData="headData || {}"
      />
    </div>
    <div class="overview-section">
      <div class="overview-head">
        <p>稽核概况</p>
        <a-radio-group defaultValue="all" @change="handleChartRange">
          <a-radio-button value="all"> 全部 </a-radio-button>
          <a-radio-button value="year"> 近一年 </a-radio-button>
          <a-radio-button value="three"> 近三月 </a-radio-button>
          <a-radio-button value="six"> 近半年 </a-radio-button>
        </a-radio-group>
      </div>
      <div class="overview-chart">
        <div class="line-chart">
          <div class="title">
            <div class="title-front"></div>
            <p>全国各类费用稽核统计</p>
          </div>
          <div id="linechart" style="height: 100%; width: 80%"></div>
        </div>
        <div class="pie-chart">
          <div class="title">
            <div class="title-front"></div>
            <p>各类稽核数量对比</p>
          </div>
          <div class="pieCenter">
            <p class="pieCenter-title">
              {{ `稽核总量${currentType === "0" ? "（万)" : "（亿)"}` }}
            </p>
            <p class="pieCenter-number">{{ checkallPieNumber }}</p>
          </div>
          <div id="piechart" style="height: 100%; width: 100%"></div>
        </div>
      </div>
      <div class="overview-table">
        <div class="title">
          <div class="title-front"></div>
          <p>全国缴费单稽核</p>
        </div>
        <a-table
          :columns="checkallTableColumns"
          :data-source="checkallTable"
          :rowKey="(record, index) => index"
          :pagination="false"
        >
          <template slot="rank" slot-scope="text, all, i">
            <span>{{ i + 1 }}</span>
          </template>
          <template slot="type">
            <span>电费</span>
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

          <template slot="pass_number" slot-scope="text, all">
            <span>{{
              all.pass_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(all.pass_amount / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
          <template slot="notpass_number" slot-scope="text, all">
            <span>{{
              all.notpass_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(all.notpass_amount / 100000000).toFixed(2)}亿`
            }}</span>
          </template>

          <template slot="total_number" slot-scope="text, all">
            <span>{{
              all.total_number
                ? `${(text / 10000).toFixed(2)}万`
                : `${(all.total_amount / 100000000).toFixed(2)}亿`
            }}</span>
          </template>
        </a-table>
      </div>
    </div>
    <div class="detail-section">
      <div class="header">
        <p>稽核详情</p>
        <div class="operations">
          <a-radio-group
            class="radio"
            :value="currentType"
            @change="handleType"
          >
            <a-radio-button value="0"> 数量 </a-radio-button>
            <a-radio-button value="1"> 金额 </a-radio-button>
          </a-radio-group>
          <a-button class="button" @click="JumpToDetail" type="primary"
            >查看更多
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="checkdetailTableColumns"
          :data-source="checkallDetail"
          :rowKey="(record, index) => index"
          :pagination="false"
          :loading="detailTableLoading"
        >
          <template slot="rank" slot-scope="text, all, i">
            <span>{{ i + 1 }}</span>
          </template>
          <template slot="type">
            <span>电费</span>
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
import HeadItem from "./HeadItem";
import {
  HeadItems,
  linechartOptions,
  piechartOptions,
  checkallColumns,
  checkdetailColumns,
} from "./constants";
import { mapActions, mapState } from "vuex";
import util from "../../utils/utils";

export default {
  components: {
    HeadItem,
  },
  created() {
    this.handleHeadData();
    this.handleTableData(this.initParams);
  },
  mounted() {
    this.drawLines();
  },
  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
    checkallDetail() {
      this.drawLines();
    },
  },
  computed: {
    ...mapState({
      headData: (state) => state.checkall.headData,
      checkallTable: (state) => state.checkall.checkallTable,
      checkallParams: (state) => state.checkall.checkallParams,
      checkallDetail: (state) => state.checkall.checkallDetail,
      detailTotal: (state) => state.checkall.detailTotal,
      detailPage: (state) => state.checkall.detailPage,
      detailPagesize: (state) => state.checkall.detailPagesize,
      detailTableLoading: (state) => state.checkall.detailTableLoading,
      lineData: (state) => state.checkall.lineData,
      pieData: (state) => state.checkall.pieData,
    }),
  },
  data() {
    return {
      headItems: HeadItems,
      linechartOptions: linechartOptions,
      piechartOptions: piechartOptions,
      checkallPieNumber: 0,
      currentType: "0",
      checkallTableColumns: checkallColumns,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 0,
      initParams: util.getAllTimeRange("all"),
    };
  },
  methods: {
    ...mapActions("checkall", ["getHeadData", "getCheckallTableData"]),
    JumpToDetail() {
      this.$store.dispatch("setCurrentBread", [
        {
          path: "checkdetail",
          breadcrumbName: "稽核详情",
        },
      ]);
      this.$router.push({
        path: "/checkdetail",
      });
      util.jumpTop();
    },
    handleHeadData() {
      this.getHeadData(util.getAllTimeRange());
      this.handleChart();
    },
    handleChartRange(e) {
      const timeRange = e.target.value;
      const timeParams = util.getAllTimeRange(timeRange);
      this.getCheckallTableData(Object.assign(timeParams, { page: 1 }));
      this.drawLines();
    },
    handleType(e) {
      const type = e.target.value;
      this.currentType = type;
      this.getCheckallTableData({ object: type, page: 1 });
    },
    handleChart() {
      this.linechartOptions.series[0].data = this.lineData;
      this.piechartOptions.series[0].data = this.pieData;
    },
    drawLines() {
      const lineChart = this.$echarts.init(
        document.getElementById("linechart")
      );
      const piechart = this.$echarts.init(document.getElementById("piechart"));
      this.handleChart();
      lineChart.setOption(this.linechartOptions);
      piechart.setOption(this.piechartOptions);
      console.log(this.pieData[0].value, this.currentType);
      this.checkallPieNumber = util.transferNum(
        this.currentType === "0"
          ? (Number(this.pieData[0].value) / 10000).toFixed(2)
          : (Number(this.pieData[0].value) / 100000000).toFixed(2)
      );
    },
    handleTableData(params) {
      const paramObj = Object.assign(this.checkallParams, params);
      this.getCheckallTableData(paramObj);
      this.totalPage = this.detailTotal;
    },
    handleDetailPagesize(pageSize) {
      this.handleTableData({ page: 1, page_size: +pageSize });
    },
    handlePaginationChange(page, pageSize) {
      this.handleTableData({ page: +page, page_size: +pageSize });
    },
  },
};
</script>

<style lang="less" scoped>
.check-all {
  .header-section {
    display: flex;
    justify-content: space-between;
  }
  .overview-section {
    min-height: 640px;
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
    }
    .overview-chart {
      margin-top: 24px;
      display: flex;
      .line-chart {
        min-height: 360px;
        flex: 1;
        .title {
          display: flex;
          .title-front {
            width: 4px;
            height: 14px;
            background: #0068ff;
            margin: 3px 8px 3px;
          }
          p {
            text-align: left;
          }
        }
      }

      .pie-chart {
        position: relative;
        flex: 1;
        .title {
          display: flex;
          .title-front {
            width: 4px;
            height: 14px;
            background: #0068ff;
            margin: 3px 8px 3px;
          }
          p {
            text-align: left;
          }
        }
        .pieCenter {
          position: absolute;
          top: 47%;
          left: 95px;
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
      .red {
        color: #f24444;
      }
      .title {
        display: flex;
        margin-bottom: 16px;
        .title-front {
          width: 4px;
          height: 14px;
          background: #0068ff;
          margin: 3px 8px 3px;
        }
        p {
          text-align: left;
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

      p {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: bold;
        color: #343642;
      }
      .select {
        margin-left: 8px;
      }
      .button {
        margin-left: 24px;
      }
    }
    .table {
      .red {
        color: #f24444;
      }
      margin-top: 15px;
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
</style>>

