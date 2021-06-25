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
          <a-radio-group v-decorator="['object', { initialValue: '0' }]">
            <a-radio value="0"> 数量 </a-radio>
            <a-radio value="1"> 金额 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="稽核类型" name="稽核类型">
          <a-radio-group v-decorator="['types', { initialValue: 'fee' }]">
            <a-radio value="fee"> 电费(缴费单）</a-radio>
            <a-radio value="image"> 电费(电表图) </a-radio>
          </a-radio-group>
        </a-form-item>
        <div class="city-box" v-if="!cityFlag">
          <a-form-item
            label="地区选择"
            default-value="vertical"
            name="地区选择"
          >
            <a-radio-group v-decorator="['provice', { initialValue: 'a' }]">
              <a-radio value="a"> 全部省份 </a-radio>
              <a-radio value="b"> 自选省份 </a-radio>
            </a-radio-group>
            <a-select
              :default-value="[]"
              mode="multiple"
              :size="size"
              style="width: 200px"
              @change="handleChange"
            >
              <a-select-opt-group>
                <span slot="label">直辖市</span>
                <template v-for="i in provinceCode">
                  <a-select-option
                    v-if="i.isProvince"
                    :key="i.code"
                    :value="i.code"
                  >
                    {{ i.name }}
                  </a-select-option>
                </template>
              </a-select-opt-group>
              <a-select-opt-group label="省份">
                <template v-for="i in provinceCode">
                  <a-select-option
                    v-if="!i.isProvince && !i.isWhole"
                    :key="i.code"
                    :value="i.code"
                  >
                    {{ i.name }}
                  </a-select-option>
                </template>
              </a-select-opt-group>
            </a-select>
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
                    @change="handleScoreRangeChange"
                  >
                    <a-radio-button value="1"> 0-6分 </a-radio-button>
                    <a-radio-button value="2"> 6-8分 </a-radio-button>
                    <a-radio-button value="3"> 8-9分 </a-radio-button>
                    <a-radio-button value="4"> 9-10分 </a-radio-button>
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
                    v-decorator="['recentTime', { initialValue: '' }]"
                    @change="handleRecentTimeRange"
                  >
                    <a-radio-button value="month"> 近一月 </a-radio-button>
                    <a-radio-button value="three"> 近三月 </a-radio-button>
                    <a-radio-button value="six"> 近半年 </a-radio-button>
                    <a-radio-button value="year"> 近一年 </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-radio>
              <a-radio value="c">
                自定义
                <a-range-picker
                  v-decorator="['timerange', { initialValue: null }]"
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  :placeholder="[starttimeHold, starttimeHold]"
                  @change="handlefouce"
                  @ok="handleTimeRangeChange"
                  class="range-date"
                  style="margin-left: 20px"
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
        <a-form-item class="btn-wrap" v-else-if="extendIcon == 'up'">
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
                :value="currentPageSize"
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
import { checkdetailColumns } from "./constants";
import { provinceCode } from "../../const/constant";
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      plainOptions: ["电费(缴费单)", "电费(电表图)"],
      checkallPieNumber: 0,
      checkdetailTableColumns: checkdetailColumns,
      checkedList: [],
      totalPage: 0,
      currentPageSize: 10,
      indeterminate: true,
      checkAll: false,
      extendText: "收起",
      extendIcon: "up",
      cityFlag: false,
      provinceCode,
      cityId: "0",
      size: "default",
      starttimeHold: moment().format("YYYY.MM.DD HH:mm:ss"),
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
  },
  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
    detailPagesize(newValue) {
      this.currentPageSize = newValue;
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
    this.getCheckallDetailData({ type: 1, params: { page: 1, page_size: 10 } });
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

    cancelHandle(e) {
      this.checkedList = [];
      this.form.resetFields();
      this.handleSubmit(e);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.radioChecked = this.checkedList;
          values.page = 1;
          values.page_size = 10;
          console.log(values, "values");
          this.getCheckallDetailData({
            type: 1,
            params: values,
          });
        }
      });
      //type:
      // 1：缴费单+全国
      // 2：缴费单+省份
      // 3：电表+全国
      // 4：电表+省份
      //
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
    handleRecentTimeRange(e) {
      this.form.setFieldsValue({
        "radio-time": "b",
      });
      console.log(e, "---->获得确定的时间段的值");
    },
    handleScoreRangeChange(e) {
      this.form.setFieldsValue({
        "radio-frationType": "b",
      });
      console.log(e, "---->获得自定义分数的值");
    },
    transferChange(e) {
      if (e.target.value !== "b") {
        this.form.setFieldsValue({
          "radio-childTimeType": "",
        });
      }
    },
    handleChange() {
      this.form.setFieldsValue({
        "radio-provice": "b",
      });
    },
    valtorFranction(rule, value, callback) {
      callback();
    },
    handlefouce() {
      console.log("时间聚焦选项");
      this.form.setFieldsValue({
        "radio-time": "c",
      });
    },
    handleTimeRangeChange(value) {
      console.log(value, "---->自定义时间段的值");
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
      this.currentPageSize = pageSize;
      this.getCheckallDetailData({
        type: 1,
        params: { page: 1, page_size: +pageSize },
      });
    },
    handlePaginationChange(page, pageSize) {
      this.getCheckallDetailData({
        type: 1,
        params: { page: +page, page_size: +pageSize },
      });
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
.range-date {
  width: 350px !important;
}
</style>