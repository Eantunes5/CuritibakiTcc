import userSerivce  from '../services/user.serivce.js';
import ratingSerivce from '../services/rating.serivce.js';
import conquestsSerivce from '../services/conquests.serivce.js';

const create = async(req,res)  => {
  try{
    const {nome,email,senha,idade,sexo,conquistas,foto,favoritos} = req.body;//
    const conquests = await conquestsSerivce.findAllService();

  if (!nome || !email || !senha || !sexo || !idade ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }

  for (let i = 0; i < conquests.length; i++) {
    let aux = conquests[i]
    console.log(aux)
  }


  req.body.conquistas = conquests;

  const user = await userSerivce.createService(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro na criação de usuário" });
  }

  res.status(201).send({
    mensagem:"Usuario criado com sucesso",
    usuario:{
      id:user._id,
      nome,
      email,
      idade,
      conquistas,
      sexo,
      foto,
      favoritos
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
  try{const {nome,email,senha,adm,idade,sexo,foto,conquistas,favoritos,form} = req.body;//

  if (!nome && !email && !senha && !adm && !idade && !sexo && !conquistas && !favoritos && !foto && !form) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,user} = req;
  
  await userSerivce.updateService(
    id,
    nome,
    email,
    senha,
    adm,
    idade,
    sexo,
    foto,
    conquistas,
    favoritos,
    form
  );
  
  res.send({message:"Usuário atualizado com sucesso"})
    
} catch (err) {
  if(err.message.includes('duplicate key error collection')) {
    res.status(400).send( {message: 'Este email já está em uso'})
  } else {
  res.status(500).send( {message: err.message})}
}
};

const updateConquests = async (req, res) => {
  try {

    const userId = req.user._id; 
    const id = userId;
    const user = await userSerivce.findByIdService(userId);
    
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    
    const { categoria, progresso } = req.body;

    user.conquistas.forEach((conquista) => {
      if (conquista.categoria === categoria) {
        conquista.progresso += progresso;
        if (conquista.progresso >= conquista.meta) {
          conquista.ativa = true;
        }
      }
    });
    const {nome,email,senha,adm,idade,sexo,conquistas,favoritos,foto} = user;

    await userSerivce.updateService(
      id,
      nome,
      email,
      senha,
      adm,
      idade,
      sexo,
      foto,
      conquistas,
      favoritos
    );

    res.status(200).send({ message: 'Progresso atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteById = async(req,res) => {
  try{const id = req.id;

  await userSerivce.deleteService(id);

  const ratings = await ratingSerivce.findByIdUserService(id);

  if (ratings.length===0){   
    res.status(200).send({message:"Usuario deletado com sucesso"})
  }
  else{
    await ratingSerivce.deleteUserService(ratings[0].Users_id);
    res.status(200).send({message:"Usuario deletado com sucesso"})
  }
  
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, findByEmail, update, deleteById, updateConquests };