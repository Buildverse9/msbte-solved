const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Directories
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const SOLUTIONS_FILE = path.join(DATA_DIR, 'solutions.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(SOLUTIONS_FILE)) fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify([]));

// Serve static files
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Generate a safe unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed!'), false);
    }
  }
});

// API: Get all solutions
app.get('/api/solutions', (req, res) => {
  try {
    const data = fs.readFileSync(SOLUTIONS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read solutions data' });
  }
});

// API: Upload a solution
app.post('/api/upload', upload.single('solution_file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { branch, semester, subject, practical, contributor } = req.body;
    
    if (!branch || !semester || !subject || !practical) {
      // Remove uploaded file if metadata is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Missing required metadata' });
    }

    // Read current solutions
    const solutions = JSON.parse(fs.readFileSync(SOLUTIONS_FILE, 'utf8'));

    // Create new solution record
    const newSolution = {
      id: Date.now().toString(),
      branch,
      semester: parseInt(semester),
      subject,
      practical: parseInt(practical),
      contributor: contributor || 'Anonymous',
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      uploadDate: new Date().toISOString()
    };

    // Add and save
    solutions.push(newSolution);
    fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify(solutions, null, 2));

    res.status(201).json({ 
      message: 'Solution uploaded successfully!', 
      solution: newSolution 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error during upload' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
