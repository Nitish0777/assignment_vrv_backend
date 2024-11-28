const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db'); 
const userRouter = require('./routes/index');
const Category = require('./models/category');
const createCategory = require('./category.json');
const User = require('./models/user');

dotenv.config();

const corsOptions = {
    exposedHeaders: 'auth-token',
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to the database and seed categories
(async () => {
    try {
        await connectDB(); // Connect to the database
        console.log('Database is connected...');

        // Seed categories if none exist
        const count = await Category.countDocuments();
        if (count === 0) {
            await Category.create(createCategory);
            console.log('Categories seeded successfully.');
        }
    } catch (error) {
        console.error('Error during database initialization:', error.message);
        process.exit(1); // Exit process with failure
    }
})();

// Routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the User Management API',
    });
});

app.get('/health', (req, res) => {
    return res.status(200).json({
        message: 'Server is up and running',
    });
});

app.get('/find', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.use('/api', userRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
