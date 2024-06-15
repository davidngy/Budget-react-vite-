import express from 'express';
import Expense from '../models/Expense.js';
import Budget from '../models/Budget.js';
import ensureAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.post('/',ensureAuthenticated, async (req, res) => 
    {
        try 
        {
            const { budget_id, amount, description } = req.body;

            const budget = await Budget.findOne({ _id: budget_id, userId: req.session.userId });
            if (!budget) {
                return res.status(400).send({ message: 'Invalid budget ID or you do not have access to this budget.' });
            }
            const newExpense = new Expense({
                budget_id, 
                amount,
                description
            });
    
            await newExpense.save();
            console.log("saved expense:", newExpense);
            res.status(201).send(newExpense);
        }
        catch(error)
        {
            res.status(500).send({ message: error.message });
        }
    });

// Get all expenses for a specific budget
router.get('/:budget_id', ensureAuthenticated, async (req, res) => {
    try
    {
        const { budget_id } = req.params;

        const budget = await Budget.findOne({_id: budget_id, userId: req.session.userId })
        if (!budget) {
        return res.status(400).send({ message: 'Invalid budget ID or you do not have access to this budget.' });
        }

        const expenses = await Expense.find({ budget_id });
        res.status(200).send(expenses);
    }
    catch(error)
    {
        res.status(500).send({ message: error.message });
    }
})

router.put('/:id', ensureAuthenticated, async (req, res) => {
    try
    {
        const { id } = req.params;
        const { description, amount } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { description, amount },
            { new: true }
        );

        if(!updatedExpense) 
        {
            return res.status(404).send({ message: 'Expense not found'})
        }

        res.status(200).send(updatedExpense);
    }
    catch(error)
    {
        res.status(500).send({ message: error.message})
    }
})

// Delete an expense
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try
    {
        const { id } = req.params;

        const deletedExpense = await Expense.findByIdAndDelete(id);

        if(!deletedExpense)
        {
            return res.status(404).send({ message: 'Expense not found '});
        }

        res.status(200).send({ message: 'Expense deleted'});
    }
    catch(error)
    {
        res.status(500).send({ message: error.message });
    }
})

export default router;