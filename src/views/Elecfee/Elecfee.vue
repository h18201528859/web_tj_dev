<template>
  <div class="jump-wrap">
    <!-- <p>电费稽核</p>
    <a-button @click="JumpToDetail">稽核详情</a-button>
    <a-button @click="JumpToProvince">省级详情</a-button> -->
    <div class="header-section">
        <HeadCardItem
            v-for="(i, k) in HeadCardItems"
            :key="k"
            :headTitle="i.headTitle"
            :icon="i.icon"
            :allText="i.allText"
            :monthText="i.monthText"
            :currentData="headData[k] || {}"
          />
    </div>
     <div class="overview-section">
      <div class="overview-head">
        <p>{{cityTitle.surveyTitle}}</p>
        <div class="radio-box">
            <a-radio-group defaultValue="amount">
              <a-radio-button value="amount"> 数额统计 </a-radio-button>
              <a-radio-button value="amountMoney"> 金额统计 </a-radio-button>
            </a-radio-group>
            <a-radio-group defaultValue="all"  class="amount-box">
              <a-radio-button value="all"> 全部 </a-radio-button>
              <a-radio-button value="year"> 近一年 </a-radio-button>
              <a-radio-button value="month"> 近三月 </a-radio-button>
              <a-radio-button value="halfyear"> 近半年 </a-radio-button>
            </a-radio-group>
             <a-button icon="filter" @click="filterHandle">
              筛选
            </a-button>
        </div>
       
      </div>
       <div class="tabs-box">
          <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="缴费单">
            </a-tab-pane>
            <a-tab-pane key="2" tab="电表图" force-render>
            </a-tab-pane>
          </a-tabs>
        </div>
      <div class="overview-chart">
        <div class="line-chart">
          <div class="title">
            <div class="title-front"></div>
            <p>{{ cityTitle.provinceTitle }}</p>
          </div>
          <div id="linechart" style="height: 100%; width: 80%"></div>
        </div>
        <div class="pie-chart">
          <div class="title">
            <div class="title-front"></div>
            <p>{{ cityTitle.scoreTitle}}</p>
          </div>
          <div class="pieCenter">
            <p class="pieCenter-title">稽核总量 (万)</p>
            <p class="pieCenter-number">{{ checkallPieNumber }}</p>
          </div>
          <div id="piechart" style="height: 100%; width: 80%"></div>
        </div>     
      </div>
      <div style="width:80%" v-if="cityId=='-1'">
          <a-tabs type="card"
                default-active-key="1"
                @change="getChangeCity"
                @prevClick="callbackhandle"
                @nextClick="callbackhandle"
                class="cityTab"
        >
            <a-tab-pane class="citybut" v-for="i in cityArr" :key="i.id" :tab="`${i.name}`">
            </a-tab-pane>
      
          </a-tabs>
      </div>
      
     
    </div>
    <div class="detail-section">
      <div class="header">
        <p class="header_p">{{cityTitle.tabProvinceTitle}}</p>
        <div class="operations">
          <a-button class="button" @click="JumpToDetail" type="primary"
            >查看更多
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="checkdetailTableColumns"
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
        <div class="pagination">
          <div class="left-pagination">
            <span>共{{ totalPage }}条记录</span>
            <div style="margin-left: 16px">
              <span>每页显示</span>
              <a-select
                default-value="10"
                style="min-width: 50px; margin: 0 5px"
              >
                <a-select-option value="10"> 10 </a-select-option>
                <a-select-option value="20"> 20 </a-select-option>
              </a-select>
              <span>条</span>
            </div>
          </div>
          <a-pagination show-quick-jumper :default-current="1" :total="15" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadCardItem from "./HeadCardItem";
import { 
    HeadCardItems ,
    linechartOptions,
    piechartOptions,
    checkallColumns,
    checkdetailColumns
  } from "./constants";
import { mapActions, mapState } from "vuex";
export default {
   computed: {
    ...mapState({
      headData: (state) => state.checkall.headData,
      checkallTable: (state) => state.checkall.checkallTable,
      cityTitle:(state) => state.elecfee.cityTitle
    }),
  },
  data(){
    return {
      HeadCardItems,
      lineData: [120, 200, 150],
      pieData: [
        { value: 1048, name: "电费" },
        { value: 735, name: "铁塔服务费" },
        { value: 580, name: "租费" },
      ],
      linechartOptions,
      piechartOptions,
      checkallPieNumber: 0,
      checkallTableColumns: checkallColumns,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 15,
      mode: 'top',
      cityId:'-1',
      cityArr:[{name:'全国',id:0},{name:'北京',id:1},{name:'上海',id:2},{name:'广州',id:3},{name:'深圳',id:4},
      {name:'河北',id:5},{name:'河南',id:6},{name:'湖南',id:7},{name:'江苏',id:8},{name:'湖北',id:9},{name:'广西',id:10},
      {name:'广东',id:11},{name:'江西',id:12},]
    }
  },
  components: {
    HeadCardItem,
  },
  watch: {
  '$route.path': function () {
      const { params:{ cityId = '-1' } ,name } = this.$route
      if(name!=='elecfeecitydetail'){
          this.cityId = cityId;
      }
  }
},
 
  created() {
    this.handleHeadData();
    this.getCheckallTableData();
  },
  mounted() {
    this.drawLines();
  },
  methods: {
    ...mapActions("checkall", ["getHeadData", "getCheckallTableData","getUpdateCityTitle"]),
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
    callback(key){
      console.log(key)
    },
    callbackhandle(value){
      console.log(value)
    },
    getChangeCity(key){
      this.cityId = key;
      const cityName = this.cityArr[key].name;
      const { surveyTitle, provinceTitle,scoreTitle, tabProvinceTitle } =this.cityTitle
      const oCityData = {surveyTitle:cityName+surveyTitle,scoreTitle,provinceTitle:cityName+provinceTitle,tabProvinceTitle:cityName+tabProvinceTitle}
      this.$store.dispatch("getUpdateCityTitle", oCityData);
       this.$store.dispatch("setCurrentBread", [
        {
          path: "/elecfee/elecfeeCityDetail",
          breadcrumbName: `${this.cityArr[key].name}省电费稽核`,
        },
      ]);
      this.$router.push({
        name: 'elecfeecitydetail',
        path:`/elecfee/elecfeeCityDetail`,
        params:{
          cityId:key
        }
      })
    },
    JumpToProvince() {
      this.$store.dispatch("setCurrentBread", [
        {
          path: "provincefee",
          breadcrumbName: "省级详情",
        },
      ]);
      this.$router.push({
        path: "/provincefee",
      });
    },
    handleHeadData() {
      this.linechartOptions.series[0].data = this.lineData;
      this.piechartOptions.series[0].data = this.pieData;
      this.getHeadData();
    },
    filterHandle(){
        this.$store.dispatch("setCurrentBread", [
        {
          path: "/elecfee/elecfeeDetai",
          breadcrumbName: "稽核详情",
        },
      ]);
        this.$router.push({
          path: "/elecfee/elecfeeDetail",
        });
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
      piechart.on('legendselectchanged', function (options) {
                var name = options.name, selected = options.selected;
                var option = piechart.getOption()
                var selectKey = [];
                for (var prop in selected) {
                    if (hasOwnProperty.call(selected, prop)) selectKey.push(prop);
                }
                if (!selectKey.filter(function (key) {
                    return selected[key]
                }).length) {
                    option.legend[0].selected[name] = true
                }
                piechart.setOption(option)
            })
    }
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
      .amount-box{
         margin:0 16px;
      }
    }
    .tabs-box{
      width:100%;
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
          .title-front {
            width: 4px;
            height: 14px;
            background: #0068ff;
            margin: 3px 8px 3px;
          }
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
      }
      .select {
        margin-left: 8px;
      }
      .button {
        margin-left: 24px;
        width: 80px;
        height: 32px;
        background: #0068FF;
        border-radius: 2px;
        font-size: 12px;
        line-height: 18px;
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
.hide{
  display: none;
}

</style>
<style lang="less">
.cityTab .ant-tabs-bar{
 border-bottom:none;
}
.jump-wrap .cityTab.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
       border-bottom: 1px solid #e8e8e8;
       background: #E6F4FF;
      border: 1px solid #52A3FF;
      
}
.cityTab.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
      margin-right: 16px;
      border-radius: 0;
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      margin-top:5px;
}
 .cityTab .ant-tabs-tab-next-icon,.cityTab .ant-tabs-tab-prev-icon{
    width: 16px;
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #D9D9D9;
}

</style>