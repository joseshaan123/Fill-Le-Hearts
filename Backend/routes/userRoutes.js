import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);



router.post('/',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('message').trim().notEmpty().withMessage('Message is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // this code create a new contact document
            const newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
            });

            // this code save the document to the database
            const savedContact = await newContact.save();
            console.log('Contact form data saved:', savedContact); 

            // This code sends respond with a success message
            res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            // This code handle errors during database operations
            console.error('Error saving contact form data:', error);
            res.status(500).json({ error: 'Failed to send message. Please try again.' });
        }
    }
);

export default router;
