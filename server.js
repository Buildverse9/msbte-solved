const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(ARTICLES_FILE)) fs.writeFileSync(ARTICLES_FILE, JSON.stringify([]));

// Serve static files
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer for media uploads (images, pdfs inside rich text)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'media-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

// Helper to read/write DB
const readArticles = () => JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8'));
const writeArticles = (data) => fs.writeFileSync(ARTICLES_FILE, JSON.stringify(data, null, 2));

// API: Upload Media (for Quill.js image/file embeds)
app.post('/api/upload-media', upload.single('media_file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const fileUrl = `uploads/${req.file.filename}`;
    res.status(201).json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

// API: Get all articles
app.get('/api/articles', (req, res) => {
  try {
    res.json(readArticles());
  } catch (error) {
    res.status(500).json({ error: 'Failed to read articles data' });
  }
});

// API: Create an article
app.post('/api/articles', (req, res) => {
  try {
    const { branches, semester, subject, practical, title, tags, content } = req.body;
    
    if (!branches || !semester || !subject || !practical || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const articles = readArticles();
    const newArticle = {
      id: Date.now().toString(),
      branches, // Array of branch IDs
      semester: parseInt(semester),
      subject,
      practical: parseInt(practical),
      title,
      tags: tags || [],
      content,
      updatedAt: new Date().toISOString()
    };

    articles.push(newArticle);
    writeArticles(articles);

    res.status(201).json({ message: 'Article published!', article: newArticle });
  } catch (error) {
    res.status(500).json({ error: 'Server error saving article' });
  }
});

// API: Update an article
app.put('/api/articles/:id', (req, res) => {
  try {
    const articles = readArticles();
    const idx = articles.findIndex(a => a.id === req.params.id);
    
    if (idx === -1) return res.status(404).json({ error: 'Article not found' });

    const { branches, semester, subject, practical, title, tags, content } = req.body;
    
    articles[idx] = {
      ...articles[idx],
      branches: branches || articles[idx].branches,
      semester: semester ? parseInt(semester) : articles[idx].semester,
      subject: subject || articles[idx].subject,
      practical: practical ? parseInt(practical) : articles[idx].practical,
      title: title || articles[idx].title,
      tags: tags || articles[idx].tags,
      content: content || articles[idx].content,
      updatedAt: new Date().toISOString()
    };

    writeArticles(articles);
    res.json({ message: 'Article updated!', article: articles[idx] });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating article' });
  }
});

// API: Delete an article
app.delete('/api/articles/:id', (req, res) => {
  try {
    let articles = readArticles();
    articles = articles.filter(a => a.id !== req.params.id);
    writeArticles(articles);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting article' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
