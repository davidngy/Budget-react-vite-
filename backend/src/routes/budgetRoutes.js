import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

router.post('/api/budgets', async (req, res) => 
{
    const user_id = req.session.userId;
    const { total_budget } = req.body;

    if(!user_id || !total_budget)
        {
            return res.status(400).send({ message: 'User ID and total budget required!'})
        }

    try 
    {
        const newBudget = new Budget({
            user_id,
            total_budget
        });

        const savedBudget = await newBudget.save();
        res.status(201).send(savedBudget);
    }
    catch(error)
    {
        res.status(500).send({ message: error.message });
    }
});

export default router;