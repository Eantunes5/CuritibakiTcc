import mongoose from 'mongoose';

const LocaisAuxSchema = new mongoose.Schema({
  nome : {
    type: String,
    required:true,
  },
  slug : {
    type: String,
    required:true,
  },
  tipo : {
    type: String,
    required:true,
  },
  sobre : {
    type: String,
    required:true,
  },
  horarios : {
    type: String,
    required:true,
  },
  ingressos : {
    type: String,
    required:true,
  },
  endereco : {
    type: String,
    required:true,
  },
  foto : {
    type: String,
    required:true,
  },
  iframe : {
    type: String,
    required:true,
  },
}) 

const LocaisAux = mongoose.model("LocaisAux", LocaisAuxSchema);

export default LocaisAux;