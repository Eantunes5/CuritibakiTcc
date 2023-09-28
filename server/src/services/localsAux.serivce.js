import LocaisAux from '../models/LocalsAux.js';

const createService = (body) => LocaisAux.create(body);

const findAllService = () => LocaisAux.find();

const findByIdService = (id) => LocaisAux.findById(id);

const updateService = (id,nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe) => LocaisAux.findOneAndUpdate({_id: id},{nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe});

const deleteService = (id) => LocaisAux.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};