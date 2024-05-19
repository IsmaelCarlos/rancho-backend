import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import knex from '../db';

const router = Router();

router.post(
    '/',
    async (req, res) => {
        if(req.timedout) return;
        try{
            console.log({ body: req.body });
            let uid_bovino = 'WAIT';
            while(uid_bovino.match(/WAIT/)){
                try{
                    console.log("AGUARDANDO LEITURA", uid_bovino)
                    await (() => new Promise(r => {
                        setTimeout(() => {
                            r(true);
                        }, 1200);
                    }))();
                    uid_bovino = await axios.post('http://192.168.0.200').then(({ data }) => data);
                }
                catch(err){
                    uid_bovino = "ERRO";
                }
            }

            console.log({ uid_bovino });
            if(uid_bovino === "ERRO"){
                return res.status(500).json({ message: 'Erro ao ler rfid' });
            }

            // const uid_bovino = await readTag();
            const bovino = {
                ...req.body,
                uid_bovino
            }
    
            console.log(bovino);
            return res.send({ bovino });
        }
        catch(err){
            console.error(err);
            return res.status(500).json({ message: 'Insert falhou'});
        }
    }
);

router.get('/', async (req, res) => {
    const resultado = await knex('bovino_view').select('*');
    res.json(resultado);
});


export default router;