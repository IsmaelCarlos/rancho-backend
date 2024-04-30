import express from 'express';
import { MiddlewareAutenticacao } from './utils';
import knex from './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/meu-post', MiddlewareAutenticacao, (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/teste', async (req, res) => {

    const resultado =  await knex('pessoa_view').select('*');

    res.json(resultado);
});

app.listen(8080, () => {
    console.log('O servidor está escutando na porta 8080');
});