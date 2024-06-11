import express from 'express';
import cors from 'cors';
import { MiddlewareAutenticacao } from './utils';
import knex from './db';

import pessoa_routes from  './routes/pessoa';
import bovino_routes from  './routes/bovino';
import fazenda_routes from './routes/fazenda';
import medicamento_routes from './routes/medicamento';
import racao_routes from './routes/racao';
import racao_aplicada from './routes/racao_aplicada';
import estoque_routes from './routes/estoque';
import vacina_routes from './routes/vacina';
import axios from 'axios';

const port = 6754;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.post('/meu-post', MiddlewareAutenticacao, (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.get('/', async (req, res) => {
    setTimeout(() => {
        res.send('Hello');
    }, 8000);
});

app.post('/teste', async (req, res) => {
    try{
        console.log(req.body);
        await knex('bovino').insert(req.body);
        res.json({ message: 'ok' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'not ok' });
    }
});

app

app.use('/pessoas', pessoa_routes);

app.use('/bovino', bovino_routes);

app.use('/fazendas', fazenda_routes);

app.use('/medicamento', medicamento_routes);

app.use('/racao', racao_routes);

app.use('/racao_aplicado', racao_aplicada);

app.use('/estoque', estoque_routes);

app.use('/vacina', vacina_routes);

app.listen(port, () => {
    console.log('O servidor está escutando na porta '.concat(port.toString()));
});