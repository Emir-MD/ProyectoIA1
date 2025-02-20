const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/commentsDB')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB Connection Error:'));
db.once('open', () => console.log('✅ MongoDB Connection Opened'));

// Esquema y modelo de comentarios
const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classification: { type: String, default: 'Pending' }
});
const Comment = mongoose.model('Comment', CommentSchema);

// Ruta para verificar que el backend está corriendo
app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});

// Ruta para clasificar comentarios con Ollama
app.post('/api/classify', async (req, res) => {
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ error: 'Comment is required' });

    try {
        // Llamar a la API de Ollama
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: `Classify this comment as Positive, Negative, or Neutral: "${comment}"`,
            stream: false
        });

        if (!response.data || !response.data.response) {
            throw new Error("Invalid response from Ollama API");
        }

        const classification = response.data.response.trim();
        const newComment = new Comment({ text: comment, classification });
        await newComment.save();

        res.status(201).json({ comment, classification });
    } catch (error) {
        console.error('❌ Error in classification:', error.message);
        res.status(500).json({ error: 'Failed to classify comment' });
    }
});

// Ruta para obtener todos los comentarios clasificados
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.error('❌ Error fetching comments:', error.message);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
