require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));


// Routes
app.use('/api', bookRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));