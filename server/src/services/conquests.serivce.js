import Conquests from '../models/Conquests.js';

const createService = (body) => Conquests.create(body);

const findAllService = () => Conquests.find();

const findByIdService = (id) => Conquests.findById(id);

const updateService = (id,nome,descricao,premio,categoria,foto,meta) => Conquests.findOneAndUpdate({_id: id},{nome,descricao,premio,categoria,foto,meta});

const deleteService = (id) => Conquests.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};
