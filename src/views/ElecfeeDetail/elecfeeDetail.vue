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
          <a-radio-group
            v-decorator="['radio-types', { initialValue: 'number' }]"
          >
            <a-radio value="number"> 数量 </a-radio>
            <a-radio value="all"> 金额 </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="稽核类型" name="稽核类型">
          <a-checkbox
            :indeterminate="indeterminate"
            :checked="checkAll"
            @change="onCheckAllChange"
          >
            全部
          </a-checkbox>
          <a-checkbox-group
            v-model="checkedList"
            :options="plainOptions"
            @change="onChange"
          >
          </a-checkbox-group>
        </a-form-item>
        <div class="city-box" v-if="!cityFlag">
          <a-form-item
            label="地区选择"
            default-value="vertical"
            name="地区选择"
          >
            <div>
              <a-radio-group
                v-decorator="['radio-provice', { initialValue: 'a' }]"
              >
                <a-radio value="a"> 全部省份 </a-radio>
                <a-radio value="b"> 自选省份 </a-radio>
              </a-radio-group>
              <!-- <a-select
                mode="multiple"
                :size="size"
                placeholder="请输入或选择"
                :default-value="[]"
                style="width: 290px"
                @change="handleChange"
                @popupScroll="popupScroll"
              >
                 <a-select-option v-for="i in cityArr" :key="i.id" :value="i.id">
                  {{ i.name }}
                </a-select-option>
              </a-select> -->
              <a-select
                :default-value="[]"
                mode="multiple"
                :size="size"
                style="width: 200px"
                @change="handleChange"
              >
                <a-select-opt-group>
                  <span slot="label">直辖市</span>
                   <a-select-option v-for="i in unitCityArr" :key="i.id" :value="i.id">
                      {{ i.name }}
                    </a-select-option>
                 
                </a-select-opt-group>
                <a-select-opt-group label="省份">
                  <a-select-option value="山东省"> 山东省 </a-select-option>
                  <a-select-option value="河南省"> 河南省 </a-select-option>
                </a-select-opt-group>
              </a-select>
            </div>
          </a-form-item>
          <a-form-item label="" style="display: none">
            <div class="all-city">
              <a-radio-group
                v-decorator="['radio-city', { initialValue: 'a' }]"
              >
                <a-radio value="a"> 全部城市 </a-radio>
                <a-radio value="b"> 自选城市 </a-radio>
              </a-radio-group>
              <!-- <a-select
                default-value="lucy"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> Jack </a-select-option>
                <a-select-option value="lucy"> Lucy </a-select-option>
                <a-select-option value="disabled"> Disabled </a-select-option>
                <a-select-option value="Yiminghe"> yiminghe </a-select-option>
              </a-select> -->
            </div>
          </a-form-item>
          <a-form-item label="稽核得分" default-value="vertical">
            <a-radio-group
              v-decorator="['radio-frationType', { initialValue: 'a' }]"
              @change="alternate"
            >
              <a-radio value="a"> 全部 </a-radio>
              <a-radio value="b" class="radio-fraction">
                分数段
                <a-form-item class="child-fraction">
                  <a-radio-group
                    v-decorator="[
                      'radio-childFrationType',
                      {
                        initialValue: '',
                        required: true,
                        validator: this.valtorFranction,
                        trigger: 'change',
                      },
                    ]"
                     @change="alternateRadio"
                  >
                    <a-radio-button value="a"> 0-6分 </a-radio-button>
                    <a-radio-button value="b"> 6-8分 </a-radio-button>
                    <a-radio-button value="c"> 8-9分 </a-radio-button>
                    <a-radio-button value="d"> 9-10分 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-radio>
              <a-radio value="c" class="radio-auto">
                自定义
                <a-input-number
                  placeholder=""
                  class="radio-ipt"
                  style="margin-left: 20px"
                /><span class="line-radio">-</span
                ><a-input-number
                  placeholder=""
                  class="radio-ipt"
                  style="margin-right: 9px"
                />分
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="稽核时间" default-value="vertical">
            <a-radio-group
              v-decorator="['radio-time', { initialValue: 'a' }]"
              @change="transferChange"
            >
              <a-radio value="a"> 不限 </a-radio>
              <a-radio value="b" class="radio-time">
                时间段
                <a-form-item class="child-fraction-time">
                  <a-radio-group
                    v-decorator="['radio-childTimeType', { initialValue: '' }]"
                      @change="alterTimeHandle"
                  >
                    <a-radio-button value="a"> 近一月 </a-radio-button>
                    <a-radio-button value="b"> 近三月 </a-radio-button>
                    <a-radio-button value="c"> 近半年 </a-radio-button>
                    <a-radio-button value="d"> 近一年 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-radio>
              <a-radio value="c">
                自定义
                <a-range-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                :placeholder="[starttimeHold, starttimeHold]"
                @change="onChange"
                @ok="onOk"
                class="range-date"
                style="margin-left:20px"
              >
                 <a-icon slot="suffixIcon" type="calendar" />
              </a-range-picker>
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <a-form-item class="btn-wrap" v-if="extendIcon == 'down'">
          <a-button class="reset-btn" @click="cancelHandle"> 清空 </a-button>
          <a-button type="primary" html-type="submit"> 搜索 </a-button>
        </a-form-item>
        <a-form-item class="btn-wrap" v-if="extendIcon == 'up'">
          <a-button type="primary" html-type="submit" class="serach-btn">
            搜索
          </a-button>
          <a-button class="reset-btn summom-set" @click="cancelHandle">
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
      <div class="header">稽核详单</div>
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
          <template slot="notpass" slot-scope="text">
            <span class="red">{{ text }}</span>
          </template>
          <template slot="type">
            <span>电费</span>
          </template>
          <template slot="notpassper" slot-scope="text, all">
            <span>{{
              `${(
                (Number(all.notpass_number) / Number(all.total_amount)) *
                100
              ).toFixed(2)}%`
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
import { efecfeeTabColumns, unitCityArr } from "../../views/Elecfee/constants";
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      plainOptions: ["电费(缴费单)", "电费(电表图)"],
      checkallPieNumber: 0,
      checkdetailTableColumns: efecfeeTabColumns,
      checkedList: [],
      totalPage: 0,
      indeterminate: true,
      checkAll: false,
      extendText: "收起",
      extendIcon: "up",
      cityFlag: false,
      unitCityArr,
      cityId: "0",
      size: 'default',
      starttimeHold:moment().format("YYYY.MM.DD HH:mm:ss")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
  },
  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
  },
  computed: {
    ...mapState({
      checkallDetail: (state) => state.checkdetail.checkallDetail,
      detailTotal: (state) => state.checkdetail.detailTotal,
      detailPage: (state) => state.checkdetail.detailPage,
      detailPagesize: (state) => state.checkdetail.detailPagesize,
      detailTableLoading: (state) => state.checkdetail.detailTableLoading,
    }),
  },
  created() {
    this.getCheckallDetailData({ page: 1, pageSize: 10 });
    this.totalPage = this.checkallDetail.length;
  },
  beforeRouteEnter(to, from, next) {
    const { name } = from;
    next((vm) => {
      if (name == "elecfeecitydetail") {
        vm.extendText = "收起";
        vm.extendIcon = "up";
        vm.cityFlag = false;
      } else {
        vm.extendText = "展开";
        vm.extendIcon = "down";
        vm.cityFlag = true;
      }
    });
  },
  methods: {
    ...mapActions("checkdetail", ["getCheckallDetailData"]),

    cancelHandle() {
      this.checkedList = [];
      this.form.resetFields();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.radioChecked = this.checkedList;
        }
      });
    },
    popupScroll() {
      console.log("popupScroll");
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },

    onChangeDate(date, dateString) {
      console.log(date, dateString);
    },
    alternate(e) {
      if (e.target.value !== "b") {
        this.form.setFieldsValue({
          "radio-childFrationType": "",
        });
      }
    },
    alterTimeHandle(){
       this.form.setFieldsValue({
            'radio-time': 'b'
          })
    },
    alternateRadio(){
         this.form.setFieldsValue({
            'radio-frationType': 'b'
          })
    },
    transferChange(e){
      if(e.target.value!=='b'){
        this.form.setFieldsValue({
          "radio-childTimeType": "",
        });
      }
    },
    handleChange(value) {
        this.form.setFieldsValue({
          'radio-provice': 'b'
        })
    },
    valtorFranction(rule, value, callback) {
      callback();
    },
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    handleExtend() {
      this.extendText = this.extendText == "展开" ? "收起" : "展开";
      this.extendIcon = this.extendIcon == "down" ? "up" : "down";
      this.cityFlag = !this.cityFlag;
      let btnWrap = document.querySelector(".btn-wrap");
      btnWrap.style.display =
        this.extendText == "展开" ? "inline-block" : "block";
    },
    handleDetailPagesize(pageSize) {
      console.log(pageSize);
      this.getCheckallDetailData({ page: 1, pageSize: +pageSize });
    },
    handlePaginationChange(page, pageSize) {
      this.getCheckallDetailData({ page: +page, pageSize: +pageSize });
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
  },
};
</script>


<style lang="less" scoped>
.jump-wrap {
  .header-section {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    padding: 24px;
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
        margin-right: 16px;
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
      .title {
        display: flex;
        margin-bottom: 16px;
        p {
          text-align: left;
        }
      }
    }
  }
  .detail-section {
    min-height: 280px;
    margin: 24px 0;
    padding: 24px;
    background: #ffffff;
    text-align: left;
    .header {
      display: flex;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #343642;
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
.from-box {
  position: relative;
  text-align: left;
  width: 100%;
  .city-box {
    text-align: left;
    display: flex;
    flex-flow: column;
    .all-city {
      margin-left: 70px;
    }
  }
  .radio-fraction,
  .radio-time {
    margin-left: 28px;
    display: inline;
    .child-fraction {
      margin-left: 25px;
      .ant-radio-button-wrapper {
        padding: 0 18px;
      }
    }
    .child-fraction-time {
      margin-left: 25px;
    }
  }

  .reset-btn {
    margin-right: 16px;
  }
  .summom-set {
    margin-left: 16px;
  }
  .extend-box {
    position: absolute;
    right: 20px;
    top: 0px;
  }
  .extend-text {
    color: #0068ff;
    cursor: pointer;
  }
  .btn-wrap {
    text-align: left;
  }
  .radio-ipt {
    width: 80px;
  }
  .line-radio {
    padding: 0 5px;
  }
}
.serach-btn {
  width: 200px;
}
.title-front {
  width: 4px;
  height: 14px;
  background: #0068ff;
  margin: 3px 8px 3px;
}
.range-date{
  width:350px!important;
}
</style>