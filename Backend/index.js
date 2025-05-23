import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let dbURI = process.env.DB_URI;
if (!dbURI) {
  console.error('DB_URI is not defined in .env file');
  dbURI = 'mongodb://localhost:27017/test';
}

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

connectDB();

app.use('/api/contact', userRoutes);

app.use((req, res, next) => {
  console.log('404 Handler:', req.method, req.path);
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.use((err, req, res, next) => {
    console.error("500 Error Handler:", err);
    res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
