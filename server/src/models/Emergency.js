import mongoose from 'mongoose';

const EmergencySchema = new mongoose.Schema({
  logo : {
    type: String,
    required:true,
  },
  numero : {
    type: String,
    required:true,
  },
  nome : {
    type: String,
    required:true,
  },
})

const Emergency = mongoose.model("Emergency", EmergencySchema);

export default Emergency;