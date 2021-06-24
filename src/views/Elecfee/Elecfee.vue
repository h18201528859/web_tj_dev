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
        <p>{{ cityTitle.surveyTitle }}</p >
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
          <a-button icon="filter" @click="filterHandle"> 筛选 </a-button>
        </div>
      </div>
      <div class="tabs-box">
        <a-tabs default-active-key="tabsKey" @change="callback">
          <a-tab-pane key="1" tab="缴费单">
            <div class="overview-chart">
                <div class="line-chart">
                  <div class="title">
                    <div class="title-front"></div>
                    <p>{{ cityTitle.provinceTitle }}</p >
                  </div>
                  <div id="linechart" style="height: 100%; width: 80%"></div>
                </div>
                <div class="pie-chart">
                  <div class="title">
                    <div class="title-front"></div>
                    <p>{{ cityTitle.scoreTitle }}</p >
                  </div>
                  <div class="pieCenter">
                    <p class="pieCenter-title">稽核量</p >
                    <p class="pieCenter-number">{{alldataTable&&alldataTable.total_amount||0}}</p >
                  </div>
                  <div id="piechart" style="height: 100%; width: 100%"></div>
                </div>
              </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="电表图" force-render> 
              <div class="overview-chart">
                  <div class="line-chart">
                    <div class="title">
                      <div class="title-front"></div>
                      <p>{{ cityTitle.provinceTitle }}</p >
                    </div>
                    <div id="linechart1" style="height: 100%; width: 100%"></div>
                  </div>
                 
                </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      
      <div v-if="cityId == 'QG'">
        <a-tabs
          type="card"
          default-active-key="1"
          @change="getChangeCity"
          @prevClick="callbackhandle"
          @nextClick="callbackhandle"
          class="cityTab"
        >
          <a-tab-pane
            class="citybut"
            v-for="(i) in provinceCode"
            :key="i.name"
            :tab="`${i.name}`"
          >
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="detail-section">
      <div class="header">
        <div class="header_p">
          <div class="title-front"></div>
          {{ cityTitle.tabProvinceTitle }}
        </div>
        <div class="operations">
          <a-button class="button" @click="filterHandle" type="primary"
            >查看更多
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="checkdetailTableColumns"
          :data-source="cityId == 'QG' ? elecfeeTable : provinceTable"
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
console.log(util,'util')
let countryTitle = {
  surveyTitle: "电费稽核概况",
  provinceTitle: "各地市缴费单稽核数量统计TOP10",
  scoreTitle: "分区间占比",
  tabProvinceTitle: "各地市缴费单稽核数量详单",
};

export default {
  components: {
    HeadCardItem,
  },
  created() {
    this.handleHeadData({});
    this.handleTableData(this.initParams);
    
  },
  mounted() {
    
    const {
      name = "elecfee",
      params: { cityId = "QG" },
    } = this.$route;
    if (name == "elecfeecitydetail") {
      setTimeout(() => {
        let lineColor;
         if(+this.tabsKey==2){
            lineColor = ["rgba(71, 199, 253, 0.85)"]
          }else{
            lineColor = ["rgba(119, 114, 241, 0.85)"];
           
          }
        this.echartsColors(lineColor);
        const cityName = this.getCodeVerIndex(cityId)//this.elecfeeTable[cityId].prv_name;
        this.getUpdateCityTitle(cityName, countryTitle);
        this.updateCityId(cityId);
        const pieColor = [
          "rgba(119, 114, 241, 0.85)",
          "rgba(206, 119, 251, 0.85)",
          "rgba(90, 220, 255, 0.85)",
          "rgba(71, 167, 253, 0.85)",
        ];
        this.pieEchartsColor(pieColor,this.pieData);
      }, 500);
    }
  },
  computed: {
    ...mapState({
      headData: (state) => state.elecfee.headData,
      elecfeeTable: (state) => state.elecfee.elecfeeTable,
      EchartsEleTable: (state) => state.elecfee.EchartsEleTable,
      provinceTable: (state) => state.elecfee.provinceTable,
      checkallParams: (state) => state.elecfee.checkallParams,
      alldataTable: (state) =>{
        if(state.elecfee.alldataTable){
        state.elecfee.alldataTable.total_amount = util.transToLocaleString(state.elecfee.alldataTable.total_amount)
          
        }
        return state.elecfee.alldataTable
      },
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
      tabsKey: "1",
      pieData: [
        {
          value: 2587,
          name: "电费",
          fraction: "9-10",
          code:'ninetoten',
          itemStyle: { normal: { color: "#5B8FF9" } },
        },
        {
          value: 1626,
          name: "铁塔服务费",
          fraction: "8-9",
           code:'eighttonine',
          itemStyle: { normal: { color: "#5AD8A6" } },
        },
        {
          value: 1062,
          name: "租费",
          fraction: "6-8",
           code:'sixtoeight',
          itemStyle: { normal: { color: "#E8684A" } },
        },
        {
          value: 985,
          name: "稽核总量",
          fraction: "0-6",
            code:'zerotosix',
          itemStyle: { normal: { color: "#F6BD16" } },
        },
      ],
      cityFilterData: {},
      linechartOptions,
      piechartOptions,
      checkallPieNumber: 0,
      checkdetailTableColumns: checkdetailColumns,
      elecfeeImgCoulmns,
      totalPage: 0,
      mode: "top",
      randerTotalParam:{},
      initParams: util.getAllTimeRange("all"),
    };
  },

  watch: {
    "$route.path": function () {
      const {
        name = "elecfee",
        params: { cityId = "QG" },
      } = this.$route;
      if (name == "elecfeecitydetail" && cityId !== "QG") {
        if (cityId !== "elecfee") {

          const cityName = this.getCodeVerIndex(cityId)// this.elecfeeTable[cityId].prv_name;
          this.$store.dispatch("setCurrentBread", [
            {
              name: "elecfeecitydetail",
              path: "/elecfee/elecfeeCityDetail/" + cityId,
              breadcrumbName: `${cityName}电费稽核`,
            },
          ]);
          this.getUpdateCityTitle({ cityName, countryTitle });
          this.updateCityId(cityId);
          this.checkdetailTableColumns[1].title = "地市";
          let lineColor;
          if (+this.tabsKey == 2) {
            lineColor = ["rgba(71, 199, 253, 0.85)"];
          } else {
            lineColor = ["rgba(119,114,241,0.85)"];
          }

          const pieColor = [
            "rgba(119, 114, 241, 0.85)",
            "rgba(206, 119, 251, 0.85)",
            "rgba(90, 220, 255, 0.85)",
            "rgba(71, 167, 253, 0.85)",
          ];
          this.echartsColors(lineColor);
          this.piechartOptions.series[0].itemStyle.color = [];
          this.pieEchartsColor(pieColor,this.pieData);
        }
      } else {
        this.updateCityId("QG");
        this.getUpdateCityTitle("");
         let lineColorfee;
          if(+this.tabsKey==2){
            lineColorfee = ["rgba(71, 199, 253, 0.85)"]
          }else{
           lineColorfee = ["rgba(91, 143, 249, 0.85)"];
          }
        this.echartsColors(lineColorfee);
        this.checkdetailTableColumns[1].title = "省份";
        const pieColor = ["#5B8FF9", "#5AD8A6", "#E8684A", "#F6BD16"];
        this.pieEchartsColor(pieColor,this.pieData);
      }
    },
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
   elecfeeTable(data){
      
      let desciplineData = [],param = {},name;
      data.forEach((item,index)=>{

           name = item.prv_name.length>=3?item.prv_name.slice(0,2):item.prv_name  
         
           param[name] = {
              value: item.total_amount,
              ninetoten: item.ninetoten,
              eightto9: item.eighttonine,
              sixto8:item.sixtoeight,
              zerotosix: item.zerotosix,
              total: item.total_amount,
              pass_number:item.pass_number,
              notpass_number:'20%'//item.notpass_number
           }      
       
       
          desciplineData.push(item.total_amount)
      })
      this.lineData  = desciplineData
       this.cityFilterData = param
      this.drawLines()
    },
    alldataTable(obj){
      console.log(obj)
    
    console.log(this.pieData)
      for(let i=0;i<this.pieData.length;i++){
        let item = this.pieData[i];
        for(let j in obj){
          if(item.code==j){
            item.value = obj[j]
          }
        }
      }
         console.log(this.pieData)

   const colorpie =  ["#5B8FF9", "#5AD8A6", "#E8684A", "#F6BD16"];
     this.pieEchartsColor(colorpie,this.pieData);
     
    }
  },

  methods: {
    ...mapMutations("elecfee", ["updateCityId", "updateType"]),
    ...mapActions("elecfee", [
      "getHeadData",
      "getElecfeeTableData",
      "getEchartsEleTableData",
      "getProElecfeeTableData",
      "getUpdateCityTitle",
      "getElecImgTableData",
    ]),
   callback(key) {
      this.updateType(key);
      this.tabsKey = key;
      const lineChart = this.$echarts.init(
        document.getElementById("linechart")
      );
       const lineChart1 = this.$echarts.init(
        document.getElementById("linechart1")
      );
    
      const piechart = this.$echarts.init(document.getElementById("piechart"));
      const pieCharts = document.querySelector(".pie-chart");
      let lineData = [],
        pieData = [],
        colorSet = { mainSet: [], mainPieSet: [] };
      if (+key === 2) {
        this.getElecImgTableData({ page: 1 });
          const {
              name = "elecfee",
              params: { cityId = "QG" },
            } = this.$route;
       
        lineData = [980, 760, 745, 980, 760, 745, 980, 760, 745, 980];
        this.checkdetailTableColumns = this.elecfeeImgCoulmns;
        pieData = [
          {
            value: 1020,
            name: "电费",
            fraction: "9-10",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 1300,
            name: "铁塔服务费",
            fraction: "4-9",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 1340,
            name: "租费",
            fraction: "2-8",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 650,
            name: "稽核总量",
            fraction: "0-6",
            itemStyle: { normal: { color: "" } },
          },
        ];
        colorSet.mainSet =["rgba(71, 199, 253, 0.85)"];
        colorSet.mainPieSet = ["#317CFF", "#47C7FD", "#F6AE16", "#5AD8A6"];
        
        if (name == "elecfee") {
          const cityName = ''
           countryTitle ={
                surveyTitle: "电费稽核概况",
                provinceTitle: "各省缴费单金额统计",
                scoreTitle: "各评分区间占比",
                tabProvinceTitle: "各省缴费单金额统计",
            };
            this.getUpdateCityTitle({ cityName, countryTitle });
          
        }else{
            this.elecfeeImgCoulmns[1].title = "地市";
          console.log(this.$route,'dsdsfdgfgfgf')
         
            const cityName = this.getCodeVerIndex(cityId)||''
            countryTitle =  {
              surveyTitle: "电费稽核概况",
              provinceTitle: "各地市缴费单稽核数量统计",
              scoreTitle: "分区间占比",
              tabProvinceTitle: "各地市缴费单稽核数量详单",
            };
            this.getUpdateCityTitle({ cityName, countryTitle });
        }
        const cityFilterData = JSON.parse(JSON.stringify(this.cityFilterData));
         this.linechartOptionsOne = JSON.parse(JSON.stringify( this.linechartOptions));
         const diffArr = ['linechartOptions','linechartOptionsOne']
        if (this.linechartOptions && this.linechartOptions.tooltip) {
          for(let i=0;i<diffArr.length;i++){
           this[diffArr[i]].tooltip.formatter = (name) => {
            let total = 0;
            let target = 0;
            let toolpitArr = "";
            let pointColor = "";
            let ninetoten = 0;
            let eightto9 = 0;
            let sixto8 = 0;
            let zerotosix = 0;
            let percent = 0;
            let pass_number = 0;
            let notpass_number = 0;
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
                if(diffArr[i]=='linechartOptionsOne'){
                  pass_number =  cityFilterData[item].pass_number
                  notpass_number =  cityFilterData[item].notpass_number
                }
              } else {
                pointColor = colorSet.mainSet[0];
              }
            });
            if(diffArr[i]=='linechartOptionsOne'){
                   toolpitArr = `<div style="font-size:12px;">
          <div><span>未通过: ${notpass_number}</span><span>通过: ${pass_number}</span><span style="margin-left:10px">${percent}%</span></div>
          <div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span>未通过: ${notpass_number}</span><span>通过: ${pass_number}</span><span style="margin-left:10px">${percent}%</span></div> 
          <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span>未通过: ${notpass_number}</span><span>通过: ${pass_number}</span><span style="margin-left:10px">${percent}%</span></div>
          <div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span>未通过: ${notpass_number}</span><span>通过: ${pass_number}</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div>
             <hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/>
             <div style="display:flex;align-items:center">
             <div style="width:6px;height:6px;background:${pointColor};margin-right:5px"></div>
             <div>${name.name}省 稽核条数/占比</div></div> </div>`;
            }else{
            toolpitArr = `<div style="font-size:12px;"><div>0-6分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${zerotosix}元</span><span style="margin-left:10px">${percent}%</span></div><div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span style="margin-left:10px">${percent}%</span></div> <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span style="margin-left:10px">${percent}%</span></div><div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div><hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${pointColor};margin-right:5px"></div><div>${name.name}省 稽核条数/占比</div></div> </div>`;
            }
            return toolpitArr;
          };
          }
         
        }
        this.piechartOptions.tooltip.formatter = (name) => {
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
          let toolpitStr = `<div style='padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国电费缴纳单 ${fraction}分 </div></div>`;
          return toolpitStr;
        };
        this.linechartOptions.series[0].itemStyle.color = colorSet.mainSet;
         this.linechartOptionsOne.series[0].itemStyle.color = colorSet.mainSet;
        this.piechartOptions.series[0].itemStyle.color = colorSet.mainPieSet;

        pieCharts.style.display = "none";
      } else if (+key === 1) {
        this.getElecfeeTableData({ page: 1 });
        this.checkdetailTableColumns = checkdetailColumns;
        pieCharts.style.display = "block";
        lineData = [930, 780, 720, 60, 320, 420, 530, 280, 420, 500];
        pieData = [
          {
            value: 2587,
            name: "电费",
            fraction: "9-10",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 1626,
            name: "铁塔服务费",
            fraction: "8-9",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 1062,
            name: "租费",
            fraction: "6-8",
            itemStyle: { normal: { color: "" } },
          },
          {
            value: 985,
            name: "稽核总量",
            fraction: "0-6",
            itemStyle: { normal: { color: "" } },
          },
        ];
        colorSet.mainPieSet = ["#5B8FF9", "#5AD8A6", "#E8684A", "#F6BD16"];
        if (this.$route.name == "elecfee") {
          colorSet.mainSet = ["rgba(71, 199, 253, 0.85)"];
        
          pieData.map((item, index) => {
            item.itemStyle.normal.color = colorSet.mainPieSet[index];
          });
        } else {
         
            colorSet.mainSet =["rgba(119, 114, 241, 0.85)"] 
          const colornew = [
            "rgba(119, 114, 241, 0.85)",
            "rgba(206, 119, 251, 0.85)",
            "rgba(90, 220, 255, 0.85)",
            "rgba(71, 167, 253, 0.85)",
          ];
          pieData.map((item, index) => {
            item.itemStyle.normal.color = colornew[index];
          });
          // this.piechartOptions.series[0].itemStyle.color = ['rgba(119, 114, 241, 0.85)', 'rgba(206, 119, 251, 0.85)', "rgba(90, 220, 255, 0.85)", "rgba(71, 167, 253, 0.85)"]
          this.piechartOptions.series[0].color = colornew;
        }

        this.linechartOptions.tooltip.formatter = (name) => {
          const cityFilterData = this.cityFilterData;
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
          toolpitArr = `<div style="font-size:12px;"><div>0-6分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${zerotosix}元</span><span style="margin-left:10px">${percent}%</span></div><div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span style="margin-left:10px">${percent}%</span></div> <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span style="margin-left:10px">${percent}%</span></div><div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div><hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${pointColor};margin-right:5px"></div><div>${name.name}省 稽核条数/占比</div></div> </div>`;
          return toolpitArr;
        };

        this.piechartOptions.tooltip.formatter = (name) => {
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
          let toolpitStr = `<div style='padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国电费缴纳单 ${fraction}分 </div></div>`;
          return toolpitStr;
        };
        this.linechartOptions.series[0].itemStyle.color = colorSet.mainSet;
      }
      this.linechartOptions.series[0].data = lineData;
       this.linechartOptionsOne.series[0].data = lineData;
      this.piechartOptions.series[0].data = pieData;
       lineChart1.setOption(this.linechartOptionsOne);
      lineChart.setOption(this.linechartOptions);
      piechart.setOption(this.piechartOptions);
    },
    echartsColors(colorMain) {
      const lineChart = this.$echarts.init(
        document.getElementById("linechart")
      );
      console.log(colorMain,'colorMain')
      this.linechartOptions.tooltip.formatter = (name) => {
        const cityFilterData = this.cityFilterData;
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
            pointColor = colorMain[index];
          } else {
            pointColor = colorMain[0];
          }
        });
        toolpitArr = `<div style="font-size:12px;"><div>0-6分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${zerotosix}元</span><span style="margin-left:10px">${percent}%</span></div><div>6-8分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${sixto8}元</span><span style="margin-left:10px">${percent}%</span></div> <div>8-9分<span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important"> ${eightto9}元</span><span style="margin-left:10px">${percent}%</span></div><div><span style="position:relative;left:-4px;">9-10分</span><span style="min-width:100px;padding:3px 16px;display:inline-block;text-align:right!important;position:relative;left:-4px;"> ${ninetoten}元</span><span style="margin-left:6px;position:relative;left:-2px;">${percent}%</span></div><hr style='margin:4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${pointColor};margin-right:5px;display:inline-block"></div><div>${name.name}省 稽核条数/占比</div></div> </div>`;
        return toolpitArr;
      };
      this.linechartOptions.series[0].itemStyle.color = colorMain;
      lineChart.setOption(this.linechartOptions);
    },
    pieEchartsColor(colorPie,rendeData=[]) {
      const piechart = this.$echarts.init(document.getElementById("piechart"));

      this.piechartOptions.legend.formatter = (name) => {
        const pieData = rendeData//piechartOptions.series[0].data;
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
        // console.log("999");
        return legendArr;
      };
      // const pieData = [
      //   {
      //     value: 2587,
      //     name: "电费",
      //     fraction: "9-10",
      //     itemStyle: { normal: { color: "" } },
      //   },
      //   {
      //     value: 1626,
      //     name: "铁塔服务费",
      //     fraction: "8-9",
      //     itemStyle: { normal: { color: "" } },
      //   },
      //   {
      //     value: 1062,
      //     name: "租费",
      //     fraction: "6-8",
      //     itemStyle: { normal: { color: "" } },
      //   },
      //   {
      //     value: 985,
      //     name: "稽核总量",
      //     fraction: "0-6",
      //     itemStyle: { normal: { color: "" } },
      //   },
      // ];
      let pieData = this.pieData; 
      pieData.map((item, index) => {
        item.itemStyle.normal.color = colorPie[index];
      });
      this.piechartOptions.tooltip.formatter = (name) => {
        const pieData =rendeData// piechartOptions.series[0].data;
        let toolpitColor = "";
        let target = 0;
        let total = 0;
        let fraction = "";
        for (let i = 0; i < pieData.length; i++) {
          total += pieData[i].value;
          if (pieData[i].name === name.name) {
            toolpitColor = colorPie[i];
            target = name.value;
            fraction = pieData[i].fraction;
          }
        }
        const percent = ((target / total) * 100).toFixed(1);
        let toolpitStr = `<div style='padding:8px;text-align:left;margin-top:-4px'><span style='font-size:16px'>${target}</span><span style='font-size:12px'>条</span><span style='color:#585A69;font-size:12px;margin-left:28px'>${percent}%占比</span></div><hr style='margin:-4px 4px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:6px;height:6px;background:${toolpitColor};margin:0 5px"></div><div style='text-align:center;margin:0px'>全国电费缴纳单 ${fraction}分 </div></div>`;
        return toolpitStr;
      };

      this.piechartOptions.series[0].color = colorPie;
      this.piechartOptions.series[0].data = pieData;
      piechart.setOption(this.piechartOptions);
    },
    callbackhandle(value) {
      console.log(value);
    },
    rowHandle(record, index) {
      return {
        on: {
          click: () => {
            const { name = "elecfee" } = this.$route;
            if (name !== "elecfeecitydetail") {
              console.log(index,'index')
              this.updateCityId("QG");
              this.getUpdateCityTitle("");
              this.getChangeCity(record.prv_name);
              sessionStorage.setItem("record", JSON.stringify(record));
            }
          },
        },
      };
    },
    getIndexCityId(name){
       const index = provinceCode.findIndex(item=>item.name==name)
       return index;
    },
    getCodeVerIndex(code){
       let strName;
        const index = provinceCode.find(item=>{
          if(item.code==code){
            strName = item.name.length>=3?item.name.slice(0,2):item.name
          }
        })
       return strName;
    },
    getCodeName(name){

     let codeName;
     provinceCode.find(item=>{
         const newName = item.name.length>=3?item.name.slice(0,2):item.name;
          if(newName==name){
            codeName = item.code
          }
        })
       return codeName;
    },
    getChangeCity(name) {
      const nowName = name.length>=3?name.slice(0,2):name;
      const getIndex =this.getIndexCityId(name)
      const getCodeName = this.getCodeName(nowName)
      this.updateCityId(name);
      this.getUpdateCityTitle(getCodeName, countryTitle);
      this.$router.push({
        name: "elecfeecitydetail",
        path: `/elecfee/elecfeeCityDetail/:id` + getCodeName,
        params: {
          cityId: getCodeName,
        },
      });
      util.jumpTop();
    },
    handleHeadData() {
      this.getHeadData({});
    },
    filterHandle() {
      this.$store.commit("replaceBreadcrumb", [
        {
          path: "/elecfee/elecfeeDetai",
          breadcrumbName: "稽核详情",
        },
      ]);
      this.$router.push({
        path: "/elecfee/elecfeeDetail",
      });
      util.jumpTop();
    },
    drawLines() {
      this.checkallPieNumber = 0;
      const lineChart = this.$echarts.init(
        document.getElementById("linechart")
      );
      const xAxisData = [];
      for (let i = 0; i < this.elecfeeTable.length; i++) {
        const name =
          this.elecfeeTable[i].prv_name.length >= 3
            ? this.elecfeeTable[i].prv_name.slice(0, 2)
            : this.elecfeeTable[i].prv_name;
        xAxisData.push(name);
      }
      const {
        name = "elecfee",
        params: { cityId = "QG" },
      } = this.$route;
      let lineColor;
      if (name == "elecfeecitydetail" && cityId !== "-1") {
            lineColor = ["rgba(119, 114, 241, 0.85)"]
      }else{
         lineColor =["rgba(91, 143, 249, 0.85)"];
      }
      this.linechartOptions.series[0].data = this.lineData;
      console.log('jisnss',this.pieData)
      this.piechartOptions.series[0].data = this.pieData;
      this.linechartOptions.series[0].cityFilterData = this.cityFilterData;
      this.linechartOptions.series[0].itemStyle.color = lineColor;
      this.linechartOptions.xAxis.data = xAxisData;
      lineChart.setOption(this.linechartOptions);
      const piechart = this.$echarts.init(document.getElementById("piechart"));
      piechart.setOption(this.piechartOptions);
      // this.pieData.map((pie) => {
      //   this.checkallPieNumber += pie.value;
      // });
      console.log(this.alldataTable)
      this.checkallPieNumber = util.transferNum(this.checkallPieNumber);
      piechart.on("legendselectchanged", function (options) {
        const name = options.name,
          selected = options.selected;
        const option = piechart.getOption();
        const selectKey = [];
        for (let prop in selected) {
          if (hasOwnProperty.call(selected, prop)) selectKey.push(prop);
        }
        if (
          !selectKey.filter(function (key) {
            return selected[key];
          }).length
        ) {
          option.legend[0].selected[name] = true;
        }
        piechart.setOption(option);
      });
    },
    handleChartRange(e) {
      const timeRange = e.target.value;
      const timeParams = util.getAllTimeRange(timeRange);
      if (+this.currentType === 1) {
        this.getElecfeeTableData(Object.assign(timeParams, { page: 1 }));
      } else {
        this.getElecImgTableData(
          Object.assign(timeParams, { page: 1, scope: "1" })
        );
      }
    },
    handleStatistic(e) {
      if (+this.currentType === 1) {
        this.getElecfeeTableData(
          Object.assign({ object: e.target.value }, { page: 1 })
        );
      } else {
        this.getElecImgTableData(
          Object.assign({ object: e.target.value }, { page: 1, scope: "1" })
        );
      }
    },
    handleTableData(params) {
      const paramObj = Object.assign(this.checkallParams, params);
      const paramate = Object.assign(this.checkEchartsPrvParams, params);
      console.log(params,'paramObj')
      this.getElecfeeTableData(paramObj);
      this.getEchartsEleTableData(paramate)
      this.totalPage = this.detailTotal;
    },
    handleDetailPagesize(pageSize) {
      if (+this.currentType === 1 && this.cityId === "QG") {
        this.getElecfeeTableData({ page: 1, page_size: +pageSize });
      } else if (+this.currentType === 1 && this.cityId !== "QG") {
        const cityName = this.elecfeeTable[this.cityId].prv_name;
        const cityId = provinceCode.filter((item) => {
          if (item.name === cityName) {
            return item.code;
          }
        });
        this.getProElecfeeTableData(
          Object.assign({}, this.initParams, {
            prv_code: cityId[0].code,
            page: 1,
            page_size: +pageSize,
          })
        );
      } else {
        this.getElecImgTableData({ page: 1, page_size: +pageSize, scope: "1" });
      }
    },
    handlePaginationChange(page, pageSize) {
      if (+this.currentType === 1 && this.cityId === "-1") {
        this.getElecfeeTableData({ page: +page, page_size: +pageSize });
      } else if (+this.currentType === 1 && this.cityId !== "-1") {
        const cityName = this.elecfeeTable[this.cityId].prv_name;
        const cityId = provinceCode.filter((item) => {
          if (item.name === cityName) {
            return item.code;
          }
        });
        this.getProElecfeeTableData(
          Object.assign({}, this.initParams, {
            prv_code: cityId[0].code,
            page: +page,
            page_size: +pageSize,
          })
        );
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
          left: 102px;
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