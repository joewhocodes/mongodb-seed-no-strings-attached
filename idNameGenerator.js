const { faker } = require('@faker-js/faker');

function randomAlphaNumeric () {
    return Math.random().toString(36).charAt(2);
};

function createFromPattern (pattern) {
    pattern = pattern.split('');
    return pattern.map(x => x.replace('x', randomAlphaNumeric())).join('');
};

const idNameGenerator = () => {
    let userIds = [];
    for (let i = 1; i < 78; i++) {
        const gender = faker.person.sex();
        const img = `https://xsgames.co/randomusers/assets/avatars/${gender}/${i}.jpg`
        userIds.push({
            id: createFromPattern('xxxxxxxxxx'),
            name: faker.person.firstName(gender),
            profileImg: img
        })
    }
    return userIds;
}

console.log(idNameGenerator())