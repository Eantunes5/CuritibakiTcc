import conquestsSerivce from '../services/conquests.serivce.js';
import userSerivce  from '../services/user.serivce.js';

const create = async(req,res)  => {
  try{
    const {nome,descricao,premio,categoria,meta,foto} = req.body;
    const conqAux = req.body;

  if (!nome || !descricao || !premio || !categoria || !foto || !meta ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }
 
  const conquests = await conquestsSerivce.createService(req.body);

  if (!conquests) {
    return res.status(400).send({ message: "Erro na criação de conquista" });
  }

  const users = await userSerivce.findAllService();
  
  for (let i = 0; i < users.length; i++) {
    users[i].conquistas.push(conqAux) 
    console.log(users[i].conquistas)

    const id = users[i]._id;
    let conquistas = users[i].conquistas;
    console.log(users[i].conquistas)
    console.log('------------------------')
    await userSerivce.updateService1(
      id,
      conquistas,
    );
  }

  res.status(201).send({
    mensagem:"Conquista criada com sucesso",
    emergencia:{
      id:conquests._id,
      nome,
      descricao,
      premio,
      categoria,
      meta,
      foto
      
    }
  });
} catch (err) {
  res.status(500).send( {message: err.message})}
};
  
const findAll = async(req,res)  => {
  try{const conquests = await conquestsSerivce.findAllService();
  
  if(conquests.length === 0){
    return res.status(400).send({message: "Não há conquistas cadastradas"});
  }

  res.send(conquests)
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findById = async(req,res) => {
  try{const conquests = req.conquests;

  res.send(conquests);
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const update = async(req,res) => {
  try{const {nome,descricao,categoria,meta,premio,foto} = req.body;

  if (!nome || !descricao || !premio || !categoria || !foto  || !meta) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,conquests} = req;
  
  const users = await userSerivce.findAllService();
  const conquest = await conquestsSerivce.findByIdService(id);


  const conquestAux = {
    id,
    nome,
    descricao,
    premio,
    categoria,
    meta,
    foto
  }

  for (let i = 0; i < users.length; i++) {

    console.log("SUBSTITUIDO: ",conquest.nome.toString())
    console.log("SUBSTITUTO: ",conquest.nome)

    let lista = users[i].conquistas.filter(conquista => conquista.nome !== conquest.nome);
    console.log("LISTA: ",lista)
    lista.push(conquestAux) 
    console.log("LISTA ATT: ",lista)
    const id = users[i]._id;
    
    await userSerivce.updateService1(
      id,
      lista,
    );
  }

  console.log(id,
    nome,
    descricao,
    premio,
    categoria,
    meta,
    foto)

  await conquestsSerivce.updateService(
    id,
    nome,
    descricao,
    premio,
    categoria,
    meta,
    foto
);

  res.send({message:"Conquista atualizada com sucesso"})
    
} catch (err) {
  res.status(500).send( {message: err.message} )
}
};

const deleteById = async(req,res) => {
  try{const id = req.id;
  
  const conquest = await conquestsSerivce.findByIdService(id);

  const users = await userSerivce.findAllService();
  

  for (let i = 0; i < users.length; i++) {

    let conquistas = users[i].conquistas.filter(conquista => conquista.nome !== conquest.nome);

    const id = users[i]._id;

    await userSerivce.updateService1(
      id,
      conquistas,
    );
  }

  await conquestsSerivce.deleteService(id);

  res.status(200).send({message:"Conquista deletada com sucesso"})
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, update, deleteById };