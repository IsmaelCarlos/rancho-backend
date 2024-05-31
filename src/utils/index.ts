import type { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export function MiddlewareAutenticacao(req: Request, res: Response, next: NextFunction){
    const Authorization = req.header('Authorization') || '';
    const [ , usuarioSenha ] = Authorization.split(' ');
    const [ usuario, senha ] = Buffer.from(usuarioSenha, 'base64').toString().split(':');
    
    if(usuario === 'Ismael' && senha === '123'){
        return next();
        
    }
    
    return res.status(401).json({
        message: 'Usuário ou senha incorretos'
    });
}

export async function getUidFromEsp(){
    console.log("Chamando ESP");
    const response = await axios.get('http://192.168.55.164');
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