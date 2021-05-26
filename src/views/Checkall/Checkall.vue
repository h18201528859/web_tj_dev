<template>
  <div class="check-all">
    <div class="header-section">
      <HeadItem
        v-for="(i, k) in headItems"
        :key="k"
        :headTitle="i.headTitle"
        :icon="i.icon"
        :toolpit="i.toolpit"
        :currentData="headData[k] || {}"
      />
    </div>
    <div class="overview-section">
      <div class="overview-head">
        <p>稽核概况</p>
        <a-radio-group defaultValue="all">
          <a-radio-button value="all"> 全部 </a-radio-button>
          <a-radio-button value="year"> 近一年 </a-radio-button>
          <a-radio-button value="month"> 近三月 </a-radio-button>
          <a-radio-button value="halfyear"> 近半年 </a-radio-button>
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
            <p class="pieCenter-title">稽核总量 (万)</p>
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
          <template slot="notpass" slot-scope="text">
            <span class="red">{{ text }}</span>
          </template>
          <template slot="notpassper" slot-scope="text">
            <span>{{ `${text}%` }}</span>
          </template>
        </a-table>
      </div>
    </div>
    <div class="detail-section">
      <div class="header">
        <p>稽核详情</p>
        <div class="operations">
          <a-radio-group class="radio" defaultValue="count">
            <a-radio-button value="count"> 数量 </a-radio-button>
            <a-radio-button value="number"> 金额 </a-radio-button>
          </a-radio-group>
          <a-select
            class="select"
            :default-value="['elec', 'tower', 'rent']"
            mode="multiple"
            style="width: 240px"
          >
            <a-select-option value="elec"> 电费 </a-select-option>
            <a-select-option value="tower"> 铁塔 </a-select-option>
            <a-select-option value="rent"> 租费 </a-select-option>
          </a-select>
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
          <template slot="notpass" slot-scope="text">
            <span class="red">{{ text }}</span>
          </template>
          <template slot="notpassper" slot-scope="text">
            <span>{{ `${text}%` }}</span>
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

export default {
  components: {
    HeadItem,
  },
  created() {
    this.handleHeadData();
    this.getCheckallTableData();
    this.handleDetailData({ page: 1, pageSize: 10 });
  },
  mounted() {
    this.drawLines();
  },
  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
  },
  computed: {
    ...mapState({
      headData: (state) => state.checkall.headData,
      checkallTable: (state) => state.checkall.checkallTable,
      checkallDetail: (state) => state.checkall.checkallDetail,
      detailTotal: (state) => state.checkall.detailTotal,
      detailPage: (state) => state.checkall.detailPage,
      detailPagesize: (state) => state.checkall.detailPagesize,
      detailTableLoading: (state) => state.checkall.detailTableLoading,
    }),
  },
  data() {
    return {
      headItems: HeadItems,
      lineData: [120, 200, 150],
      pieData: [
        { value: 1048, name: "电费" },
        { value: 735, name: "铁塔服务费" },
        { value: 580, name: "租费" },
      ],
      linechartOptions: linechartOptions,
      piechartOptions: piechartOptions,
      checkallPieNumber: 0,
      checkallTableColumns: checkallColumns,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 0,
    };
  },
  methods: {
    ...mapActions("checkall", [
      "getHeadData",
      "getCheckallTableData",
      "getCheckallDetailData",
    ]),
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
    },
    handleHeadData() {
      this.linechartOptions.series[0].data = this.lineData;
      this.piechartOptions.series[0].data = this.pieData;
      this.getHeadData();
    },
    handleDetailData({ page, pageSize }) {
      this.getCheckallDetailData({ page: page, pageSize: pageSize });
      this.totalPage = this.detailTotal;
    },
    drawLines() {
      const lineChart = this.$echarts.init(
        document.getElementById("linechart")
      );
      lineChart.setOption(this.linechartOptions);
      const piechart = this.$echarts.init(document.getElementById("piechart"));
      piechart.setOption(this.piechartOptions);
      this.pieData.map((pie) => {
        this.checkallPieNumber += pie.value;
      });
    },
    handleDetailPagesize(pageSize) {
      this.handleDetailData({ page: 1, pageSize: +pageSize });
    },
    handlePaginationChange(page, pageSize) {
      this.handleDetailData({ page: page, pageSize: pageSize });
    },
  },
};
</script>

<style lang="less">
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

