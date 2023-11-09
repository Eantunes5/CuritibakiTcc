import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  nota : {
    type: Number,
    required:true,
  },
  comentario : {
    type: String,
    required:true,
  },
  tipo : {
    type: String,
    required:true,
  },
  Locals_id: {
    type: String,
    required:true,
  },
  Users_id: {
    type: String,
    required:true,
  },
  Comentario_Pai_id: {
    type: String,
    required:false,
    default:"",
  },
  foto: {
    type: String,
    required:false,
    default:"",
  },
  emocao: {
    type: String,
    required:false,
    default:"",
  },
}) 

const Rating = mongoose.model("Avaliacao", RatingSchema);

export default Rating;