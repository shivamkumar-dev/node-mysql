const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: 'Initial Setup'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
