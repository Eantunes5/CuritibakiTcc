import mongoose from 'mongoose';
import userSerivce from '../services/user.serivce.js';
import localsSerivce from '../services/locals.serivce.js';
import ratingSerivce from '../services/rating.serivce.js';
import emergencySerivce from '../services/emergency.serivce.js';
import conquestsSerivce from '../services/conquests.serivce.js';
import complaintsSerivce from '../services/complaints.serivce.js';
import analyticsSerivce from '../services/analytics.serivce.js';
import localsAuxSerivce from '../services/localsAux.serivce.js';

export const validId = (req,res,next) => {
  try{const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Id inválido" });
  }
  req.id = id;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validEmail = async (req,res,next) => {
  try{const email = req.params.email;

  const user=await userSerivce.findByEmailService({email:email});

  if (user.length===0) {
    return res.status(400).send({ message: "Email não encontrado" });
  }

  req.email = email;
  req.user = user;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validUser = async (req,res,next) => {
  try{const id = req.params.id;
 
  const user = await userSerivce.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "Usuario não encontrado" });
  }

  req.id = id;
  req.user = user;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validLocal = async (req,res,next) => {
  try{const id = req.params.id;
 
  const local = await localsSerivce.findByIdService(id);

  if (!local) {
    return res.status(400).send({ message: "Local não encontrado" });
  }

  req.id = id;
  req.locals = local;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validRating = async (req,res,next) => {
  try{
  const id = req.params.id_local;

  const avaliacao = await ratingSerivce.findByIdService(id);

  if (!avaliacao) {
    return res.status(400).send({ message: "Avaliação não encontrada" });
  }

  req.id = id;
  req.rating = avaliacao;
  
  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validEmergency = async (req,res,next) => {
  try{
  const id = req.params.id;

  const emergency = await emergencySerivce.findByIdService(id);

  if (!emergency) {
    return res.status(400).send({ message: "Número de emergencia não encontrado" });
  }

  req.id = id;
  req.emergency = emergency;
  
  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validConquest = async (req,res,next) => {
  try{
  const id = req.params.id;

  const conquest = await conquestsSerivce.findByIdService(id);

  if (!conquest) {
    return res.status(400).send({ message: "Conquista não encontrada" });
  }

  req.id = id;
  req.conquest = conquest;
  
  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validComplaints = async (req,res,next) => {
  try{const id = req.params.id;
 
  const complaints = await complaintsSerivce.findByIdService(id);

  if (!complaints) {
    return res.status(400).send({ message: "Reclamação não encontrada" });
  }

  req.id = id;
  req.complaints = complaints;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validAnalytics = async (req,res,next) => {
  try{const id = req.params.id;
 
  const analytics = await analyticsSerivce.findByIdService(id);

  if (!analytics) {
    return res.status(400).send({ message: "Proposta de melhoria não encontrada" });
  }

  req.id = id;
  req.analytics = analytics;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};

export const validLocalAux = async (req,res,next) => {
  try{const id = req.params.id;
 
  const local = await localsAuxSerivce.findByIdService(id);

  if (!local) {
    return res.status(400).send({ message: "Local não encontrado" });
  }

  req.id = id;
  req.locals = local;

  next();
} catch (err) {
  res.status(500).send( {message: err.message})
}
};