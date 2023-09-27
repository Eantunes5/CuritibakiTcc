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


/*
const verificarEnviarEmailHelper = async (User, res) =>{

  const user = userSerivce.findByEmailService({User.email})

  const user = await userSerivce.findByEmailService({email:email});


  if(!user) {
    throw res.status(400).send("Usuario ja existente")
  }

  if(user.verificado){
    throw res.status(401).send("Email ja foi verificado")
  }

  const token = generateToken({
    email: user.email,
    verifyToken: user.verifyToken
  })

  const template = {
    from: emailDefault,
    subject: 'Confirme seu email',
    html: templateVerificarEmail({
      url: config.appFrontUrl,
      username: user.nome,
      userToken: token
    })
  }
  sendEmail(user, template)

};*/


const templateVerificarEmail = Handlebars.compile(conteudoTemplateConfirmarEmail)

const verificarEnviarEmailController = async (req,res) => {
  
  try {
    const email = req.body.email
    const user = await userSerivce.findByEmailService({email:email});
    console.log("parse: " + user[0].email)


    const token = generateToken({
      email: user[0].email,
      verifyToken: user[0].verifyToken
    })
  /*
    const template = {
      from: emailDefault,
      subject: 'Confirme seu email',
      html: templateVerificarEmail({
        url: config.appFrontUrl,
        username: user[0].nome,
        userToken: token
      })
    }
    */
    sendEmail(user[0], emailDefault, 'Confirme seu email', 
      templateVerificarEmail({
        url: config.appFrontUrl,
        username: user[0].nome,
        userToken: token
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

export { login, verificarEnviarEmailController };