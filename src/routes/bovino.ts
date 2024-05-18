import { Router } from 'express';
import knex from '../db';

const router = Router();

router.post('/', async (req, res) => {
    try{
        // console.log(req.body)


        
        const result =  await knex('bovino').insert(req.body,'*');
        await(() => new Promise(r => {
            setTimeout(() => r(true), 500);
        }))();
        res.json(result);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Insert falhou'});
    }
});

router.get('/', async (req, res) => {
    const resultado = await knex('bovino_view').select('*');
    res.json(resultado);
});


export default router;