import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import randomstring from 'randomstring'

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
  conquistas: [
    {
      type: String, 
      required:true,
      default: [],
    },
  ],
  verifyTokenEmail: {
    type: String,
    required:false,
  },
  verificado: {
    type: Boolean,
    required:false,
    default:false,
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