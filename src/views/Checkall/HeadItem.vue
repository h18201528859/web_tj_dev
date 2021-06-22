<template>
  <div class="head-item" @click="JumptoOtherPage(page)">
    <div class="left">
      <img :src="icon" alt="image" />
      <div class="right-item">
        <span>{{ headTitle }}</span>
        <a-tooltip placement="topLeft" arrow-point-at-center>
          <a-icon type="question-circle" class="tooltip-icon" />
          <template slot="title">
            <span>{{ toolpit }}</span>
          </template>
        </a-tooltip>
      </div>
    </div>

    <div class="right">
      <div class="item">
        <span class="number">{{ upNumber }}</span>
        <span class="count">万单</span>
      </div>
      <div class="item">
        <span class="number">{{ downNumber }}</span>
        <span class="count">亿元</span>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../utils/utils";
export default {
  name: "HeadItem",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    headTitle: {
      type: String,
      default: "电费",
    },
    icon: {
      type: String,
      default: require("./icon/1.png"),
    },
    toolpit: {
      type: String,
      default: "网络设施、设备运转中按周期支出的电力费用",
    },
    currentData: {
      count: 0,
      number: 0,
    },
  },
  watch: {
    currentData(newValue) {
      if (this.headTitle === "电费") {
        this.upNumber = util.transferNum(Number(newValue.total_number) / 10000);
        this.downNumber = util.transferNum(
          Number(newValue.total_amount) / 100000000
        );
      } else {
        this.upNumber = 0;
        this.downNumber = 0;
      }
    },
  },
  data() {
    return {
      upNumber: util.transferNum(Number(this.currentData.total_number) / 10000),
      downNumber: util.transferNum(
        Number(this.currentData.total_amount) / 100000000
      ),
    };
  },
  methods: {
    JumptoOtherPage(page = 1) {
      switch (page) {
        case 1:
          window.location.hash = "/elecfee";
          break;
        case 2:
          break;
        case 3:
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head-item {
  width: 380px;
  margin-right: 24px;
  padding: 24px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  cursor: pointer;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 72px;
      margin-top: 5px;
    }
    .right-item {
      span {
        margin-left: 16px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #343642;
      }

      .tooltip-icon {
        margin-left: 5px;
        color: #b6b9c2;
      }
    }
  }
  .right {
    text-align: right;
    .item {
      .number {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #343642;
      }
      .count {
        margin-left: 8px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7f828f;
      }
    }
  }
}
.head-item:last-child {
  margin-right: 0;
}
.head-item:hover {
  box-shadow: 0px -1px 8px 1px rgba(0, 0, 0, 0.2);
}
</style>