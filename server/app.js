const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes'); // Ensure the path is correct

app.use(express.json()); // Middleware for parsing JSON bodies
app.use('/', authRoutes); // Use the auth routes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});