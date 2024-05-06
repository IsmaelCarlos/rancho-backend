import express from 'express';
import { MiddlewareAutenticacao } from './utils';
import knex from './db';

import pessoa_routes from './routes/pessoa';

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

app.use('/pessoas', pessoa_routes);


app.listen(8080, () => {
    console.log('O servidor está escutando na porta 8080');
});