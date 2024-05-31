import { Router, Request, Response, NextFunction } from 'express';
import { getUidFromEsp } from '../utils'
import knex from '../db';

const router = Router();

router.post(
    '/',
    async (req, res) => {
        try{
            // Códgo que vai pegar o UID
            const { message, uid } = await getUidFromEsp();


            // const uid_bovino = await readTag();
            const bovino = {
                ...req.body,
                uid_brinco: uid
            }

            await knex('bovino').insert(bovino);

            return res.send({ payload: bovino, message });
        }
        catch(err){
            console.error(err   );
            return res.status(500).json({ message: (err as any)?.response?.data?.message??'Insert falhou'});
        }
    }
);

router.patch('/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const result = await knex('bovino').update(req.body).where('id_bovino', '=', id);

        return res.send({ payload: result, message: 'Atualizado com sucesso' });
    }
    catch(err){
        console.error(err   );
        return res.status(500).json({ message: (err as any)?.response?.data?.message??'Insert falhou'});
    }
});

router.get('/', async (req, res) => {
    const resultado = await knex('bovino_view').select('id_bovino', 'display_brinco', 'uid_brinco', 'raca', 'classe', 'data_entrada_confinamento', 'peso_nascimento', 'peso_atual');
    res.json(resultado);
});

router.get('/by-uid-brinco/:id', async (req, res) => {
    const resultado = await knex('bovino_view').select('*').where('uid_brinco', '=', req.params.id);
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