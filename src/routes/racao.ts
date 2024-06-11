import { Router } from 'express';
import knex from '../db';

const router = Router();

router.post('/', async (req, res) => {
    try{
        const result = await knex('racao').insert(req.body, '*');
        await (() => new Promise(r => {
            setTimeout(() => r(true), 5000);
        }))();
        res.json({ result });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Insert falhou' });
    }
});

router.get('/', async (req, res) => {
    try{
        const resultado =  await knex('racao_view').select('*');
        res.json(resultado);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Insert falhou' });
    }
});


export default router;