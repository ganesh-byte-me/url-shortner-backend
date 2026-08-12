import express from 'express';
import routes from './routes/url.routes.js'
import cors from 'cors';
import { apiLimiter } from './middlewares/rate-limit.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use(apiLimiter)
app.use('/api/urls/',routes)

app.use(errorHandler);

export default app;