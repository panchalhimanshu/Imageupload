const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://imageupload:imageupload@imageupload.cqizagp.mongodb.net/?retryWrites=true&w=majority&appName=Imageupload');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model for storing images in MongoDB
const imageSchema = new mongoose.Schema({
    imageData: String,
});
const Image = mongoose.model('Image', imageSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle image upload
app.post('/uploadImage', async (req, res) => {
    const { image } = req.body;

    // Save image data to MongoDB
    try {
        const newImage = new Image({ imageData: image });
        await newImage.save();
        console.log('Image saved to MongoDB');
        res.status(200).send('Image uploaded successfully');
    } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        res.status(500).send('Error saving image');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
