import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.serivce.js';

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

  res.send({token});

} catch (err){
  res.status(500).send(err.message);
  };

};
export { login };