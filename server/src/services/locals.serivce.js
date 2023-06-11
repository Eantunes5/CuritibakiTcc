import Local from '../models/Locals.js';

const createService = (body) => Local.create(body);

const findAllService = () => Local.find();

const findByIdService = (id) => Local.findById(id);

const updateService = (id,nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe) => Local.findOneAndUpdate({_id: id},{nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe});

const deleteService = (id) => Local.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};