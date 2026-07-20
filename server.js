import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, 'dist');

// Serve static files from the dist directory
app.use(express.static(distPath));

// SPA Fallback: All unknown routes get redirected to index.html
app.get('*', (req, res) => {
  const indexPath = path.resolve(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send(`
      <h2>Deployment Error</h2>
      <p>The "dist/index.html" file was not found.</p>
      <p>Please ensure you have run <code>npm run build</code> before starting the server.</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Production Express server running on port ${PORT}`);
});
