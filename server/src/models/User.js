import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import conquestsSerivce from '../services/conquests.serivce.js';

const UserSchema = new mongoose.Schema({
  nome : {
    type: String,
    required:true,
  },
  email : {
    type: String,
    required:true,
    unique:true,
    lowercase: true,
  },
  senha : {
    type: String,
    required:true,
    select: false,
  },
  adm : {
    type: Boolean,
    required:true,
    default: false,
  },
  favoritos: [
    {
      type: String, 
      required:true,
      default: [],
    },
  ],
  sexo : {
    type: String,
    required:true,
  },
  idade : {
    type: String,
    required:true,
  },
  conquistas: [{
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    premio: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    meta: {
      type: Number,
      required: true,
      default: 40,
    },
    progresso: {
      type: Number,
      required: true,
      default: 0,
    },
    ativa: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
})

UserSchema.pre("save", async function(next){
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  const senha = update.senha;

  if (senha) {
    update.senha = await bcrypt.hash(senha, 10);
  };

  next();
});

const User = mongoose.model("Usuario", UserSchema);

export default User;