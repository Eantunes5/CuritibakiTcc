import mongoose from 'mongoose';

const ConquistasSchema = new mongoose.Schema({
  nome : {
    type: String,
    required:true,
  },
  descricao : {
    type: String,
    required:true,
  },
  premio : {
    type: String,
    required:true,
  },
  categoria : {
    type: String,
    required:true,
  },
  foto : {
    type: String,
    required:true,
  },
  meta : {
    type: Number,
    required:false,
  }
}) 

const Conquistas = mongoose.model("Conquistas", ConquistasSchema);

export default Conquistas;