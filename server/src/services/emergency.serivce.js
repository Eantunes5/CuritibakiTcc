import Emergency from '../models/Emergency.js';

const createService = (body) => Emergency.create(body);

const findAllService = () => Emergency.find();

const findByIdService = (id) => Emergency.findById(id);

const updateService = (id,logo,numero,nome) => Emergency.findOneAndUpdate({_id: id},{logo,numero,nome});

const deleteService = (id) => Emergency.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};
