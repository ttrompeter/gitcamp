const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

//mongoose.connect('mongodb://localhost:27017/yelp-camp');
mongoose.connect('mongodb://localhost:27017/camping');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    //for (let i = 0; i < 50; i++) {
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        let randomPrice = Math.floor(Math.random() * 20) + 10;
        if (randomPrice % 2 === 0) {
            randomPrice += 0.25
        } else {
            randomPrice += 0.75
        }
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            //image: 'https://images.unsplash.com/photo-1752564627655-168bd1be3202?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Delectus praesentium nobis totam velit eveniet consequatur voluptatem, unde, optio reprehenderit numquam doloribus saepe sed laudantium.Ratione, temporibus distinctio! Natus alias facilis optio minus illum est hic distinctio? Similique, in alias doloremque est, soluta quam quod eaque cupiditate iure voluptatem exercitationem reiciendis adipisci aspernatur corrupti, laborum tempore ipsa magnam ducimus molestiae! Quidem tempora sit cupiditate est, molestias voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, laudantium labore! Atque mollitia, recusandae repellat soluta eligendi quas et facere deserunt dolores omnis modi, molestiae, tenetur delectus error nemo perspiciatis?',
            price: randomPrice
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})