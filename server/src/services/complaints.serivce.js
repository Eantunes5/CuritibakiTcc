import Complaints from '../models/Complaints.js';

const createService = (body) => Complaints.create(body);

const findAllService = () => Complaints.find();

const findByIdService = (id) => Complaints.findById(id);

const updateService = (id,nome,titulo,descricao,local) => Complaints.findOneAndUpdate({_id: id},{nome,titulo,descricao,local});

const deleteService = (id) => Complaints.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};