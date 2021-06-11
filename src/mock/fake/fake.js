const faker = require("faker");
const _ = require("lodash");
faker.locale = "zh_CN";

module.exports = {
    getCheckallAmout: {
        ret_message: "请求成功",
        ret_code: "10000",
        ret_data: {
            total_amount: faker.random.number(),
            total_number: faker.random.number(),
        },
    },
    getElecSum: {
        ret_message: "请求成功",
        ret_code: "10000",
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
        ret_code: "10000",
        ret_data: {
            all_data: {
                total_amount: "59383",
                pass_number: "100",
                notpass_number: "1000",
                zerotosix: "399",
                sixtoeight: "9933",
                eighttonine: "989",
                ninetoten: "299",
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
    getImageStatistics: {
        ret_message: "请求成功",
        ret_code: "10000",
        ret_data: {
            all_data: {
                total_amount: "120022",
                notpass_amount: "2888",
                total_number: "10000",
                notpass_number: "2000",
            },
            prv_data: _.times(15, function() {
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
