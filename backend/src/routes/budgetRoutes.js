import express from 'express';
import Budget from '../models/Budget.js';
import Expense from '../models/Expense.js';
import ensureAuthenticated from '../middleware/auth.js';

const router = express.Router();

router.post('/',ensureAuthenticated, async (req, res) => 
{
    try 
    {
        console.log("Session userId:", req.session.userId);
        const { total_budget } = req.body;
        // Überprüfen, ob ein Budget für diesen Benutzer bereits existiert
        let budget = await Budget.findOne({ userId: req.session.userId });
        if (budget) {
            // Aktualisiere das bestehende Budget
            budget.total_budget = total_budget;
            await budget.save();
            console.log("Updated budget:", budget);
        } else {
            // Erstelle ein neues Budget
            budget = new Budget({
                userId: req.session.userId,
                total_budget
            });
            await budget.save();
            console.log("Saved new budget:", budget);
        }
        console.log("saved budget:", budget);
        res.status(201).send(budget);
    }
    catch(error)
    {
        res.status(500).send({ message: error.message });
    }
});


router.get('/balance/:budget_id', ensureAuthenticated, async (req, res) => {
    try
    {
        const {budget_id} = req.params;

        const budget = await Budget.findOne({ _id: budget_id, userId: req.session.userId });
        if(!budget)
            {
                return res.status(404).send({message: 'No budget for this user!'})
            }

        const expenses = await Expense.find({ budget_id})

        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0); //itterates through every item

        const balance = budget.total_budget - totalExpenses;
        res.status(200).send({ total_budget: budget.total_budget, totalExpenses, balance})
    }
    catch(error)
    {
        res.status(500).send({ meassage: error.message });
    }
})
export default router;