<template>
  <div class="jump-wrap">
  
    <div class="header-section">
       <a-form
          id="components-form-demo-validate-other"
          :form="form"      
          @submit="handleSubmit"
          layout="inline"
          class="from-box"
        >
    <a-form-item label="统计类型" name="统计类型">
      <a-radio-group v-decorator="['radio-types',{initialValue:'number'}]">
        <a-radio value="number">
          数量
        </a-radio>
        <a-radio value="all">
          全部
        </a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="稽核类型" name="稽核类型">
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
          全部
        </a-checkbox>
      <a-checkbox-group   v-model="checkedList" :options="plainOptions" @change="onChange" >
      </a-checkbox-group>
    </a-form-item>
    <div class="city-box" v-if="cityFlag">
        <a-form-item label="地区选择" default-value="vertical" name="地区选择">
          <div>
          <a-radio-group v-decorator="['radio-provice',{initialValue:'a'}]">
            <a-radio value="a">
              全部省份
            </a-radio>
            <a-radio value="b">
              自选省份
            </a-radio>
          </a-radio-group>
           <a-select default-value="lucy" style="width: 120px" @change="handleChange">
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="lucy">
                Lucy
              </a-select-option>
              <a-select-option value="disabled">
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>
         </div>
        </a-form-item>
        <a-form-item label="">
          <div class="all-city">
            <a-radio-group v-decorator="['radio-city', {initialValue: 'a'}]">
              <a-radio value="a">
                全部城市
              </a-radio>
              <a-radio value="b">
                自选城市
              </a-radio>
            </a-radio-group>
             <a-select default-value="lucy" style="width: 120px" @change="handleChange">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
          </div>
        </a-form-item>
        <a-form-item label="稽核得分" default-value="vertical">
          <a-radio-group v-decorator="['radio-frationType',{initialValue:'a'}]">
            <a-radio value="a">
              全部
            </a-radio>
            <a-radio value="b" class="radio-fraction">
              分数段
              <a-form-item class="child-fraction">
                <a-radio-group  v-decorator="['radio-childFrationType',{initialValue:''}]">
                  <a-radio-button value="a"> 0-6分 </a-radio-button>
                  <a-radio-button value="b"> 6-8分 </a-radio-button>
                  <a-radio-button value="c"> 8-9分 </a-radio-button>
                  <a-radio-button value="d"> 9-10分 </a-radio-button>
                </a-radio-group>
              </a-form-item>
            </a-radio>
             <a-radio value="c" class="radio-auto">
              自定义
               <a-input-number placeholder="" class="radio-ipt"/>-<a-input-number placeholder="" class="radio-ipt" />分
            </a-radio>
          </a-radio-group>
          
        </a-form-item>
          <a-form-item label="稽核时间" default-value="vertical">
          <a-radio-group v-decorator="['radio-time',{initialValue:'a'}]">
            <a-radio value="a">
              不限
            </a-radio>
            <a-radio value="b" class="radio-time">
              时间段
                <a-form-item class="child-fraction">
                  <a-radio-group v-decorator="['radio-childTimeType',{initialValue:''}]">
                    <a-radio-button value="a"> 近一月 </a-radio-button>
                    <a-radio-button value="b"> 近三月 </a-radio-button>
                    <a-radio-button value="c"> 近半年 </a-radio-button>
                    <a-radio-button value="d"> 近一年 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
            </a-radio>
             <a-radio value="c">
              自定义
               <a-range-picker @change="onChangeDate" >
                 <a-icon slot="suffixIcon" type="calendar" />
               </a-range-picker>
            </a-radio>
          </a-radio-group>
          
            
        </a-form-item>
    </div>
    <a-form-item class="btn-wrap">
       <a-button type="primary" html-type="submit">
         搜索
      </a-button>
      <a-button class="reset-btn">
         清空
      </a-button>
    </a-form-item>
    <a-form-item class="extend-box">
      <div class="extend-text" @click="handleExtend">
         {{ extendText }} <a-icon :type="extendIcon" />
      </div> 
    </a-form-item>
  </a-form>
</div>
    <div class="detail-section">
      <div class="header">
        <p>各省缴费单稽核数量统计TOP10</p>
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
import { 
    checkallColumns,
    checkdetailColumns
  } from "./constants";
import {  mapState ,mapActions} from "vuex";

export default {
  data(){
    return {
      // plainOptions : [
      // {label:'电费(缴费单)', value:'a'},
      // {label:'电费(电表图)', value:'b'},
      // {label:'铁塔服务费', value:'c'},
      // {label:'租费', value:'d'}
      // ],
      plainOptions:['电费(缴费单)','电费(电表图)','铁塔服务费','租费'],
      checkallPieNumber: 0,
      checkallTableColumns: checkallColumns,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 15,
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      extendText:'展开',
      extendIcon:'down',
      cityFlag:false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  computed: {
    ...mapState({
      checkallTable: (state) => state.checkall.checkallTable,
    }),
  },
  created() {
    this.getCheckallTableData();
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
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.radioChecked = this.checkedList;
          console.log('Received values of form: ', values);
        }
      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
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
    onChangeDate(date, dateString){
       console.log(date, dateString);
    },
   handleChange(value){
      console.log(`selected ${value}`);
   },
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, { 
        checkedList: e.target.checked?this.plainOptions:[],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    handleExtend(){
      this.extendText = this.extendText == '展开' ? '收起' : '展开';
      this.extendIcon = this.extendIcon == 'down' ? 'up' : 'down';
      this.cityFlag = !this.cityFlag;
      let btnWrap = document.querySelector('.btn-wrap');
      btnWrap.style.display =this.extendText=='展开' ? 'inline-block':'block';
    }
  },
};
</script>


<style lang="less" scoped>
.jump-wrap {
  .header-section {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    padding:24px;
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
      };
      .amount-box{
         margin-right:16px;
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
.hide{
  display: none;
}
.from-box{
  position: relative;
  text-align: left;
  .city-box{
    text-align: left;
    display: flex;
    flex-flow: column;
    .all-city{
      margin-left:70px;
    }
  }
  .radio-fraction,.radio-time{
    margin-left:28px;
    display: inline;
    .child-fraction{
       margin-left:8px;
    }
  }
  .radio-auto{
    margin-left:22px;
  }
  .reset-btn{
    margin-left:16px;
    margin-right:16px;
  }
  .extend-box{
    position: absolute;
    right: -50px;
    top: 0px;
  }
  .extend-text{
    color:#1890ff;
    cursor: pointer;
  }
  .btn-wrap{
   
    text-align: left;
  }
  .radio-ipt{
    width: 100px;
  }
}
</style>