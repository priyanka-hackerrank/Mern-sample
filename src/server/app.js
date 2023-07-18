import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import postsRouter from './routes/posts.js';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

// Load the /posts routes
app.use('/api/posts', postsRouter);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
