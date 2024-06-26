import { Router } from 'express';
import knex from '../db';

const router = Router();

router.post('/', async (req, res) => {
    try{
        /**
         * No PostGres eu posso passar um segundo parametro
         * para o insert do knex escolhendo as colunas
         * da tabela que eu acabei de inserir que serão retornadas
         */
        const result = await knex('medicamento').insert(req.body, '*');
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

router.patch('/:id', async (req, res) => {
    try{
        const result = await knex('medicamento')
            .update(req.body)
            .where('id_medicamento', '=', req.params.id);
        res.json({ result });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Insert falhou' });
    }
});

router.get('/', async (req, res) => {
    try{
        const resultado =  await knex('medicamento_view').select('*');
        res.json(resultado);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Busca Falhou' });
    }
});

router.get('/:id', async (req, res) => {
    try{
        const resultado =  await knex('medicamento_view')
            .select('*')
            .where('id_medicamento', '=', req.params.id);
        res.json(resultado);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Busca falhou' });
    }
});


export default router;