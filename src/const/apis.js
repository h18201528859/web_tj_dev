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
    getElecSum: baseUrl + "/GetElecSum",
    getElecPrvSum: baseUrl + "/GetElecPrvSum",
    getStatistics: baseUrl + "/GetStatistics",
    getEchartStatistics: baseUrl + "/getEchartStatistics",
    getPrvStatistics: baseUrl + "/GetPrvStatistics",
    getImageStatistics: baseUrl + "/GetImageStatistics",
    getImgPrvStatistics: baseUrl + "/GetImgPrvStatistics",
};
