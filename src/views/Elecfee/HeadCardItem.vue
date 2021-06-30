
<template>
  <div class="head-item">
    <div class="left">
      <img :src="icon" alt="image" class="img" />
      <div class="right-item">
        <span>{{ headTitle }}</span>
      </div>
    </div>
    <div class="count-box">
      <div class="all-cont">
        <span class="all-text">{{ upElecfeeNumber || 0 }}</span>
        <span class="fraction-text">{{ allText }}</span>
      </div>
      <div class="money-cont">
        <span class="month-text">{{ downElecfeeNumber || 0 }}</span>
        <span class="fraction-text">{{ monthText }}</span>
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
    allText: {
      type: String,
      default: "总量/亿单",
    },
    monthText: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    currentData: {
      total_amount: {
        total: 0,
        month: 0,
      },
      total_number: {
        total: 0,
        month: 0,
      },
    },
  },
  watch: {
    currentData(newValue) {
      this.currentData = newValue;
      this.upElecfeeNumber =
        this.type === "amount"
          ? util.transferNum(newValue.total_amount / 100000000)
          : util.transferNum(newValue.total_number / 10000);
      this.downElecfeeNumber =
        this.type === "amount"
          ? util.transferNum(newValue.month_amount / 100000000)
          : util.transferNum(newValue.month_number / 10000);
    },
  },
  data() {
    return {
      upElecfeeNumber: 0,
      downElecfeeNumber: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.head-item {
  width: 100%;
  margin-right: 24px;
  padding: 24px;
  flex-flow: column;
  flex: 1;
  justify-content: space-between;
  background: hsl(0deg 0% 100%);
  .left {
    display: flex;
    align-items: center;
    .img {
      margin-bottom: -6px;
      width: 44px;
      height: 44px;
    }
    .right-item {
      span {
        margin-left: 10px;
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
  .count-box {
    display: flex;
    padding-top: 8px;
    padding-left: 5px;
    text-align: left;
    .all-cont {
      flex: 1;
      .all-text {
        font-size: 28px;
        font-weight: 400;
        color: #343642;
      }
      .fraction-text {
        font-size: 14px;
        font-weight: 400;
        color: #7f828f;
        margin-left: 8px;
      }
    }
    .money-cont {
      flex: 1;
      .month-text {
        font-size: 28px;
        font-weight: 400;
        color: #343642;
      }
      .fraction-text {
        font-size: 14px;
        font-weight: 400;
        color: #7f828f;
        margin-left: 8px;
      }
    }
    .money-cont::before {
      content: "";
      height: 24px;
      width: 1px;
      background: #e9ebef;
      margin-right: 24px;
      position: relative;
      display: inline-block;
      top: 5px;
      color: #7f828f;
    }
  }
}
.head-item:last-child {
  margin-right: 0;
}
</style>