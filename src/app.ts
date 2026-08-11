import express from 'express';
import routes from './routes/url.routes.js'
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/urls/',routes)



export default app;