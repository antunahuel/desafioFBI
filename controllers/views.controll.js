import jwt from 'jsonwebtoken';
import db from '../db/config.js';

const loginUser = async(req,res)=>{
    try {
        let { email , password} = req.body;

        if(!email ||!password){
            return res.status(400).json({
                msg:"Debe proporcionar credenciales necesarias [email, password] para inciar sesión"
            })
        };

        const { rows } = await db.query('SELECT id, name, email, profile_img, admin FROM users WHERE email=$1 AND password=$2',
            [email, password]
        );

        let user = rows[0];

        if(!user){
            return res.status(404).json({
                msg:"Usuario no registrado con las credenciales ingresada, vuelva a intentarlo"
            })
        };

        //generar token

        const token = jwt.sign(user, process.env.KEY_TOKEN);

        res.json({
            msg:"Incio de sesión exitosa",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Ha ocurrido un error en el proceso de autentificación"
        })
    }
};

//vista protegida perfil

const perfil = async(req,res)=>{
    try {
        let { rows } = await db.query('SELECT id, name, email, profile_img, admin FROM users WHERE id=$1',
            [req.user.id]
        );

        let user = rows[0];

        res.render("perfil",{
            user,
        });

    } catch (error) {
        console.log(error);
        res.render("perfil",{
            error:"Se produjo error al acceder a sus datos, intente nuevamente"
        })
    }
};

const getTopSecret = async(req,res)=>{
    try {
        
        let { rows } = await db.query('SELECT admin FROM users WHERE id = $1', [req.user.id]);

        let admin = rows[0].admin;

        if(admin == false){
            return res.render("topSecret",{
                error:"No posee las credenciales necesarias para acceder a esta información"
            })
        };
        res.render("topSecret");
    } catch (error) {
        console.log(error);
        res.render("topSecret",{
            error:"Se produjo error al acceder a información solicitada, intente nuevamente"
        })
    }
}


let controlls = {
    loginUser,
    perfil,
    getTopSecret
};

export default controlls;