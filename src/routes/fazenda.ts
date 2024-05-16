import { Router } from 'express';
import knex from '../db';

import { FormFazendaType, FazendaType } from '../../../rancho-2/src/types/fazenda';
import { EnderecoType } from '../../../rancho-2/src/types/endereco';
import { PessoaType } from '../../../rancho-2/src/types/people';

const router = Router();

router.post('/', async (req, res) => {
    try{
        const {
            id_pessoa,

            nome,
            pecuaria,
            tamanho_hectare,
            
            zona,
            cep_endereco,
            cidade,
            estado,
        } = req.body as FormFazendaType;

        const endereco_result = await knex<Partial<EnderecoType>>('endereco').insert({
            cep_endereco,
            zona,
            cidade,
            estado
        }, '*').then(response => response[0]);

        const fazenda_result = await knex<Partial<FazendaType>>('fazenda').insert({
            nome,
            pecuaria,
            tamanho_hectare,
            id_endereco: endereco_result.id_endereco
        }, '*').then(response => response[0]);


        await knex<Partial<PessoaType>>('pessoa').update(
            {
                id_fazenda: fazenda_result.id_fazenda
            }
        ).where('id_pessoa', '=', id_pessoa);

        res.json({ result: fazenda_result });   
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao inserir' });
    }
});

router.get('/', async (req, res) => {
    const resultado =  await knex('fazenda_view').select('*');
    res.json(resultado);
});


export default router;