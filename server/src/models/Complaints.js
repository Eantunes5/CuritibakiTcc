import mongoose from 'mongoose';

const ComplaintsSchema = new mongoose.Schema({
  nome : {
    type: String,
    required:true,
  },
  titulo : {
    type: String,
    required:true,
  },
  descricao : {
    type: String,
    required:true,
  },
  local : {
    type: String,
    required:true,
  },
}) 

const Complaints = mongoose.model("Complaints", ComplaintsSchema);

export default Complaints;