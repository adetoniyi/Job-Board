import express from 'express';
import { Request, Response } from 'express';
import { RequestHandler } from 'express';

export const register: RequestHandler = async (req, res) => {
    // Your implementation
};

export const login: RequestHandler = async (req, res) => {
    // Your implementation
};

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
