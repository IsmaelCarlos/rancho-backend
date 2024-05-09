import express from 'express';
import cors from 'cors';
import { MiddlewareAutenticacao } from './utils';
import knex from './db';

import pessoa_routes from './routes/pessoa';

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

app.post('/teste', (req, res) => {
    console.log({ body: req.body });
    res.json({ message: 'ok' });
});

app.use('/pessoas', pessoa_routes);


app.listen(8080, () => {
    console.log('O servidor está escutando na porta 8080');
});