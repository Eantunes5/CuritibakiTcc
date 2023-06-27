import emergencySerivce from '../services/emergency.serivce.js';

const create = async(req,res)  => {
  try{
    const {logo,numero,nome} = req.body;

  if (!logo || !numero || !nome ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }

  const emergency = await emergencySerivce.createService(req.body);

  if (!emergency) {
    return res.status(400).send({ message: "Erro na criação de usuário" });
  }

  res.status(201).send({
    mensagem:"Número de emergência criado com sucesso",
    emergencia:{
      id:emergency._id,
      logo,
      numero,
      nome
    }
  });
} catch (err) {
  res.status(500).send( {message: err.message})}
};
  
const findAll = async(req,res)  => {
  try{const emergency = await emergencySerivce.findAllService();
  
  if(emergency.length === 0){
    return res.status(400).send({message: "Não há números de emergência cadastrados"});
  }

  res.send(emergency)
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findById = async(req,res) => {
  try{const emergency = req.emergency;

  res.send(emergency);
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const update = async(req,res) => {
  try{const {logo,numero,nome} = req.body;

  if (!logo && !numero && !nome ) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,emergency} = req;
  
  await emergencySerivce.updateService(
    id,
    logo,
    numero,
    nome
  );
  
  res.send({message:"Número de emergência atualizado com sucesso"})
    
} catch (err) {
  res.status(500).send( {message: err.message} )
}
};

const deleteById = async(req,res) => {
  try{const id = req.id;

  await emergencySerivce.deleteService(id);

  res.status(200).send({message:"Número de emegência deletado com sucesso"})
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, update, deleteById };