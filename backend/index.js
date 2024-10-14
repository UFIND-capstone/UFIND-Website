import express from 'express';
import cors from 'cors';
import config from './config.js';
import adminRoute from './routes/adminRoute.js';
import itemRoute from './routes/itemRoute.js'; // Import the item route

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', adminRoute); // Admin routes
app.use('/api', itemRoute);   // Item routes

app.listen(config.port, () => {
    console.log(`Server is live @ ${config.hostUrl}`);
});