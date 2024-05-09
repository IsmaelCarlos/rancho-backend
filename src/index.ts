import express from 'express';
import cors from 'cors';
import { MiddlewareAutenticacao } from './utils';
import knex from './db';

import pessoa_routes from './routes/pessoa';

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

app.use('/pessoas', pessoa_routes);


app.listen(port, () => {
    console.log('O servidor está escutando na porta '.concat(port.toString()));
});