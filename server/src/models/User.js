import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import randomstring from 'randomstring'
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
  foto: {
    type: String,
    required: false,
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
  verifyTokenEmail: {
    type: String,
    required:false,
  },
  verificado: {
    type: Boolean,
    required:false,
    default:false,
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
      required: false,
      default: "",
    },
    meta: {
      type: Number,
      required: true,
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
  form: {
    type: Boolean,
    required: true,
    default: false,
  }
})

UserSchema.pre("save", async function(next){
  this.senha = await bcrypt.hash(this.senha, 10);
  this.verifyTokenEmail = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })
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