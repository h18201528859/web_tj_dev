import moment from "moment";

export default {
    // change the menu key to router path
    transformUrlpathstr(str) {
        let pathstr = str.toLowerCase().replace(/\s*/g, "");
        pathstr = pathstr.replace(/\/*/g, "");
        return pathstr;
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
    getAllTimeRange() {
        const current = moment().format("YYYY-MM-DD HH:MM:SS");
        const defaultTime = "1990-01-01 00:00:00";
        const timeParams = {
            start_time: defaultTime,
            end_time: current,
        };
        return timeParams;
    },
};
