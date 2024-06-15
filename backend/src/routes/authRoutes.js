import express from 'express';
import bcrypt from 'bcrypt';
import Budget from '../models/Budget.js'
import User from '../models/Users.js'; 


const router = express.Router();


router.post('/register', async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        
        console.log('Gehashtes Passwort:', hashedPassword);

        const user = new User({ 
            email: trimmedEmail,
            password: hashedPassword });

        await user.save();
        console.log('User saved:', user);

        const newBudget = new Budget({
            userId: user._id,
            total_budget: 0 // Initialisiere das Budget mit 0 oder einem anderen Standardwert
        });

        await newBudget.save();

        res.status(201).send({message: 'User created!'});
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res, next) =>
{
    try
    {
        const { email, password } = req.body;
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        console.log('schaue nach user mit der email:', trimmedEmail)

        const user = await User.findOne({email: trimmedEmail});
        console.log('Benutzer gefunden:', user)

        if(!user)
        {
            console.log('Kein Benutzer mit der Email gefunden.')
            return res.status(400).send({ message: 'User not found.'});
        }

        console.log('Überprüfe Password:', trimmedPassword, 'gegen gespeichertes Passwort:', user.password);
        const isMatch = await bcrypt.compare(trimmedPassword, user.password);
        console.log('Ergebnis des Passwortvergleichs:', isMatch);
        
        if(!isMatch)
        {
            console.log('PW stimmt nicht überein.')
            return res.status(400).send({ message: 'wrong password!'});
        }
        
        req.session.userId = user._id;
        
        const budget = await Budget.findOne({ userId: user._id });

        res.send({ message: 'login succesful.', budgetId: budget._id })
    
    }
    catch (error)
    {
        res.status(500).send(error)
    }
});

router.post('/logout', async (req, res) => 
{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send({ message: 'Error logging out' });
            }
            res.clearCookie('connect.sid');
            console.log('fucking destroyed.');
            res.status(200).send({ message: 'fucking destroyed' });
        });
    } catch (err) {
        console.error('Unexpected error during logout:', err);
        res.status(500).send({ message: 'Unexpected error during logout' });
    }
});

export default router;