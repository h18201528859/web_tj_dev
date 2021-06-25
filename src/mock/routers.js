module.exports = {
    "/articles/:user": "/articles?user=:user",
    "/:resource/:id/show": "/:resource/:id",
    "/lang/local": "/getCurrentLanguage",
    "/lang/local?language=:language": "/getCurrentLanguage",
    ///////<-------------Checkall--------->/////
    "/POST/Payment/GetSum": "/getCheckallAmout",
    "/POST/Payment/GetStatistics": "/getStatistics",
    "/POST/Payment/getEchartStatistics": "/getEchartStatistics",
    "/POST/Payment/GetImageStatistics": "/getImageStatistics",
    "/POST/Payment/GetElecSum": "/getElecSum",
    "/POST/Payment/GetElecPrvSum": "/getElecPrvSum",

    "/api/*": "/$1",
    "/*/*": "/$1_$2",
    "/*/*/*": "/$1_$2_$3",
    "/*/*/*/*": "/$1_$2_$3_$4",
    "/*/*/*/*/*": "/$1_$2_$3_$4_$5",
};
