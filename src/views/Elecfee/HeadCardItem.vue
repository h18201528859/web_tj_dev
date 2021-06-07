
<template>
  <div class="head-item" @click="JumptoOtherPage(page)">
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
      default: "总量/单",
    },
    monthText: {
      type: String,
      default: "",
    },
    currentData: {
      count: 0,
      number: 0,
    },
  },
  watch: {
    currentData(newValue) {
      this.upElecfeeNumber = newValue.number;
      this.downElecfeeNumber = newValue.count;
    },
  },
  data() {
    return {
      upElecfeeNumber: this.currentData.number,
      downElecfeeNumber: this.currentData.count,
    };
  },
  methods: {
    JumptoOtherPage(page = 1) {
      console.log(page);
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
  width: 100%;
  margin-right: 24px;
  padding: 24px;
  flex-flow: column;
  justify-content: space-between;
  background: hsl(0deg 0% 100%);
  .left {
    display: flex;
    .img {
      width: 24px;
      height: 24px;
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
  .count-box {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    width: 60%;
    .fraction-text {
      color: #7f828f;
      margin-left: 8px;
    }
    .all-text,
    .month-text {
      font-size: 24px;
    }
    .money-cont::before {
      content: "";
      height: 24px;
      width: 1px;
      background: #cccccc;
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
.head-item:hover {
  box-shadow: 0px -1px 8px 1px rgba(0, 0, 0, 0.2);
}
</style>