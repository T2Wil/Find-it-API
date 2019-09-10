import express from 'express';
import { getSuggestions,welcome } from '../controllers/suggestionController';

const router = express.Router();
console.log('inside the sugggestion route');
router.get('/:q/:latitude/:longitude',getSuggestions);
export default router;