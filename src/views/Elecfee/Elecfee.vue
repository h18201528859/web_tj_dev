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
            <p class="pieCenter-title">稽核量</p>
            <p class="pieCenter-number">{{ checkallPieNumber }}</p>
          </div>
          <div id="piechart" style="height: 100%; width: 80%"></div>
        </div>     
      </div>
      <div v-if="cityId=='-1'">
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
        <div class="header_p"><div class="title-front"></div>{{cityTitle.tabProvinceTitle}}</div>
        <div class="operations">
          <a-button class="button" @click="filterHandle" type="primary"
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
        >
          <template slot="type" slot-scope="text">
            <router-link :to="{name: text,path: '/elecfee/elecfeeCityDetail/:cityId'+record.id, params: { cityId: record.id }}"> {{ text }}</router-link>
            
          </template>
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
    checkdetailColumns,
    cityArr
  } from "./constants";
import { mapActions, mapState ,mapMutations} from "vuex";
export default {
   computed: {
    ...mapState({
      headData: (state) => state.elecfee.headData,
      elecfeeTable:(state) => state.elecfee.elecfeeTable,
      cityTitle:(state) => state.elecfee.cityTitle,
      cityId: state => state.elecfee.cityId
    }),
  },
  data(){
    return {
      HeadCardItems,
      lineData: [930, 780, 720,700,680,550,320,270,230,125],
      pieData: [
        { value: 2587, name: "电费" ,fraction:'9-10'},
        { value: 1626, name: "铁塔服务费",fraction:'8-9'},
        { value: 1062, name: "租费",fraction:'6-8' },
        { value: 985, name: "稽核总量",fraction:'0-6' },
      ],
      linechartOptions,
      piechartOptions,
      checkallPieNumber: 0,
      checkallTableColumns: checkallColumns,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 15,
      mode: 'top',
      cityArr
    };
  },
  components: {
    HeadCardItem,
  },
  created() {
    this.handleHeadData();
    this.getElecfeeTableData();
    const {params:{ cityId='-1' },name} = this.$route;
    console.log(this.$route,'elecddsds')
    if(name == 'elecfeecitydetail'){
      const cityName = this.cityArr[cityId].name;
      this.getUpdateCityTitle(cityName);
    }
  },
  mounted() {
    this.drawLines();
  },
  methods: {
    ...mapMutations("elecfee",['updateCityId']),
    ...mapActions("elecfee", ["getHeadData", "getElecfeeTableData","getUpdateCityTitle"]),
    callback(key){
      const lineChart = this.$echarts.init(document.getElementById("linechart"));
      const piechart = this.$echarts.init(document.getElementById("piechart"));
       const pieCharts = document.querySelector('.pie-chart');
      let lineData = [], pieData=[],colorSet={mainSet:[],mainPieSet:[]};
      if(key=='2'){
           lineData = [980,760,745,710,690,520,436,360,320,220,40]
           pieData= [
                { value: 1020, name: "电费" ,fraction:'9-10'},
                { value: 1300, name: "铁塔服务费",fraction:'4-9'},
                { value: 1340, name: "租费",fraction:'2-8' },
                { value: 650, name: "稽核总量",fraction:'0-6' },
              ]
              colorSet.mainSet = [
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
                ];
              colorSet.mainPieSet = ['#317CFF','#47C7FD','#F6AE16','#5AD8A6']
              if( this.linechartOptions && this.linechartOptions.tooltip){
                this.linechartOptions.tooltip.formatter = (name)=>{
                    const nameSet = this.linechartOptions.xAxis.data;
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
                }
              }
             this.linechartOptions.series[0].itemStyle.color = function(params){
                let colorList = colorSet.mainSet;
                return colorList[params.dataIndex];
             }
              this.piechartOptions.tooltip.formatter = (name)=>{
                let total = 0;
                let target = 0;
                let toolpitArr = "";
                let pointColor = "";
                for (let i = 0; i < pieData.length; i++) {
                    total += pieData[i].value;
                    if (pieData[i].name === name.name) {
                        target = name.value;
                        pointColor = colorSet.mainPieSet[i];
                    }
                }
                const percent = ((target / total) * 100).toFixed(1);
                toolpitArr = `<div style="text-align:left;font-size:12px"> <div style='font-size:16px;margin-bottom:8px'>${target}<span style="font-size:12px"> 条</span></div>  <div style="margin-bottom:8px"><span>${percent}%</span>占比</div><hr style='margin:-4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:10px;height:10px;border-radius:50%;background:${pointColor};margin-right:5px"></div><div>全国近一年${name.name}</div></div> </div>`;
                return toolpitArr;
             }
             this.piechartOptions.series[0].itemStyle.color = function(params){
                let colorList = colorSet.mainPieSet;
                return colorList[params.dataIndex];
             }
            
             pieCharts.style.display = "none"
      }else{
         pieCharts.style.display = "block"
        lineData = [930, 780, 720,700,680,550,320,270,230,125]
         pieData=[
            { value: 2587, name: "电费" ,fraction:'9-10'},
            { value: 1626, name: "铁塔服务费",fraction:'8-9'},
            { value: 1062, name: "租费",fraction:'6-8' },
            { value: 985, name: "稽核总量",fraction:'0-6' },
          ]
          colorSet.mainSet = [
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
            ];
          colorSet.mainPieSet =  [
            "#5B8FF9",
            "#5AD8A6",
            "#E8684A",
            "#F6BD16"
          ]
             this.linechartOptions.tooltip.formatter = (name)=>{
                //const lineData = pieData;
                const nameSet = this.linechartOptions.xAxis.data;
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
             }
             this.linechartOptions.series[0].itemStyle.color = function(params){
                let colorList = colorSet.mainSet;
                return colorList[params.dataIndex];
             }
              this.piechartOptions.tooltip.formatter = (name)=>{
                let total = 0;
                let target = 0;
                let toolpitArr = "";
                let pointColor = "";
                for (let i = 0; i < pieData.length; i++) {
                    total += pieData[i].value;
                    if (pieData[i].name === name.name) {
                        target = pieData[i].value;
                        pointColor = colorSet.mainPieSet[i];
                    }
                }
                const percent = ((target / total) * 100).toFixed(1);
                toolpitArr = `<div style="text-align:left;font-size:12px"> <div style='font-size:16px;margin-bottom:8px'>${target}<span style="font-size:12px"> 条</span></div>  <div style="margin-bottom:8px"><span>${percent}%</span>占比</div><hr style='margin:-4px 0px 8px;background: rgba(0, 5, 18, 0.06);height:1px;border:none;'/><div style="display:flex;align-items:center"><div style="width:10px;height:10px;border-radius:50%;background:${pointColor};margin-right:5px"></div><div>全国近一年${name.name}</div></div> </div>`;
                return toolpitArr;
             }
             this.piechartOptions.series[0].itemStyle.color = function(params){
                let colorList = colorSet.mainPieSet;
                return colorList[params.dataIndex];
             }

      }
       this.linechartOptions.series[0].data = lineData;
      this.piechartOptions.series[0].data = pieData;
      lineChart.setOption(this.linechartOptions);
      piechart.setOption(this.piechartOptions);
    },

    callbackhandle(value){
      console.log(value);
    },
    getChangeCity(key){
      this.updateCityId(key);
      const cityName = this.cityArr[key].name;
      this.getUpdateCityTitle(cityName);
      this.$store.dispatch("setCurrentBread", [
       {
          path: "/elecfee/elecfeeCityDetail/:cityId"+key,
          breadcrumbName: `${this.cityArr[key].name}电费稽核`,
        },
      ]);
      this.$router.push({
        name: 'elecfeecitydetail',
        path:`/elecfee/elecfeeCityDetail/:id`+key,
        params:{
          cityId:key
        }
      });
    },
    handleHeadData() {
      this.linechartOptions.series[0].data = this.lineData;
      this.piechartOptions.series[0].data = this.pieData;
      this.getHeadData();
    },
    filterHandle(){
        this.$store.commit("replaceBreadcrumb", [
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
      this.checkallPieNumber = 0;
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
          const name = options.name, selected = options.selected;
          const option = piechart.getOption();
          const selectKey = [];
          for (let prop in selected) {
              if (hasOwnProperty.call(selected, prop)) selectKey.push(prop);
          }
          if (!selectKey.filter(function (key) {
              return selected[key];
          }).length) {
              option.legend[0].selected[name] = true;
          }
          piechart.setOption(option);
      });
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
      .red {
        color: #f24444;
      }
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
.title-front {
    width: 4px;
    height: 14px;
    background: #0068ff;
    margin: 4px 8px 4px;
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
      margin-right: 8px;
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
.jump-wrap .head-item:hover{
  box-shadow:none;
}
.legend-name{margin-right:16px}
</style>