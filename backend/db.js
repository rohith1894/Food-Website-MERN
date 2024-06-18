const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://rohith1894:rohi1894th@cluster0.pshl5ha.mongodb.net/FoodO?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to database successfully");

        const db = mongoose.connection.db;
        const fetched_data = db.collection('food_items');
        const foodCategory = db.collection('foodCategory');
        const data = await fetched_data.find({}).toArray();
        const categoricalData = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = categoricalData;
        // console.log(global.food_items);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

module.exports = mongoDB;
