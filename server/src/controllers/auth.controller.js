import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.serivce.js';
import { conteudoTemplateConfirmarEmail } from '../services/templates/index.js';
import Handlebars from 'handlebars';
import config from '../config/index.js';
import { emailDefault } from '../config/auth.js';
import {sendEmail} from '../mail/sendEmail.js';
import userSerivce  from '../services/user.serivce.js';



const login = async (req,res) => {
  try{const {email,senha}= req.body;

  const user = await loginService(email);

  if(!user){
    return res.status(400).send('Senha e/ou email incorretos');
  }

  const passwordisValid = await bcrypt.compare(senha, user.senha);

  if(!passwordisValid){
    return res.status(400).send('Senha e/ou email incorretos');
  }

  const token = generateToken(user.id);
  const id = user.id;

  res.send({token,id});

} catch (err){
  res.status(500).send(err.message);
  };

};

const templateVerificarEmail = Handlebars.compile(conteudoTemplateConfirmarEmail)

const verificarEnviarEmailController = async (req,res) => {
  
  const url = process.env.APP_FRONT_URL
  console.log("URL:  " + url);
  try {
    const email = req.body.email
    const user = await userSerivce.findByEmailService({email:email});
    console.log("parse: " + user[0].email)


    const token = generateToken({
      email: user[0].email,
      verifyTokenEmail: user[0].verifyTokenEmail
    })

    sendEmail(user[0], emailDefault, 'Confirme seu email', 
      templateVerificarEmail({
        url: url,
        username: user[0].nome,
        verifyTokenEmail: token
      })
    )

    res.status(200).send(user);

  } catch (error) {
    const email = req.body.email
    const user = await userSerivce.findByEmailService({email:email});
    if(!user) {
      throw res.status(400).send("Usuario ja existente")
    }
  
    if(user.verificado){
      throw res.status(401).send("Email ja foi verificado")
    }
  }

};

async function confirmarTokenEmail(token) {
  try {
    const {email, verifyTokenEmail} = jwt.verify(
      token,
      authSecret.secret
    ) 
    console.log("token: "+ verifyTokenEmail + "email: " + email)
    return {email, verifyTokenEmail}
  } catch {
    //throw res.status(401, 'token invalido')
  }
}

async function confirmarTokenEmailHelper(token) {
  try {
    const {email, verifyTokenEmail} = confirmarTokenEmail(token)
    const userJaVerificado = userSerivce.findByEmailService({email:email});

    if (!userJaVerificado) {
      //throw res.status(404, 'usuario nao encontrado')
    }

    if (userJaVerificado[0].verificado) {
      //throw res.status(401, 'esse usuario ja verificou o email')
    }

    if (userJaVerificado[0].verifyTokenEmail !== verifyTokenEmail) {
      //throw res.status(401, 'token invalido para esse email')
    }

    const userId = userJaVerificado[0]._id

    const updateUser = userSerivce.updateVerifyUserById(userId, true, '')

    return updateUser

  } catch (error) {

  }
}

const confirmarEmailController = async (req,res) => {
  try {
    const token = req.body.token
    const user = await confirmarTokenEmailHelper(token)
    res.status(200).send(user)
  } catch (error) {
    
  }
}


export { login, verificarEnviarEmailController, confirmarEmailController };