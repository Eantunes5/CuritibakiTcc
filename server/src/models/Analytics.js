import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
      idade : {
        type: Number,
        required:true,
      },
      estadoOrigem : {
        type: String,
        required:true,
      },
      cidadeOrigem : {
        type: String,
        required:true,
      },
      estadoCivil : {
        type: String,
        required:true,
      },
      acomodacaoPrincipal : {
        type: String,
        required:true,
      },
      tempoDeEstadia : {
        type: String,
        required:true,
      },
      motivoDaViagem : {
        type: String,
        required:true,
      },
      transporteDaViagem : {
        type: String,
        required:true,
      }
      
}) 

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;