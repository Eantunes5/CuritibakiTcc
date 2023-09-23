import User from '../models/User.js';

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const findByEmailService = (email) => User.find(email);

const updateService = (id,nome,email,senha,adm,idade,sexo,conquistas,favoritos) => User.findOneAndUpdate({_id: id},{nome,email,senha,adm,idade,sexo,conquistas,favoritos});

const deleteService = (id) => User.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  findByEmailService,
  updateService,
  deleteService,
};
