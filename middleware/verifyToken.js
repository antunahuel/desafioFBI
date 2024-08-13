import jwt, { decode } from 'jsonwebtoken';
import db from '../db/config.js';

const verifyToken = async(req, res, next)=>{
    try {
        let token;
        let { authorization } = req.headers
        // console.log(req.query.token);

        if(authorization){
            token = authorization.split(" ")[1];
        }else if(req.query.token){
            token = req.query.token;
        }else{
            res.status(401).json({
                msg:"Debe proporcionar un token"
            })
        }

        const coded = jwt.verify(token, process.env.KEY_TOKEN);

        req.user = coded;

        let { rows } = await db.query('SELECT admin FROM users WHERE id=$1', [coded.id]);

        // console.log(rows[0].admin);

        req.user.admin = rows[0].admin;
        
        next();
        
    } catch (error) {
        console.log(error);
    }
}

export {
    verifyToken
}