import type { Request, Response, NextFunction } from 'express';

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