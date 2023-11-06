import Analytics from '../models/Analytics.js';

const createService = (body) => Analytics.create(body);

const findAllService = () => Analytics.find();

const findByIdService = (id) => Analytics.findById(id);

const updateService = (id,idade, estadoOrigem, cidadeOrigem, estadoCivil, acomodacaoPrincipal, tempoDeEstadia, motivoDaViagem, transporteDaViagem) => Analytics.findOneAndUpdate({_id: id},{idade, estadoOrigem, cidadeOrigem, estadoCivil, acomodacaoPrincipal, tempoDeEstadia, motivoDaViagem, transporteDaViagem});

const deleteService = (id) => Analytics.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};