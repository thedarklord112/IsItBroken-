import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, 'data', 'locations.json');

app.get('/api/locations', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    
    // Real-time simulation: randomly shifts statuses for quick frontend visual testing
    const locations = JSON.parse(data).map(item => ({
      ...item,
      status: Math.random() > 0.3 ? 'operational' : 'broken'
    }));
    
    res.json(locations);
  });
});

app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));
