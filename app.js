/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import suggestionRoutes from './routes/suggestionRoute';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/suggestions', suggestionRoutes);
export default app;
