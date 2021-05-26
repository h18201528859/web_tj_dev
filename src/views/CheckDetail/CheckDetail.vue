<template>
  <div class="checkdetail">
    <div class="toolbar">
      <div class="collapis">
        <a-form-model
          layout="inline"
          ref="collapisForm"
          :model="formCollapis"
          @submit="handleSubmit"
          @submit.native.prevent
        >
          <a-row>
            <a-col :span="6">
              <a-form-model-item label="统计类型" prop="types">
                <a-radio-group v-model="formCollapis.types">
                  <a-radio value="number"> 数量 </a-radio>
                  <a-radio value="all"> 全部 </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="14">
              <a-form-model-item label="稽核类型" prop="checktypes">
                <a-checkbox-group v-model="formCollapis.checktypes">
                  <a-checkbox value="all" name="type"> 全部 </a-checkbox>
                  <a-checkbox value="elec-fee" name="type">
                    电费（缴费单）
                  </a-checkbox>
                  <a-checkbox value="elec-digram" name="type">
                    电费（电表图单）
                  </a-checkbox>
                  <a-checkbox value="tower" name="type">
                    铁塔服务费
                  </a-checkbox>
                  <a-checkbox value="rent" name="type"> 租费 </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="4" v-if="collapis">
              <a-form-model-item>
                <a-button @click="resetForm">清空</a-button>
                <a-button
                  style="margin-left: 8px"
                  type="primary"
                  html-type="submit"
                  >搜索</a-button
                >
              </a-form-model-item>
            </a-col>
          </a-row>
          <div v-if="collapis">
            <a-form-model-item
              label="地区选择"
              prop="areas"
              style="width: 100%"
            >
              <a-radio-group v-model="formCollapis.areas">
                <a-radio value="allprovince">全部省份</a-radio>
                <a-radio value="number">
                  <span>自选省份</span>
                  <a-select default-value="lucy" style="width: 120px">
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                  </a-select>
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item
              style="width: 100%; margin-left: 69px"
              label=""
              prop="cities"
            >
              <a-radio-group v-model="formCollapis.cities">
                <a-radio value="allcity"> 全部城市 </a-radio>
                <a-radio value="number">
                  <span>自选城市</span>
                  <a-select default-value="lucy" style="width: 120px">
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                  </a-select>
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item
              label="稽核得分"
              prop="points"
              style="width: 100%"
            >
              <a-radio-group v-model="formCollapis.points">
                <a-radio value="all" style="margin-top: 5px"> 不限 </a-radio>

                <a-radio value="range">
                  <span>分数段</span>
                  <a-radio-group>
                    <a-radio-button value="a"> 0-6分</a-radio-button>
                    <a-radio-button value="b"> 6-8分 </a-radio-button>
                    <a-radio-button value="c"> 8-9分 </a-radio-button>
                    <a-radio-button value="d"> 9-10分 </a-radio-button>
                  </a-radio-group>
                </a-radio>
                <a-radio value="custom">
                  <span>自定义</span>
                  <a-input-number placeholder="请输入" /> -
                  <a-input-number placeholder="请输入" /> 分
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item
              label="稽核时间"
              prop="areas"
              style="width: 100%"
            >
              <a-radio-group v-model="formCollapis.checktime">
                <a-radio value="all" style="margin-top: 5px"> 不限 </a-radio>
                <a-radio value="range"> 时间段 </a-radio>
                <a-radio-group>
                  <a-radio-button value="a"> 近一月 </a-radio-button>
                  <a-radio-button value="b"> 近三月 </a-radio-button>
                  <a-radio-button value="c"> 近半年 </a-radio-button>
                  <a-radio-button value="d"> 近一年 </a-radio-button>
                </a-radio-group>

                <a-radio value="custom"> 自定义 </a-radio
                ><a-range-picker
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  :placeholder="['Start Time', 'End Time']"
                />
              </a-radio-group>
            </a-form-model-item>

            <a-form-model-item v-if="collapis">
              <a-button style="width: 160px" type="primary" html-type="submit"
                >搜索</a-button
              >
              <a-button @click="resetForm" style="margin-left: 8px"
                >清空</a-button
              >
            </a-form-model-item>
          </div>
        </a-form-model>
      </div>

      <div class="operations">
        <a v-if="collapis" @click="hanldeCollapis"
          >展开<a-icon type="down" style="font-size: 12px; margin-left: 5px"
        /></a>
        <a v-else @click="hanldeCollapis"
          >收起<a-icon type="up" style="font-size: 12px; margin-left: 5px"
        /></a>
      </div>
    </div>
    <div class="table">
      <p>稽核详情</p>
      <div class="table-detail">
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
import { checkdetailColumns } from "./constants";
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.handleDetailData({ page: 1, pageSize: 10 });
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
  watch: {
    detailTotal(newValue) {
      this.totalPage = newValue;
    },
  },
  data() {
    return {
      collapis: true,
      checkdetailTableColumns: checkdetailColumns,
      totalPage: 0,
      formCollapis: {
        checktypes: ["all"],
        types: "number",
        areas: "",
        cities: "",
        points: "",
        checktime: "",
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 2 },
          sm: { offset: 2 },
        },
      },
    };
  },
  methods: {
    ...mapActions("checkdetail", ["getCheckallDetailData"]),
    hanldeCollapis() {
      this.collapis = !this.collapis;
    },
    handleDetailData({ page, pageSize }) {
      this.getCheckallDetailData({ page: page, pageSize: pageSize });
      this.totalPage = this.detailTotal;
    },
    handleDetailPagesize(pageSize) {
      this.handleDetailData({ page: 1, pageSize: +pageSize });
    },
    handlePaginationChange(page, pageSize) {
      this.handleDetailData({ page: page, pageSize: pageSize });
    },
    handleSubmit() {
      console.log(this.formCollapis);
    },
    resetForm() {
      this.$refs.collapisForm.resetFields();
    },
  },
};
</script>

<style lang="less">
.checkdetail {
  .toolbar {
    margin-bottom: 24px;
    padding: 30px 24px;
    background: #ffffff;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    .collapis {
      width: 100%;
    }

    .operations {
      width: 80px;
      align-self: flex-start;
      margin-top: 10px;
    }
  }
  .table {
    padding: 24px;
    background: #ffffff;
    border-radius: 2px;
    p {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      text-align: left;
      color: #343642;
    }
    .table-detail {
      .red {
        color: #f24444;
      }
      margin-top: 15px;
      .pagination {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        margin-bottom: 16px;
        .left-pagination {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>