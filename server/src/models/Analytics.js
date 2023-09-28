import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    motivoVisita : {
        type: String,
        required:true,
      },
      duracaoEstadia : {
        type: String,
        required:true,
      },
      origemVisitante : {
        type: String,
        required:true,
      },
      meiosDeTransporte : {
        type: String,
        required:true,
      },
      atividadesPreferidas : {
        type: String,
        required:true,
      },

}) 

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;