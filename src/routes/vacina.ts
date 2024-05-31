import { Router, Request, Response, NextFunction } from 'express';
import { getUidFromEsp } from '../utils'
import knex from '../db';


const router = Router();

router.post(
    '/',
    async (req, res) => {
        try{           
            const result = await knex('medicamento_aplicado').insert(req.body, '*');

            return res.send({ payload: result, message: 'Inserido com sucesso' });
        }
        catch(err){
            console.error(err   );
            return res.status(500).json({ message: (err as any)?.response?.data?.message??'Insert falhou'});
        }
    }
);

router.get('/', async (req, res) => {
    const resultado = await knex('bovino_view').select('*');
    res.json(resultado);
});

router.get('/rfid', async (req, res) => {
    try{
        // Códgo que vai pegar o UID
        const { message, uid } = await getUidFromEsp();

        const bovino = await knex('bovino_view').select('*').where('uid_brinco', '=', uid).then(([ primeira ]) => primeira);

        return res.send({ payload: bovino??null, message });
    }
    catch(err){
        console.error(err   );
        return res.status(500).json({ message: (err as any)?.response?.data?.message??'Busca falhou'});
    }
});


export default router;