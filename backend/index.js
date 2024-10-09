// index.js
import express from 'express';
import cors from 'cors';
import config from './config.js';
import adminRoute from './routes/adminRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', adminRoute);

app.listen(config.port, () => {
    console.log(`Server is live @ ${config.hostUrl}`);
});