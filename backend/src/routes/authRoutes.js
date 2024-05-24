import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users.js'; // Stelle sicher, dass der Importpfad korrekt ist und .js Endung verwenden

const router = express.Router();

router.post('/register', async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).send({message: 'User created!'});
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) =>
{
    try
    {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(400).send({ message: 'User not found.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch)
        {
            return res.status(400).send({ message: 'wrong password!'});
        }
        else if(isMatch)
        {
            res.send({ message: 'login succesful.'})
        }
    }
    catch (error)
    {
        res.status(500).send(error)
    }
});

export default router;