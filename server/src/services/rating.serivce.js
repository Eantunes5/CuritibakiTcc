import Rating from '../models/Rating.js';

const createService = (body) => Rating.create(body);

const findAllService = () => Rating.find();

const findByIdService = (id) => Rating.find({Locals_id: id});

const findByIdUserService = (id) => Rating.find({Users_id: id});

const updateService = (id, emocao) => Rating.findOneAndUpdate({_id:id},{emocao});

const deleteService = (id) => Rating.deleteMany({Locals_id: id});

const deleteUserService = (id) => Rating.deleteMany({Users_id: id});

const deleteService2 = (id) => Rating.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  deleteService,
  deleteService2,
  findByIdUserService,
  deleteUserService,
  updateService
};