import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nama: string;
  email: string;
  password_hash: string;
  role: 'Admin' | 'Penyewa';
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    nama: {
      type: String,
      required: [true, 'Nama wajib diisi'],
      trim: true,
      maxlength: [100, 'Nama maksimal 100 karakter'],
    },
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Format email tidak valid',
      ],
    },
    password_hash: {
      type: String,
      required: [true, 'Password wajib diisi'],
      select: false, // Tidak include di query by default untuk keamanan
    },
    role: {
      type: String,
      enum: {
        values: ['Admin', 'Penyewa'],
        message: 'Role harus Admin atau Penyewa',
      },
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Index untuk performa
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);