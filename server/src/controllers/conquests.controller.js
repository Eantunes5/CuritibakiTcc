import conquestsSerivce from '../services/conquests.serivce.js';

const create = async(req,res)  => {
  try{
    const {nome,descricao,premio,categoria,foto} = req.body;

    console.log(nome,descricao,premio,categoria,foto)
  if (!nome || !descricao || !premio || !categoria || !foto ) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }
 
  const conquests = await conquestsSerivce.createService(req.body);

  if (!conquests) {
    return res.status(400).send({ message: "Erro na criação de conquista" });
  }

  res.status(201).send({
    mensagem:"Conquista criada com sucesso",
    emergencia:{
      id:conquests._id,
      nome,
      descricao,
      premio,
      categoria,
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
  try{const {nome,descricao,categoria,premio,foto} = req.body;

  if (!nome || !descricao || !premio || !categoria || !foto ) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,conquests} = req;
  
  await conquestsSerivce.updateService(
        id,
        nome,
        descricao,
        premio,
        categoria,
        foto
  );
  
  res.send({message:"Conquista atualizada com sucesso"})
    
} catch (err) {
  res.status(500).send( {message: err.message} )
}
};

const deleteById = async(req,res) => {
  try{const id = req.id;
  
  await conquestsSerivce.deleteService(id);

  res.status(200).send({message:"Conquista deletada com sucesso"})
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, update, deleteById };