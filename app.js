import express from 'express';
import suggestionRoutes from './routes/suggestionRoute';
import bodyParser from 'body-parser';

console.log('inside the app.js');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/suggestions',suggestionRoutes);
export default app;