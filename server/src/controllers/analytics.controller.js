import analyticsSerivce  from '../services/analytics.serivce.js';

const create = async(req,res)  => {
  try{
    const {id, idade, estadoOrigem, cidadeOrigem, estadoCivil, acomodacaoPrincipal, tempoDeEstadia, motivoDaViagem, transporteDaViagem} = req.body;
  console.log(idade, estadoOrigem, cidadeOrigem, estadoCivil, acomodacaoPrincipal, tempoDeEstadia, motivoDaViagem, transporteDaViagem)
  if (!idade || !estadoOrigem || !cidadeOrigem || !estadoCivil || !acomodacaoPrincipal || !tempoDeEstadia || !motivoDaViagem || !transporteDaViagem) {
    res.status(400).send({mensagem:"Envie todos os campos para registrar"});
  }

  const analytics = await analyticsSerivce.createService(req.body);

  if (!analytics) {
    return res.status(400).send({ message: "Erro na criação de pesquisa de analytics" });
  }

  res.status(201).send({
    mensagem:"Analytics criado com sucesso",
    analytics:{
      id:analytics._id,
      idade,
      estadoOrigem,
      cidadeOrigem,
      estadoCivil,
      acomodacaoPrincipal,
      tempoDeEstadia,
      motivoDaViagem,
      transporteDaViagem
    }
  });
} catch (err) {
  res.status(500).send( {message: err.message})}
};
  
const findAll = async(req,res)  => {
  try{
    const analytics = await analyticsSerivce.findAllService();
  
  if(analytics.length === 0){
    return res.status(400).send({message: "Não há analytics cadastrados"});
  }

  res.send(analytics)
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

const findById = async(req,res) => {
  try{const analytics = req.analytics;

    res.send(analytics);
  } catch (err) {
    res.status(500).send( {message: err.message})
  }
};

const update = async(req,res) => {
  try{const {idade, estadoOrigem, cidadeOrigem, estadoCivil, acomodacaoPrincipal, tempoDeEstadia, motivoDaViagem, transporteDaViagem} = req.body;
  
  if (!idade & !estadoOrigem & !cidadeOrigem & !estadoCivil & !acomodacaoPrincipal & !tempoDeEstadia & !motivoDaViagem & !transporteDaViagem ) {
    res.status(400).send({mensagem:"Envie pelo menos um campo para atualizar"});
  }

  const {id,analytics} = req;

  await analyticsSerivce.updateService(
      id,
      idade,
      estadoOrigem,
      cidadeOrigem,
      estadoCivil,
      acomodacaoPrincipal,
      tempoDeEstadia,
      motivoDaViagem,
      transporteDaViagem
  );
   
  res.send({message:"Analytics atualizado com sucesso"})
    
} catch (err) {
  res.status(500).send( {message: err.message})}
};

const deleteById = async(req,res) => {
  try{const id = req.id;

  await analyticsSerivce.deleteService(id);
  
  res.status(200).send({message:"Analytics deletado com sucesso"})
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export default { create, findAll, findById, update, deleteById };