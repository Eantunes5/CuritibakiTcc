import userSerivce  from '../services/user.serivce.js';
import ratingSerivce from '../services/rating.serivce.js';

const create = async(req,res)  => {
  try{
    const {nome,email,senha} = req.body;

  if (!nome || !email || !senha ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }

  const user = await userSerivce.createService(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro na criação de usuário" });
  }

  res.status(201).send({
    mensagem:"Usuario criado com sucesso",
    usuario:{
      id:user._id,
      nome,
      email
    }
  });
} catch (err) {
  if(err.message.includes('duplicate key error collection')) {
    res.status(400).send( {message: 'Este email já está em uso'})
  } else {
  res.status(500).send( {message: err.message})}
}
};
  
const findAll = async(req,res)  => {
  try{const users = await userSerivce.findAllService();
  
  if(users.length === 0){
    return res.status(400).send({message: "Não há usuarios cadastrados"});
  }

  res.send(users)
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findById = async(req,res) => {
  try{const user = req.user;

  res.send(user);
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findByEmail = async(req,res) => {
  try{const email = req.email;
  
  const user = await userSerivce.findByEmailService({email:email});

  res.send(user);
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const update = async(req,res) => {
  try{const {nome,email,senha} = req.body;

  if (!nome && !email && !senha ) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,user} = req;
  
  await userSerivce.updateService(
    id,
    nome,
    email,
    senha
  );
  
  res.send({message:"Usuário atualizado com sucesso"})
    
} catch (err) {
  if(err.message.includes('duplicate key error collection')) {
    res.status(400).send( {message: 'Este email já está em uso'})
  } else {
  res.status(500).send( {message: err.message})}
}
};

const deleteById = async(req,res) => {
  try{const id = req.id;

  await userSerivce.deleteService(id);

  const ratings = await ratingSerivce.findByIdUserService(id);

  await ratingSerivce.deleteUserService(ratings[0].Users_id);

  res.status(200).send({message:"Usuario deletado com sucesso"})
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, findByEmail, update, deleteById };