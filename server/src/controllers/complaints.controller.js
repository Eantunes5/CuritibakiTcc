import complaintsSerivce  from '../services/complaints.serivce.js';

const create = async(req,res)  => {
  try{
    const {id,nome,titulo,descricao,local} = req.body;

  if (!nome || !titulo || !descricao || !local ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }

  const reclamacao = await complaintsSerivce.createService(req.body);

  if (!reclamacao) {
    return res.status(400).send({ message: "Erro na criação de reclamação" });
  }

  res.status(201).send({
    mensagem:"Reclamação criada com sucesso",
    usuario:{
      id:reclamacao._id,
      nome,
      titulo,
      descricao,
      local
    }
  });
} catch (err) {
  res.status(500).send( {message: err.message})}
};
  
const findAll = async(req,res)  => {
  try{
    const reclamacao = await complaintsSerivce.findAllService();
  
  if(reclamacao.length === 0){
    return res.status(400).send({message: "Não há reclamações cadastradas"});
  }

  res.send(reclamacao)
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findById = async(req,res) => {
  try{const reclamacao = req.reclamacao;

    res.send(reclamacao);
  } catch (err) {
    res.status(500).send( {message: err.message})
  }
};

const update = async(req,res) => {
  try{const {nome,titulo,descricao,local} = req.body;
  
  if (!nome & !titulo & !descricao & !local ) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,reclamacao} = req;

  await complaintsSerivce.updateService(
    id,
    nome,
    titulo,
    descricao,
    local,
  );
   
  res.send({message:"Reclamação atualizada com sucesso"})
    
} catch (err) {
  res.status(500).send( {message: err.message})}
};

const deleteById = async(req,res) => {
  try{const id = req.id;

  await complaintsSerivce.deleteService(id);
  
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, update, deleteById };