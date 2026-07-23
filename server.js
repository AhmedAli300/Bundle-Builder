import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const productsDataPath = path.join(__dirname, 'public', 'data', 'products.json');


app.get('/api/products', (req, res) => {
  try {
    const rawData = fs.readFileSync(productsDataPath, 'utf8');
    const data = JSON.parse(rawData);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error reading products data:', error);
    res.status(500).json({ success: false, message: 'Failed to load products data' });
  }
});


app.post('/api/bundle/save', (req, res) => {
  try {
    const bundleData = req.body;
    console.log('Saved bundle configuration:', JSON.stringify(bundleData, null, 2));
    res.json({
      success: true,
      message: 'Bundle configuration saved successfully!',
      timestamp: new Date().toISOString(),
      bundle: bundleData
    });
  } catch (error) {
    console.error('Error saving bundle:', error);
    res.status(500).json({ success: false, message: 'Failed to save bundle' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Bundle Builder API Server running at http://localhost:${PORT}`);
});
