import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId(),
    ref: "User",
    required: true
  },
  curtidas: {

  },
  comentarios: {

  }

})