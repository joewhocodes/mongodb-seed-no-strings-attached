// require the necessary libraries
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Product = require('./model');
const cities = require('./cities');
const userIds = require('./userIds');
const { nanoid } = require('nanoid');

const randomCity = cities[Math.floor(Math.random() * cities.length)];

const randomNumGenerator = (minimum, maximum) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return (randomNum = Math.floor(Math.random() * (max - min) + min));
};

const createUserInstruments = () => {
    let instrument = ['Guitar', 'Bass', 'Vocals', 'Keyboard', 'Drums'];
    const skillLevel = ['Beginner', 'Intermediate', 'Professional'];

    let userInstruments = [];

    for (let i = 0; i < randomNumGenerator(1, 6); i++) {
        const randomSkill =
            skillLevel[Math.floor(Math.random() * skillLevel.length)];
        const randomInstrument =
            instrument[Math.floor(Math.random() * instrument.length)];
        const randomUserInstrument = {
            instrument: randomInstrument,
            skillLevel: randomSkill,
        };
        userInstruments.push(randomUserInstrument);
        instrument = instrument.filter(ins => ins !== randomInstrument);
    }
    return userInstruments;
};

const createUserFriends = id => {
    let userFriends = [];
    let friends = userIds.filter(user => user !== id);

    for (let i = 0; i < randomNumGenerator(0, 50); i++) {
        let randomNum = randomNumGenerator(1, 76);
        console.log(`friend is ${randomNum}`)
        userFriends.push(friends[randomNum].id);
    }
    return userFriends;
};

const createUserComments = id => {
    let userComments = [];
    for (let i = 0; i < randomNumGenerator(1, 20); i++) {
        let randomNum = randomNumGenerator(1, 76);
        let randomFriend = userIds[randomNum];

        console.log(`create user comments friend is ${randomFriend}`)

        userComments.push({
            commendId: nanoid(),
            firstName: randomFriend.name,
            profileImg: randomFriend.profileImg,
            comment: faker.lorem.sentence({ min: 3, max: 10 }),
            userId: randomFriend.id,
        });
    }
    return userComments;
};

console.log(` length = ${userIds.length}`)

// console.log(userIds[5])
// console.log(createUserComments())
// console.log(` keys are ${Object.values(userIds[0])}`)

async function seedData() {
    // Connection URL
    const uri =
        'mongodb+srv://joewhocodes:d0rEpl7yGtVz6Xj3@no-strings-attached.rmgvc1s.mongodb.net/no-strings-attached?retryWrites=true&w=majority';
    const seed_count = 30;
    mongoose.set('strictQuery', false);
    await mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Connected to db');
        })
        .catch(err => {
            console.log('error', err);
        });

    let timeSeriesData = [];
    for (let i = 0; i < seed_count; i++) {
        const _id = userIds[i].id;
        const firstName = faker.person.firstName('female');
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 15 });
        const profileImg = 'https://xsgames.co/randomusers/avatar.php?g=female';
        const location = randomCity;
        const instruments = createUserInstruments();
        const friends = createUserFriends(_id);
        const comments = createUserComments(_id);
        const bio = faker.person.bio();
        timeSeriesData.push({
            _id,
            firstName,
            email,
            password,
            profileImg,
            location,
            instruments,
            friends,
            comments,
            bio,
        });
    }

    const seedDB = async () => {
        await Product.insertMany(timeSeriesData);
    };

    seedDB().then(() => {
        mongoose.connection.close();
        console.log('seed success');
    });
}

seedData();
