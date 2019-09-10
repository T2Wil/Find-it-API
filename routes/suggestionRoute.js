/* eslint-disable linebreak-style */
import express from 'express';
import { getSuggestions } from '../controllers/suggestionController';

const router = express.Router();
router.get('/:q/:latitude?/:longitude?', getSuggestions);
export default router;
