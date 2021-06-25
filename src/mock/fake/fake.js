const faker = require("faker");
const _ = require("lodash");
faker.locale = "zh_CN";

module.exports = {
    getCheckallAmout: {
        ret_message: "请求成功",
        ret_code: "0",
        ret_data: {
            total_amount: faker.random.number(),
            total_number: faker.random.number(),
        },
    },
    getElecPrvSum: {
        ret_code: 0,
        ret_message: "操作成功",
        ret_data: {
            total_amount: "7303039331.495939",
            total_number: "3054242",
            month_amount: "116347236.49983999",
            month_number: "43976",
        },
    },
    getElecSum: {
        ret_message: "请求成功",
        ret_code: "0",
        ret_data: {
            total_amount: {
                total: faker.random.number(),
                month: faker.random.number(),
            },
            total_number: {
                total: faker.random.number(),
                month: faker.random.number(),
            },
        },
    },
    getStatistics: {
        ret_message: "请求成功",
        ret_code: "0",
        ret_data: {
            all_data: {
                total_amount: faker.random.number(),
                pass_number: faker.random.number(),
                notpass_number: faker.random.number(),
                zerotosix: faker.random.number(),
                sixtoeight: faker.random.number(),
                eighttonine: faker.random.number(),
                ninetoten: faker.random.number(),
            },
            prv_data: _.times(10, function() {
                return {
                    prv_name: faker.address.state(),
                    ninetoten: faker.random.number(),
                    eighttonine: faker.random.number(),
                    sixtoeight: faker.random.number(),
                    zerotosix: faker.random.number(),
                    total_amount: faker.random.number(),
                    pass_number: faker.random.number(),
                    notpass_number: faker.random.number(),
                };
            }),
        },
    },
    getEchartStatistics: {
        ret_message: "请求成功",
        ret_code: "0",
        ret_data: {
            all_data: {
                total_amount: faker.random.number(),
                pass_number: faker.random.number(),
                notpass_number: faker.random.number(),
                zerotosix: faker.random.number(),
                sixtoeight: faker.random.number(),
                eighttonine: faker.random.number(),
                ninetoten: faker.random.number(),
            },
            prv_data: _.times(31, function() {
                return {
                    prv_name: faker.address.state(),
                    ninetoten: faker.random.number(),
                    eighttonine: faker.random.number(),
                    sixtoeight: faker.random.number(),
                    zerotosix: faker.random.number(),
                    total_amount: faker.random.number(),
                    pass_number: faker.random.number(),
                    notpass_number: faker.random.number(),
                };
            }),
        },
    },
    getImageStatistics: {
        ret_message: "请求成功",
        ret_code: "0",
        ret_data: {
            all_data: {
                total_amount: faker.random.number(),
                notpass_amount: faker.random.number(),
                total_number: faker.random.number(),
                notpass_number: faker.random.number(),
            },
            prv_data: _.times(10, function() {
                return {
                    prv_name: faker.address.state(),
                    total_amount: faker.random.number(),
                    notpass_amount: faker.random.number(),
                    pass_amount: faker.random.number(),
                };
            }),
        },
    },
};
