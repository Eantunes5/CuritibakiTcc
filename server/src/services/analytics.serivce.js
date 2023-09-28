import Analytics from '../models/Analytics.js';

const createService = (body) => Analytics.create(body);

const findAllService = () => Analytics.find();

const findByIdService = (id) => Analytics.findById(id);

const updateService = (id,motivoVisita,duracaoEstadia,origemVisitante,meiosDeTransporte,atividadesPreferidas) => Analytics.findOneAndUpdate({_id: id},{motivoVisita,duracaoEstadia,origemVisitante,meiosDeTransporte,atividadesPreferidas});

const deleteService = (id) => Analytics.deleteOne({_id: id});

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};