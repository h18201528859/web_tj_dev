const baseUrl = "/Payment";
export default {
    //mock api
    mock: {
        address: "/address",
        customerinfo: "/customer/info",
        xurantest: "/xuran/test/json",
        alarmformdata: "/alarm/formdata/v1/multiple",
        home: "/home",
        deleteaddress: "/delete/address",
        putname: "/articles",
    },
    getSum: baseUrl + "/GetSum",
    getStatistics: baseUrl + "/GetStatistics",
    getImageStatistics: baseUrl + "/GetImageStatistics",
    getElecSum: baseUrl + "/GetElecSum",
};
