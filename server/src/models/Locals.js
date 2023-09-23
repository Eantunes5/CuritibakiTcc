import mongoose from 'mongoose';

const LocaisSchema = new mongoose.Schema({
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

const Locais = mongoose.model("Locais", LocaisSchema);

export default Locais;