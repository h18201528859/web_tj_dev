import moment from "moment";
import { provinceCode } from "../const/constant";

export default {
    // change the menu key to router path
    transformUrlpathstr(str) {
        let pathstr = str.toLowerCase().replace(/\s*/g, "");
        pathstr = pathstr.replace(/\/*/g, "");
        return pathstr;
    },
    transToLocaleString(num) {
        return num.toLocaleString();
    },
    getLastDaysPeriod(period) {
        let timeArr = [];
        for (let i = 0; i < period; i++) {
            let tiemItem = moment()
                .subtract(i, "days")
                .format("MM-DD");
            timeArr.push(tiemItem);
        }
        return timeArr.reverse();
    },
    pasteContent(str) {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    },
    strBool(val) {
        return val === "true" ? true : false;
    },
    jumpTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.pageYOffset = 0;
    },
    getAllTimeRange(type = "all") {
        let current = moment().format("YYYY-MM-DD HH:mm:ss");
        if (type === "all") {
            const defaultTime = "1990-01-01 00:00:00";
            const timeParams = {
                start_time: defaultTime,
                end_time: current,
            };
            return timeParams;
        } else if (type === "month") {
            //获取近三个月的时间段
            const lastMonth = moment()
                .subtract(1, "months")
                .format("YYYY-MM-DD HH:mm:ss");
            const timeParams = {
                start_time: lastMonth,
                end_time: current,
            };
            return timeParams;
        } else if (type === "three") {
            //获取近三个月的时间段
            const lastThreeMonth = moment()
                .subtract(1, "quarters")
                .format("YYYY-MM-DD HH:mm:ss");
            const timeParams = {
                start_time: lastThreeMonth,
                end_time: current,
            };
            return timeParams;
        } else if (type === "six") {
            //获取近6个月的时间段
            const lastSixMonth = moment()
                .subtract(6, "months")
                .format("YYYY-MM-DD HH:mm:ss");
            const timeParams = {
                start_time: lastSixMonth,
                end_time: current,
            };
            return timeParams;
        } else if (type === "year") {
            //获取近12个月的时间段
            const lastYear = moment()
                .subtract(1, "years")
                .format("YYYY-MM-DD HH:mm:ss");
            const timeParams = {
                start_time: lastYear,
                end_time: current,
            };
            return timeParams;
        }
    },
    transferNum(num = 0) {
        if (typeof num === "string") {
            num = Number(num);
        }
        return num.toLocaleString();
    },
    getCodeName(name) {
        let codeName;
        provinceCode.find((item) => {
            const newName =
                item.name.length >= 3 ? item.name.slice(0, 2) : item.name;
            if (newName == name) {
                codeName = item.code;
            }
        });
        return codeName;
    },
    getCodeVerIndex(code) {
        let strName;
        provinceCode.find((item) => {
            if (item.code == code) {
                strName =
                    item.name.length >= 3 ? item.name.slice(0, 2) : item.name;
            }
        });
        return strName;
    },
};
