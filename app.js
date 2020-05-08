const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});