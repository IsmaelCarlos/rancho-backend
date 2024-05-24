import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import knex from '../db';


const router = Router();

async function getUidFromEsp(){
    console.log("Chamando ESP");
    const response = await axios.get('http://192.168.240.164');
    if(response.status === 202){
        let time = response.headers['retry-after']
        time = parseFloat(time) * 1000;
        console.log({ time });
        await (() => new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, time);
        }))();
        return await getUidFromEsp();
    }

    return response.data;
}

router.post(
    '/',
    async (req, res) => {
        if(req.timedout) return;
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

router.get('/', async (req, res) => {
    const resultado = await knex('bovino_view').select('*');
    res.json(resultado);
});


export default router;