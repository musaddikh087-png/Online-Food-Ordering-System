import crypto from 'crypto';
import mongoose from 'mongoose';

const hashPassword = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey.toString('hex'));
    });
  });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashNewPassword() {
  if (!this.isModified('password')) return;

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = await hashPassword(this.password, salt);
  this.password = `${salt}:${passwordHash}`;
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const [salt, storedHash] = this.password.split(':');
  if (!salt || !storedHash) return false;

  const candidateHash = await hashPassword(candidatePassword, salt);
  return crypto.timingSafeEqual(
    Buffer.from(storedHash, 'hex'),
    Buffer.from(candidateHash, 'hex')
  );
};

export default mongoose.model('User', userSchema);
