const faker = require("faker");
const _ = require("lodash");
faker.locale = "zh_CN";

module.exports = {
    customer: _.times(20, function(n) {
        return {
            id: n,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            avatar: faker.internet.avatar(),
        };
    }),
    getCheckallDetail: {
        code: 200,
        message: "SUCCESS",
        total: 15,
        body: _.times(15, function(n) {
            return {
                rank: n + 1,
                type: faker.database.type(),
                province: faker.random.word(),
                ninetoten: faker.random.number(),
                eightto9: faker.random.number(),
                sixto8: faker.random.number(),
                zerotosix: faker.random.number(),
                total: faker.random.number(),
                passtotal: faker.random.number(),
                notpass: faker.random.number(),
                notpassper: faker.random.number(),
            };
        }),
    },

    getVNFM: {
        code: 200,
        message: "SUCCESS",
        total: 50,
        body: _.times(26, function(n) {
            return {
                id: n + 1,
                name: faker.name.firstName(),
                type: faker.random.word(),
                vendor: faker.random.word(),
                version: "V" + faker.random.number(),
                url: faker.internet.url(),
                vim: faker.name.firstName(),
                certificateUrl: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
                createTime: faker.date.recent(),
                updateTime: null,
            };
        }),
    },
};
