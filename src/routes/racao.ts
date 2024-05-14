import { Router } from 'express';
import knex from '../db';

const router = Router();

router.get('/', async (req, res) => {
    const resultado =  await knex('racao_view').select('*');
    res.json(resultado);
});


export default router;