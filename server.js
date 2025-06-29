const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files like JS, CSS, images from 'app/static'
app.use(express.static(path.join(__dirname, 'app', 'static')));

// Serve the index.html from 'app/templates' folder on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'templates', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
